// Client behavior ported from the original site's General/main.js.
import type { Locale, PageKey } from "./config";
import { routePath } from "./config";

export function activateSite(locale: Locale, page: PageKey, isLocaleRoot: boolean): () => void {
  const cleanups: Array<() => void> = [];
  cleanups.push(activateNavigation(locale, page, isLocaleRoot));
  cleanups.push(alignHomeWaveWithFirstCircle());
  cleanups.push(activateScrollFade());
  activateContactForm(locale);
  return () => cleanups.forEach((fn) => fn());
}

function activateNavigation(locale: Locale, page: PageKey, isLocaleRoot: boolean) {
  const menuButton = document.querySelector<HTMLButtonElement>(".menu-toggle");
  const menu = document.querySelector<HTMLElement>("#nav-links");

  document.querySelectorAll<HTMLButtonElement>("[data-language]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset["language"] === locale));
    button.onclick = () => {
      const next = button.dataset["language"] as Locale;
      if (next === locale) return;
      window.location.href = isLocaleRoot ? `/${next}/` : routePath(next, page);
    };
  });

  if (menuButton && menu) {
    menuButton.onclick = () => {
      const isOpen = menu.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
    };
    menu.querySelectorAll("a").forEach((link) =>
      link.addEventListener("click", () => {
        menu.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      }),
    );
  }

  const year = document.querySelector("#year");
  if (year) year.textContent = String(new Date().getFullYear());
  return () => {};
}

function activateScrollFade() {
  const isHome = document.querySelector(".hero-banner") && document.querySelector(".home-intro");
  const sections = isHome
    ? [document.querySelector(".home-intro"), document.querySelector(".home-services")]
    : Array.from(document.querySelectorAll("main section"));
  const visible = sections.filter(Boolean) as Element[];
  if (!visible.length) return () => {};
  if (!("IntersectionObserver" in window)) {
    visible.forEach((s) => s.classList.add("is-visible"));
    return () => {};
  }
  const observer = new IntersectionObserver(
    (entries, active) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        active.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
  );
  visible.forEach((s) => observer.observe(s));
  return () => observer.disconnect();
}

type Pt = [number, number];
type Seg = [Pt, Pt, Pt, Pt];
function alignHomeWaveWithFirstCircle() {
  const intro = document.querySelector<HTMLElement>(".home-intro");
  const services = document.querySelector<HTMLElement>(".home-services");
  const firstCircle = services?.querySelector<HTMLElement>(
    ".home-service-image-right .home-service-image",
  );
  if (!intro || !services || !firstCircle) return () => {};

  const lowerWaveSegments: Seg[] = [
    [[1600, 770], [1452, 704], [1310, 676], [1154, 719]],
    [[1154, 719], [974, 768], [886, 790], [700, 762]],
    [[700, 762], [492, 732], [338, 702], [184, 748]],
    [[184, 748], [105, 772], [40, 804], [0, 837]],
  ];
  const bez = (p: Seg, t: number, a: 0 | 1) => {
    const i = 1 - t;
    return i ** 3 * p[0][a] + 3 * i ** 2 * t * p[1][a] + 3 * i * t ** 2 * p[2][a] + t ** 3 * p[3][a];
  };
  const getWaveHeight = (svgX: number) => {
    const seg = lowerWaveSegments.find((s) => svgX <= s[0][0] && svgX >= s[3][0]);
    if (!seg) return 0.75;
    let low = 0;
    let high = 1;
    for (let step = 0; step < 32; step += 1) {
      const mid = (low + high) / 2;
      if (bez(seg, mid, 0) > svgX) low = mid;
      else high = mid;
    }
    return bez(seg, (low + high) / 2, 1) / 1000;
  };
  const update = () => {
    services.style.setProperty("--home-wave-shift", "0px");
    const ib = intro.getBoundingClientRect();
    const cb = firstCircle.getBoundingClientRect();
    const bw = getComputedStyle(intro, "::before").backgroundSize.split(/\s+/)[0] ?? "100%";
    const width = bw.endsWith("%") ? (ib.width * parseFloat(bw)) / 100 : parseFloat(bw);
    const cx = cb.left + cb.width / 2 - ib.left;
    const svgX = Math.max(0, Math.min(1600, (cx / width) * 1600));
    const targetY = ib.top + getWaveHeight(svgX) * ib.height;
    services.style.setProperty("--home-wave-shift", `${targetY - cb.top}px`);
  };
  let pending = false;
  const schedule = () => {
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => {
      pending = false;
      update();
    });
  };
  update();
  window.addEventListener("resize", schedule);
  let ro: ResizeObserver | undefined;
  if ("ResizeObserver" in window) {
    ro = new ResizeObserver(schedule);
    ro.observe(intro);
    ro.observe(services);
  }
  document.fonts?.ready.then(schedule);
  return () => {
    window.removeEventListener("resize", schedule);
    ro?.disconnect();
  };
}

function activateContactForm(locale: Locale) {
  const form = document.querySelector<HTMLFormElement>("#contact-form");
  if (!form) return;
  const submitButton = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const status = document.querySelector("#contact-form-note");
  const isEnglish = locale === "en";
  const sentParameter = isEnglish ? "sent" : "skickat";
  if (status && new URLSearchParams(window.location.search).has(sentParameter)) {
    status.textContent = isEnglish
      ? "Thank you! Your message has been sent. We will get back to you as soon as we can."
      : "Tack! Ditt meddelande är skickat. Vi återkommer så snart vi kan.";
    const clean = new URL(window.location.href);
    clean.searchParams.delete(sentParameter);
    window.history.replaceState({}, "", clean);
  }
  form.onsubmit = () => {
    const redirectUrl = new URL(window.location.href);
    redirectUrl.searchParams.set(sentParameter, "1");
    redirectUrl.hash = "contact-form";
    let next = form.querySelector<HTMLInputElement>('input[name="_next"]');
    if (!next) {
      next = document.createElement("input");
      next.type = "hidden";
      next.name = "_next";
      form.append(next);
    }
    next.value = redirectUrl.toString();
    if (submitButton) submitButton.disabled = true;
    if (status) status.textContent = isEnglish ? "Sending your message…" : "Skickar ditt meddelande…";
  };
}
