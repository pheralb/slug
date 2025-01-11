import Footer from "@/components/layout/footer";
import { GithubLogo } from "@/components/icons/logos";
import { buttonVariants } from "@/ui/button";
import ExternalLink from "@/ui/external-link";
import { TypographyH1, TypographyP } from "@/ui/typography";
import { LinkIcon } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="relative h-[calc(100vh-4rem)]">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] dark:bg-neutral-900"></div>
      <section
        id="hero"
        className="flex flex-col items-center px-6 pt-16 text-center md:pt-24 lg:pt-32"
      >
        <TypographyH1 className="max-w-[75ch] duration-500 animate-in fade-in-5 slide-in-from-bottom-2">
          Enhance Your Link Management
        </TypographyH1>
        <TypographyP className="max-w-[75ch] text-sm duration-700 animate-in fade-in-5 slide-in-from-top-2 md:text-base [&:not(:first-child)]:mt-6">
          Slug is an open-source platform that allows you to create, manage, and
          share short links with ease. It's fast, secure, and easy to use.
        </TypographyP>
        <div className="mt-8 flex items-center justify-center duration-700 animate-in fade-in-30 md:space-x-3 space-x-2">
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
      </section>
      <Footer className="fixed bottom-0 mt-4 py-4" />
    </main>
  );
}
