import { createFileRoute, redirect } from "@tanstack/react-router";

// Old address from the previous site; kept so existing links keep working.
export const Route = createFileRoute("/sv/hem")({
  beforeLoad: () => {
    throw redirect({ to: "/sv", replace: true });
  },
});
