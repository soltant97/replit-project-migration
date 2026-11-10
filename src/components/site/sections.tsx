import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { dict, pathFor, type Locale } from "@/content/site";

export function PageHeader({ eyebrow, title, lead, children }: { eyebrow: string; title: string; lead: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden pb-16 pt-36 md:pb-24 md:pt-44">
      <div className="pointer-events-none absolute -right-32 -top-32 size-[28rem] rounded-full bg-accent/30 blur-3xl" aria-hidden />
      <div className="container-site relative">
        <p className="eyebrow text-primary animate-word-in">{eyebrow}</p>
        <h1 className="font-display mt-5 max-w-4xl text-5xl leading-[1.02] md:text-7xl lg:text-8xl animate-word-in" style={{ animationDelay: "80ms" }}>
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl animate-word-in" style={{ animationDelay: "160ms" }}>
          {lead}
        </p>
        {children}
      </div>
    </section>
  );
}

export function ProcessSteps({ locale, dark = false }: { locale: Locale; dark?: boolean }) {
  const p = dict[locale].process;
  return (
    <section className={cn("py-24 md:py-32", dark && "grain bg-forest text-forest-foreground")}>
      <div className="container-site">
        <div className="grid gap-8 md:grid-cols-2 md:items-end" data-reveal>
          <div>
            <p className={cn("eyebrow", dark ? "text-leaf" : "text-primary")}>{p.eyebrow}</p>
            <h2 className="font-display mt-4 text-4xl leading-tight md:text-6xl">{p.title}</h2>
          </div>
          <p className={cn("text-lg md:justify-self-end md:text-right", dark ? "text-forest-muted" : "text-muted-foreground")}>{p.lead}</p>
        </div>
        <ol className="mt-16 grid gap-5 md:grid-cols-3">
          {p.steps.map((s, i) => (
            <li
              key={s.title}
              data-reveal
              style={{ transitionDelay: `${i * 120}ms` }}
              className={cn(
                "group relative rounded-3xl border p-8 transition-all duration-500 hover:-translate-y-1",
                dark ? "border-forest-foreground/15 hover:border-leaf/60 hover:bg-forest-foreground/5" : "border-border bg-card shadow-soft hover:shadow-lift",
              )}
            >
              <div className="flex items-baseline justify-between">
                <span className="font-display text-6xl text-leaf">0{i + 1}</span>
                <span className={cn("eyebrow", dark ? "text-forest-muted" : "text-muted-foreground")}>{s.tag}</span>
              </div>
              <h3 className="mt-10 text-xl font-bold">{s.title}</h3>
              <p className={cn("mt-3 leading-relaxed", dark ? "text-forest-muted" : "text-muted-foreground")}>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function CtaBand({ locale }: { locale: Locale }) {
  const c = dict[locale].cta;
  return (
    <section className="py-20 md:py-28">
      <div className="container-site">
        <div data-reveal className="relative overflow-hidden rounded-[2.5rem] bg-accent px-8 py-16 text-accent-foreground md:px-16 md:py-20">
          <div className="pointer-events-none absolute -bottom-24 -right-16 size-80 rounded-full bg-leaf/60 blur-2xl animate-float" aria-hidden />
          <div className="relative grid gap-8 md:grid-cols-[1.5fr_1fr] md:items-end">
            <div>
              <h2 className="font-display text-4xl leading-tight md:text-6xl">{c.title}</h2>
              <p className="mt-4 max-w-xl text-lg opacity-80">{c.text}</p>
            </div>
            <Button asChild variant="brand" size="xl" className="md:justify-self-end">
              <Link to={pathFor(locale, "contact")}>
                {c.button} <ArrowUpRight />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
