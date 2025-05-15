import { createFileRoute } from "@tanstack/react-router";
import clsx from "clsx";
import type { FC } from "react";
import { Heading } from "~/components/Heading";
import { Link } from "~/components/Link";
import { Text } from "~/components/Text";
import {
  type Event,
  getEventLinks,
  getEventZonedTime,
  getEvents,
  isEventInTheFuture,
} from "~/events";

export const Route = createFileRoute("/_content/events")({
  loader: async () => {
    // TODO: Maybe paginate once we have a few hundred entries?
    const events = await getEvents();
    events.reverse();
    return { events };
  },
  component: function Page() {
    const { events } = Route.useLoaderData();
    return (
      <main className="flex flex-col gap-8 [&>article]:flex [&>article]:flex-col [&>article]:gap-4">
        <article>
          <Heading>Event list</Heading>
          <Text>
            All upcoming and past events. We started tracking events in 2025,
            but we are trying to add older events as well. Check out the{" "}
            <Link className="text-pink-9" to="/calendar">
              contributing guide
            </Link>{" "}
            if you want to help us out!
          </Text>
        </article>

        <ul className="list-none gap-4 flex flex-col w-full">
          {events.map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
        </ul>
      </main>
    );
  },
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

const EventCard: FC<{ event: Event }> = ({ event }) => {
  const isFuture = isEventInTheFuture(event);
  const classes = clsx(
    "border border-gray-6 p-2 rounded-sm",
    isFuture ? "border-pink-9" : "bg-gray-3",
  );
  const links = getEventLinks(event);
  return (
    <div className={classes}>
      <Heading element="h2" className="!text-lg lg:!text-xl font-semibold">
        {event.name}
      </Heading>
      <Text>
        Porter Robinson {isFuture ? "is playing" : "played"} at{" "}
        <span className="text-pink-9">{event.location}</span> on{" "}
        <time dateTime={getEventZonedTime(event).toISOString()}>
          {dateFormatter.format(getEventZonedTime(event))}
        </time>{" "}
        <span className="text-gray-11">(your timezone)</span>.
      </Text>

      <nav className="inline-flex gap-1 mt-4">
        {links.map((link) => (
          <Link
            key={link.href}
            element="a"
            href={link.href}
            className="inline-flex gap-1 text-center items-center"
          >
            {link.icon && <span> {link.icon}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
};
