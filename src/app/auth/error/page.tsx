import { sharedAnimationCards } from "@/components/auth/animation-cards";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import Link from "next/link";

const AuthErrorPage = () => {
  return (
    <Card className={sharedAnimationCards}>
      <CardHeader>
        <CardTitle className="text-xl">Something went wrong.</CardTitle>
      </CardHeader>
      <CardContent>
        <Link
          href="/auth"
          className="opacity-75 transition-opacity duration-100 hover:text-black hover:opacity-100 dark:hover:text-white"
        >
          <span>Back to login</span>
        </Link>
      </CardContent>
    </Card>
  );
};

export default AuthErrorPage;
