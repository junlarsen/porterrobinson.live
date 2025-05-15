import * as tz from "@date-fns/tz";
import {
  IconBrandApple,
  IconBrandGoogleMaps,
  IconCalendar,
  IconExternalLink,
  IconFileDatabase,
} from "@tabler/icons-react";
import { createServerFn } from "@tanstack/react-start";
import * as d from "date-fns";
import type { ICalEventData } from "ical-generator";
import { z } from "zod";
import * as raw from "../events.json";

export type Event = z.infer<typeof Event>;
const Event = z.object({
  slug: z.string().min(1, "slug cannot be empty"),
  name: z.string().min(1, "name cannot be empty"),
  time: z.string().min(1, "time cannot be empty"),
  timezone: z.string().min(1, "time zone cannot be empty"),
  link: z.string().url(),
  location: z.string().min(1, "location cannot be empty"),
  google: z.string().url().nullish().default(null),
  apple: z.string().url().nullish().default(null),
});

export type Configuration = z.infer<typeof Configuration>;
const Configuration = z.object({
  events: Event.array(),
});

// Only load the events once. This is fine because they are a build-time
// dependency
const configuration: Configuration = Configuration.parse(raw);
configuration.events.sort((a, b) =>
  d.isBefore(getEventZonedTime(a), getEventZonedTime(b)) ? -1 : 1,
);

// Marked async for future compatibility with database
export async function getEvents(): Promise<Event[]> {
  return configuration.events;
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  const all = await getEvents();
  return all.find((event) => event.slug === slug) ?? null;
}

export function getEventZonedTime(event: Event): tz.TZDate {
  const eventTz = tz.tz(event.timezone);
  return eventTz(new Date(event.time));
}

export function getLocalZonedTime(): tz.TZDate {
  const localTz = tz.tz(new Intl.DateTimeFormat().resolvedOptions().timeZone);
  return localTz(new Date());
}

export function isEventInTheFuture(event: Event): boolean {
  return d.isAfter(getEventZonedTime(event), getLocalZonedTime());
}

export const getNextEvent = createServerFn().handler(async () => {
  const events = await getEvents();
  return events.filter(isEventInTheFuture).at(0) ?? null;
});

export function createCalendarEvent(event: Event): ICalEventData {
  return {
    id: event.slug,
    start: getEventZonedTime(event),
    summary: event.name,
    description: `Porter Robinson is live playing ${event.name}`,
    location: event.google ?? event.apple ?? undefined,
    url: event.link,
  } satisfies ICalEventData;
}

export function getEventLinks(event: Event) {
  return [
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
      href: `https://calendar.google.com/calendar/render?cid=webcal://porterrobinson.live/api/${event.slug}/subscribe`,
      children: "Add to Google Calendar",
      icon: <IconCalendar />,
    },
    {
      href: `webcal://porterrobinson.live/api/${event.slug}/subscribe`,
      children: "Download .ics file",
      icon: <IconFileDatabase />,
    },
  ];
}
