import type { Command, FlagValues, RunCommand } from "@algolia/coquille";
import { formatError } from "@components/Terminal/commands/utils";
import algoliasearch from "algoliasearch";
import Json from "../../../../components/Json";
import { getDefaultProfile } from "../../profile/utils";
import formatBytes from "./formatBytes";
import formatTime from "./formatTime";

interface Flags extends FlagValues {
  output: "json";
}

const run: RunCommand<Flags> = async ({ flags }) => {
  const defaultProfile = getDefaultProfile();
  const client = algoliasearch(
    defaultProfile.appId || "",
    defaultProfile.adminApiKey || ""
  );

  try {
    const indices = await client.listIndices();

    if (flags && flags.output === "json") {
      return <Json className="mt-5 block" object={indices} />;
    }

    return (
      <>
        <p id="indices-list" className="hidden">
          List of indices with name, entries, size, updated at, created at, last
          build duration, primary and replicas
        </p>
        <table aria-describedby="indices-list">
          <thead>
            <tr className="text-left">
              <th scope="col" className="pr-6">
                NAME
              </th>
              <th scope="col" className="pr-6">
                ENTRIES
              </th>
              <th scope="col" className="pr-6">
                SIZE
              </th>
              <th scope="col" className="pr-6">
                UPDATED AT
              </th>
              <th scope="col" className="pr-6">
                CREATED AT
              </th>
              <th scope="col" className="pr-6">
                LAST BUILD DURATION
              </th>
              <th scope="col" className="pr-6">
                PRIMARY
              </th>
              <th scope="col">REPLICAS</th>
            </tr>
          </thead>
          <tbody>
            {indices.items.map(
              ({
                dataSize,
                entries,
                name,
                primary,
                replicas,
                updatedAt,
                createdAt,
                lastBuildTimeS,
              }) => (
                <tr key={name}>
                  <td className="pr-6">{name}</td>
                  <td className="pr-6">{entries.toLocaleString()}</td>
                  <td className="pr-6">{formatBytes(dataSize)}</td>
                  <td className="pr-6">{formatTime(new Date(updatedAt))}</td>
                  <td className="pr-6">{formatTime(new Date(createdAt))}</td>
                  <td className="pr-6">{`${lastBuildTimeS}s`}</td>
                  <td className="pr-6">{primary}</td>
                  <td className="pr-6">[{replicas?.join(" ")}]</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </>
    );
  } catch (error) {
    return formatError("an error occurred while fetching indices.");
  }
};

const list: Command<Flags> = {
  shortDesc: "List indices",
  args: { nbArgs: 0 },
  flags: {
    output: {
      shortDesc: "Output format (json).",
      type: "string",
      shorthand: "o",
      suggestions: [
        { name: "json", alias: "o", description: "output list in json format" },
      ],
    },
  },
  run,
};

export default list as Command;
