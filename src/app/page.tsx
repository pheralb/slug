import Footer from "@/components/footer";
import { GithubLogo } from "@/components/logos";
import { buttonVariants } from "@/ui/button";
import ExternalLink from "@/ui/external-link";
import { LinkIcon } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  return (
    <>
      <section className="mt-1 border-t border-neutral-200 dark:border-neutral-800">
        <div className="relative mx-auto w-full px-4 py-24 lg:flex lg:items-center">
          <div className="absolute inset-0 h-full w-full bg-white bg-[radial-gradient(#efeff0_1px,transparent_1px)] [background-size:14px_14px] dark:bg-neutral-900 dark:bg-[radial-gradient(#202020_1px,transparent_1px)]"></div>
          <div className="relative mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight duration-500 animate-in fade-in-20 slide-in-from-bottom-4 lg:text-6xl">
              Open Source Link Shortener
            </h1>

            <p className="mt-4 text-pretty text-lg opacity-80 duration-500 animate-in fade-in-20 slide-in-from-top-1">
              Create short links that can be easily shared, tweeted, or emailed
              to friends.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3 duration-700 animate-in fade-in-20">
              <Link
                href="/dashboard"
                className={buttonVariants({
                  variant: "default",
                  className: "group",
                  size: "lg",
                })}
              >
                <LinkIcon
                  size={18}
                  className="duration-300 group-hover:rotate-[14deg]"
                />
                <span>Create a Link</span>
              </Link>
              <ExternalLink
                href="https://github.com/pheralb/slug"
                className={buttonVariants({
                  variant: "expandIcon",
                  size: "lg",
                  className: "group",
                })}
              >
                <GithubLogo
                  height={18}
                  className="duration-300
                 group-hover:-rotate-[10deg]"
                />
                <span>Star on GitHub</span>
              </ExternalLink>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
