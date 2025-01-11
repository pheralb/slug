import type { Metadata } from "next";

import { auth } from "@/auth";
import UpdateNameAvatar from "@/components/settings/update-name-avatar";
import DeleteAccount from "@/components/settings/delete-account";
import { Button } from "@/ui/button";
import SettingsCard from "@/components/settings/card";
import DownloadAllLinks from "@/components/links/download-all-links";
import { HeartCrackIcon } from "lucide-react";
import UserBlocked from "@/components/settings/userBlocked";

export const metadata: Metadata = {
  title: "Settings - Dashboard",
};

const SettingsPage = async () => {
  const session = await auth();

  if (!session) return null;

  return (
    <main className="flex w-full flex-col space-y-4 duration-500 animate-in fade-in-5 slide-in-from-bottom-2">
      {session.user?.blocked && <UserBlocked />}
      <UpdateNameAvatar
        name={session.user.name!}
        username={session.user.username!}
        email={session.user.email!}
        avatar={session.user.image!}
      />
      <SettingsCard title="Account" description="Update your account settings:">
        <div className="mb-5 flex w-52 flex-col space-y-2">
          <p>Export links:</p>
          <DownloadAllLinks />
        </div>
        <div className="flex w-52 flex-col space-y-2">
          <p>Delete account:</p>
          <DeleteAccount
            email={session.user.email!}
            trigger={
              <Button variant="destructive" size="sm">
                <HeartCrackIcon size={14} />
                <span>Delete Account</span>
              </Button>
            }
          />
        </div>
      </SettingsCard>
    </main>
  );
};

export default SettingsPage;
