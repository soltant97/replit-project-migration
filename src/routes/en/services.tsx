import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/site/SitePage";
import { siteHead } from "@/site/config";

export const Route = createFileRoute("/en/services")({
  head: () => siteHead("en", "services"),
  component: () => <SitePage locale="en" page="services" />,
});
