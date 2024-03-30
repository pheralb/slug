import Alert from "@/ui/alert";
import ExternalLink from "@/ui/external-link";
import { SproutIcon } from "lucide-react";

const BetaWarning = () => {
  return (
    <Alert
      variant="info"
      icon={<SproutIcon size={20} />}
      className="rounded-none border-y bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/85 dark:text-white text-neutral-800"
      containerClassName="container"
      iconSize={12}
    >
      <p>
        Welcome to the Slug beta. If you detect any problem or bug, feel
        free to{" "}
        <ExternalLink
          href="https://github.com/pheralb/slug/issues/new/choose"
          className="underline decoration-dotted underline-offset-4"
        >
          create an issue
        </ExternalLink>{" "}
        on Github.
      </p>
    </Alert>
  );
};

export default BetaWarning;
