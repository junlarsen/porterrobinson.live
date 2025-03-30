import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_content/events")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/events"!</div>;
}
