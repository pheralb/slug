import type { Metadata } from "next";

import { auth } from "@/auth";
import UpdateNameAvatar from "@/components/settings/update-name-avatar";

export const metadata: Metadata = {
  title: "Settings - Dashboard",
};

const SettingsPage = async () => {
  const session = await auth();

  if (!session) return null;

  return (
    <main className="duration-500 animate-in fade-in-5 slide-in-from-bottom-2">
      <UpdateNameAvatar
        name={session.user.name!}
        username={session.user.username!}
        email={session.user.email!}
        avatar={session.user.image!}
      />
    </main>
  );
};

export default SettingsPage;
