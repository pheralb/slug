import type { Metadata } from "next";

import { auth, signOut } from "@/auth";

export const metadata: Metadata = {
  title: "Settings - Dashboard",
};

const SettingsPage = async () => {
  const session = await auth();
  return (
    <main className="animate-in duration-500 slide-in-from-bottom-2 fade-in-5">
      {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button>Sign Out</button>
      </form>
    </main>
  );
};

export default SettingsPage;
