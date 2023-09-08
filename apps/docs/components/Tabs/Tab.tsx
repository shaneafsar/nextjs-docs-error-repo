import clsx from "clsx";
import type { ReactNode } from "react";

interface TabProps {
  tabCount: number;
  children: ReactNode;
  onSelect?: () => void;
  isSelected?: boolean;
}

const Tab = ({ children, tabCount, isSelected, onSelect }: TabProps) => (
  <button
    onClick={onSelect}
    className={clsx(
      "mr-4 px-1 pb-1 text-sm font-semibold transition duration-300 ease-out last:mr-0 hover:text-xenon-700 dark:text-nebula-100 dark:hover:text-white",
      {
        ["border-b-2 border-xenon-700 text-xenon-700 dark:border-white"]:
          isSelected,
        "text-gray-500 dark:text-gray-500": !isSelected,
      }
    )}
    id={`tab-${tabCount}`}
    role="tab"
    aria-selected={isSelected ? "true" : "false"}
    aria-controls={`panel-${tabCount}`}
    tabIndex={isSelected ? 0 : -1}
  >
    {children}
  </button>
);

export default Tab;
