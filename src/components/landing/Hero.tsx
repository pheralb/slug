 "use client";
 import React from "react";
 import { motion, useScroll, useTransform } from "framer-motion";
 import Link from "next/link";
 import { LinkIcon } from "lucide-react";
 import { buttonVariants } from "@/ui/button";
 import ExternalLink from "@/ui/external-link";
 import { GithubLogo } from "@/components/icons/logos";
 import { TypographyH1, TypographyP } from "@/ui/typography";

 export default function Hero() {
   const { scrollY } = useScroll();
   // parallax: background moves slower than scroll
   const y = useTransform(scrollY, [0, 500], [0, -60]);

   return (
     <section
       id="hero"
       className="relative flex flex-col items-center px-6 pt-16 text-center md:pt-24 lg:pt-32"
     >
       <motion.div
         aria-hidden
         style={{ y }}
         className="pointer-events-none absolute -top-24 -z-20 h-[420px] w-full overflow-hidden"
       >
         {/* subtle decorative gradient / shapes for parallax */}
         <div className="absolute left-1/2 top-8 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-200 via-sky-100 to-transparent opacity-40 blur-3xl h-80 w-96" />
       </motion.div>

       <motion.div
         initial={{ opacity: 0, y: 16 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.6, ease: "easeOut" }}
         className="z-10"
       >
         <TypographyH1 className="max-w-[75ch]">
           Enhance Your Link Management
         </TypographyH1>
         <TypographyP className="max-w-[75ch] text-sm md:text-base [&:not(:first-child)]:mt-6">
           Slug is an open-source platform that allows you to create, manage, and
           share short links with ease. It's fast, secure, and easy to use.
         </TypographyP>

         <div className="mt-8 flex items-center justify-center md:space-x-3 space-x-2">
           <Link
             href="/dashboard"
             className={buttonVariants({
               variant: "default",
               className: "group",
               size: "lg",
             })}
           >
             <LinkIcon size={18} className="duration-300 group-hover:rotate-[14deg]" />
             <span>Create a Link</span>
           </Link>
           <ExternalLink
             href="https://github.com/reblox01/slug"
             className={buttonVariants({
               variant: "expandIcon",
               size: "lg",
               className: "group",
             })}
           >
             <GithubLogo height={18} className="duration-300 group-hover:-rotate-[10deg]" />
             <span>Star on GitHub</span>
           </ExternalLink>
         </div>
       </motion.div>
     </section>
   );
 }

