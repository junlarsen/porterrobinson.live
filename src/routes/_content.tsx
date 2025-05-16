import { Outlet, createFileRoute } from "@tanstack/react-router";
import clsx from "clsx";
import { NavigationTabs } from "~/components/NavigationTabs";

export const Route = createFileRoute("/_content")({
  component: function ContentLayout() {
    return (
      <div className="relative min-h-screen">
        <div
          className={clsx(
            "absolute inset-0 bottom-0 opacity-20",
            "bg-linear-115 from-[#fff1be] from-28% via-[#f57eb6] via-70% to-[#b060ff] sm:bg-linear-145",
          )}
        />
        <div className="relative">
          <NavigationTabs />
          <div className="mx-auto max-w-3xl p-8 pt-28">
            <Outlet />
          </div>
        </div>
      </div>
    );
  },
});
