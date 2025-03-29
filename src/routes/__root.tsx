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
