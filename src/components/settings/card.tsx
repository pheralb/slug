import { TypographyH4 } from "@/ui/typography";
import type { ReactNode } from "react";

interface SettingsCardProps {
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
}

const SettingsCard = (props: SettingsCardProps) => {
  return (
    <div className="flex w-full flex-col space-y-2 border border-neutral-200 dark:border-neutral-800 p-4 rounded-md">
      <div className="mb-3 flex flex-col space-y-1 rounded-md">
        <div className="flex items-center space-x-2">
          <TypographyH4 className="my-0">{props.title}</TypographyH4>
        </div>
        <p className="text-sm opacity-80">{props.description}</p>
      </div>
      {props.children}
    </div>
  );
};

export default SettingsCard;
