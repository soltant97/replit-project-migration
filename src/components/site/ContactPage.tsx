import { useState, type FormEvent } from "react";
import { ArrowUpRight, CheckCircle2, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CONTACT_EMAIL, CONTACT_PHONE, TOPICS, dict, type Locale, type TopicKey } from "@/content/site";
import { SiteLayout } from "./SiteLayout";
import { PageHeader } from "./sections";

type Status = "idle" | "sending" | "sent" | "error";

// Messages are delivered by FormSubmit, the same service the original site used.
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;

export function ContactPage({ locale, topic }: { locale: Locale; topic?: TopicKey | undefined }) {
  const c = dict[locale].contact;
  const [selected, setSelected] = useState<TopicKey | undefined>(topic);
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: c.form.subject,
          _template: "table",
          _captcha: "false",
          topic: selected ? c.topics[selected] : "—",
          name: data.get("name") || "—",
          email: data.get("email"),
          message: data.get("message"),
          language: locale,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const field =
    "w-full rounded-2xl border border-input bg-background px-4 py-3.5 text-base transition-all placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-4 focus:ring-ring/20";

  return (
    <SiteLayout locale={locale} page="contact">
      <PageHeader eyebrow={c.eyebrow} title={c.title} lead={c.lead} />
      <section className="pb-28">
        <div className="container-site grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <aside data-reveal className="grain flex flex-col rounded-[2rem] bg-forest p-8 text-forest-foreground md:p-10">
            <h2 className="font-display text-3xl">{c.details}</h2>
            <dl className="mt-8 space-y-6">
              <Detail icon={<MapPin className="size-4" />} label={c.address}>{c.city}</Detail>
              <Detail icon={<Mail className="size-4" />} label={c.email}>
                <a href={`mailto:${CONTACT_EMAIL}`} className="break-all underline-offset-4 hover:underline">{CONTACT_EMAIL}</a>
              </Detail>
              <Detail icon={<Phone className="size-4" />} label={c.phone}>
                <a href={`tel:${CONTACT_PHONE}`} className="underline-offset-4 hover:underline">{CONTACT_PHONE}</a>
              </Detail>
            </dl>
            <Button asChild variant="lineLight" size="xl" className="mt-10 self-start lg:mt-auto">
              <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(c.form.subject)}`}>{c.emailUs} <ArrowUpRight /></a>
            </Button>
          </aside>

          <div data-reveal className="rounded-[2rem] border border-border bg-card p-8 shadow-soft md:p-12" id="contact-form">
            {status === "sent" ? (
              <div className="flex min-h-[26rem] flex-col items-start justify-center" role="status">
                <CheckCircle2 className="size-14 text-leaf animate-word-in" />
                <p className="font-display mt-6 max-w-md text-4xl leading-tight animate-word-in">{c.form.success}</p>
                <Button variant="line" size="xl" className="mt-8" onClick={() => setStatus("idle")}>{c.form.another}</Button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-6">
                <fieldset>
                  <legend className="mb-3 text-sm font-bold">{c.form.topic}</legend>
                  <div className="flex flex-wrap gap-2">
                    {TOPICS.map((k) => (
                      <button
                        key={k}
                        type="button"
                        aria-pressed={selected === k}
                        onClick={() => setSelected(selected === k ? undefined : k)}
                        className={cn(
                          "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300",
                          selected === k ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary/50",
                        )}
                      >
                        {c.topics[k]}
                      </button>
                    ))}
                  </div>
                </fieldset>
                <div className="grid gap-6 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm font-bold">{c.form.name}</span>
                    <input name="name" autoComplete="name" className={field} />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-bold">{c.form.emailLabel}</span>
                    <input name="email" type="email" required autoComplete="email" placeholder={c.form.emailPlaceholder} className={field} />
                  </label>
                </div>
                <label className="block">
                  <span className="mb-2 block text-sm font-bold">{c.form.message}</span>
                  <textarea name="message" required rows={6} placeholder={c.form.messagePlaceholder} className={cn(field, "resize-y")} />
                </label>
                <div className="flex flex-wrap items-center gap-5">
                  <Button type="submit" variant="brand" size="xl" disabled={status === "sending"}>
                    {status === "sending" ? <><Loader2 className="animate-spin" /> {c.form.sending}</> : <>{c.form.submit} <ArrowUpRight /></>}
                  </Button>
                  <p className="max-w-xs text-sm text-muted-foreground" aria-live="polite">
                    {status === "error" ? <span className="text-destructive">{c.form.error}</span> : c.form.note}
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Detail({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-forest-foreground/10 text-leaf">{icon}</span>
      <div>
        <dt className="eyebrow text-forest-muted">{label}</dt>
        <dd className="mt-1 text-lg">{children}</dd>
      </div>
    </div>
  );
}
