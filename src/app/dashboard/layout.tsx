import type { ReactNode } from "react";

import DashboardRoutesComponent from "@/components/dashboard-routes";
import Footer from "@/components/layout/footer";
import { cn } from "@/utils";
import Alert from "@/ui/alert";
import Link from "next/link";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = (props: DashboardLayoutProps) => {
  return (
    <>
      <nav className="fixed z-50 flex w-full items-center border-b border-neutral-200 bg-white backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900">
        <div className="container mx-auto w-full">
          <div className="flex w-full items-center justify-between">
            <div className="mt-0 flex flex-row space-x-0 text-sm font-medium rtl:space-x-reverse">
              <DashboardRoutesComponent />
            </div>
          </div>
        </div>
      </nav>
      <main
        className={cn("container my-[68px] flex w-full flex-col items-center")}
      >
        <Alert variant="warning" className="mb-4 w-full">
          <p>
            The creation of new links has been temporarily disabled. You can
            download the links on your{" "}
            <Link
              href="/dashboard/settings"
              className="underline underline-offset-2"
            >
              account settings page
            </Link>
          </p>
        </Alert>
        {props.children}
      </main>
      <Footer className="fixed bottom-0 py-4" />
    </>
  );
};

export default DashboardLayout;
