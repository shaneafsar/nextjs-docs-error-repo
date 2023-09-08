import { autocomplete } from "@algolia/autocomplete-js";
import { createQuerySuggestionsPlugin } from "@algolia/autocomplete-plugin-query-suggestions";

import { createProductsPlugin } from "./components/productsPlugin.jsx";
import { searchClient } from "./searchClient";

import "@algolia/autocomplete-theme-classic";

const querySuggestionsPlugin = createQuerySuggestionsPlugin({
  searchClient,
  indexName: "instant_search_demo_query_suggestions",
  getSearchParams() {
    return {
      hitsPerPage: 3,
    };
  },
  categoryAttribute: [
    "instant_search",
    "facets",
    "exact_matches",
    "categories",
  ],
  categoriesPerItem: 2,
});

const productsPlugin = createProductsPlugin();

autocomplete({
  container: document.querySelector("#app"),
  plugins: [querySuggestionsPlugin, productsPlugin],
  openOnFocus: true,
});
