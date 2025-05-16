import { IconCalendar } from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";
import { Heading } from "~/components/Heading";
import { Link } from "~/components/Link";
import { Text } from "~/components/Text";

export const Route = createFileRoute("/_content/calendar")({
  component: function Page() {
    return (
      <main className="flex flex-col gap-8 [&>article]:flex [&>article]:flex-col [&>article]:gap-4">
        <article>
          <Heading>Add Porter to your calendar</Heading>
          <Text>
            This website provides a subscribable calendar feed in the iCalendar
            format that you can add to your favorite calendar app. We also
            provide direct Google Calendar links for your convenience.
          </Text>

          <div>
            <a
              className="rounded-md py-2 px-4 bg-pink-9 hover:bg-pink-10 text-white inline-flex gap-1 items-center"
              href="https://calendar.google.com/calendar/render?cid=webcal://porterrobinson.live/api/subscribe"
              target="_blank"
              rel="noopener noreferrer"
            >
              Add Porter to Google Calendar <IconCalendar />
            </a>
          </div>

          <Text>
            If you're using another calendar application, you can{" "}
            <Link to="/api/subscribe" className="text-pink-9 font-semibold">
              download the .ics file here
            </Link>{" "}
            or manually subscribe to{" "}
            <code className="rounded-sm bg-gray-5 p-1 text-sm">
              webcal://porterrobinson.live/api/subscribe
            </code>
            .
          </Text>
          <Text>
            We also provide .ics files for individual events. You can find the
            download/subscribe link on the main page.
          </Text>
        </article>
      </main>
    );
  },
});
