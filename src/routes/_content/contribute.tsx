import { createFileRoute } from "@tanstack/react-router";
import { Heading } from "~/components/Heading";
import { Link } from "~/components/Link";
import { Text } from "~/components/Text";

export const Route = createFileRoute("/_content/contribute")({
  component: function Page() {
    return (
      <main className="flex flex-col gap-8 [&>article]:flex [&>article]:flex-col [&>article]:gap-4">
        <article>
          <Heading>Contribute to porterrobinson.live</Heading>
          <Text>
            This website is completely community-driven by volunteers and is not
            affiliated with Porter Robinson or his management. The website is{" "}
            <Link
              className="text-pink-9 font-semibold"
              element="a"
              href="https://github.com/junlarsen/porterrobinson.live"
            >
              open-source
            </Link>{" "}
            and contributions are welcome. Please continue reading to learn how
            you can add events to the calendar.
          </Text>
        </article>

        <article>
          <Heading>Submitting events</Heading>
          <Text>
            We currently store event information in a JSON file. JSON is a
            textual data format that is easy for both humans and computers to
            read. The list of events can be modified by{" "}
            <Link
              className="text-pink-9 font-semibold"
              element="a"
              href="https://github.com/junlarsen/porterrobinson.live/edit/main/events.json"
            >
              editing the events.json file
            </Link>{" "}
            in the GitHub repository and{" "}
            <Link
              className="text-pink-9 font-semibold"
              element="a"
              href="https://www.youtube.com/watch?v=nCKdihvneS0"
            >
              submitting a pull request
            </Link>
            .
          </Text>

          <Text>
            The JSON format requires a specific structure to be valid. Each
            registered event must have the following attributes:
          </Text>
          <ul className="list-inside list-disc">
            <Text element="li">
              A name for the event. Typically the tour+location or festival
              name.
            </Text>
            <Text element="li">
              A slug (unique identifier) for the event. Used to uniquely
              identify each event, and is typically made by turning all letters
              lowercase and replacing spaces with dashes.
            </Text>
            <Text element="li">
              A datetime. We use the{" "}
              <Link
                className="text-pink-9 font-semibold"
                href="https://en.wikipedia.org/wiki/ISO_8601"
                element="a"
              >
                ISO 8601 format
              </Link>{" "}
              with UTC offset. An example date is{" "}
              <code className="rounded-sm bg-gray-5 p-1 text-sm">
                2025-08-17T00:00:00+09:00
              </code>{" "}
              representing the 17th August 2025, at midnight local time, where
              local time is 9 hours ahead of UTC.
            </Text>
            <Text element="li">
              A time-zone identifier from the{" "}
              <Link
                className="text-pink-9 font-semibold"
                href="https://en.wikipedia.org/wiki/List_of_tz_database_time_zones"
                element="a"
              >
                IANA time zone database.
              </Link>{" "}
              For example{" "}
              <code className="rounded-sm bg-gray-5 p-1 text-sm">
                Asia/Tokyo
              </code>
              .
            </Text>
            <Text element="li">
              A link to the show ticket and information page.
            </Text>
            <Text element="li">
              A human-readable address of the venue or location the show is
              being hosted at.
            </Text>
          </ul>

          <Text>
            Additionally, the event may have these optional attributes:
          </Text>

          <ul className="list-inside list-disc">
            <Text element="li">
              A link to the event location on Google Maps.
            </Text>
            <Text element="li">
              A link to the event location on Apple Maps.
            </Text>
          </ul>
        </article>

        <article>
          <Heading>Contact</Heading>
          <Text>
            You can contact the contributors by{" "}
            <Link
              className="text-pink-9 font-semibold"
              element="a"
              href="http://github.com/junlarsen/porterrobinson.live/issues/new"
            >
              opening an issue on GitHub
            </Link>
            .
          </Text>
        </article>
      </main>
    );
  },
});
