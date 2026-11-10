import studio from "@/assets/studio-editorial.webp";
import { dict, type Locale } from "@/content/site";
import { SiteLayout } from "./SiteLayout";
import { CtaBand, PageHeader } from "./sections";
export function AboutPage({locale}:{locale:Locale}) {
  const a=dict[locale].about;
  return <SiteLayout locale={locale} page="about"><PageHeader eyebrow={a.eyebrow} title={a.title} lead={a.lead} />
    <div className="container-site pb-16"><img src={studio} alt={dict[locale].hero.imageAlt} width={1100} height={733} className="aspect-[16/7] w-full object-cover" /></div>
    <section className="pb-20"><div className="container-site"><ol>{a.points.map((p,i)=><li key={p.title} data-reveal className="grid gap-5 border-t border-border py-8 md:grid-cols-[0.25fr_1fr_1.5fr]"><span className="font-mono text-sm text-primary">0{i+1}</span><h2 className="text-3xl font-medium">{p.title}</h2><p className="max-w-lg leading-relaxed text-muted-foreground">{p.text}</p></li>)}</ol></div></section><CtaBand locale={locale} /></SiteLayout>;
}
