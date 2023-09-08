/** @jsx h */
import { h } from "preact";
import { autocomplete, getAlgoliaFacets } from "@algolia/autocomplete-js";
import { createTagsPlugin } from "@algolia/autocomplete-plugin-tags";

import { searchClient } from "../searchClient";
import { FacetItem } from "./FacetItem.jsx";

import "@algolia/autocomplete-theme-classic";
import "@algolia/autocomplete-plugin-tags/dist/theme.min.css";

const tagsPlugin = createTagsPlugin({
  getTagsSubscribers() {
    return [
      {
        sourceId: "brands",
        getTag({ item }) {
          return item;
        },
      },
    ];
  },
});

export default function render() {
  autocomplete({
    container: document.querySelector("#app"),
    openOnFocus: true,
    plugins: [tagsPlugin],
    getSources() {
      return [
        {
          sourceId: "brands",
          getItems({ query }) {
            return getAlgoliaFacets({
              searchClient,
              queries: [
                {
                  indexName: "instant_search",
                  facet: "brand",
                  params: {
                    facetQuery: query,
                    maxFacetHits: 5,
                  },
                },
              ],
              transformResponse({ facetHits }) {
                return facetHits[0].map((hit) => ({ ...hit, facet: "brand" }));
              },
            });
          },
          templates: {
            item({ item, components }) {
              return <FacetItem hit={item} components={components} />;
            },
          },
        },
      ];
    },
  });
}
