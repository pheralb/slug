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
      <nav className="fixed w-full flex items-center border-b border-gray-100 dark:border-neutral-800 dark:bg-neutral-900 z-50">
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
