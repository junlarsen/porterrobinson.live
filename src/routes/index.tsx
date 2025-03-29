import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: function Page() {
    return <h1 className="text-pink-9">Hello world</h1>;
  },
});
