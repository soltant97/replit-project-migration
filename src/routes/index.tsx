import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/sv" });
  },
  head: () => ({
    meta: [
      { title: "Ekonomika | Redovisningsbyrå" },
      { name: "description", content: "Erfarna redovisningsekonomer med bred kunskap inom bokföring och ekonomisk rådgivning." },
      { property: "og:title", content: "Ekonomika | Redovisningsbyrå" },
      { property: "og:description", content: "Erfarna redovisningsekonomer med bred kunskap inom bokföring och ekonomisk rådgivning." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});
