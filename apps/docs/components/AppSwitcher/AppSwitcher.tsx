import cx from "clsx";
import { ChevronUp, ChevronDown } from "react-feather";

import type { Application } from "@store/application";
import {
  getApplicationColors,
  getApplicationInitials,
} from "@utils/avatar-utils";

type Props = {
  selectedApplication?: Application;
};

export default function AppSwitcher({ selectedApplication }: Props) {
  const handleShowAppList = () => {};

  return (
    <div data-testid="app-switcher">
      <p className="text-xs font-medium text-gray-500 dark:text-gray-300">
        Application
      </p>
      <button
        className="flex cursor-pointer items-center space-x-2"
        onClick={handleShowAppList}
      >
        <span
          role="img"
          aria-label={selectedApplication?.name}
          className={cx(
            "flex h-5 w-5 items-center justify-center rounded text-[8px] uppercase leading-none",
            getApplicationColors(selectedApplication)
          )}
        >
          {getApplicationInitials(selectedApplication)}
        </span>
        <span className="truncate text-xs font-bold text-gray-700 dark:text-gray-200">
          {selectedApplication?.name}
        </span>
        <span>
          <ChevronUp
            className="-mb-[3px] stroke-gray-600 dark:stroke-gray-300"
            size={12}
          />
          <ChevronDown
            className="stroke-gray-600 dark:stroke-gray-300"
            size={12}
          />
        </span>
      </button>
    </div>
  );
}
