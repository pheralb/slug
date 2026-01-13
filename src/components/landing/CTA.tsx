 "use client";
 import React, { useState } from "react";
 import { Input } from "@/ui/input";
 import { Button } from "@/ui/button";
 import { toast } from "sonner";

 export default function CTA() {
   const [email, setEmail] = useState("");
   const [loading, setLoading] = useState(false);

   function validEmail(e: string) {
     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
   }

   async function handleSubmit(e: React.FormEvent) {
     e.preventDefault();
     if (!validEmail(email)) {
       toast.error("Please enter a valid email address.");
       return;
     }
     setLoading(true);
     try {
       // placeholder: simulate API call
       await new Promise((r) => setTimeout(r, 700));
       toast.success("You're subscribed — thanks!");
       setEmail("");
     } catch {
       toast.error("Something went wrong. Try again later.");
     } finally {
       setLoading(false);
     }
   }

   return (
     <section id="cta" className="container my-16 px-6">
       <div className="mx-auto max-w-4xl rounded-xl bg-gradient-to-r from-neutral-50 to-white p-8 shadow dark:from-neutral-900 dark:to-neutral-900">
         <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
           <div className="text-center md:text-left">
             <h3 className="text-2xl font-semibold">Stay in the loop</h3>
             <p className="mt-1 text-sm text-muted-foreground">
               Get product updates and release notes — no spam.
             </p>
           </div>

           <form onSubmit={handleSubmit} className="w-full md:w-auto">
             <div className="flex w-full max-w-md gap-2">
               <Input
                 placeholder="you@company.com"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 aria-label="Email address"
               />
               <Button type="submit" size="default" disabled={loading}>
                 {loading ? "Joining..." : "Join"}
               </Button>
             </div>
           </form>
         </div>
       </div>
     </section>
   );
 }

