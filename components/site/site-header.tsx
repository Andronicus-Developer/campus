"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/site/logo";
import { Container } from "@/components/site/primitives";
import { navLinks } from "@/lib/site-content";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        solid
          ? "border-b border-line bg-surface/90 shadow-sm backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-6 lg:h-18">
          <a href="#top" className="shrink-0" aria-label="Campus360 — back to top">
            <Logo />
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-primary-light hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 rounded-xl border border-primary/20 bg-primary-light/60 px-3.5 py-1.5 text-xs font-bold text-primary transition-all hover:bg-primary hover:text-white"
            >
              <span>Explore Dashboards</span>
            </Link>
            <Link
              href="/login"
              className="rounded-lg px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:text-primary"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="inline-flex h-9 items-center rounded-xl bg-primary px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-hover"
            >
              Start free trial
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-9 items-center justify-center rounded-lg border border-line bg-surface text-ink transition-colors hover:bg-primary-light hover:text-primary lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>

      {open ? (
        <div id="mobile-nav" className="border-t border-line bg-surface lg:hidden">
          <Container className="py-5">
            <nav aria-label="Mobile" className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-4 py-3 text-base font-medium text-ink-soft transition-colors hover:bg-primary-light hover:text-primary"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="mt-5 flex flex-col gap-3 border-t border-line pt-5">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="inline-flex h-11 items-center justify-center rounded-xl border border-line text-sm font-semibold text-ink"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                onClick={() => setOpen(false)}
                className="inline-flex h-11 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-white"
              >
                Start free trial
              </Link>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
