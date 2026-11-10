import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { ArrowUpRight, Facebook, Instagram, Linkedin, Menu, X } from "lucide-react";
import logo from "@/assets/logo.webp";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CONTACT_EMAIL, SOCIAL, dict, pathFor, type Locale, type PageKey } from "@/content/site";
import { useReveal } from "./useReveal";

const NAV: PageKey[] = ["home", "services", "about"];

export function SiteLayout({ locale, page, children }: { locale: Locale; page: PageKey; children: ReactNode }) {
  const t = dict[locale];
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  useReveal(location.pathname);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const other: Locale = locale === "sv" ? "en" : "sv";

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">
        {t.nav.skip}
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "bg-background/85 py-3 shadow-soft backdrop-blur-xl" : "bg-transparent py-5",
        )}
      >
        <nav className="container-site flex items-center justify-between gap-6" aria-label={t.nav.menu}>
          <Link to={pathFor(locale, "home")} aria-label={t.nav.homeLabel} className="shrink-0">
            <img src={logo} alt="Ekonomika" width={150} height={50} className="h-9 w-auto md:h-10" />
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {NAV.map((p) => (
              <Link
                key={p}
                to={pathFor(locale, p)}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-colors hover:text-primary",
                  page === p ? "text-primary" : "text-foreground/75",
                )}
              >
                {t.nav[p]}
                {page === p && <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-leaf" />}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <LangSwitch locale={locale} page={page} label={t.nav.langLabel} />
            <Button asChild variant="brand" className="hidden h-10 px-5 md:inline-flex">
              <Link to={pathFor(locale, "contact")}>
                {t.nav.contact} <ArrowUpRight />
              </Link>
            </Button>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-foreground/15 md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t.nav.close : t.nav.menu}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>
      </header>

      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 z-40 flex flex-col bg-forest px-6 pb-10 pt-28 text-forest-foreground transition-all duration-500 md:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <ul className="space-y-2">
          {[...NAV, "contact" as PageKey].map((p, i) => (
            <li key={p} style={{ transitionDelay: open ? `${80 + i * 60}ms` : "0ms" }} className={cn("transition-all duration-500", open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0")}>
              <Link to={pathFor(locale, p)} className="font-display block py-2 text-5xl">
                {t.nav[p]}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-auto space-y-1 text-sm text-forest-muted">
          <a href={`mailto:${CONTACT_EMAIL}`} className="block underline-offset-4 hover:underline">{CONTACT_EMAIL}</a>
          <Link to={pathFor(other, page)} className="block pt-3 font-semibold text-forest-foreground">
            {other === "en" ? "In English →" : "På svenska →"}
          </Link>
        </div>
      </div>

      <main id="main" className="flex-1">{children}</main>

      <Footer locale={locale} />
    </div>
  );
}

function LangSwitch({ locale, page, label }: { locale: Locale; page: PageKey; label: string }) {
  return (
    <div role="group" aria-label={label} className="flex items-center rounded-full border border-foreground/15 p-0.5 text-xs font-bold">
      {(["sv", "en"] as Locale[]).map((l) => (
        <Link
          key={l}
          to={pathFor(l, page)}
          aria-current={l === locale ? "true" : undefined}
          hrefLang={l}
          className={cn(
            "rounded-full px-2.5 py-1.5 uppercase transition-colors",
            l === locale ? "bg-foreground text-background" : "text-foreground/60 hover:text-foreground",
          )}
        >
          {l}
        </Link>
      ))}
    </div>
  );
}

function Footer({ locale }: { locale: Locale }) {
  const t = dict[locale];
  const socials = [
    { href: SOCIAL.facebook, label: "Facebook", Icon: Facebook },
    { href: SOCIAL.linkedin, label: "LinkedIn", Icon: Linkedin },
    { href: SOCIAL.instagram, label: "Instagram", Icon: Instagram },
  ];
  return (
    <footer className="grain bg-forest text-forest-foreground">
      <div className="container-site grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <img src={logo} alt="Ekonomika" width={150} height={50} className="h-10 w-auto brightness-0 invert" loading="lazy" />
          <p className="font-display mt-6 max-w-xs text-3xl leading-tight">{t.footer.tagline}</p>
        </div>
        <div>
          <p className="eyebrow text-forest-muted">{t.contact.details}</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>{t.contact.city}</li>
            <li><a href={`mailto:${CONTACT_EMAIL}`} className="underline-offset-4 hover:underline">{CONTACT_EMAIL}</a></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow text-forest-muted">{t.contact.follow}</p>
          <div className="mt-4 flex gap-2">
            {socials.map(({ href, label, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                className="inline-flex size-11 items-center justify-center rounded-full border border-forest-foreground/20 transition-all hover:-translate-y-0.5 hover:border-leaf hover:text-leaf">
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-forest-foreground/10">
        <div className="container-site flex flex-wrap justify-between gap-2 py-6 text-xs text-forest-muted">
          <span>© {new Date().getFullYear()} {t.footer.rights}</span>
          <span>{t.contact.city}</span>
        </div>
      </div>
    </footer>
  );
}
