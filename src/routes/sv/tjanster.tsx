import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/site/SitePage";
import { siteHead } from "@/site/config";

export const Route = createFileRoute("/sv/tjanster")({
  head: () => siteHead("sv", "services"),
  component: () => <SitePage locale="sv" page="services" />,
});
