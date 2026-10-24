import { Logo } from "@/components/site/logo";
import { Container } from "@/components/site/primitives";
import { footerColumns, siteMeta } from "@/lib/site-content";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ink text-paper">
      <Container className="py-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div>
            <Logo tone="light" />
            <p className="mt-5 max-w-xs text-sm leading-6 text-white/60">
              A multi-tenant school management platform for admissions, academics,
              finance and family communication.
            </p>
            <p className="mt-7 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-success" />
              </span>
              All systems operational
            </p>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-white/40">
                {column.title}
              </h2>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/35">
            © {siteMeta.year} {siteMeta.name}. All rights reserved.
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/30">
            Illustrative product preview
          </p>
        </div>
      </Container>
    </footer>
  );
}
