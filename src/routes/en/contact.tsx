import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/components/site/ContactPage";
import { isTopic, pageHead, type TopicKey } from "@/content/site";

export const Route = createFileRoute("/en/contact")({
  validateSearch: (s: Record<string, unknown>): { topic?: TopicKey } => (isTopic(s["topic"]) ? { topic: s["topic"] } : {}),
  head: () => pageHead("en", "contact"),
  component: function Contact() {
    const { topic } = Route.useSearch();
    return <ContactPage locale="en" topic={topic} />;
  },
});
