import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { clientEnv, serverEnv } from '@/lib/env';
import type { Database } from '@/lib/database.types';

/**
 * Creates a Supabase client for use in Server Components, Server Actions,
 * and Route Handlers. Uses the anon key with cookie-based auth so all
 * queries are scoped to the authenticated user's RLS policies.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    clientEnv.NEXT_PUBLIC_SUPABASE_URL,
    clientEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // setAll can be called from Server Components where cookies
            // cannot be written — this is safe to ignore as the middleware
            // will handle the session refresh.
          }
        },
      },
    }
  );
}

/**
 * Creates a Supabase admin client that bypasses RLS.
 * ⚠️  USE WITH EXTREME CAUTION — only for server-side administrative
 * operations where tenant isolation is handled in application logic.
 * NEVER expose this to the browser.
 */
export function createAdminClient() {
  return createServerClient<Database>(
    clientEnv.NEXT_PUBLIC_SUPABASE_URL,
    serverEnv.SUPABASE_SERVICE_ROLE_KEY,
    {
      cookies: {
        getAll() {
          return [];
        },
        setAll() {
          // Admin client does not need cookies
        },
      },
    }
  );
}
