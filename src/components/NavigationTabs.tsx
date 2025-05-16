import { linkOptions } from "@tanstack/react-router";
import clsx from "clsx";
import type { FC } from "react";
import { Link } from "~/components/Link";

const options = linkOptions([
  {
    to: "/",
    children: "Where is Porter?",
    activeProps: { className: "text-pink-9" },
  },
  {
    to: "/events",
    children: "Event list",
    activeProps: { className: "text-pink-9" },
  },
  {
    to: "/calendar",
    children: "Add to calendar",
    activeProps: { className: "text-pink-9" },
  },
  {
    to: "/contribute",
    children: "About & Contribute",
    activeProps: { className: "text-pink-9" },
  },
]);

export const NavigationTabs: FC = () => {
  return (
    <nav className="fixed top-4 w-full text-center p-4">
      <div
        className={clsx(
          "mx-auto lg:max-w-3xl py-4 px-4 lg:px-8 border border-gray-6 rounded-full",
          "flex justify-between gap-4 lg:gap-8 bg-white ",
        )}
      >
        {options.map((option) => (
          <Link key={option.to} {...option} />
        ))}
      </div>
    </nav>
  );
};
