import Footer from "@/components/layout/footer";
import { GithubLogo } from "@/components/icons/logos";
import { buttonVariants } from "@/ui/button";
import ExternalLink from "@/ui/external-link";
import { TypographyH1, TypographyP } from "@/ui/typography";
import { LinkIcon } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  return (
    <>
      <div className="py-12 lg:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Shorten links. Share more.
                </h1>
                <p className="max-w-[500px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed">
                  Unlock the power of customized links effortlessly with our
                  lightning-fast and dependable URL shortener. Unlimited clicks,
                  no ads and no tracking.
                </p>
              </div>
              <div className="items-center justify-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
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
        </div>
      </div>
      <Footer className="fixed bottom-0 mt-4 py-4" />
    </>
  );
}
