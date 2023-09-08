"use client";

import type { NavLink, NavigationGroup } from "@ts/navigation";
import { useMemo } from "react";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function useNavigation(
  nav: NavigationGroup[],
  currentPage: string
) {
  return useMemo(() => {
    let subNavigation = null as NavLink[] | null;
    let parentPage = null as NavigationGroup | null;
    let returnLink = null as NavLink | null;

    // find using regex link the link.match that matches the current page
    const currentCategoryIndex = nav.findIndex((group) => {
      if (!group.match) return false;
      return group.match.test(currentPage);
    });

    if (currentCategoryIndex !== -1) {
      // build a sub navigation from the current category
      const currentCategory = nav[currentCategoryIndex];
      subNavigation = currentCategory.links!;
      parentPage = currentCategory;
      returnLink = currentCategory.returnLink || null;
    }

    return { navigation: nav, subNavigation, parentPage, returnLink };
  }, [nav, currentPage]);
}

export const useNavigationEvent = (onPathnameChange: () => void) => {
  const pathname = usePathname(); // Get current route

  // Save pathname on component mount into a REF
  const savedPathNameRef = useRef(pathname);

  useEffect(() => {
    // If REF has been changed, do the stuff
    if (savedPathNameRef.current !== pathname) {
      onPathnameChange();
      // Update REF
      savedPathNameRef.current = pathname;
    }
  }, [pathname, onPathnameChange]);
};
