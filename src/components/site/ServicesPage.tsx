import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { dict, pathFor, type Locale, type TopicKey } from "@/content/site";
import { SiteLayout } from "./SiteLayout";
import { CtaBand, PageHeader, ProcessSteps } from "./sections";
const TOPIC_FOR: TopicKey[]=["accounting","start","private"];
export function ServicesPage({locale}:{locale:Locale}) {
  const s=dict[locale].services;
  return <SiteLayout locale={locale} page="services"><PageHeader eyebrow={s.eyebrow} title={s.title} lead={s.lead} />
    <section className="pb-20"><div className="container-site">{s.categories.map((c,i)=><article key={c.title} data-reveal className="grid gap-8 border-t border-border py-10 md:grid-cols-[0.25fr_1fr_1.5fr] md:py-14"><span className="font-mono text-sm text-primary">0{i+1}</span><div><h2 className="text-3xl font-medium md:text-4xl">{c.title}</h2><Button asChild variant="link" className="mt-6 gap-6 px-0"><Link to={pathFor(locale,"contact")} search={{topic:TOPIC_FOR[i]??"other"}}>{s.ask}<ArrowUpRight /></Link></Button></div><ul className="grid gap-x-8 sm:grid-cols-2">{c.items.map(it=><li key={it} className="border-b border-border py-4 text-sm">{it}</li>)}</ul></article>)}</div></section>
    <ProcessSteps locale={locale} /><CtaBand locale={locale} /></SiteLayout>;
}
