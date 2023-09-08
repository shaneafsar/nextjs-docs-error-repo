import clsx from "clsx";
import Link from "next/link";
import { PropsWithChildren, createElement } from "react";

const HEADING_CLASS_NAME = {
  h1: "mt-2 scroll-m-60 text-3xl",
  h2: "mt-10 scroll-m-32 pb-1 text-2xl first:mt-5",
  h3: "mt-8 scroll-m-32 text-xl tracking-tight",
  h4: "mt-8 scroll-m-32 text-lg tracking-tight",
  h5: "mt-8 scroll-m-32 text-base tracking-tight",
  h6: "mt-8 scroll-m-32 text-base tracking-tight",
};

interface HeadingProps extends PropsWithChildren {
  tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  id?: string;
  className?: string;
}

// https://css-tricks.com/link-header-header-link/
export default function Heading({
  tag,
  id,
  className,
  children,
}: HeadingProps) {
  let childrenToRender = children;
  if (tag !== "h1" && id) {
    childrenToRender = (
      <Link className="group relative" href={`#${id}`}>
        <span className="absolute -left-6 hidden font-thin text-transparent transition group-hover:text-gray-300 dark:text-gray-600 md:block">
          #
        </span>
        {children}
      </Link>
    );
  }

  return createElement(
    tag,
    {
      id,
      className: clsx(
        "font-sora font-semibold 2xl:scroll-m-60",
        HEADING_CLASS_NAME[tag],
        className
      ),
    },
    childrenToRender
  );
}
