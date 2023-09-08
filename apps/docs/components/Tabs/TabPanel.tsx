"use client";

import clsx from "clsx";
import type { HTMLAttributes, ReactNode } from "react";

export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  tabCount: number;
  className?: string;
  isSelected?: boolean;
}

const TabPanel = ({
  children,
  tabCount,
  className,
  isSelected,
  ...props
}: TabPanelProps) => (
  <div
    className={clsx(
      className,
      "tab-panel relative transition duration-100 ease-in-out",
      {
        ["hidden"]: !isSelected,
      }
    )}
    id={`panel-${tabCount}`}
    role="tabpanel"
    tabIndex={0}
    aria-labelledby={`tab-${tabCount}`}
    {...props}
  >
    {children}
  </div>
);

export default TabPanel;
