"use client";

import { Button } from "@/ui/button";
import { GithubLogo, GoogleLogo } from "@/components/logos";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT_URL } from "@/routes";
import { useSearchParams } from "next/navigation";

interface SocialLoginProps {
  isPending?: boolean;
}

const SocialLogin = (props: SocialLoginProps) => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const handleSocialLogin = async (provider: "google" | "github") => {
    try {
      await signIn(provider, {
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT_URL,
      });
    } catch (error) {}
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <Button
        variant="outline"
        disabled={props.isPending}
        onClick={() => handleSocialLogin("google")}
      >
        <GoogleLogo className="h-4 w-4" />
        <span>Continue with Google</span>
      </Button>
      <Button
        variant="outline"
        disabled={props.isPending}
        onClick={() => handleSocialLogin("github")}
      >
        <GithubLogo className="h-4 w-4" />
        <span>Continue with GitHub</span>
      </Button>
    </div>
  );
};

export default SocialLogin;
