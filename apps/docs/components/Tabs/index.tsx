"use client";

import clsx from "clsx";
import { Children, PropsWithChildren, useRef, useState } from "react";
import Tab from "./Tab";
import TabPanel from "./TabPanel";

export interface TabsProps extends PropsWithChildren {
  ["aria-labelledby"]: string;
  labels: string[];
  defaultTabCount: number; // Default selected tab count (starts from 1)
  className?: string;
  state?: string;
}

const Tabs = ({
  labels,
  className,
  children,
  defaultTabCount,
  state,
  ...props
}: TabsProps) => {
  const tabPanelsRefs = useRef<HTMLDivElement>(null);
  const [selectedTab, setSelectedTab] = useState(defaultTabCount);

  return (
    <div className={clsx(className, "prose my-6")}>
      <div
        className={clsx(
          "w-fit rounded-t-xl bg-gray-100 px-4 py-2 pb-0 shadow-sm",
          "dark:bg-gray-900 dark:dark:bg-opacity-50"
        )}
        role="tablist"
        aria-labelledby={props["aria-labelledby"]}
      >
        {labels.map((label, index) => {
          const tabCount = index + 1;
          const setTabSelection = () => setSelectedTab(tabCount);

          return (
            <Tab
              onSelect={setTabSelection}
              key={label}
              tabCount={tabCount}
              isSelected={selectedTab === tabCount}
            >
              {label}
            </Tab>
          );
        })}
      </div>
      <div
        ref={tabPanelsRefs}
        className={clsx(
          "mt-0 rounded-b-lg rounded-tr-lg bg-gray-100 p-4 shadow-sm",
          "dark:bg-gray-900 dark:bg-opacity-50 dark:text-white"
        )}
      >
        {Children.map(children, (child, index) => {
          const isSelected = index + 1 === selectedTab;

          return (
            <TabPanel key={index} tabCount={index + 1} isSelected={isSelected}>
              {child}
            </TabPanel>
          );
        })}
      </div>
    </div>
  );
};

export default Tabs;
