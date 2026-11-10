import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Briefcase, Calculator, Globe } from "lucide-react";
import { dict, pathFor, type Locale, type TopicKey } from "@/content/site";
import { SiteLayout } from "./SiteLayout";
import { CtaBand, PageHeader, ProcessSteps } from "./sections";

const ICONS = [Calculator, Briefcase, Globe];
const TOPIC_FOR: [TopicKey, TopicKey, TopicKey] = ["accounting", "start", "private"];

export function ServicesPage({ locale }: { locale: Locale }) {
  const s = dict[locale].services;
  return (
    <SiteLayout locale={locale} page="services">
      <PageHeader eyebrow={s.eyebrow} title={s.title} lead={s.lead} />
      <section className="pb-12">
        <div className="container-site grid gap-5 lg:grid-cols-3">
          {s.categories.map((c, i) => {
            const Icon = ICONS[i] ?? Calculator;
            return (
              <article
                key={c.title}
                data-reveal
                style={{ transitionDelay: `${i * 120}ms` }}
                className="group flex flex-col rounded-[2rem] border border-border bg-card p-8 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift md:p-10"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground transition-transform duration-500 group-hover:rotate-6">
                    <Icon className="size-6" />
                  </span>
                  <span className="font-display text-5xl text-foreground/15">0{i + 1}</span>
                </div>
                <h2 className="font-display mt-8 text-4xl">{c.title}</h2>
                <ul className="mt-6 divide-y divide-border">
                  {c.items.map((it) => (
                    <li key={it} className="py-3 font-medium text-foreground/85">{it}</li>
                  ))}
                </ul>
                <Link
                  to={pathFor(locale, "contact")}
                  search={{ topic: TOPIC_FOR[i] ?? "other" }}
                  className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-primary"
                >
                  {s.ask} <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </article>
            );
          })}
        </div>
      </section>
      <ProcessSteps locale={locale} />
      <CtaBand locale={locale} />
    </SiteLayout>
  );
}
