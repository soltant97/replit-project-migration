import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/components/site/AboutPage";
import { pageHead } from "@/content/site";

export const Route = createFileRoute("/en/about")({
  head: () => pageHead("en", "about"),
  component: () => <AboutPage locale="en" />,
});
