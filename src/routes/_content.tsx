import { Outlet, createFileRoute } from "@tanstack/react-router";
import { NavigationTabs } from "~/components/NavigationTabs";

export const Route = createFileRoute("/_content")({
  component: function ContentLayout() {
    return (
      <>
        <NavigationTabs />
        <div className="mx-auto max-w-3xl p-8 mt-28">
          <Outlet />
        </div>
      </>
    );
  },
});
