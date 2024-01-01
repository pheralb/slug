"use client";

import { Button } from "@/ui/button";
import { GithubLogo, GoogleLogo } from "@/components/logos";

interface SocialLoginProps {
  isPending?: boolean;
}

const SocialLogin = (props: SocialLoginProps) => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <Button variant="outline" disabled={props.isPending}>
        <GoogleLogo className="h-4 w-4" />
        <span>Continue with Google</span>
      </Button>
      <Button variant="outline" disabled={props.isPending}>
        <GithubLogo className="h-4 w-4" />
        <span>Continue with GitHub</span>
      </Button>
    </div>
  );
};

export default SocialLogin;
