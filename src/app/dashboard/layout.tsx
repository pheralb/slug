import type { ReactNode } from "react";

import Container from "@/ui/container";
import { Button } from "@/ui/button";
import { PlusIcon } from "lucide-react";

import DashboardRoutesComponent from "@/components/dashboard-routes";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = (props: DashboardLayoutProps) => {
  return (
    <>
      <nav className="border-b border-gray-100 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-800/50">
        <Container>
          <div className="mx-auto py-3">
            <div className="flex w-full items-center justify-between">
              <div className="mt-0 flex flex-row space-x-2 text-sm font-medium rtl:space-x-reverse">
                <DashboardRoutesComponent />
              </div>
              <Button>
                <PlusIcon size={16} />
                <span>Create Link</span>
              </Button>
            </div>
          </div>
        </Container>
      </nav>
      <Container>{props.children}</Container>
    </>
  );
};

export default DashboardLayout;
