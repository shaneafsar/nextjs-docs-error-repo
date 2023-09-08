#!/usr/bin/env node
const fsPromise = require("fs/promises");
const SwaggerParser = require("@apidevtools/swagger-parser");

const importSpec = async ({ name, url }) => {
  console.info(`Importing ${name} api spec...`);

  const spec = await SwaggerParser.dereference(url);
  await fsPromise.writeFile(
    `./public/specs/${name}.json`,
    JSON.stringify(spec)
  );

  console.info(`Done importing ${name} api spec!`);
};

importSpec({
  name: "ab-test",
  url: "https://raw.githubusercontent.com/algolia/api-clients-automation/main/specs/abtesting/spec.yml",
});

importSpec({
  name: "analytics",
  url: "https://raw.githubusercontent.com/algolia/api-clients-automation/main/specs/analytics/spec.yml",
});

importSpec({
  name: "ingestion",
  url: "https://raw.githubusercontent.com/algolia/api-clients-automation/main/specs/ingestion/spec.yml",
});

importSpec({
  name: "insights",
  url: "https://raw.githubusercontent.com/algolia/api-clients-automation/main/specs/insights/spec.yml",
});

importSpec({
  name: "personalization",
  url: "https://raw.githubusercontent.com/algolia/api-clients-automation/main/specs/personalization/spec.yml",
});

importSpec({
  name: "predict",
  url: "https://raw.githubusercontent.com/algolia/api-clients-automation/main/specs/predict/spec.yml",
});

importSpec({
  name: "query-suggestions",
  url: "https://raw.githubusercontent.com/algolia/api-clients-automation/main/specs/query-suggestions/spec.yml",
});

importSpec({
  name: "recommend",
  url: "https://raw.githubusercontent.com/algolia/api-clients-automation/main/specs/recommend/spec.yml",
});

importSpec({
  name: "search",
  url: "https://raw.githubusercontent.com/algolia/api-clients-automation/main/specs/search/spec.yml",
});
