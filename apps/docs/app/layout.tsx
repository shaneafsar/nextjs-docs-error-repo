import "@algolia/coquille/index.css";
import clsx from "clsx";
import type { PropsWithChildren } from "react";

import { sora } from "./fonts";

import MobileNavigation from "@components/Navigation/MobileNavigation";
import Navigation from "@components/Navigation/Navigation";
import TopHeader from "@components/Navigation/TopHeader";
import SandpackCSS from "@components/SandpackCSS";
import Logo from "@components/UI/Logo";
import { ThemeProvider } from "@components/UI/ThemeProvider";
import { baseUrl } from "@constants";

import BetaBanner from "@components/BetaBanner";
import SegmentPage from "@components/SegmentPage";
import "../globals.css";

import Script from "next/script";
import Link from "next/link";

const title = "Algolia Docs";
const description =
  "Explore guides, examples, and references for building search and discovery experiences with Algolia.";

export const metadata = {
  title: {
    default: title,
    template: `%s | ${title}`,
  },
  description,
  keywords: ["Algolia", "Documentation", "Beta"],
  authors: [
    {
      name: "algolia",
      url: "https://algolia.com",
    },
  ],
  creator: "algolia",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://algolia.com/doc-beta",
    title,
    description,
    siteName: title,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@algolia",
  },
  icons: {
    icon: `${baseUrl}/favicon/favicon.ico`,
    apple: `${baseUrl}/apple-touch-icon.png`,
  },
  manifest: `${baseUrl}/site.webmanifest`,
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* https://github.com/pacocoursey/next-themes#with-app */}
      <head>
        <SandpackCSS />
      </head>

      <body className={clsx("min-h-screen text-gray-800", sora.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <div className="min-h-screen dark:bg-gray-900 dark:text-slate-100">
            <a
              className="ring-xenon-7 absolute top-[-20vh] z-[200] flex h-12 w-full items-center justify-center border-xenon-200 bg-transparent px-4 py-2 font-sora text-sm font-medium text-white
              ring  ring-inset transition-all duration-200 focus:top-0 focus:bg-xenon-600 dark:text-xenon-100 dark:hover:bg-xenon-100 dark:hover:text-gray-900"
              href="#main-content"
            >
              Skip to content
            </a>
            <BetaBanner className="hidden md:flex" />

            <div className="dark:border-zinc-800 lg:ml-80 xl:ml-96">
              <header className="lg:pointer-events-none lg:fixed lg:inset-x-0 lg:top-12 lg:z-40 lg:flex">
                <div className="contents dark:border-zinc-800 lg:pointer-events-auto lg:block lg:w-80 lg:border-r lg:border-zinc-900/10 lg:pb-8 lg:dark:border-white/10 xl:w-96">
                  <TopHeader />
                  <aside className="relative top-0 hidden h-screen flex-col overflow-auto bg-gray-100 px-8 py-6 dark:bg-gray-800 lg:pointer-events-auto lg:flex">
                    <div className="sticky top-0 z-10 pb-5 backdrop-blur-sm">
                      <Link href="/">
                        <Logo className="mb-7" />
                      </Link>
                    </div>
                    <Navigation />
                  </aside>
                  <aside className="absolute top-0 z-30 h-screen flex-col overflow-auto lg:pointer-events-auto lg:hidden">
                    <MobileNavigation />
                  </aside>
                </div>
              </header>
              <main
                id="main-content"
                tabIndex={-1}
                className="relative px-4 py-24 sm:px-6 sm:py-28 md:py-40 lg:px-16"
              >
                {children}
              </main>
              <footer className="border-t-1 flex justify-end border border-x-0 border-b-0 px-8 py-4 dark:border-gray-700">
                <button
                  id="ot-sdk-btn"
                  className="ot-sdk-show-settings !border-0 !bg-transparent !font-sora !text-xenon-400 underline-offset-4 transition-colors duration-200 ease-in-out hover:underline"
                >
                  Cookie Settings
                </button>
              </footer>
            </div>
          </div>
        </ThemeProvider>

        <SegmentPage />
      </body>
    </html>
  );
}
