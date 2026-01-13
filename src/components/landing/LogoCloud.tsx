 "use client";
 import React from "react";
 import { motion } from "framer-motion";
 import { GithubLogo, GoogleLogo, XLogo, T3Logo } from "@/components/icons/logos";

 const logos = [
   { Component: GoogleLogo, label: "Google" },
   { Component: GithubLogo, label: "GitHub" },
   { Component: XLogo, label: "X" },
   { Component: T3Logo, label: "T3" },
 ];

 const container = {
   hidden: {},
   show: { transition: { staggerChildren: 0.08 } },
 };

 const item = {
   hidden: { opacity: 0, y: 8 },
   show: { opacity: 1, y: 0 },
 };

 export default function LogoCloud() {
   return (
     <section id="logos" className="container my-12 px-6">
       <div className="mx-auto max-w-4xl text-center">
         <h4 className="text-lg font-medium">Trusted by</h4>
       </div>

       <motion.div
         variants={container}
         initial="hidden"
         whileInView="show"
         viewport={{ once: true, amount: 0.2 }}
         className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4 items-center"
       >
         {logos.map((l) => {
           const Logo = l.Component;
           return (
             <motion.div
               key={l.label}
               variants={item}
               className="flex items-center justify-center p-4"
             >
               <div className="h-10 w-full opacity-80 text-neutral-700 dark:text-neutral-300">
                 <Logo className="mx-auto h-8 w-auto" />
               </div>
             </motion.div>
           );
         })}
       </motion.div>
     </section>
   );
 }

