import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/site/HomePage";
import { pageHead } from "@/content/site";

export const Route = createFileRoute("/sv/")({
  head: () => pageHead("sv", "home"),
  component: () => <HomePage locale="sv" />,
});
