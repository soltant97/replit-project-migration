import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/site/SitePage";
import { siteHead } from "@/site/config";

export const Route = createFileRoute("/sv/om-oss")({
  head: () => siteHead("sv", "about"),
  component: () => <SitePage locale="sv" page="about" />,
});
