"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { verifyLinkPassword } from "@/server/actions/verify-password";
import { LockIcon, LoaderIcon } from "lucide-react";
import { toast } from "sonner";

export default function PasswordPage() {
    const params = useParams();
    const slug = params.slug as string;

    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!password) return;

        setLoading(true);
        try {
            const result = await verifyLinkPassword(slug, password);
            if (result.error) {
                toast.error(result.error);
            } else if (result.success && result.url) {
                window.location.href = result.url;
            }
        } catch (error) {
            toast.error("An error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen w-full flex-col items-center justify-center space-y-4 px-4">
            <div className="flex flex-col items-center space-y-2">
                <div className="rounded-full bg-neutral-100 p-4 dark:bg-neutral-800">
                    <LockIcon size={24} />
                </div>
                <h1 className="text-2xl font-bold">Password Required</h1>
                <p className="text-muted-foreground text-center">
                    This link is password protected. Please enter the password to continue.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
                <Input
                    type="password"
                    placeholder="Enter password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    autoFocus
                />
                <Button type="submit" className="w-full" disabled={loading || !password}>
                    {loading ? <LoaderIcon className="animate-spin" size={16} /> : "Submit"}
                </Button>
            </form>
        </div>
    );
}
