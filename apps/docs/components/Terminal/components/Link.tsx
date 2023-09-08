import clsx from "clsx";
import type { AnchorHTMLAttributes, FC } from "react";

const Link: FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({
  children,
  className,
  ...anchorProps
}) => (
  <a
    className={clsx(linkClassName, className)}
    target="_blank"
    rel="noreferrer"
    {...anchorProps}
  >
    {children}
  </a>
);

export const linkClassName =
  "text-blue-300 font-bold cursor-pointer transition ease-in-out hover:underline hover:text-white";

export default Link;
