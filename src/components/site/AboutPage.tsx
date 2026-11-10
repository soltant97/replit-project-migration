import office from "@/assets/office.webp";
import { dict, type Locale } from "@/content/site";
import { SiteLayout } from "./SiteLayout";
import { CtaBand, PageHeader } from "./sections";

export function AboutPage({ locale }: { locale: Locale }) {
  const a = dict[locale].about;
  return (
    <SiteLayout locale={locale} page="about">
      <PageHeader eyebrow={a.eyebrow} title={a.title} lead={a.lead} />
      <section className="pb-24">
        <div className="container-site grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div data-reveal className="overflow-hidden rounded-[2rem] shadow-lift">
            <img src={office} alt={locale === "sv" ? "Kontor med arbetsplats vid fönstret" : "Office with a desk by the window"} loading="lazy" className="aspect-[4/4.2] w-full object-cover" />
          </div>
          <ol className="space-y-4">
            {a.points.map((p, i) => (
              <li key={p.title} data-reveal style={{ transitionDelay: `${i * 120}ms` }} className="flex gap-6 rounded-3xl border border-border bg-card p-7 shadow-soft">
                <span className="font-display text-4xl leading-none text-leaf">0{i + 1}</span>
                <div>
                  <h2 className="text-xl font-bold">{p.title}</h2>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{p.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <CtaBand locale={locale} />
    </SiteLayout>
  );
}
