import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Campus360 — Run your entire school from one secure workspace",
  description:
    "Campus360 is a multi-tenant school management platform for admissions, attendance, assessments, report cards and fee collection — with every school's data isolated and every action auditable.",
  openGraph: {
    title: "Campus360 — Run your entire school from one secure workspace",
    description:
      "Admissions, attendance, assessments and fees in one multi-tenant platform built for independent schools.",
    siteName: "Campus360",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#4f6ef7",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${plusJakarta.variable} ${jetbrainsMono.variable}`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen bg-canvas font-sans text-ink antialiased"
      >
        <noscript
          dangerouslySetInnerHTML={{
            __html: ".reveal{opacity:1!important;transform:none!important}",
          }}
        />
        {children}
      </body>
    </html>
  );
}
