import type { IconProps } from "@components/Icon";

export type NavLink = {
  /** The title of the link **(MUST BE UNIQUE)** */
  title: string;
  /** Link to page */
  href?: string;
  /** A tag that will be added next to the link, useful to show api methods */
  tag?: string;
  /** Specifies if the entry is a section title, isSection serves to identify a group of links  */
  isSection?: boolean;
  /** A page that contains property specs, implies that the sublinks will be dynamically generated from page headings */
  isSpecPage?: boolean;
  /** Specifies if the entry should be closed (not expanded) by default  */
  isClosed?: boolean;
  /** An array of sublinks  */
  links?: NavLink[];
};

export type NavigationGroup = {
  /** The title of the category **(MUST BE UNIQUE)** */
  title: string;
  /** Link to the overview page */
  href?: string;
  /** Enforces a specific return link on the current navigation context (replaces < home)  */
  returnLink?: NavLink;
  /** An array of sublinks  */
  links?: NavLink[];
  /** matching regex link which will trigger the subnavigation  */
  match?: RegExp;
  /** The icon component that will sit next to the link  */
  icon?: IconProps["name"];
  /** The name of the section this group appears in on the homepage */
  topLevelSection?: "getting-started" | "guides" | "reference";
};
