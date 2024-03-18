import type { ReactNode } from "react";

import Container from "@/ui/container";
import { Button } from "@/ui/button";
import { PlusIcon } from "lucide-react";

import DashboardRoutesComponent from "@/components/dashboard-routes";
import { CreateLink } from "@/components/links/create-link";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = (props: DashboardLayoutProps) => {
  return (
    <>
      <nav className="fixed z-50 shadow-sm flex w-full items-center border-b border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900 backdrop-blur-md">
        <Container>
          <div className="mx-auto">
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
        </Container>
      </nav>
      <Container className="my-[70px]">{props.children}</Container>
    </>
  );
};

export default DashboardLayout;
