import * as fs from "node:fs/promises";
import * as toml from "toml";
import { z } from "zod";

export type Event = z.infer<typeof Event>;
const Event = z.object({
  name: z.string().min(1, "name cannot be empty"),
  time: z.string().min(1, "time cannot be empty"),
  timeZone: z.string().min(1, "time zone cannot be empty"),
  link: z.string().url(),
  location: z.string().min(1, "location cannot be empty"),
  maps: z.string().url(),
});

export type Configuration = z.infer<typeof Configuration>;
const Configuration = z.object({
  events: Event.array(),
});

export async function getEvents(): Promise<Event[]> {
  const path = new URL("../events.toml", import.meta.url);
  const events = await fs.readFile(path, "utf-8");
  const object = toml.parse(events);
  const configuration = Configuration.parse(object);
  return configuration.events;
}
