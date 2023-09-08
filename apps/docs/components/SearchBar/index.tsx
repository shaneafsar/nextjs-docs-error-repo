"use client";

import "@docsearch/css";
import { DocSearch } from "@docsearch/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Link from "next/link";

import { baseUrl } from "@constants";
import { telemetry } from "@utils/telemetry";
import "./search-bar.css";

function SearchBar({ renderingContext }: { renderingContext?: string }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (theme) {
      const root = document.documentElement;
      root.setAttribute("data-theme", theme);
    }
    setMounted(true);
  }, [theme]);

  useEffect(() => {
    if (mounted && renderingContext === "left-nav") {
      const commandKListener = (e: KeyboardEvent) => {
        if (e.code === "KeyK" && e.metaKey === true) {
          telemetry.track({
            name: "Component Interaction",
            properties: {
              componentType: "search_bar",
              interactionType: "search_modal_shown",
              interactionData: "by_key",
            },
          });
        }
      };

      document.addEventListener("keydown", commandKListener);
      return () => window.removeEventListener("keydown", commandKListener);
    }
  }, [mounted, renderingContext]);

  if (!mounted) {
    return (
      <div className="border-1 h-[50px] w-full animate-pulse rounded-[6px] border bg-white dark:border-[#B6B7D5] dark:bg-[#111827] "></div>
    );
  }

  return (
    <div
      onClick={() => {
        telemetry.track({
          name: "Component Interaction",
          properties: {
            componentType: "search_bar",
            interactionType: "search_modal_shown",
            interactionData: "by_click",
          },
        });
      }}
    >
      <DocSearch
        appId={process.env.NEXT_PUBLIC_DOCSEARCH_APP_ID as string}
        apiKey={process.env.NEXT_PUBLIC_DOCSEARCH_API_KEY as string}
        indexName={process.env.NEXT_PUBLIC_DOCSEARCH_INDEX_NAME as string}
        translations={{ button: { buttonText: "Search docs" } }}
        insights
        hitComponent={({ hit, children }) => {
          const url = new URL(hit.url);
          const path = url.pathname.replace(baseUrl!, "");

          return <Link href={path}>{children}</Link>;
        }}
      />
    </div>
  );
}

export default SearchBar;
