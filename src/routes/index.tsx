import {
  IconBrandApple,
  IconBrandGoogleMaps,
  IconCalendar,
  IconExternalLink,
  IconFileDatabase,
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
  const links = [
    {
      href: event.link,
      children: "Tickets & Information",
      icon: <IconExternalLink />,
    },
    ...(event.google
      ? [
          {
            href: event.google,
            children: "View on Google Maps",
            icon: <IconBrandGoogleMaps />,
          },
        ]
      : []),
    ...(event.apple
      ? [
          {
            href: event.apple,
            children: "View on Apple Maps",
            icon: <IconBrandApple />,
          },
        ]
      : []),
    {
      href: `https://calendar.google.com/calendar/render?action=TEMPLATE&cid=webcal://porterrobinson.live/api/${event.slug}/subscribe`,
      children: "Add to Google Calendar",
      icon: <IconCalendar />,
    },
    {
      href: `webcal://porterrobinson.live/api/${event.slug}/subscribe`,
      children: "Download .ics file",
      icon: <IconFileDatabase />,
    },
  ];
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
