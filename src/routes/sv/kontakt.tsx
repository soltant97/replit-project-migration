import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/site/SitePage";
import { siteHead } from "@/site/config";

export const Route = createFileRoute("/sv/kontakt")({
  head: () => siteHead("sv", "contact"),
  component: () => <SitePage locale="sv" page="contact" />,
});
