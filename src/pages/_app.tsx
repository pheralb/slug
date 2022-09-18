import type { AppType } from "next/dist/shared/lib/utils";

// Auth =>
import { SessionProvider } from "next-auth/react";

// Styles =>
import "@/styles/globals.css";

// Motion =>
import Show from "@/motions/show";

// Layout =>
import Layout from "@/layout";

// SEO =>
import { DefaultSeo } from "next-seo";
import nextSeoConfig from "next-seo.config";

const MyApp: AppType = ({
  Component,
  pageProps: { session, ...pageProps },
  router,
}) => {
  return (
    <>
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
