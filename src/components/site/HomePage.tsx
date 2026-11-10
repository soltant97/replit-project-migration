import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { useEffect, useState } from "react";
import heroBuilder from "@/assets/hero-builder.webp";
import heroWoman from "@/assets/hero-woman.webp";
import heroOffice from "@/assets/hero-office.webp";
import svcStart from "@/assets/svc-start.webp";
import svcAccounting from "@/assets/svc-accounting.webp";
import svcPrivate from "@/assets/svc-private.webp";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { dict, pathFor, type AudienceKey, type Locale, type TopicKey } from "@/content/site";
import { SiteLayout } from "./SiteLayout";
import { CtaBand, ProcessSteps } from "./sections";

const AUDIENCE_IMG: Record<AudienceKey, string> = { start: svcStart, business: svcAccounting, private: svcPrivate };

export function HomePage({ locale }: { locale: Locale }) {
  return (
    <SiteLayout locale={locale} page="home">
      <Hero locale={locale} />
      <Benefits locale={locale} />
      <Intro locale={locale} />
      <Finder locale={locale} />
      <ProcessSteps locale={locale} dark />
      <CtaBand locale={locale} />
    </SiteLayout>
  );
}

function Hero({ locale }: { locale: Locale }) {
  const h = dict[locale].hero;
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((v) => (v + 1) % h.professions.length), 2200);
    return () => clearInterval(id);
  }, [h.professions.length]);

  return (
    <section className="relative overflow-hidden pb-20 pt-32 md:pb-28 md:pt-40">
      <div className="pointer-events-none absolute -left-40 top-20 size-[32rem] rounded-full bg-accent/35 blur-3xl" aria-hidden />
      <div className="container-site relative grid items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="eyebrow text-primary animate-word-in">{h.eyebrow}</p>
          <h1 className="font-display mt-6 text-[clamp(3rem,8vw,6.5rem)] leading-[0.95]">
            <span className="sr-only">{h.professions.join(", ")}</span>
            <span aria-hidden className="block">
              {h.professions.map((p, idx) => (
                <span key={p} className="animate-word-in inline" style={{ animationDelay: `${idx * 90}ms` }}>
                  <span className={cn("transition-colors duration-700", idx === i ? "text-primary italic" : "text-foreground/25")}>{p}</span>
                  {idx < h.professions.length - 2 ? ", " : idx === h.professions.length - 2 ? ` ${h.or} ` : ""}
                </span>
              ))}
            </span>
          </h1>
          <p className="mt-8 max-w-lg text-lg leading-relaxed text-muted-foreground md:text-xl animate-word-in" style={{ animationDelay: "420ms" }}>
            {h.lead}
          </p>
          <div className="mt-10 flex flex-wrap gap-3 animate-word-in" style={{ animationDelay: "520ms" }}>
            <Button asChild variant="brand" size="xl">
              <Link to={pathFor(locale, "contact")}>{h.primary} <ArrowUpRight /></Link>
            </Button>
            <Button asChild variant="line" size="xl">
              <Link to={pathFor(locale, "services")}>{h.secondary}</Link>
            </Button>
          </div>
        </div>

        <div className="relative mx-auto grid w-full max-w-xl grid-cols-3 items-end gap-3 md:gap-4" aria-hidden>
          {[heroBuilder, heroWoman, heroOffice].map((src, idx) => (
            <div
              key={src}
              className={cn(
                "animate-word-in overflow-hidden rounded-t-full rounded-b-3xl shadow-lift",
                idx === 1 ? "aspect-[3/5]" : "aspect-[3/4.3]",
                idx === 0 && "mb-10",
              )}
              style={{ animationDelay: `${200 + idx * 140}ms` }}
            >
              <img
                src={src}
                alt=""
                className="h-full w-full object-cover grayscale transition-all duration-700 hover:scale-105 hover:grayscale-0"
                fetchPriority={idx === 1 ? "high" : undefined}
              />
            </div>
          ))}
          <div className="absolute -bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-card px-5 py-3 text-sm font-semibold shadow-lift animate-float">
            <span className="size-2 rounded-full bg-leaf" /> {dict[locale].benefits[1]}
          </div>
        </div>
      </div>
    </section>
  );
}

function Benefits({ locale }: { locale: Locale }) {
  const items = dict[locale].benefits;
  const row = [...items, ...items];
  return (
    <section className="overflow-hidden border-y border-border bg-forest py-5 text-forest-foreground" aria-label={items.join(", ")}>
      <div className="flex w-max animate-marquee gap-12 pr-12" aria-hidden>
        {[...row, ...row].map((b, idx) => (
          <span key={idx} className="flex items-center gap-3 whitespace-nowrap text-sm font-semibold uppercase tracking-[0.14em]">
            <Check className="size-4 text-leaf" /> {b}
          </span>
        ))}
      </div>
    </section>
  );
}

function Intro({ locale }: { locale: Locale }) {
  return (
    <section className="py-24 md:py-36">
      <div className="container-site">
        <p data-reveal className="font-display mx-auto max-w-5xl text-center text-3xl leading-[1.2] md:text-5xl">
          {dict[locale].intro}
        </p>
      </div>
    </section>
  );
}

function Finder({ locale }: { locale: Locale }) {
  const f = dict[locale].finder;
  const keys = Object.keys(f.audiences) as AudienceKey[];
  const [active, setActive] = useState<AudienceKey>("business");
  const a = f.audiences[active];

  return (
    <section className="pb-24 md:pb-32">
      <div className="container-site">
        <div data-reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-primary">{f.eyebrow}</p>
            <h2 className="font-display mt-4 text-4xl md:text-6xl">{f.title}</h2>
          </div>
          <div role="tablist" aria-label={f.title} className="flex flex-wrap gap-2">
            {keys.map((k) => (
              <button
                key={k}
                role="tab"
                id={`tab-${k}`}
                aria-selected={active === k}
                aria-controls="finder-panel"
                onClick={() => setActive(k)}
                className={cn(
                  "rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300",
                  active === k ? "border-primary bg-primary text-primary-foreground shadow-soft" : "border-border bg-card hover:border-primary/40",
                )}
              >
                {f.audiences[k].label}
              </button>
            ))}
          </div>
        </div>

        <div
          id="finder-panel"
          role="tabpanel"
          aria-labelledby={`tab-${active}`}
          data-reveal
          className="mt-10 grid overflow-hidden rounded-[2rem] border border-border bg-card shadow-soft md:grid-cols-2"
        >
          <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto">
            {keys.map((k) => (
              <img
                key={k}
                src={AUDIENCE_IMG[k]}
                alt=""
                loading="lazy"
                className={cn("absolute inset-0 h-full w-full object-cover transition-all duration-700", k === active ? "scale-100 opacity-100" : "scale-105 opacity-0")}
              />
            ))}
          </div>
          <div key={active} className="flex flex-col p-8 md:p-12 lg:p-14">
            <h3 className="font-display animate-word-in text-3xl leading-tight md:text-4xl">{a.title}</h3>
            <p className="animate-word-in mt-4 text-lg leading-relaxed text-muted-foreground" style={{ animationDelay: "80ms" }}>{a.text}</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {a.items.map((it, idx) => (
                <li key={it} className="animate-word-in flex items-center gap-3 font-medium" style={{ animationDelay: `${140 + idx * 60}ms` }}>
                  <span className="inline-flex size-6 items-center justify-center rounded-full bg-accent text-accent-foreground"><Check className="size-3.5" /></span>
                  {it}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-wrap items-center gap-5 pt-10">
              <Button asChild variant="brand" size="xl">
                <Link to={pathFor(locale, "contact")} search={{ topic: a.topic as TopicKey }}>{f.cta} <ArrowUpRight /></Link>
              </Button>
              <Link to={pathFor(locale, "services")} className="group inline-flex items-center gap-2 text-sm font-semibold text-primary">
                {f.all} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
