import type { AppType } from "next/dist/shared/lib/utils";
import type { Session } from "next-auth";

// Auth =>
import { SessionProvider } from "next-auth/react";

// Styles =>
import "@/styles/globals.css";
import Show from "@/motions/show";

// Layout =>
import Layout from "@/layout";

// SEO =>
import { DefaultSeo } from "next-seo";
import nextSeoConfig from "next-seo.config";

// Next progress =>
import NextNProgress from "nextjs-progressbar";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
  router,
}) => {
  return (
    <>
      <NextNProgress
        color="#febb01"
        startPosition={0.3}
        stopDelayMs={200}
        height={2}
        showOnShallow={true}
      />
      <DefaultSeo {...nextSeoConfig} />
      <SessionProvider session={session}>
        <Layout>
          <Show routerKey={router.route}>
            <Component {...pageProps} />
          </Show>
        </Layout>
      </SessionProvider>
    </>
  );
};

export default MyApp;
