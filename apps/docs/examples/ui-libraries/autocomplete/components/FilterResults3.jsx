/** @jsx h */
import { h, render } from "preact";
import {
  autocomplete,
  getAlgoliaFacets,
  getAlgoliaResults,
} from "@algolia/autocomplete-js";
import { createTagsPlugin } from "@algolia/autocomplete-plugin-tags";

import { searchClient } from "../searchClient";
import { FacetItem } from "./FacetItem";
import { LargeImageProductItem } from "./LargeImageProductItem";
import { mapToAlgoliaFilters } from "../utils/mapToAlgoliaFilters";
import { mapToAlgoliaNegativeFilters } from "../utils/mapToAlgoliaNegativeFilters";
import { groupBy } from "../utils/groupBy";

import "@algolia/autocomplete-theme-classic";
import "@algolia/autocomplete-plugin-tags/dist/theme.min.css";
import "../styles/filtering-results-3.css";


export default function filterResults() {
  const container = document.querySelector("#app");
  
  const tagsPlugin = createTagsPlugin({
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
    transformSource() {
      return undefined;
    },
    onChange({ tags, setIsOpen }) {
      requestAnimationFrame(() => {
        const inputWrapperPrefix = container.querySelector(
          ".aa-InputWrapperPrefix"
        );
        const oldTagsContainer = document.querySelector(".aa-Tags");

        const tagsContainer = document.createElement("div");
        tagsContainer.classList.add("aa-Tags");

        render(
          <div className="aa-TagsList">
            {tags.map(({ label, remove }) => (
              <TagItem
                key={label}
                label={label}
                onRemove={() => {
                  remove();
                  requestAnimationFrame(() => setIsOpen(true));
                }}
              />
            ))}
          </div>,
          tagsContainer
        );

        if (oldTagsContainer) {
          inputWrapperPrefix.removeChild(oldTagsContainer);
        }

        inputWrapperPrefix.appendChild(tagsContainer);
      });
    },
  });

  autocomplete({
    container,
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

  const searchInput = container.querySelector(".aa-Input");

  searchInput.addEventListener("keydown", (event) => {
    if (
      event.key === "Backspace" &&
      searchInput.selectionStart === 0 &&
      searchInput.selectionEnd === 0
    ) {
      const newTags = tagsPlugin.data.tags.slice(0, -1);
      tagsPlugin.data.setTags(newTags);
    }
  });
}

function TagItem({ label, onRemove }) {
  return (
    <div className="aa-Tag">
      <span className="aa-TagLabel">{label}</span>
      <button
        className="aa-TagRemoveButton"
        onClick={() => onRemove()}
        title="Remove this tag"
      >
        <svg
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path d="M18 6L6 18"></path>
          <path d="M6 6L18 18"></path>
        </svg>
      </button>
    </div>
  );
}
