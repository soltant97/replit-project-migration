import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/components/site/AboutPage";
import { pageHead } from "@/content/site";

export const Route = createFileRoute("/sv/om-oss")({
  head: () => pageHead("sv", "about"),
  component: () => <AboutPage locale="sv" />,
});
