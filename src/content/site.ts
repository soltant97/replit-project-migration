// All visible copy for both languages. Text comes from the original Ekonomika site.
export type Locale = "sv" | "en";
export type PageKey = "home" | "services" | "about" | "contact";
export type TopicKey = "start" | "accounting" | "payroll" | "closing" | "private" | "other";
export type AudienceKey = "start" | "business" | "private";

export const CONTACT_EMAIL = "ekonomikakontakt@gmail.com";
export const CONTACT_PHONE = "+4699999";
export const SOCIAL = {
  facebook: "https://www.facebook.com/EkonomikaAB/",
  linkedin: "https://www.linkedin.com/",
  instagram: "https://www.instagram.com/",
};

export const slugs: Record<Locale, Record<PageKey, string>> = {
  sv: { home: "", services: "tjanster", about: "om-oss", contact: "kontakt" },
  en: { home: "", services: "services", about: "about", contact: "contact" },
};

export type SitePath =
  | "/sv" | "/sv/tjanster" | "/sv/om-oss" | "/sv/kontakt"
  | "/en" | "/en/services" | "/en/about" | "/en/contact";

export const pathFor = (locale: Locale, page: PageKey) =>
  (page === "home" ? `/${locale}` : `/${locale}/${slugs[locale][page]}`) as SitePath;

const sv = {
  meta: {
    home: {
      title: "Ekonomika | Redovisningsbyrå i Stockholm",
      description: "Erfarna redovisningsekonomer med bred kunskap inom bokföring och ekonomisk rådgivning.",
    },
    services: {
      title: "Våra tjänster | Ekonomika",
      description: "Redovisning, administration och ekonomisk rådgivning anpassad efter ert företag.",
    },
    about: {
      title: "Om oss | Ekonomika",
      description:
        "Ekonomika är en digital redovisningsbyrå som värdesätter effektiva flöden och enkel administration.",
    },
    contact: {
      title: "Kontakt | Ekonomika",
      description: "Kontakta Ekonomika för hjälp med bokföring, bokslut, löner och deklaration.",
    },
  },
  nav: { home: "Hem", services: "Tjänster", about: "Om oss", contact: "Kontakta oss", menu: "Meny", close: "Stäng", skip: "Hoppa till innehållet", langLabel: "Välj språk", homeLabel: "Ekonomika, till startsidan" },
  hero: {
    title: "Ekonomika",
    imageAlt: "Illustrativ interiör med ljusa arbetsplatser och utsikt över Stockholm",
    eyebrow: "Digital redovisningsbyrå · Stockholm",
    professions: ["Byggare", "Frisör", "Läkare", "Advokat"],
    or: "eller",
    lead: "Vi på Ekonomika tar hand om din ekonomi – så du kan slappna av efter jobbet.",
    primary: "Kontakta oss",
    secondary: "Se våra tjänster",
  },
  benefits: ["Digitala lösningar", "Kvalificerade redovisningsekonomer", "Personlig kundservice", "Administration"],
  intro:
    "Hos oss får ni hjälp av erfarna redovisningsekonomer med bred kunskap inom bokföring och ekonomisk rådgivning. Vi erbjuder kvalificerade tjänster med personligt engagemang och är en trygg partner för företag i alla storlekar.",
  finder: {
    eyebrow: "Hitta rätt hjälp",
    title: "Var står du idag?",
    cta: "Berätta mer för oss",
    all: "Alla tjänster",
    audiences: {
      start: {
        label: "Jag startar bolag",
        title: "Stöd när ni startar bolag",
        text: "Vi guidar er genom bolagsstarten och hjälper er att få en bra grund för företagets ekonomi.",
        items: ["Bolagsbildningar", "System", "Ekonomisk rådgivning", "NIE-nummer"],
        topic: "start",
      },
      business: {
        label: "Jag driver företag",
        title: "Redovisningstjänster anpassade efter ert företag",
        text: "Vi hjälper företag med ekonomin genom hela året och stöttar just ert bolag.",
        items: ["Löpande bokföring", "Momsredovisning", "Lönehantering", "Bokslut & årsredovisning"],
        topic: "accounting",
      },
      private: {
        label: "Jag är privatperson",
        title: "Hjälp med era privata deklarationer",
        text: "Vi hjälper dig som inte har ett företag och har privata deklarationer att deklarera.",
        items: ["Deklarationer", "Modelo 210", "NIE-nummer"],
        topic: "private",
      },
    },
  },
  process: {
    eyebrow: "Så arbetar vi",
    title: "Digitala lösningar och automatiserade flöden.",
    lead: "Koppla kvittokällor, företagskort och brev.",
    steps: [
      { tag: "Anslut", title: "System", text: "Utifrån det system din bokföring ligger på idag tar vi fram en skräddarsydd digital lösning till din verksamhet." },
      { tag: "Underlag", title: "Inkorg", text: "Underlag från anslutna källor hamnar i en och samma kvittoinkorg." },
      { tag: "Granska", title: "Kontrollera", text: "Se över rapporter, budget och deklarationer." },
    ],
  },
  cta: { title: "Låt oss ta hand om siffrorna.", text: "Hör av dig och berätta vad ditt företag behöver – vi läser och svarar personligen.", button: "Kontakta oss" },
  services: {
    eyebrow: "Våra tjänster",
    title: "Litet som stort företag.",
    lead: "Vi på Ekonomika anpassar våra tjänster helt efter dina behov så att du kan fokusera på det du är bäst på.",
    categories: [
      { title: "Ekonomi", items: ["Löpande bokföring", "Fakturering", "Momsredovisning", "Lönehantering", "Bokslut", "Årsredovisning K2 & K3", "Deklarationer", "Rapportering"] },
      { title: "Administration", items: ["System", "Personal", "Bolagsbildningar", "Ekonomisk rådgivning", "Digital arkivering och dokument"] },
      { title: "Övriga tjänster", items: ["Modelo 210", "NIE-nummer"] },
    ],
    ask: "Fråga om detta",
  },
  about: {
    eyebrow: "Om oss",
    title: "En digital redovisningsbyrå som värdesätter din tid.",
    lead: "Vi på Ekonomika värdesätter det digitala flödet och enkla adminlösningar till dig som kund.",
    points: [
      { title: "Digitalt flöde", text: "Enkla adminlösningar och ett digitalt flöde från kvitto till rapport." },
      { title: "Alltid uppdaterade", text: "Vi håller oss uppdaterade inom automatiserad bokföring för att erbjuda konkurrenskraftiga priser." },
      { title: "Digitala möten", text: "Vi erbjuder digitala flöden och möten eftersom vi värdesätter din tid." },
    ],
  },
  contact: {
    eyebrow: "Kontakt",
    title: "Kontakta oss",
    lead: "Behöver du hjälp med bokföring, bokslut, löner eller deklaration? Hör av dig och berätta vad ditt företag behöver.",
    details: "Våra uppgifter",
    address: "Adress",
    city: "Stockholm",
    email: "E-post",
    phone: "Telefon",
    emailUs: "Skicka e-post direkt",
    follow: "Följ oss",
    form: {
      topic: "Vad gäller det?",
      name: "Namn (valfritt)",
      emailLabel: "Din e-postadress",
      emailPlaceholder: "namn@exempel.com",
      message: "Meddelande",
      messagePlaceholder: "Vad behöver du hjälp med?",
      submit: "Skicka meddelande",
      sending: "Skickar…",
      note: "Ditt meddelande skickas till Ekonomika. Vi läser och svarar personligen.",
      success: "Tack! Ditt meddelande är skickat. Vi återkommer så snart vi kan.",
      another: "Skicka ett till",
      error: "Meddelandet kunde inte skickas. Försök igen eller mejla oss direkt.",
      subject: "Nytt kontaktmeddelande från Ekonomikas webbplats",
    },
    topics: { start: "Starta bolag", accounting: "Bokföring", payroll: "Lön", closing: "Bokslut", private: "Privat deklaration", other: "Annat" },
  },
  footer: { tagline: "Redovisning med personligt engagemang.", rights: "Ekonomika" },
  notFound: { title: "Sidan finns inte", back: "Till startsidan" },
};

type Dict = typeof sv;

const en: Dict = {
  meta: {
    home: {
      title: "Ekonomika | Accounting firm in Stockholm",
      description: "Experienced accounting professionals offering bookkeeping and financial advice for businesses of all sizes.",
    },
    services: { title: "Our services | Ekonomika", description: "Accounting, administration and financial advice tailored to your business." },
    about: {
      title: "About us | Ekonomika",
      description: "Ekonomika is a digital accounting firm focused on efficient workflows and simple administration.",
    },
    contact: { title: "Contact | Ekonomika", description: "Contact Ekonomika for help with bookkeeping, year-end closing, payroll and tax returns." },
  },
  nav: { home: "Home", services: "Services", about: "About", contact: "Contact us", menu: "Menu", close: "Close", skip: "Skip to content", langLabel: "Choose language", homeLabel: "Ekonomika, go to the home page" },
  hero: {
    title: "Ekonomika",
    imageAlt: "Illustrative interior with light workspaces overlooking Stockholm",
    eyebrow: "Digital accounting firm · Stockholm",
    professions: ["Builders", "Hairdressers", "Doctors", "Lawyers"],
    or: "or",
    lead: "At Ekonomika, we take care of your finances – so you can unwind after work.",
    primary: "Contact us",
    secondary: "See our services",
  },
  benefits: ["Digital solutions", "Qualified accounting professionals", "Personal customer service", "Administration"],
  intro:
    "With us, you get support from experienced accounting professionals with broad knowledge of bookkeeping and financial advice. We provide qualified services with a personal commitment and are a trusted partner for businesses of all sizes.",
  finder: {
    eyebrow: "Find the right help",
    title: "Where are you today?",
    cta: "Tell us more",
    all: "All services",
    audiences: {
      start: {
        label: "I'm starting a company",
        title: "Support when starting a business",
        text: "We guide you through starting your company and help you build a solid financial foundation.",
        items: ["Company formation", "Systems", "Financial advice", "NIE number"],
        topic: "start",
      },
      business: {
        label: "I run a business",
        title: "Accounting services tailored to your business",
        text: "We help businesses manage their finances throughout the year and support your company.",
        items: ["Ongoing bookkeeping", "VAT reporting", "Payroll management", "Year-end & annual reports"],
        topic: "accounting",
      },
      private: {
        label: "I'm a private person",
        title: "Help with your personal tax returns",
        text: "We help individuals without a business who need assistance with their personal tax returns.",
        items: ["Tax returns", "Modelo 210", "NIE number"],
        topic: "private",
      },
    },
  },
  process: {
    eyebrow: "How we work",
    title: "Digital solutions and automated workflows.",
    lead: "Connect receipt sources, business cards and mail.",
    steps: [
      { tag: "Connect", title: "Systems", text: "Based on the accounting system you use today, we create a tailored digital solution for your business." },
      { tag: "Documents", title: "Inbox", text: "Documents from connected sources arrive in one shared receipt inbox." },
      { tag: "Review", title: "Check", text: "Review reports, budgets and tax returns." },
    ],
  },
  cta: { title: "Let us take care of the numbers.", text: "Get in touch and tell us what your business needs – we read and reply to every message personally.", button: "Contact us" },
  services: {
    eyebrow: "Our services",
    title: "Small or large business.",
    lead: "We at Ekonomika tailor our services to your needs so you can focus on what you do best.",
    categories: [
      { title: "Accounting", items: ["Ongoing bookkeeping", "Invoicing", "VAT reporting", "Payroll management", "Year-end closing", "Annual reports (K2 & K3)", "Tax returns", "Reporting"] },
      { title: "Administration", items: ["Systems", "Human resources", "Company formation", "Financial advice", "Digital archiving and documents"] },
      { title: "Other services", items: ["Modelo 210", "NIE number"] },
    ],
    ask: "Ask about this",
  },
  about: {
    eyebrow: "About us",
    title: "A digital accounting firm that values your time.",
    lead: "At Ekonomika, we value digital workflows and simple administrative solutions for our clients.",
    points: [
      { title: "Digital workflow", text: "Simple admin solutions and a digital flow from receipt to report." },
      { title: "Always up to date", text: "We stay up to date with automated accounting so we can offer competitive prices." },
      { title: "Digital meetings", text: "We offer digital workflows and meetings because we value your time." },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Contact us",
    lead: "Do you need help with bookkeeping, year-end closing, payroll or tax returns? Get in touch and tell us what your business needs.",
    details: "Our details",
    address: "Address",
    city: "Stockholm",
    email: "Email",
    phone: "Phone",
    emailUs: "Email us directly",
    follow: "Follow us",
    form: {
      topic: "What is it about?",
      name: "Name (optional)",
      emailLabel: "Your email address",
      emailPlaceholder: "name@example.com",
      message: "Message",
      messagePlaceholder: "What do you need help with?",
      submit: "Send message",
      sending: "Sending…",
      note: "Your message will be sent to Ekonomika. We read and reply to every message personally.",
      success: "Thank you! Your message has been sent. We will get back to you as soon as we can.",
      another: "Send another",
      error: "The message could not be sent. Please try again or email us directly.",
      subject: "New contact message from the Ekonomika website",
    },
    topics: { start: "Starting a company", accounting: "Bookkeeping", payroll: "Payroll", closing: "Year-end closing", private: "Personal tax return", other: "Other" },
  },
  footer: { tagline: "Accounting with a personal commitment.", rights: "Ekonomika" },
  notFound: { title: "Page not found", back: "Back to home" },
};

export const dict: Record<Locale, Dict> = { sv, en };
export const TOPICS: TopicKey[] = ["start", "accounting", "payroll", "closing", "private", "other"];
export const isTopic = (v: unknown): v is TopicKey => typeof v === "string" && (TOPICS as string[]).includes(v);

export function pageHead(locale: Locale, page: PageKey) {
  const m = dict[locale].meta[page];
  return {
    meta: [
      { title: m.title },
      { name: "description", content: m.description },
      { property: "og:title", content: m.title },
      { property: "og:description", content: m.description },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: locale === "sv" ? "sv_SE" : "en_GB" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  };
}
