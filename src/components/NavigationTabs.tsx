import type { FC } from "react";
import { Link } from "~/components/Link";

export const NavigationTabs: FC = () => {
  return (
    <nav className="fixed top-4 w-full text-center p-2">
      <div className="mx-auto max-w-3xl py-3 px-6 border border-gray-6 rounded-full flex justify-between gap-4 lg:gap-8">
        <Link to="/">Where is Porter?</Link>
        <Link to="/events">Upcoming events</Link>
        <Link to="/calendar">Add to calendar</Link>
        <Link to="/about">Contribute</Link>
      </div>
    </nav>
  );
};
