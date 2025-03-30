import { createAPIFileRoute } from "@tanstack/react-start/api";
import ical from "ical-generator";
import { createCalendarEvent, getEventBySlug } from "~/events";

export const APIRoute = createAPIFileRoute("/api/$slug/subscribe")({
  GET: async ({ params }) => {
    const event = await getEventBySlug(params.slug);
    if (event === null) {
      return Response.json({ error: "event not found" }, { status: 404 });
    }
    const calendar = ical({
      name: `Porter Robinson Live @ ${event.name}`,
      description: `Porter is playing ${event.name} live at ${event.location}`,
      url: `https://porterrobinson.live/api/${event.slug}/subscribe`,
      prodId: "porterrobinson.live",
    });
    calendar.createEvent(createCalendarEvent(event));
    return new Response(calendar.toString(), {
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Content-Disposition": 'attachment; filename="porter.ics"',
      },
    });
  },
});
