import Footer from "@/components/footer";
import { GithubLogo } from "@/components/icons/logos";
import { buttonVariants } from "@/ui/button";
import ExternalLink from "@/ui/external-link";
import { TypographyH1, TypographyP } from "@/ui/typography";
import { LinkIcon } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  return (
    <>
      <section>
        <div className="mx-auto space-y-8 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <TypographyH1 className="duration-500 animate-in fade-in-20 slide-in-from-bottom-2">
              Open Source Link Shortener
            </TypographyH1>
          </div>

          <div className="mx-auto max-w-3xl text-center">
            <TypographyP className="text-sm animate-in duration-500 slide-in-from-bottom-4 md:text-base fade-in">
              Slug is a free and open-source URL shortener that allows you to
              create custom links with ease. It's fast, reliable, and easy to
              use. Get started today!
            </TypographyP>
          </div>

          <div className="my-10 flex items-center justify-center space-x-2 animate-in fade-in-20 duration-500">
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
      </section>
      <Footer className="fixed bottom-0 py-4" />
    </>
  );
}
