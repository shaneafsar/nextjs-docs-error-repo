import { autocomplete, getAlgoliaResults } from "@algolia/autocomplete-js";
import { createRedirectUrlPlugin } from "@algolia/autocomplete-plugin-redirect-url";
import algoliasearch from "algoliasearch/lite";

import "@algolia/autocomplete-theme-classic";

const appId = "latency";
const apiKey = "6be0576ff61c053d5f9a3225e2a90f76";
const searchClient = algoliasearch(appId, apiKey);
const redirectUrlPlugin = createRedirectUrlPlugin();

const container = document.querySelector("#app");

autocomplete({
  container,
  openOnFocus: true,
  plugins: [redirectUrlPlugin],
  getSources({ query }) {
    return [
      {
        sourceId: "demo-source",
        templates: {
          item(params) {
            const { item, html } = params;
            return html` <a class="aa-ItemLink">${item.name}</a> `;
          },
        },
        getItemInputValue({ item }) {
          return item.name;
        },
        getItems() {
          return getAlgoliaResults({
            searchClient,
            queries: [
              {
                indexName: "instant_search",
                query,
                params: {
                  // the rules configured for this demo require this context to prevent triggering in other plugin demos
                  ruleContexts: ["enable-redirect-url"],
                  hitsPerPage: 10,
                },
              },
            ],
          });
        },
      },
    ];
  },
});
