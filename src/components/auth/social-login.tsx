"use client";

import { Button } from "@/ui/button";
import { GithubLogo, GoogleLogo } from "@/components/logos";

const SocialLogin = () => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <Button variant="outline">
        <GoogleLogo className="h-4 w-4" />
        <span>Continue with Google</span>
      </Button>
      <Button variant="outline">
        <GithubLogo className="h-4 w-4" />
        <span>Continue with GitHub</span>
      </Button>
    </div>
  );
};

export default SocialLogin;
