"use client";

import { useState, type ReactNode } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import { deleteProfile } from "@/server/actions/profile";
import { toast } from "sonner";
import { Input } from "@/ui/input";
import { LoaderIcon } from "lucide-react";
import { Button } from "@/ui/button";

interface DeleteAccountProps {
  trigger: ReactNode;
  email: string;
}

const DeleteAccount = (props: DeleteAccountProps) => {
  const [confirmEmail, setConfirmEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleDeleteAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (confirmEmail !== props.email) {
      toast.error("Email does not match.");
      return;
    }
    setLoading(true);
    toast.promise(deleteProfile, {
      loading: "Deleting account...",
      description: "Your account is being deleted.",
      success: () => {
        setLoading(false);
        return `Your account has been deleted.`;
      },
      error: "Failed to delete account. Please try again or contact us.",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{props.trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Account</DialogTitle>
          <DialogDescription>
            <span className="text-red-500">This action cannot be undone.</span>{" "}
            This will permanently delete your account and remove all links from
            our servers.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleDeleteAccount}>
          <div className="flex flex-col space-y-3">
            <p className="text-sm">
              To confirm, please type your email address:{" "}
              <span className="font-mono">{props.email}</span>
            </p>
            <Input
              type="email"
              className="input"
              onChange={(e) => setConfirmEmail(e.target.value)}
              placeholder="Your email address"
              disabled={loading}
            />
            <DialogFooter className="mt-3">
              <DialogClose asChild>
                <Button variant="ghost" disabled={loading}>
                  Cancel
                </Button>
              </DialogClose>
              <Button
                disabled={loading || confirmEmail !== props.email}
                type="submit"
                variant="destructive"
              >
                {loading ?? <LoaderIcon size={16} className="animate-spin" />}
                <span>{loading ? "Deleting..." : "Delete"}</span>
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAccount;
