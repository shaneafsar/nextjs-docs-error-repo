"use client";

import { atom } from "nanostores";
import { useStore } from "@nanostores/react";
import Navigation from "./Navigation";
import Logo from "@components/UI/Logo";
import Link from "next/link";
import { X } from "react-feather";
import clsx from "clsx";
import ThemeToggle from "@components/UI/ThemeToggle";
import { useNavigationEvent } from "@hooks/useNavigation";
import BetaBanner from "@components/BetaBanner";
import { telemetry } from "@utils/telemetry";

export const isOpenMobileNavigationAtom = atom(false);
export const openMobileNavigation = () => isOpenMobileNavigationAtom.set(true);
export const closeMobileNavigation = () =>
  isOpenMobileNavigationAtom.set(false);

export default function MobileNavigation() {
  const isOpen = useStore(isOpenMobileNavigationAtom);
  useNavigationEvent(() => isOpen && closeMobileNavigation());

  return (
    <>
      {isOpen && (
        <div
          className={clsx(
            "fixed bottom-0 left-0 top-0 flex w-full flex-col justify-between gap-3 overflow-y-auto bg-white px-8 pb-4 pt-6 shadow-lg shadow-gray-1000/10 ring-1 ring-gray-1000/7.5 dark:bg-gray-900 dark:ring-zinc-800 min-[416px]:max-w-md sm:px-6 sm:pb-10"
          )}
          data-testid="left-mobile-nav"
        >
          <div className="flex items-center justify-between">
            <Link href="/">
              <Logo className="h-10" />
            </Link>
            <button
              type="button"
              className="flex h-6 w-6 items-center justify-center rounded-md ring-1 ring-gray-100 transition hover:bg-zinc-900/5 dark:ring-gray-900 dark:hover:bg-white/5 lg:hidden"
              aria-label="Toggle navigation"
              onClick={closeMobileNavigation}
            >
              <X className="w-5 stroke-zinc-900 dark:stroke-white" />
            </button>
          </div>

          <BetaBanner className="block md:hidden" />

          <Navigation className="mt-8 flex-1" />

          <ul role="list" className="mt-8 flex items-center gap-5">
            <li>
              <a
                className="text-xs leading-5 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                href="https://academy.algolia.com/trainings"
                onClick={() => {
                  telemetry.track({
                    name: "Component Interaction",
                    properties: {
                      componentType: "link",
                      interactionType: "click",
                      interactionData:
                        "path=https://academy.algolia.com/trainings",
                    },
                  });
                }}
              >
                Algolia Academy
              </a>
            </li>
            <li>
              <a
                className="text-xs leading-5 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                href="https://www.algolia.com/developers/code-exchange/"
                onClick={() => {
                  telemetry.track({
                    name: "Component Interaction",
                    properties: {
                      componentType: "link",
                      interactionType: "click",
                      interactionData:
                        "path=https://www.algolia.com/developers/code-exchange/",
                    },
                  });
                }}
              >
                Code Exchange
              </a>
            </li>
            <li>
              <a
                className="text-xs leading-5 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                href="https://support.algolia.com/hc/en-us"
                onClick={() => {
                  telemetry.track({
                    name: "Component Interaction",
                    properties: {
                      componentType: "link",
                      interactionType: "click",
                      interactionData:
                        "path=https://support.algolia.com/hc/en-us",
                    },
                  });
                }}
              >
                Support
              </a>
            </li>
            <li>
              <div className="h-4 w-px bg-zinc-900/7.5 dark:bg-white/7.5"></div>
            </li>
            <li>
              <ThemeToggle />
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
