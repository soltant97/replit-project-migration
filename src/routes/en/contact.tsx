import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/site/SitePage";
import { siteHead } from "@/site/config";

export const Route = createFileRoute("/en/contact")({
  head: () => siteHead("en", "contact"),
  component: () => <SitePage locale="en" page="contact" />,
});
