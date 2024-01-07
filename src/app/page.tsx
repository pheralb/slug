import { Button } from "@/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <>
      <div className="mx-auto max-w-[85rem] px-4 pb-10 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto mt-5 max-w-2xl text-center">
          <h1 className="block text-4xl font-bold text-gray-800 md:text-5xl lg:text-6xl dark:text-gray-200">
            Let's Build
            <span className="ml-3 bg-gradient-to-tl from-blue-600 to-violet-600 bg-clip-text text-transparent">
              Together
            </span>
          </h1>
        </div>
        <div className="mx-auto mt-5 max-w-3xl text-center">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Preline UI is an open-source set of prebuilt UI components,
            ready-to-use examples and Figma design system based on the
            utility-first Tailwind CSS framework.
          </p>
        </div>
        <div className="mt-8 flex justify-center gap-3">
          <a
            className="inline-flex items-center justify-center gap-x-3 rounded-md border border-transparent bg-gradient-to-tl from-blue-600 to-violet-600 px-4 py-3 text-center text-sm font-medium text-white hover:from-violet-600 hover:to-blue-600 focus:outline-none focus:ring-1 focus:ring-gray-600 dark:focus:ring-offset-gray-800"
            href="#"
          >
            Get started
            <svg
              className="h-4 w-4 flex-shrink-0"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </a>
          <button
            type="button"
            className="group relative inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white p-2 ps-3 font-mono text-sm text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          >
            $ npm i preline
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
              <svg
                className="h-4 w-4 flex-shrink-0 transition group-hover:rotate-6"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
              </svg>
            </span>
          </button>
        </div>
        <div className="mt-5 flex items-center justify-center gap-x-1 sm:gap-x-3">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Package Manager:
          </span>
          <span className="text-sm font-bold text-gray-900 dark:text-white">
            npm
          </span>
          <svg
            className="h-5 w-5 text-gray-300 dark:text-gray-600"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M6 13L10 3" stroke="currentColor" stroke-linecap="round" />
          </svg>
          <a
            className="inline-flex items-center gap-x-1.5 text-sm font-medium text-blue-600 decoration-2 hover:underline"
            href="#"
          >
            Installation Guide
            <svg
              className="h-4 w-4 flex-shrink-0"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </>
  );
}
