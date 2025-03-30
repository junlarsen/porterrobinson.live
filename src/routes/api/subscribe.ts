import { createAPIFileRoute } from "@tanstack/react-start/api";
import ical from "ical-generator";
import { createCalendarEvent, getEvents } from "~/events";

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
      calendar.createEvent(createCalendarEvent(event));
    }
    return new Response(calendar.toString(), {
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Content-Disposition": 'attachment; filename="porter.ics"',
      },
    });
  },
});
