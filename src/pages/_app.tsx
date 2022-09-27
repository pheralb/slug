import type { AppType } from "next/dist/shared/lib/utils";
import type { Session } from "next-auth";

// tRPC =>
import type { AppRouter } from "@/server/router";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import { loggerLink } from "@trpc/client/links/loggerLink";
import { withTRPC } from "@trpc/next";

// Auth =>
import { SessionProvider } from "next-auth/react";

// Styles =>
import "@/styles/globals.css";
import Show from "@/motions/show";
import { Toaster } from 'react-hot-toast';

// Layout =>
import Layout from "@/layout";

// SEO =>
import { DefaultSeo } from "next-seo";
import nextSeoConfig from "next-seo.config";

// Next progress =>
import NextNProgress from "nextjs-progressbar";

// Superjson =>
import superjson from "superjson";

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
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
};

const getBaseUrl = () => {
  if (typeof window !== "undefined") return "";
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = `${getBaseUrl()}/api/trpc`;
    return {
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpBatchLink({ url }),
      ],
      url,
      transformer: superjson,
    };
  },
  ssr: false,
})(MyApp);
