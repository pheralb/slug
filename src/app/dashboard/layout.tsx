import type { ReactNode } from "react";

import { Button } from "@/ui/button";
import { PlusIcon } from "lucide-react";

import DashboardRoutesComponent from "@/components/dashboard-routes";
import { CreateLink } from "@/components/links/create-link";
import Footer from "@/components/layout/footer";
import { cn } from "@/utils";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = (props: DashboardLayoutProps) => {
  return (
    <>
      <nav className="fixed z-50 flex w-full items-center border-b border-neutral-200 bg-white shadow-sm backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900">
        <div className="container mx-auto w-full">
          <div className="flex w-full items-center justify-between">
            <div className="mt-0 flex flex-row space-x-0 text-sm font-medium rtl:space-x-reverse">
              <DashboardRoutesComponent />
            </div>
            <CreateLink>
              <Button>
                <PlusIcon size={16} />
                <span>Create Link</span>
              </Button>
            </CreateLink>
          </div>
        </div>
      </nav>
      <main className={cn("container my-[65px] flex w-full items-center")}>
        {props.children}
      </main>
      <Footer className="fixed bottom-0 py-4" />
    </>
  );
};

export default DashboardLayout;
