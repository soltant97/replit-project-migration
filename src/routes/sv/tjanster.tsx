import { createFileRoute } from "@tanstack/react-router";
import { ServicesPage } from "@/components/site/ServicesPage";
import { pageHead } from "@/content/site";

export const Route = createFileRoute("/sv/tjanster")({
  head: () => pageHead("sv", "services"),
  component: () => <ServicesPage locale="sv" />,
});
