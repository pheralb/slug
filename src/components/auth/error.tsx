import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";

const AuthError = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Something went wrong.</CardTitle>
      </CardHeader>
      <CardContent>
        <Link
          href="/login"
          className="opacity-75 transition-opacity duration-100 hover:text-black hover:opacity-100 dark:hover:text-white"
        >
          <span>Back to login</span>
        </Link>
      </CardContent>
    </Card>
  );
};

export default AuthError;
