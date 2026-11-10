import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/components/site/ContactPage";
import { isTopic, pageHead, type TopicKey } from "@/content/site";

export const Route = createFileRoute("/sv/kontakt")({
  validateSearch: (s: Record<string, unknown>): { topic?: TopicKey } => (isTopic(s["topic"]) ? { topic: s["topic"] } : {}),
  head: () => pageHead("sv", "contact"),
  component: function Contact() {
    const { topic } = Route.useSearch();
    return <ContactPage locale="sv" topic={topic} />;
  },
});
