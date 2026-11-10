import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { useState } from "react";
import studio from "@/assets/studio-editorial.webp";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { dict, pathFor, type AudienceKey, type Locale, type TopicKey } from "@/content/site";
import { SiteLayout } from "./SiteLayout";
import { CtaBand, ProcessSteps } from "./sections";

export function HomePage({ locale }: { locale: Locale }) {
  const t = dict[locale];
  return <SiteLayout locale={locale} page="home">
    <section className="editorial-hero text-image-foreground">
      <img src={studio} alt={t.hero.imageAlt} width={1100} height={733} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
      <div className="container-site hero-copy">
        <p className="eyebrow animate-word-in mb-7 flex items-center gap-3"><span className="h-2 w-2 bg-accent" />{t.hero.eyebrow}</p>
        <h1 className="hero-title animate-word-in">{t.hero.title}<span className="text-accent">.</span></h1>
        <p className="animate-word-in mt-7 max-w-lg text-2xl leading-snug md:text-3xl">{t.hero.lead}</p>
        <Button asChild variant="leaf" size="xl" className="mt-9 gap-8"><Link to={pathFor(locale, "contact")}>{t.hero.primary}<ArrowUpRight /></Link></Button>
      </div>
      <a href="#services" className="hero-footnote eyebrow flex items-center gap-5">{t.nav.services}<ArrowDown className="size-4" /></a>
    </section>
    <section className="border-b border-border">
      <div className="container-site grid grid-cols-2 lg:grid-cols-4">
        {t.benefits.map((b, i) => <div key={b} className="flex items-start gap-3 py-6 pr-3 text-xs font-medium md:py-8 md:text-sm"><span className="font-mono text-primary">0{i + 1}</span>{b}</div>)}
      </div>
    </section>
    <Finder locale={locale} />
    <section className="bg-accent py-16 md:py-24">
      <div className="container-site editorial-grid" data-reveal>
        <div><p className="eyebrow">{t.about.eyebrow}</p><Plus className="mt-8 size-20 stroke-1 md:size-28" aria-hidden /><p className="mt-6 max-w-xs text-sm leading-relaxed">{t.hero.professions.join(" · ")}</p></div>
        <div><p className="text-2xl leading-snug md:text-4xl">{t.intro}</p><Button asChild variant="line" className="mt-8 gap-8"><Link to={pathFor(locale,"about")}>{t.nav.about}<ArrowUpRight /></Link></Button></div>
      </div>
    </section>
    <ProcessSteps locale={locale} />
    <CtaBand locale={locale} />
  </SiteLayout>;
}

function Finder({ locale }: { locale: Locale }) {
  const f = dict[locale].finder;
  const keys = Object.keys(f.audiences) as AudienceKey[];
  const [active, setActive] = useState<AudienceKey>("business");
  const a = f.audiences[active];
  return <section className="py-16 md:py-24" id="services">
    <div className="container-site">
      <div className="flex flex-wrap items-end justify-between gap-6" data-reveal><div><p className="eyebrow text-primary">{f.eyebrow}</p><h2 className="section-title mt-5">{f.title}</h2></div><Button asChild variant="link" className="gap-6 px-0"><Link to={pathFor(locale,"services")}>{f.all}<ArrowUpRight /></Link></Button></div>
      <div className="editorial-grid mt-12 border-t border-border" data-reveal>
        <div role="tablist" aria-label={f.title} className="flex flex-col">
          {keys.map((k,i) => <Button key={k} role="tab" id={`tab-${k}`} aria-selected={active===k} aria-controls="finder-panel" onClick={()=>setActive(k)} variant="ghost" className={cn("h-auto min-h-20 justify-start whitespace-normal rounded-none border-b border-border px-0 py-6 text-left text-base",active===k ? "text-primary" : "text-muted-foreground")}><span className="mr-3 font-mono text-xs">0{i+1}</span>{f.audiences[k].label}<ArrowRight className={cn("ml-auto",active!==k&&"opacity-30")} /></Button>)}
        </div>
        <div id="finder-panel" role="tabpanel" aria-labelledby={`tab-${active}`} className="pt-8 md:pt-10">
          <h3 className="max-w-xl text-3xl font-medium leading-tight md:text-4xl">{a.title}</h3>
          <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">{a.text}</p>
          <ul className="mt-8 grid gap-x-10 sm:grid-cols-2">{a.items.map(it=><li key={it} className="flex items-center gap-3 border-t border-border py-4 text-sm"><Plus className="size-4 shrink-0 text-primary" />{it}</li>)}</ul>
          <Button asChild variant="brand" size="xl" className="mt-8 gap-8"><Link to={pathFor(locale,"contact")} search={{topic:a.topic as TopicKey}}>{f.cta}<ArrowUpRight /></Link></Button>
        </div>
      </div>
    </div>
  </section>;
}
