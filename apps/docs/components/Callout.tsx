import clsx from "clsx";
import type { ReactNode } from "react";
import { Info, AlertTriangle, CheckCircle } from "react-feather";

type Props = {
  children: ReactNode;
  type?: "info" | "warning" | "note" | "success" | "panel";
  className?: string;
  title?: string;
};

const getCalloutClassFromType = (type: Props["type"]) => {
  switch (type) {
    case "info":
      return "border-gray-500/20 bg-gray-50/50 text-gray-900 dark:border-gray-500/30 dark:bg-gray-500/5 dark:text-gray-200 dark:[--tw-prose-links-hover:theme(colors.gray.300)]";
    case "panel":
      return "border-gray-500/20 bg-gray-50/50 text-gray-900 dark:border-gray-500/30 dark:bg-gray-500/5 dark:text-gray-200 dark:[--tw-prose-links-hover:theme(colors.gray.300)]";
    case "warning":
      return "border-yellow-500/20 bg-yellow-50/50 text-yellow-900 dark:border-yellow-500/30 dark:bg-yellow-500/5 dark:text-yellow-200 dark:[--tw-prose-links-hover:theme(colors.yellow.300)]";
    case "note":
      return "border-blue-500/20 bg-blue-50/50 text-blue-900 dark:border-blue-500/30 dark:bg-blue-500/5 dark:text-blue-200 dark:[--tw-prose-links-hover:theme(colors.blue.300)]";
    case "success":
      return "border-emerald-500/20 bg-emerald-50/50 text-emerald-900 dark:border-emerald-500/30 dark:bg-emerald-500/5 dark:text-emerald-200 dark:[--tw-prose-links-hover:theme(colors.emerald.300)]";
    default:
      return "border-gray-500/20 bg-gray-50/50 text-gray-900 dark:border-gray-500/30 dark:bg-gray-500/5 dark:text-gray-200 dark:[--tw-prose-links-hover:theme(colors.gray.300)]";
  }
};

const getIconFromType = (type: Props["type"]) => {
  const baseClass = "mt-[0.4rem] h-4 w-4 flex-none";
  switch (type) {
    case "info":
      return (
        <Info
          className={`${baseClass} fill-gray-500 stroke-gray-50 dark:fill-gray-200/20 dark:stroke-gray-200`}
        />
      );
    case "warning":
      return (
        <AlertTriangle
          className={`${baseClass} fill-yellow-500 stroke-yellow-50 dark:fill-yellow-200/20 dark:stroke-yellow-200`}
        />
      );
    case "note":
      return (
        <Info
          className={`${baseClass} fill-blue-500 stroke-blue-50 dark:fill-blue-200/20 dark:stroke-blue-200`}
        />
      );
    case "success":
      return (
        <CheckCircle
          className={`${baseClass} fill-emerald-500 stroke-emerald-50 dark:fill-emerald-200/20 dark:stroke-emerald-200`}
        />
      );
    default:
      return null;
  }
};

const getTitleFromType = (type: Props["type"], title?: string) => {
  const baseClass = "my-0 font-bold uppercase tracking-wider";
  if (!title) return null;
  switch (type) {
    case "info":
      return (
        <p className={`${baseClass} text-gray-500 dark:text-slate-200/70`}>
          {title}
        </p>
      );
    case "panel":
      return (
        <p className={`${baseClass} text-gray-500 dark:text-slate-200/70`}>
          {title}
        </p>
      );
    case "warning":
      return (
        <p className={`${baseClass} text-yellow-500 dark:text-yellow-500/70`}>
          {title}
        </p>
      );
    case "note":
      return (
        <p className={`${baseClass} text-blue-500 dark:text-blue-200/70`}>
          {title}
        </p>
      );
    case "success":
      return (
        <p className={`${baseClass} text-emerald-500 dark:text-emerald-200/70`}>
          {title}
        </p>
      );
    default:
      return (
        <p className={`${baseClass} text-slate-500 dark:text-slate-200/70`}>
          {title}
        </p>
      );
  }
};

const Callout = ({ children, type, title, className }: Props) => {
  const calloutClass = getCalloutClassFromType(type);

  return (
    <div
      className={clsx(
        `my-6 flex max-w-prose gap-2.5 rounded-2xl border p-4 leading-6 dark:[--tw-prose-links:theme(colors.white)]`,
        calloutClass,
        className
      )}
      data-testid={type === "panel" ? "panel" : "callout"}
    >
      {getIconFromType(type)}
      <div>
        {getTitleFromType(type, title)}
        <div className="[&>:first-child]:mt-0 [&>:last-child]:mb-0">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Callout;
