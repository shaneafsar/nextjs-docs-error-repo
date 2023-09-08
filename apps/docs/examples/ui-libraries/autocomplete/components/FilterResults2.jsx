/** @jsx h */
import { h } from "preact";
import {
  autocomplete,
  getAlgoliaFacets,
  getAlgoliaResults,
} from "@algolia/autocomplete-js";
import { createTagsPlugin } from "@algolia/autocomplete-plugin-tags";

import { searchClient } from "../searchClient";
import { FacetItem } from "./FacetItem.jsx";
import { LargeImageProductItem } from "./LargeImageProductItem.jsx";
import { mapToAlgoliaFilters } from "../utils/mapToAlgoliaFilters";
import { mapToAlgoliaNegativeFilters } from "../utils/mapToAlgoliaNegativeFilters";
import { groupBy } from "../utils/groupBy";

import "@algolia/autocomplete-theme-classic";
import "@algolia/autocomplete-plugin-tags/dist/theme.min.css";

const tagsPlugin = createTagsPlugin({
  initialTags: [
    {
      label: "Apple",
      facet: "brand",
    },
    {
      label: "Samsung",
      facet: "brand",
    },
    {
      label: "Cell Phones",
      facet: "categories",
    },
  ],
  getTagsSubscribers() {
    return [
      {
        sourceId: "brands",
        getTag({ item }) {
          return item;
        },
      },
      {
        sourceId: "categories",
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
    getSources({ state, query }) {
      const tagsByFacet = groupBy(
        state.context.tagsPlugin.tags,
        (tag) => tag.facet
      );

      return [
        {
          sourceId: "brands",
          onSelect({ item, setQuery }) {
            if (item.label.toLowerCase().includes(query.toLowerCase())) {
              setQuery("");
            }
          },
          getItems() {
            return getAlgoliaFacets({
              searchClient,
              queries: [
                {
                  indexName: "instant_search",
                  facet: "brand",
                  params: {
                    facetQuery: query,
                    maxFacetHits: 3,
                    filters: mapToAlgoliaNegativeFilters(
                      state.context.tagsPlugin.tags,
                      ["brand"]
                    ),
                  },
                },
              ],
              transformResponse({ facetHits }) {
                return facetHits[0].map((hit) => ({ ...hit, facet: "brand" }));
              },
            });
          },
          templates: {
            header() {
              return (
                <div>
                  <span className="aa-SourceHeaderTitle">Brands</span>
                  <div className="aa-SourceHeaderLine" />
                </div>
              );
            },
            item({ item, components }) {
              return <FacetItem hit={item} components={components} />;
            },
          },
        },
        {
          sourceId: "categories",
          onSelect({ item, setQuery }) {
            if (item.label.toLowerCase().includes(query.toLowerCase())) {
              setQuery("");
            }
          },
          getItems() {
            return getAlgoliaFacets({
              searchClient,
              queries: [
                {
                  indexName: "instant_search",
                  facet: "categories",
                  params: {
                    facetQuery: query,
                    maxFacetHits: 3,
                    filters: mapToAlgoliaNegativeFilters(
                      state.context.tagsPlugin.tags,
                      ["categories"]
                    ),
                  },
                },
              ],
              transformResponse({ facetHits }) {
                return facetHits[0].map((hit) => ({
                  ...hit,
                  facet: "categories",
                }));
              },
            });
          },
          templates: {
            header() {
              return (
                <div>
                  <span className="aa-SourceHeaderTitle">Categories</span>
                  <div className="aa-SourceHeaderLine" />
                </div>
              );
            },
            item({ item, components }) {
              return <FacetItem hit={item} components={components} />;
            },
          },
        },
        {
          sourceId: "products",
          getItems() {
            return getAlgoliaResults({
              searchClient,
              queries: [
                {
                  indexName: "instant_search",
                  query,
                  params: {
                    filters: mapToAlgoliaFilters(tagsByFacet),
                    hitsPerPage: 5,
                    attributesToSnippet: ["description:35"],
                    snippetEllipsisText: "…",
                  },
                },
              ],
            });
          },
          templates: {
            header() {
              return (
                <div>
                  <span className="aa-SourceHeaderTitle">Products</span>
                  <div className="aa-SourceHeaderLine" />
                </div>
              );
            },
            item({ item, components }) {
              return (
                <LargeImageProductItem hit={item} components={components} />
              );
            },
          },
        },
      ];
    },
  });
}
