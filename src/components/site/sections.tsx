import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { dict, pathFor, type Locale } from "@/content/site";
export function PageHeader({eyebrow,title,lead,children}:{eyebrow:string;title:string;lead:string;children?:ReactNode}) {
  return <section className="page-heading"><div className="container-site"><p className="eyebrow text-primary animate-word-in">{eyebrow}</p><h1 className="mt-6 animate-word-in">{title}</h1><p className="mt-7 text-lg leading-relaxed text-muted-foreground animate-word-in">{lead}</p>{children}</div></section>;
}
export function ProcessSteps({locale,dark=false}:{locale:Locale;dark?:boolean}) {
  const p=dict[locale].process;
  return <section className={cn("py-16 md:py-24",dark?"bg-forest text-forest-foreground":"bg-card")}><div className="container-site">
    <div className="editorial-grid" data-reveal><p className={cn("eyebrow",dark?"text-forest-muted":"text-primary")}>{p.eyebrow}</p><div><h2 className="section-title max-w-2xl">{p.title}</h2><p className={cn("mt-5",dark?"text-forest-muted":"text-muted-foreground")}>{p.lead}</p></div></div>
    <ol className="mt-14 grid gap-8 md:grid-cols-3">{p.steps.map((s,i)=><li key={s.title} data-reveal className={cn("border-t pt-5",dark?"border-forest-foreground/30":"border-border")}><div className="flex items-center justify-between"><span className="font-mono text-sm text-primary">0{i+1}</span><span className="eyebrow opacity-60">{s.tag}</span></div><h3 className="mt-8 text-2xl font-medium">{s.title}</h3><p className={cn("mt-4 max-w-sm text-sm leading-relaxed",dark?"text-forest-muted":"text-muted-foreground")}>{s.text}</p></li>)}</ol>
  </div></section>;
}
export function CtaBand({locale}:{locale:Locale}) {
  const c=dict[locale].cta;
  return <section className="bg-primary py-16 text-primary-foreground md:py-20"><div className="container-site grid gap-10 md:grid-cols-[1.5fr_1fr] md:items-end" data-reveal><div><h2 className="section-title max-w-2xl">{c.title}</h2><p className="mt-6 max-w-xl leading-relaxed opacity-80">{c.text}</p></div><Button asChild variant="leaf" size="xl" className="justify-self-start gap-10 md:justify-self-end"><Link to={pathFor(locale,"contact")}>{c.button}<ArrowUpRight /></Link></Button></div></section>;
}
