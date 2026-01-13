 "use client";
 import React from "react";
 import { motion } from "framer-motion";
 import { Card, CardHeader, CardTitle, CardDescription } from "@/ui/card";
 import { TypographyH3 } from "@/ui/typography";
 import { Badge } from "@/ui/badge";

 const features = [
   {
     title: "Fast link creation",
     description: "Create short links instantly with a single click or API call.",
   },
   {
     title: "Custom aliases",
     description: "Use your own slugs for branding and better memorability.",
   },
   {
     title: "Analytics & privacy",
     description: "Track clicks and protect user data with privacy-first defaults.",
   },
 ];

 const container = {
   hidden: {},
   show: {
     transition: {
       staggerChildren: 0.12,
     },
   },
 };

  const item = {
    hidden: { opacity: 0, y: 16 },
    // keep variants as simple target values (avoid typed transition here)
    show: { opacity: 1, y: 0 },
  };

 export default function FeatureSection() {
   return (
     <section id="features" className="container my-16 px-6">
       <div className="mx-auto max-w-4xl text-center">
         <TypographyH3 className="!mt-0">Powerful, simple features</TypographyH3>
         <p className="mt-4 text-muted-foreground">
           Everything you need to manage and share links without the fluff.
         </p>
       </div>

       <motion.div
         variants={container}
         initial="hidden"
         whileInView="show"
         viewport={{ once: true, amount: 0.2 }}
         className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
       >
         {features.map((f) => (
           <motion.div
             key={f.title}
             variants={item}
             transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }} // explicitly set correct ease array
           >
             <Card className="h-full">
               <CardHeader>
                 <div className="flex items-center justify-between">
                  <CardTitle>{f.title}</CardTitle>
                  <Badge className="bg-neutral-100 dark:bg-neutral-800 text-xs">New</Badge>
                 </div>
                 <CardDescription>{f.description}</CardDescription>
               </CardHeader>
             </Card>
           </motion.div>
         ))}
       </motion.div>
     </section>
   );
 }

