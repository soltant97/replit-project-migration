import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { isTopic, pathFor } from "@/content/site";

describe("App routing", () => {
  it.each(["/", "/sv", "/sv/tjanster", "/sv/om-oss", "/sv/kontakt", "/en", "/en/services", "/en/about", "/en/contact", "/sv/hem"])(
    "matches a page for %s",
    (path) => {
      const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
      expect(router.matchRoutes(path).at(-1)?.routeId).not.toBe(rootRouteId);
    },
  );

  it("language switch keeps the same page", () => {
    expect(pathFor("en", "contact")).toBe("/en/contact");
    expect(pathFor("sv", "services")).toBe("/sv/tjanster");
  });

  it("only accepts known contact topics", () => {
    expect(isTopic("payroll")).toBe(true);
    expect(isTopic("hack")).toBe(false);
  });
});
