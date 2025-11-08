import Alert from "@/ui/alert";
import ExternalLink from "@/ui/external-link";

interface UserBlockedProps {
  className?: string;
}

const UserBlocked = (props: UserBlockedProps) => {
  return (
    <Alert variant="error" className={props.className}>
      <strong>Your account has been blocked for service abuse.</strong><p><ExternalLink href="https://github.com/whisperaiml/slug-eight/issues/new/choose" className="mr-1 underline-offset-2">Please contact the support</ExternalLink> for more information.</p>
    </Alert>
  );
};

export default UserBlocked;
