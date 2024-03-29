import Alert from "@/ui/alert";
import ExternalLink from "@/ui/external-link";

const BetaWarning = () => {
  return (
    <Alert
      variant="info"
      className="rounded-none p-4"
      containerClassName="container"
      iconSize={14}
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
