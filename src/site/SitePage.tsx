import { useEffect } from "react";
import { fragments } from "./fragments";
import { activateSite } from "./behavior";
import type { Locale, PageKey } from "./config";

export function SitePage({
  locale,
  page,
  isLocaleRoot = false,
}: {
  locale: Locale;
  page: PageKey;
  isLocaleRoot?: boolean;
}) {
  const f = fragments[locale];
  useEffect(() => {
    document.documentElement.lang = locale;
    return activateSite(locale, page, isLocaleRoot);
  }, [locale, page, isLocaleRoot]);

  return (
    <>
      <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: f.nav }} />
      <main dangerouslySetInnerHTML={{ __html: f[page] }} />
      <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: f.footer }} />
    </>
  );
}
