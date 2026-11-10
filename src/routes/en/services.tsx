import { createFileRoute } from "@tanstack/react-router";
import { ServicesPage } from "@/components/site/ServicesPage";
import { pageHead } from "@/content/site";

export const Route = createFileRoute("/en/services")({
  head: () => pageHead("en", "services"),
  component: () => <ServicesPage locale="en" />,
});
