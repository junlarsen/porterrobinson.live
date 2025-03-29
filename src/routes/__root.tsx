import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import styles from "~/globals.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Where is Porter?",
      },
      {
        name: "description",
        content: "When and where is Porter Robinson playing next?",
      },
      {
        name: "keywords",
        content:
          "Porter Robinson, SMILE World Tour, Tour, Countdown, Nurture, SMILE :D, Worlds",
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        href: "/favicon.ico",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "96x96",
        href: "/favicon-96x96.png",
      },
      { rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
      { rel: "icon", href: "/favicon.ico" },
      {
        name: "twitter:title",
        content: "Where is Porter?",
      },
      {
        name: "twitter:description",
        content: "When and where is Porter Robinson playing next?",
      },
      { name: "og:type", content: "website" },
      { name: "og:title", content: "Where is Porter?" },
      {
        name: "og:description",
        content: "When and where is Porter Robinson playing next?",
      },
    ],
    links: [{ rel: "stylesheet", href: styles }],
  }),
  component: function RootLayout() {
    return (
      <html dir="ltr" lang="en">
        <head>
          <HeadContent />
        </head>
        <body className="bg-white font-display">
          <Outlet />
          <TanStackRouterDevtools position="bottom-right" />
          <Scripts />
        </body>
      </html>
    );
  },
});
