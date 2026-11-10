import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUpRight, Facebook, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CONTACT_EMAIL, SOCIAL, dict, pathFor, type Locale, type PageKey } from "@/content/site";
import { useReveal } from "./useReveal";
const NAV: PageKey[] = ["home", "services", "about"];
function Wordmark() { return <span className="wordmark"><span className="brand-symbol" aria-hidden />Ekonomika<span className="text-primary">.</span></span>; }
export function SiteLayout({locale,page,children}: {locale: Locale; page: PageKey; children: ReactNode}) {
  const t=dict[locale]; const [open,setOpen]=useState(false); const location=useLocation(); const menuRef=useRef<HTMLDivElement>(null);
  useReveal(location.pathname);
  useEffect(()=>{document.documentElement.lang=locale;},[locale]);
  useEffect(()=>setOpen(false),[location.pathname]);
  useEffect(()=>{
    if (!open) return;
    const previous=document.body.style.overflow; document.body.style.overflow="hidden";
    const onKey=(e:KeyboardEvent)=>{
      if(e.key==="Escape") setOpen(false);
      if(e.key!=="Tab") return;
      const links=menuRef.current?.querySelectorAll<HTMLElement>('a, button');
      const first=links?.[0]; const last=links?.[links.length-1];
      if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}
      else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}
    };
    menuRef.current?.querySelector<HTMLElement>('button')?.focus();
    window.addEventListener("keydown",onKey);
    return ()=>{document.body.style.overflow=previous;window.removeEventListener("keydown",onKey);};
  },[open]);
  return <div className="flex min-h-screen flex-col">
    <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-accent focus:p-3">{t.nav.skip}</a>
    <header className="site-header border-b border-border bg-background"><nav className="container-site flex h-full items-center justify-between gap-4" aria-label={t.nav.menu}>
      <Link to={pathFor(locale,"home")} aria-label={t.nav.homeLabel} className="shrink-0"><Wordmark /></Link>
      <div className="hidden items-center gap-8 md:flex">{NAV.map(p=><Button asChild variant="link" key={p} className={cn("h-auto rounded-none px-0 py-2 text-sm font-medium text-foreground hover:no-underline",page===p&&"border-b border-primary text-primary")}><Link to={pathFor(locale,p)} aria-current={page===p?"page":undefined}>{t.nav[p]}</Link></Button>)}</div>
      <div className="flex items-center gap-5"><LangSwitch locale={locale} page={page} label={t.nav.langLabel} /><Button asChild variant="brand" className="hidden h-11 gap-6 lg:inline-flex"><Link to={pathFor(locale,"contact")}>{t.nav.contact}<ArrowUpRight /></Link></Button><Button variant="ghost" size="icon" className="rounded-none md:hidden" aria-expanded={open} aria-controls="mobile-menu" aria-label={t.nav.menu} onClick={()=>setOpen(true)}><Menu /></Button></div>
    </nav></header>
    {open&&<div ref={menuRef} id="mobile-menu" role="dialog" aria-modal="true" aria-label={t.nav.menu} className="fixed inset-0 z-[60] flex flex-col bg-primary p-6 text-primary-foreground md:hidden">
      <div className="flex items-center justify-between"><span className="wordmark">Ekonomika.</span><Button variant="ghost" size="icon" className="hover:bg-primary-foreground/10 hover:text-primary-foreground" aria-label={t.nav.close} onClick={()=>setOpen(false)}><X /></Button></div>
      <ul className="mt-16">{[...NAV,"contact" as PageKey].map((p,i)=><li key={p} className="border-b border-primary-foreground/30"><Link to={pathFor(locale,p)} className="flex items-center justify-between py-6 text-3xl"><span>{t.nav[p]}</span><span className="font-mono text-sm">0{i+1}</span></Link></li>)}</ul><a href={`mailto:${CONTACT_EMAIL}`} className="mt-auto break-all py-6">{CONTACT_EMAIL}</a><LangSwitch locale={locale} page={page} label={t.nav.langLabel} />
    </div>}
    <main id="main" className="flex-1">{children}</main><Footer locale={locale} />
  </div>;
}
function LangSwitch({locale,page,label}: {locale:Locale;page:PageKey;label:string}) {
  return <div role="group" aria-label={label} className="flex items-center gap-2 font-mono text-xs">{(["sv","en"] as Locale[]).map((l,i)=><span key={l} className="flex items-center gap-2">{i===1&&<span className="opacity-30">/</span>}<Link to={pathFor(l,page)} hrefLang={l} aria-current={l===locale?"true":undefined} className={cn("py-2 uppercase",l===locale?"underline underline-offset-4":"opacity-50 hover:opacity-100")}>{l}</Link></span>)}</div>;
}
function Footer({locale}:{locale:Locale}) {
  const t=dict[locale];
  return <footer className="bg-forest text-forest-foreground"><div className="container-site py-12 md:py-16"><div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr]">
    <div><Link to={pathFor(locale,"home")} aria-label={t.nav.homeLabel}><Wordmark /></Link><p className="mt-5 max-w-xs text-sm text-forest-muted">{t.footer.tagline}</p></div>
    <div><p className="eyebrow text-forest-muted">{t.contact.details}</p><p className="mt-5 text-sm">{t.contact.city}</p><a href={`mailto:${CONTACT_EMAIL}`} className="mt-3 block break-all text-sm hover:underline">{CONTACT_EMAIL}</a></div>
    <div className="flex flex-col items-start gap-3">{(["services","about","contact"] as PageKey[]).map(p=><Link key={p} to={pathFor(locale,p)} className="text-sm hover:underline">{t.nav[p]}</Link>)}<a href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="mt-1"><Facebook className="size-4" /></a></div>
  </div><div className="mt-12 flex items-center justify-between border-t border-forest-foreground/20 pt-6 text-xs text-forest-muted"><span>© {new Date().getFullYear()} {t.footer.rights}</span><LangSwitch locale={locale} page="home" label={t.nav.langLabel} /></div></div></footer>;
}
