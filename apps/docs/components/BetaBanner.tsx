import Link from "next/link";
import clsx from "clsx";

type Props = {
  className?: string;
};

export default function BetaBanner({ className = "" }: Props) {
  return (
    <Link
      href="https://algolia.com/doc"
      className={clsx(
        "group -mb-4 mt-4 items-center justify-center rounded bg-gray-900 px-2 py-6 text-center text-gray-200 dark:bg-gray-200 dark:text-gray-900 md:fixed md:left-0 md:right-0 md:top-0 md:z-40 md:m-0 md:h-12 md:rounded-none md:p-0",
        className
      )}
    >
      You&apos;re visiting the public beta of Algolia&apos;s new docs! Find the existing
      docs at
      <span className="ml-1 inline-block text-xenon-300 group-hover:underline dark:text-xenon-700">
        algolia.com/doc
      </span>
    </Link>
  );
}
