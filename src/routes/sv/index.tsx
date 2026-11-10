import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/site/SitePage";
import { siteHead } from "@/site/config";

export const Route = createFileRoute("/sv/")({
  head: () => siteHead("sv", "home"),
  component: () => <SitePage locale="sv" page="home" isLocaleRoot />,
});
