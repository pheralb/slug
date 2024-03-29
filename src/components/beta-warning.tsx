import Alert from "@/ui/alert";
import ExternalLink from "@/ui/external-link";

const BetaWarning = () => {
  return (
    <Alert
      variant="info"
      className="bg-white dark:bg-neutral-900/85 border-y dark:border-neutral-800 rounded-none p-4 shadow-sm"
      containerClassName="container"
      iconSize={12}
    >
      <p>
        Slug is now in beta. Any problems/bugs, please{" "}
        <ExternalLink href="https://github.com/pheralb/slug/issues/new/choose" className="underline underline-offset-4 decoration-dotted">
          create an issue
        </ExternalLink>{" "}
        on Github.
      </p>
    </Alert>
  );
};

export default BetaWarning;
