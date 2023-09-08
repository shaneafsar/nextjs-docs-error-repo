"use client";

import { Moon, Sun } from "react-feather";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import clsx from "clsx";

type Props = {
  buttonClasses?: string;
};

const ThemeToggle = ({ buttonClasses = "" }: Props) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-[24px] w-[24px]"></div>;
  }

  const handleSetTheme = (theme: "light" | "dark") => () => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    setTheme(theme);
  };

  return (
    <div className="flex items-center text-gray-600 hover:text-zinc-900 dark:text-gray-200 dark:hover:text-white">
      {theme === "dark" && (
        <button
          onClick={handleSetTheme("light")}
          className={clsx("inline-flex items-center", buttonClasses)}
        >
          <Sun className="mr-2 w-4" />
          <span className="sr-only">Light Mode</span>
        </button>
      )}
      {theme === "light" && (
        <button
          onClick={handleSetTheme("dark")}
          className={clsx("inline-flex items-center", buttonClasses)}
        >
          <Moon className="mr-2 w-4" />
          <span className="sr-only">Dark Mode</span>
        </button>
      )}
    </div>
  );
};

export default ThemeToggle;
