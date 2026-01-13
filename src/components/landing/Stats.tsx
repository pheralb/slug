 "use client";
 import React, { useEffect, useRef, useState } from "react";
 import { animate, useInView } from "framer-motion";

 const stats = [
   { label: "Links created", value: 124532 },
   { label: "Clicks tracked", value: 987654 },
   { label: "Active users", value: 15342 },
 ];

 export default function Stats() {
   const ref = useRef<HTMLElement | null>(null);
   const inView = useInView(ref, { once: true, margin: "-120px" });
   const [counts, setCounts] = useState<number[]>(() => stats.map(() => 0));

   useEffect(() => {
     if (!inView) return;

     const controls = stats.map((s, i) =>
       animate(0, s.value, {
         duration: 1.2 + i * 0.15,
         ease: [0.4, 0, 0.2, 1],
         onUpdate(v) {
           setCounts((prev) => {
             const next = [...prev];
             next[i] = Math.floor(v);
             return next;
           });
         },
       }),
     );

     return () => controls.forEach((c) => c.stop && c.stop());
   }, [inView]);

   return (
     <section ref={ref} id="stats" className="container my-16 px-6">
       <div className="mx-auto max-w-4xl text-center">
         <h3 className="text-2xl font-semibold">Trusted at scale</h3>
         <p className="mt-2 text-muted-foreground">
           Real numbers from real usage.
         </p>
       </div>

       <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
         {stats.map((s, i) => (
           <div
             key={s.label}
             className="rounded-lg bg-white p-6 text-center shadow dark:bg-neutral-900"
           >
             <p className="text-3xl font-bold">
               {counts[i]?.toLocaleString() ?? "0"}
             </p>
             <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
           </div>
         ))}
       </div>
     </section>
   );
 }

