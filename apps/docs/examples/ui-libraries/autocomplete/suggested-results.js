import { autocomplete } from "@algolia/autocomplete-js";
import { createQuerySuggestionsPlugin } from "@algolia/autocomplete-plugin-query-suggestions";

import { searchClient } from "./searchClient";

import "@algolia/autocomplete-theme-classic";

const querySuggestionsPlugin = createQuerySuggestionsPlugin({
  searchClient,
  indexName: "instant_search_demo_query_suggestions",
});

autocomplete({
  container: document.querySelector("#app"),
  plugins: [querySuggestionsPlugin],
  openOnFocus: true,
});
