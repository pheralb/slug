"use client";

import { Button } from "@/ui/button";
import { GithubLogo, GoogleLogo } from "@/components/icons/logos";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT_URL } from "@/routes";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Loader } from "lucide-react";
import { toast } from "sonner";

const socialProviders = [
  {
    name: "Continue with Google",
    icon: <GoogleLogo className="h-4 w-4" />,
    provider: "google",
  },
  {
    name: "Continue with GitHub",
    icon: <GithubLogo className="h-4 w-4" />,
    provider: "github",
  },
];

const SocialLogin = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [loading, setLoading] = useState<boolean>(false);
  const [provider, setProvider] = useState<string | null>();

  const handleSocialLogin = async (provider: string) => {
    try {
      setLoading(true);
      setProvider(provider);
      await signIn(provider, {
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT_URL,
      });
    } catch (error) {
      toast.error("An error occurred while trying to sign in");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      {socialProviders.map((sp) => (
        <Button
          key={sp.provider}
          variant="outline"
          className="w-full"
          disabled={loading}
          name={sp.name}
          onClick={() => handleSocialLogin(sp.provider)}
        >
          {provider === sp.provider ? (
            <Loader className="animate-spin" size={18} />
          ) : (
            sp.icon
          )}
          <span>{sp.name}</span>
        </Button>
      ))}
    </div>
  );
};

export default SocialLogin;
