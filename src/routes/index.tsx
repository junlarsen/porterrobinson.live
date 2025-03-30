import {
  IconBrandApple,
  IconBrandGoogleMaps,
  IconExternalLink,
} from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";
import * as d from "date-fns";
import { type FC, useEffect, useState } from "react";
import { Link } from "~/components/Link";
import { NavigationTabs } from "~/components/NavigationTabs";
import {
  type Event,
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
            <h1 className="uppercase tracking-tight text-xl lg:text-4xl">
              Porter Robinson is playing{" "}
              {future && <span className="font-bold">{future.name}</span>} live
              at{" "}
              <span className="text-pink-9">
                {future !== null ? future.location : "???"}
              </span>{" "}
              in
            </h1>
            <div className="text-4xl lg:text-8xl font-extrabold tracking-tight my-8">
              <EventDateTimeCountdown event={future} />
            </div>
            {future !== null && <EventDetailList event={future} />}
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
  const delta = d.differenceInSeconds(eventTime, localTime);

  const days = Math.floor(delta / (24 * 60 * 60));
  const hours = Math.floor((delta % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((delta % (60 * 60)) / 60);
  const seconds = delta % 60;

  return (
    <time dateTime={eventTime.toISOString()}>
      {days > 0 && <span>{days}d </span>}
      {days > 0 && <span>{hours}h </span>}
      {minutes > 0 && <span>{minutes}m </span>}
      {seconds >= 0 && <span>{seconds}s </span>}
    </time>
  );
};

const EventDetailList: FC<{ event: Event }> = ({ event }) => {
  return (
    <nav className="inline-flex flex-col lg:flex-row justify-between gap-2 lg:gap-8 text-lg">
      <Link
        element="a"
        className="inline-flex gap-1 items-center"
        href={event.link}
      >
        Tickets & Information <IconExternalLink />
      </Link>
      {event.google && (
        <Link
          element="a"
          className="inline-flex gap-1 items-center"
          href={event.google}
        >
          View on Google Maps <IconBrandGoogleMaps />
        </Link>
      )}
      {event.apple && (
        <Link
          element="a"
          className="inline-flex gap-1 items-center"
          href={event.apple}
        >
          View on Apple Maps <IconBrandApple />{" "}
        </Link>
      )}
    </nav>
  );
};
