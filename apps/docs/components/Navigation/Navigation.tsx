"use client";

import { usePathname, useParams } from "next/navigation";
import { AnchorHTMLAttributes, useEffect, useState, useRef } from "react";
import Link from "next/link";
import clsx from "clsx";
import { ChevronLeft } from "react-feather";

import useNavigation from "@hooks/useNavigation";
import Icon from "@components/Icon";
import Tag from "../UI/Tag";
import type { NavLink, NavigationGroup } from "@ts/navigation";
import { sora } from "app/fonts";
import { telemetry } from "@utils/telemetry";

import { baseUrl } from "@constants";
import navData from "../../navigation/default";

interface NavigationLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  tag?: string;
  isSpecPage?: boolean;
  isActive?: boolean;
  isTopLevel?: boolean;
}

function NavigationLink({
  href,
  tag,
  children,
  isActive = false,
  isTopLevel,
}: NavigationLinkProps) {
  // Dummy object to validate and check URL components
  const urlValidator = new URL(href, "https://algolia.com");

  const linkRef = useRef<HTMLLinkElement>(null);

  useEffect(() => {
    if (isActive && linkRef.current) {
      linkRef.current.scrollIntoView();
    }
  }, [linkRef, isActive]);

  return (
    <Link
      ref={linkRef}
      href={href}
      onClick={() => {
        // Check if this is a "scroll to" link (e.g. for API ref pages)
        if (urlValidator.hash) {
          const el = document.getElementById(urlValidator.hash.slice(1));
          el?.scrollIntoView({ behavior: "smooth" });
        } else {
          window.scrollTo({ top: 0, behavior: "instant" } as any);
        }
        if (isTopLevel) {
          telemetry.track({
            name: "Component Interaction",
            properties: {
              componentType: "left_sidebar",
              interactionType: "section_click",
              interactionData: `path=${href}`,
            },
          });
        } else {
          telemetry.track({
            name: "Component Interaction",
            properties: {
              componentType: "left_sidebar",
              interactionType: "link_click",
              interactionData: `path=${href}`,
            },
          });
        }
      }}
      aria-current={isActive ? "page" : undefined}
      data-testid={children}
      className={clsx(
        "flex scroll-mt-16  items-center justify-between truncate py-0 pr-3 text-sm no-underline transition-all ease-in-out hover:text-xenon-600 dark:text-gray-200 dark:hover:text-white",
        isActive && "text-xenon-600 dark:text-xenon-300",
        !isTopLevel &&
          "text-gray-500 hover:text-xenon-600 dark:text-gray-200 dark:hover:text-white"
      )}
    >
      <span className="mr-2 truncate">{children}</span>
      {tag && <Tag variant="small">{tag}</Tag>}
    </Link>
  );
}

type NavigationGroupProps = {
  group: NavigationGroup;
};

function NavigationGroup({ group }: NavigationGroupProps) {
  let href = "#";
  // if the group has a link, use it
  if (group.href) {
    href = group.href;
  }
  // use the first link of the group if it has one
  else if (group.links && group.links.length > 0) {
    href = group.links[0].href || "#";
  }

  return (
    <Link
      className="relative mt-3 flex cursor-pointer items-center gap-2 text-gray-800 transition-all ease-in-out hover:text-xenon-600 dark:text-gray-200 dark:hover:text-xenon-400"
      href={href}
      data-testid={group.title}
      onClick={() => {
        telemetry.track({
          name: "Component Interaction",
          properties: {
            componentType: "left_sidebar",
            interactionType: "category_click",
            interactionData: `category=${group.title}`,
          },
        });
      }}
    >
      {group.icon ? <Icon name={group.icon} /> : null}{" "}
      <span>{group.title}</span>
    </Link>
  );
}

type NavigationSubsectionProps = {
  group: NavLink;
  currentPage: string;
  isTopLevel?: boolean;
  className?: string;
};

function NavigationSubSectionGroup({
  group,
  currentPage,
  isTopLevel,
  className,
}: NavigationSubsectionProps) {
  const { slug } = useParams();
  const [links, setLinks] = useState(group.links);

  let currentPageSlug;

  if (Array.isArray(slug)) {
    currentPageSlug = slug.join("/");
  } else {
    currentPageSlug = slug;
  }

  useEffect(() => {
    if (
      group.isSpecPage &&
      group.href &&
      group.href.includes(currentPageSlug)
    ) {
      const navDataElement = document.getElementById("spec-nav-data");
      if (navDataElement?.textContent) {
        const navData = JSON.parse(navDataElement?.textContent);
        const navLinks = navData.find(
          (item: any) => group.href && group.href.includes(item.slug)
        )?.links;

        setLinks(navLinks);
      }
    }
    if (
      group.isSpecPage &&
      group.href &&
      group.href.includes(currentPageSlug) === false
    ) {
      setLinks([]);
    }
  }, [group, currentPageSlug]);

  return (
    <>
      {group.href && (
        <NavigationLink
          tag={group.tag}
          href={group.href || "#"}
          isActive={currentPage?.includes(group.href || "")}
          isSpecPage={group.isSpecPage}
          isTopLevel={isTopLevel}
          className={className}
        >
          {group.title}
        </NavigationLink>
      )}

      {group.isSection && (
        <h3 className="text-xs font-semibold uppercase tracking-wide transition-all ease-in-out">
          {group.title}
        </h3>
      )}

      {links && links.length > 0 ? (
        <ul
          className={clsx(
            "relative mb-4 flex flex-col gap-4 border border-y-0 border-r-0",
            group.isSection && "border-l-transparent",
            !group.isSection && "border-1 border-l-gray-200 pl-6"
          )}
        >
          {links.map((subLink, idx) => (
            <li key={idx} className="flex flex-col gap-4">
              <NavigationSubSectionGroup
                group={subLink}
                currentPage={currentPage}
              />
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}

interface NavigationProps {
  className?: string;
}

export default function Navigation({ className }: NavigationProps) {
  const pathname = usePathname();

  const currentPage = pathname.includes(baseUrl!)
    ? `${pathname.split(baseUrl!)[1]}/`
    : `${pathname}/`;

  const { navigation, subNavigation, parentPage, returnLink } = useNavigation(
    navData,
    currentPage
  );

  const isSubSection = subNavigation !== null && subNavigation.length > 0;

  return (
    <nav
      className={clsx(
        className,
        "bg-scale-200 overflow-x-hidden text-sm  font-normal ease-in-out md:mb-16 lg:opacity-100",
        sora.className,
        { ["flex flex-col gap-8"]: !isSubSection },
        { ["mt-3 overflow-y-hidden"]: isSubSection }
      )}
      data-testid="left-sidebar"
    >
      {!isSubSection && (
        <>
          <ul>
            {navigation
              .filter((n) => n.topLevelSection === "getting-started")
              .map((group) => (
                <li key={group.title}>
                  <NavigationGroup group={group} />
                </li>
              ))}
          </ul>
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wide transition-all ease-in-out">
              Guides
            </h2>
            <ul>
              {navigation
                .filter((n) => n.topLevelSection === "guides")
                .map((group) => (
                  <li key={group.title}>
                    <NavigationGroup key={group.title} group={group} />
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wide transition-all ease-in-out">
              Reference
            </h2>
            <ul>
              {navigation
                .filter((n) => n.topLevelSection === "reference")
                .map((group) => (
                  <li key={group.title}>
                    <NavigationGroup group={group} />
                  </li>
                ))}
            </ul>
          </div>
        </>
      )}

      {isSubSection && (
        <div className="relative mt-3 flex h-full flex-col">
          <div>
            <Link
              className="mb-4 flex items-center gap-1 text-sm text-gray-800 dark:text-gray-50"
              href={returnLink ? returnLink.href : "/"}
              onClick={() => {
                telemetry.track({
                  name: "Component Interaction",
                  properties: {
                    componentType: "left_sidebar",
                    interactionType: "back_click",
                    interactionData: `category=${parentPage?.title}`,
                  },
                });
              }}
            >
              <ChevronLeft className="h-4 w-4" />{" "}
              <span>{returnLink ? returnLink.title : "Home"}</span>
            </Link>
            {parentPage && (
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-800 transition-all ease-in-out dark:text-gray-50">
                {parentPage.icon ? <Icon name={parentPage.icon} /> : null}{" "}
                <span>{parentPage.title}</span>
              </h2>
            )}
          </div>
          <ul className="relative flex scroll-mt-16 flex-col gap-4 overflow-y-auto">
            {subNavigation.map((group) => (
              <li key={group.title} className="flex flex-col gap-4">
                <NavigationSubSectionGroup
                  group={group}
                  currentPage={currentPage}
                  isTopLevel
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
