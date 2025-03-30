import { createAPIFileRoute } from "@tanstack/react-start/api";
import ical from "ical-generator";
import { getEventZonedTime, getEvents } from "~/events";

export const APIRoute = createAPIFileRoute("/api/subscribe")({
  GET: async () => {
    const events = await getEvents();
    const calendar = ical({
      name: "Porter Robinson Live Show Dates",
      description: "When and where is Porter Robinson playing next?",
      url: "https://porterrobinson.live/api/subscribe",
      prodId: "porterrobinson.live",
    });
    for (const event of events) {
      calendar.createEvent({
        start: getEventZonedTime(event),
        summary: event.name,
        description: `Porter Robinson is live playing ${event.name}`,
        location: event.google ?? event.apple ?? undefined,
        url: event.link,
      });
    }
    return new Response(calendar.toString(), {
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Content-Disposition": 'attachment; filename="porter.ics"',
      },
    });
  },
});
