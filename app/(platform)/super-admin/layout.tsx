import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PlatformChrome } from "@/components/platform/platform-chrome";

export const metadata: Metadata = {
  title: {
    default: "Super admin — Campus360",
    template: "%s — Campus360 platform",
  },
  description:
    "Platform operator console for tenant lifecycle, plans, subscriptions, audit trail and support access.",
  robots: { index: false, follow: false },
};

export default function PlatformLayout({ children }: { children: ReactNode }) {
  return <PlatformChrome>{children}</PlatformChrome>;
}
