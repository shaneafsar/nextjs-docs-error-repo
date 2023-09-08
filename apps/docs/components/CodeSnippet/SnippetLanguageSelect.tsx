"use client";
import { useContext } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  LanguagesContext,
  CODE_SNIPPET_COOKIE_NAME,
} from "@components/CodeSnippetGroupUI";
import { Fragment } from "react";
import { ChevronDown } from "react-feather";
import { telemetry } from "@utils/telemetry";
import { selectedLanguage } from "@store/codeLanguage";
import { useCookies } from "react-cookie";
import { usePathname, useSearchParams } from "next/navigation";
import { clsx } from "clsx";

export default function SnippetLanguageSelect({
  title,
  className,
}: {
  title?: string;
  className?: string;
}) {
  const languagesContext = useContext(LanguagesContext);
  const [_, setCookie] = useCookies();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  return (
    <>
      {languagesContext && (
        <div className={clsx("relative", className)}>
          <Listbox
            className={className}
            value={languagesContext?.language}
            onChange={(value) => {
              setCookie(CODE_SNIPPET_COOKIE_NAME, value, {
                path: "/",
              });
              const params = new URLSearchParams(searchParams as any);
              params.set("language", value);
              // TODO: Not using router.push due to Next 13.4 issue
              // See https://github.com/vercel/next.js/discussions/48110#discussioncomment-5905575
              history.replaceState(null, "", pathname + `?${params}`);
              selectedLanguage.set(value);

              telemetry.track({
                name: "Component Interaction",
                properties: {
                  componentId: title || "untitled",
                  componentType: "code_snippet",
                  interactionType: "language_selected",
                  interactionData: `language=${value}`,
                },
              });
            }}
          >
            <Listbox.Button
              className="inline-flex items-center justify-center gap-x-1.5 rounded-md border-0 bg-white px-4 py-1 text-xs font-semibold text-gray-900 ring-1 ring-inset ring-xenon-400 hover:bg-gray-100"
              suppressHydrationWarning={true}
            >
              {languagesContext?.languageDisplay[languagesContext.language]}
              <ChevronDown className="h-3 w-3" />
            </Listbox.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Listbox.Options className="absolute left-0 z-20 mt-1 w-56 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {languagesContext?.languages.map((lang) => (
                  <Listbox.Option
                    key={lang}
                    className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    value={lang}
                  >
                    {languagesContext.languageDisplay[lang]}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </Listbox>
        </div>
      )}
    </>
  );
}
