import { createFileRoute, redirect } from "@tanstack/react-router";

// Old address from the previous site; kept so existing links keep working.
export const Route = createFileRoute("/en/home")({
  beforeLoad: () => {
    throw redirect({ to: "/en", replace: true });
  },
});
