import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_content/calendar")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/calendar"!</div>;
}
