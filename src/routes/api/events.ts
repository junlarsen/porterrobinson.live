import { createAPIFileRoute } from "@tanstack/react-start/api";
import { getEvents } from "~/events";

export const APIRoute = createAPIFileRoute("/api/events")({
  GET: async () => {
    const events = await getEvents();
    return Response.json(events, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
});
