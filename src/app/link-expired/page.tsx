import Link from "next/link";
import { Button } from "@/ui/button";

export default function LinkExpiredPage() {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center space-y-4">
            <h1 className="text-4xl font-bold">Link Expired</h1>
            <p className="text-muted-foreground">
                The link you are trying to access has expired.
            </p>
            <Link href="/">
                <Button>Go Home</Button>
            </Link>
        </div>
    );
}
