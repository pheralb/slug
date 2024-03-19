import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { cn } from "@/utils";

import { sharedAnimationCards } from "@/components/auth/animation-cards";
import SocialLogin from "@/components/auth/social-login";

const AuthLoginPage = () => {
  return (
    <Card className={cn(sharedAnimationCards)}>
      <CardHeader>
        <CardTitle className="text-xl">Hey friend! Welcome back 👋</CardTitle>
      </CardHeader>
      <CardContent className="dark:bg-neutral-900">
        <SocialLogin />
      </CardContent>
    </Card>
  );
};

export default AuthLoginPage;
