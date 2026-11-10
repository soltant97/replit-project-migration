import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/site/HomePage";
import { pageHead } from "@/content/site";

export const Route = createFileRoute("/en/")({
  head: () => pageHead("en", "home"),
  component: () => <HomePage locale="en" />,
});
