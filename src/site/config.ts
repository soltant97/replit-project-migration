import base from "./css/base.css?url";
import content from "./css/content.css?url";
import footer from "./css/footer.css?url";
import responsive from "./css/responsive.css?url";
import hero from "./css/hero.css?url";
import benefits from "./css/benefits.css?url";
import homeIntro from "./css/home-intro.css?url";
import redovisning from "./css/redovisningstjanster.css?url";
import varaTjanster from "./css/vara-tjanster.css?url";
import tjansteflode from "./css/tjansteflode.css?url";
import contact from "./css/contact.css?url";

export type Locale = "sv" | "en";
export type PageKey = "home" | "services" | "about" | "contact";

export const slugs: Record<Locale, Record<PageKey, string>> = {
  sv: { home: "hem", services: "tjanster", about: "om-oss", contact: "kontakt" },
  en: { home: "home", services: "services", about: "about", contact: "contact" },
};

export const routePath = (locale: Locale, page: PageKey) => `/${locale}/${slugs[locale][page]}/`;

// Stylesheets in the same order the original pages loaded them.
export const pageCss: Record<PageKey, string[]> = {
  home: [base, hero, benefits, homeIntro, redovisning, content, footer, responsive],
  services: [base, content, varaTjanster, tjansteflode, footer, responsive],
  about: [base, content, footer, responsive],
  contact: [base, contact, footer, responsive],
};

export const meta: Record<Locale, Record<PageKey, { title: string; description: string }>> = {
  sv: {
    home: {
      title: "Ekonomika | Hem",
      description: "Erfarna redovisningsekonomer med bred kunskap inom bokföring och ekonomisk rådgivning.",
    },
    services: {
      title: "Ekonomika | Våra Tjänster",
      description: "Redovisning, administration och ekonomisk rådgivning anpassad efter ert företag.",
    },
    about: {
      title: "Ekonomika | Om Oss",
      description:
        "Läs om Ekonomika, en digital redovisningsbyrå som värdesätter effektiva flöden och enkel administration.",
    },
    contact: {
      title: "Ekonomika | Kontakt",
      description: "Kontakta Ekonomika för hjälp med bokföring, bokslut, löner och deklaration.",
    },
  },
  en: {
    home: {
      title: "Ekonomika | Home",
      description:
        "Experienced accounting professionals offering bookkeeping and financial advice for businesses of all sizes.",
    },
    services: {
      title: "Ekonomika | Our Services",
      description: "Accounting, administration and financial advice tailored to your business.",
    },
    about: {
      title: "Ekonomika | About Us",
      description:
        "Learn about Ekonomika, a digital accounting firm focused on efficient workflows and simple administration.",
    },
    contact: {
      title: "Ekonomika | Contact",
      description: "Contact Ekonomika for help with bookkeeping, year-end closing, payroll and tax returns.",
    },
  },
};

export function siteHead(locale: Locale, page: PageKey) {
  const m = meta[locale][page];
  return {
    meta: [
      { title: m.title },
      { name: "description", content: m.description },
      { property: "og:title", content: m.title },
      { property: "og:description", content: m.description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: pageCss[page].map((href) => ({ rel: "stylesheet", href })),
  };
}
