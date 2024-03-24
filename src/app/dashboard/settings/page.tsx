import type { Metadata } from "next";

import { auth } from "@/auth";
import UpdateNameAvatar from "@/components/settings/update-name-avatar";
import DeleteAccount from "@/components/settings/delete-account";
import { Button } from "@/ui/button";
import SettingsCard from "@/components/settings/card";

export const metadata: Metadata = {
  title: "Settings - Dashboard",
};

const SettingsPage = async () => {
  const session = await auth();

  if (!session) return null;

  return (
    <main className="flex w-full flex-col space-y-4 duration-500 animate-in fade-in-5 slide-in-from-bottom-2">
      <UpdateNameAvatar
        name={session.user.name!}
        username={session.user.username!}
        email={session.user.email!}
        avatar={session.user.image!}
      />
      <SettingsCard title="Account" description="Update your account settings:">
        <div className="flex w-52 flex-col space-y-2">
          <p>Delete account:</p>
          <DeleteAccount
            email={session.user.email!}
            trigger={
              <Button variant="destructive" size="sm">
                Delete Account
              </Button>
            }
          />
        </div>
      </SettingsCard>
    </main>
  );
};

export default SettingsPage;
