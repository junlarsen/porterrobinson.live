import { createFileRoute } from "@tanstack/react-router";
import * as d from "date-fns";
import { type FC, useEffect, useState } from "react";
import { Heading } from "~/components/Heading";
import { Link } from "~/components/Link";
import { NavigationTabs } from "~/components/NavigationTabs";
import {
  type Event,
  getEventLinks,
  getEventZonedTime,
  getEvents,
  getLocalZonedTime,
  getNextEvent,
} from "~/events";

export const Route = createFileRoute("/")({
  loader: async () => {
    const future = await getNextEvent();
    const events = await getEvents();
    return { future, events };
  },
  component: function Page() {
    const { future } = Route.useLoaderData();
    return (
      <>
        <NavigationTabs />
        <main className="min-h-screen flex items-center">
          <section className="mx-auto lg:max-w-5xl p-8 text-center">
            <Heading className="uppercase">
              Porter Robinson is playing{" "}
              {future && <span className="font-bold">{future.name}</span>} live
              at{" "}
              <span className="text-pink-9">
                {future !== null ? future.location : "???"}
              </span>{" "}
              in
            </Heading>
            <div className="text-4xl lg:text-8xl font-extrabold tracking-tight my-8">
              <EventDateTimeCountdown event={future} />
            </div>
            {future !== null && (
              <>
                <EventDetailList event={future} />
                <p className="text-gray-11 text-sm mt-16">
                  *Disclaimer: exact set time might be off - not all events
                  provide exact hours so check with your location! :D
                </p>
              </>
            )}
          </section>
        </main>
      </>
    );
  },
});

const EventDateTimeCountdown: FC<{ event: Event | null }> = ({ event }) => {
  // Hacky state to force a rerender every second.
  const [_, rerender] = useState(0);
  useEffect(() => {
    const subscriber = () => {
      rerender((prev) => (prev > 1 ? 0 : prev + 1));
    };
    const handle = setInterval(subscriber, 1000);
    return () => clearInterval(handle);
  }, []);

  // Show a boring TBA message if we have no event recorded yet.
  if (event === null) {
    return <p className="uppercase text-5xl">Not yet announced</p>;
  }
  const eventTime = getEventZonedTime(event);
  const localTime = getLocalZonedTime();
  const duration = d.intervalToDuration(d.interval(localTime, eventTime));

  return (
    <time dateTime={eventTime.toISOString()}>
      {duration.weeks && <span>{duration.weeks}w </span>}
      {duration.days && <span>{duration.days}d </span>}
      {duration.hours && <span>{duration.hours}h </span>}
      {duration.minutes && <span>{duration.minutes}m </span>}
      {duration.seconds && <span>{duration.seconds}s </span>}
    </time>
  );
};

const EventDetailList: FC<{ event: Event }> = ({ event }) => {
  const links = getEventLinks(event);
  return (
    <nav className="inline-flex flex-col lg:flex-row justify-center items-center gap-2 lg:gap-x-16 lg:gap-y-2 text-lg flex-wrap">
      {links.map((link) => (
        <Link
          key={link.href}
          element="a"
          href={link.href}
          className="inline-flex gap-1 text-center items-center"
        >
          {link.children}
          {link.icon && <span> {link.icon}</span>}
        </Link>
      ))}
    </nav>
  );
};
