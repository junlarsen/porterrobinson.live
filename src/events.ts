import * as fs from "node:fs/promises";
import * as tz from "@date-fns/tz";
import { createServerFn } from "@tanstack/react-start";
import * as d from "date-fns";
import * as toml from "toml";
import { z } from "zod";

export type Event = z.infer<typeof Event>;
const Event = z.object({
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
let configuration: Configuration | null = null;

export async function getEvents(): Promise<Event[]> {
  if (configuration === null) {
    const path = new URL("../events.toml", import.meta.url);
    const events = await fs.readFile(path, "utf-8");
    const object = toml.parse(events);
    configuration = Configuration.parse(object);
  }
  return configuration.events;
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
