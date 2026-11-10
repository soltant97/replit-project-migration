import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/site/SitePage";
import { siteHead } from "@/site/config";

export const Route = createFileRoute("/en/home")({
  head: () => siteHead("en", "home"),
  component: () => <SitePage locale="en" page="home" />,
});
