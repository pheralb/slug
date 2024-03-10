import { Button } from "@/ui/button";
import { cn } from "@/utils";
import Link from "next/link";

export default async function Home() {
  return (
    <>
      <div className="relative flex h-96 w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-neutral-900">
        <div className="pointer-events-none absolute inset-0 z-20 h-full w-full bg-neutral-900 [mask-image:radial-gradient(transparent,white)]" />
        <h1 className={cn("relative z-20 text-xl text-white md:text-4xl")}>
          Tailwind is Awesome
        </h1>
        <p className="relative z-20 mt-2 text-center text-neutral-300">
          Framer motion is the best animation library ngl
        </p>
      </div>
    </>
  );
}
