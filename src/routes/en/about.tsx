import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/site/SitePage";
import { siteHead } from "@/site/config";

export const Route = createFileRoute("/en/about")({
  head: () => siteHead("en", "about"),
  component: () => <SitePage locale="en" page="about" />,
});
