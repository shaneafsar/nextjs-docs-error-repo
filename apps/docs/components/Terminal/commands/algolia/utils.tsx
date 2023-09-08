import type { RunCommand } from "@algolia/coquille";
import AlgoliaCliLogo from "../../components/AlgoliaCliLogo";
import Link from "../../components/Link";

export const notAvailableCommandRun: (commandName: string) => RunCommand =
  (commandName) => () => (
    <Link
      className="group mt-2 block w-1/2 font-normal transition hover:no-underline"
      href="https://www.algolia.com/doc/tools/cli/get-started/overview/#install-the-algolia-cli"
    >
      <article className="rounded-md bg-[#e5e7eb] p-6 text-gray-700 transition-shadow group-hover:shadow-xl group-hover:shadow-[#5367fe]">
        <h3 className="flex items-center whitespace-normal text-sm font-bold">
          <AlgoliaCliLogo className="mr-2 h-4" />
          Cannot run &apos;{commandName}&apos;
        </h3>
        <p className="mt-2 whitespace-normal">
          Some commands such as destructive ones cannot be run from the
          documentation website.
        </p>
        <button className="mt-3 rounded-l-md rounded-r-3xl bg-[#5367fe] py-2 pl-4 pr-6 font-bold text-white transition group-hover:translate-x-2">
          {"Get started with Algolia CLI >_"}
        </button>
      </article>
    </Link>
  );
