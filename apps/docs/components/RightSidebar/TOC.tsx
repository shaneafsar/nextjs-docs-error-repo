"use client";

import clsx from "clsx";
import Link from "next/link";
import { useParams } from "next/navigation";
import { PropsWithChildren, useEffect, useState } from "react";
import { ChevronDown } from "react-feather";

import { sora } from "app/fonts";

import type { Item } from "@utils/toc";

import Heading from "@components/Heading";
import "./TOC.css";

type Props = {
  headings: Item[];
  isMobile?: boolean;
};

export default function TOC({ headings, isMobile }: Props) {
  const [currentHeading, setCurrentHeading] = useState({
    url: headings[0].url,
    title: headings[0].title,
  });
  const [open, setOpen] = useState(!isMobile);

  useEffect(() => {
    const headingsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentHeading({
              url: `#${entry.target.id}`,
              title: entry.target.textContent ?? "",
            });
          }
        });
      },
      {
        rootMargin: "-10% 0% -80% 0%",
      }
    );

    headings.forEach((heading) => {
      // heading.url is already in the shape of an ID selector, i.e #getting-started
      // remove # from the beginning of the string
      if (!heading?.url) return;
      const headingId = heading.url.replace(/^#/, "");
      const el = document.getElementById(headingId);
      if (el) {
        headingsObserver.observe(el);
      }
    });

    return () => {
      headingsObserver.disconnect();
    };
  }, [headings]);

  const Container = ({ children }: PropsWithChildren) => {
    return isMobile ? (
      <details
        {...{ open }}
        onToggle={(e) => setOpen(e.currentTarget.open)}
        className="mobile-container"
        data-testid="toc-mobile"
      >
        {children}
      </details>
    ) : (
      <div data-testid="toc">{children}</div>
    );
  };

  const HeadingContainer = ({ children }: PropsWithChildren) => {
    return isMobile ? (
      <summary className="mobile-header">
        <div className="mobile-header-content">
          <div className="toggle">
            {children}
            <ChevronDown className="ml-1 text-gray-600 dark:text-xenon-100" />
          </div>
        </div>
      </summary>
    ) : (
      <>{children}</>
    );
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isMobile) return;

    setOpen(false);
    setCurrentHeading({
      url: e.currentTarget.getAttribute("href")!,
      title: e.currentTarget.textContent || "",
    });
  };

  const params = useParams();

  let currentPageSlug;

  if (Array.isArray(params.slug)) {
    currentPageSlug = params.slug.join("/");
  } else {
    currentPageSlug = params.slug;
  }

  return (
    <Container>
      <HeadingContainer>
        <div className="text-md text-gray-600 dark:text-gray-300 2xl:mb-4 2xl:text-gray-800 2xl:dark:text-gray-100">
          On this page
        </div>
      </HeadingContainer>
      <ul
        className={clsx(
          "flex flex-col",
          {
            "mt-2 overflow-hidden rounded border border-gray-900 bg-gray-800 dark:border-xenon-100 dark:bg-gray-900":
              isMobile,
            "space-y-2": !isMobile,
          },
          sora.className
        )}
      >
        {headings.map((heading, index) => {
          const isCurrent = currentHeading.url === heading.url;
          return (
            <li
              key={heading.url || heading.title || index}
              className={clsx("relative text-sm  dark:text-gray-400", {
                "current-heading": isCurrent,
                "px-4 py-2 first-of-type:pt-3 last-of-type:pb-3": isMobile,
                "bg-gray-700": isCurrent && isMobile,
              })}
            >
              <Link
                className={clsx("block truncate font-medium", {
                  "text-xenon-100": isMobile,
                  "text-gray-400 transition-colors hover:text-xenon-800 hover:underline dark:hover:text-xenon-100":
                    !isMobile,
                  "text-xenon-800 dark:text-xenon-100": isCurrent && !isMobile,
                })}
                href={`/${currentPageSlug}${heading.url}`}
              >
                {heading.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </Container>
  );
}
