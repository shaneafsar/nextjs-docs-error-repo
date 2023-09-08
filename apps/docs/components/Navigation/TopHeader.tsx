import clsx from "clsx";
import { Layout, Link, Menu, User } from "react-feather";

import SearchBar from "@components/SearchBar";
import TerminalButton from "@components/TerminalButton";
import LogoMonogram from "@components/UI/LogoMonogram";
import ThemeToggle from "@components/UI/ThemeToggle";
import { DASHBOARD_URL, SIGN_IN_URL } from "@constants";
import { openMobileNavigation } from "./MobileNavigation";
import { telemetry } from "@utils/telemetry";
import { LinkWithTelemetry } from "@components/LinkWithTelemetry";

const LINK_CLASSNAMES =
  "font-sora text-sm leading-5 text-gray-600 hover:text-zinc-900 dark:text-gray-200 dark:hover:text-white";

function TopHeader() {
  return (
    <div className="fixed inset-x-0 top-0 z-20 flex h-20 items-center justify-between gap-12 bg-white/90 px-4 backdrop-blur-sm dark:bg-gray-900 dark:backdrop-blur sm:px-6 md:top-12 md:justify-end lg:left-80 lg:z-30 lg:px-8 xl:left-96">
      <div className="mr-auto flex items-center gap-6 lg:hidden">
        <button
          type="button"
          className="h-6 w-6 items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5"
          aria-label="Toggle navigation"
          onClick={openMobileNavigation}
        >
          <Menu className="w-5 stroke-zinc-900 dark:stroke-white" />
        </button>
        <LogoMonogram className="w-6"></LogoMonogram>
      </div>
      <div className="absolute inset-x-0 top-full h-px bg-zinc-900/7.5 dark:bg-white/7.5"></div>
      <nav className="">
        <ul role="list" className="flex items-center gap-4">
          <li className="hidden 2xl:block">
            <LinkWithTelemetry
              className={LINK_CLASSNAMES}
              href="https://academy.algolia.com/trainings"
              prefetch={false}
            >
              Algolia Academy
            </LinkWithTelemetry>
          </li>
          <Pipe />
          <li className="hidden 2xl:block">
            <LinkWithTelemetry
              className={LINK_CLASSNAMES}
              href="https://www.algolia.com/developers/code-exchange/"
              prefetch={false}
            >
              Code Exchange
            </LinkWithTelemetry>
          </li>
          <Pipe />
          <li className="hidden 2xl:block">
            <LinkWithTelemetry
              className={LINK_CLASSNAMES}
              href="https://support.algolia.com/hc/en-us"
              prefetch={false}
            >
              Support
            </LinkWithTelemetry>
          </li>
          <Pipe />
          <li className="hidden md:block">
            <LinkWithTelemetry
              href={SIGN_IN_URL}
              className={LINK_CLASSNAMES}
              prefetch={false}
            >
              <User className="mr-2 inline-block w-4" />
              Login
            </LinkWithTelemetry>
          </li>
          <Pipe classes="md:block" />
          <li className="block md:hidden">
            <SearchBar />
          </li>
          <li>
            <ThemeToggle buttonClasses={LINK_CLASSNAMES} />
          </li>
          <li className="hidden pl-4 md:block">
            <TerminalButton />
            <LinkWithTelemetry
              href={DASHBOARD_URL}
              prefetch={false}
              className="header-cta-primary inline-flex items-center justify-center border-0 bg-xenon-600 py-3 pl-6 pr-8 font-sora text-sm font-medium uppercase tracking-[1px] text-white"
            >
              Dashboard
              <Layout className="ml-2 h-[14px] w-[14px] lg:h-[18px] lg:w-[18px]" />
            </LinkWithTelemetry>
          </li>
        </ul>
      </nav>
    </div>
  );
}

function Pipe({ classes = "" }: { classes?: string }) {
  return (
    <li className={clsx("hidden 2xl:block", classes)}>
      <div className="h-6 w-px bg-gray-200 dark:bg-gray-700"></div>
    </li>
  );
}

export default TopHeader;
