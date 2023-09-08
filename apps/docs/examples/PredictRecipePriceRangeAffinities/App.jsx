import { predictClient as algoliapredict } from "@algolia/predict";
import { usePredict } from "@algolia/predict-react";
import algoliasearch from "algoliasearch";
import {
  InstantSearch,
  Configure,
  RefinementList,
  HierarchicalMenu,
  useHits,
  Pagination,
} from "react-instantsearch-hooks-web";

import mapAffinityToOptionalFilter from "./mapAffinityToOptionalFilter";
import PredictUserProfileProvider from "./PredictUserProfileProvider";

const appID = "R8RE8U05N4";
const apiKey = "aefa7ff5dd2b5bfbed2e40c83bbcf2d1";
const userID = "f322141791.348960786";
const indexName = "products";

const searchClient = algoliasearch(appID, apiKey);
const predictClient = algoliapredict(appID, apiKey, "eu");

export default function App() {
  return (
    <PredictUserProfileProvider predictClient={predictClient} userID={userID}>
      <PersonalizedSearchPage />
    </PredictUserProfileProvider>
  );
}

function PersonalizedSearchPage() {
  const { affinities } = usePredict();

  // Get the price range affinities with probabilities greater than 50%
  const priceRangeAffinities = affinities
    .filter((affinity) => affinity.name === "price_range")
    .filter((affinity) => affinity.probability > 0.5);

  return (
    <div className="px-2 pb-12 pt-2">
      <InstantSearch
        initialUiState={{
          [indexName]: {
            refinementList: {
              "color.original_name": ["brown"],
            },
            hierarchicalMenu: {
              "hierarchical_categories.lvl0": ["Women"],
              "hierarchical_categories.lvl1": ["Women > Bags"],
            },
          },
        }}
        searchClient={searchClient}
        indexName={indexName}
      >
        <Configure
          hitsPerPage={12}
          // Re-rank products based on the price range affinities
          optionalFilters={priceRangeAffinities.map(
            mapAffinityToOptionalFilter
          )}
        />
        <div className="flex flex-row">
          <div className="flex w-full max-w-xs flex-col space-y-4">
            <div className="flex flex-col">
              <h3 className="mb-2 text-sm font-bold">Categories</h3>
              <HierarchicalMenu
                attributes={[
                  "hierarchical_categories.lvl0",
                  "hierarchical_categories.lvl1",
                  "hierarchical_categories.lvl2",
                ]}
              />
            </div>
            <div className="flex flex-col">
              <h3 className="mb-2 text-sm font-bold">Color</h3>
              <RefinementList attribute="color.original_name" />
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <Hits />
            <div className="flex justify-center">
              <Pagination />
            </div>
          </div>
        </div>
      </InstantSearch>
    </div>
  );
}

function Hits() {
  const { hits } = useHits();

  return (
    <div className="grid grid-cols-2 border-l border-t border-gray-200">
      {hits.map((hit) => (
        <Hit key={hit.objectID} hit={hit} />
      ))}
    </div>
  );
}

function Hit({ hit }) {
  return (
    <div
      key={hit.objectID}
      className="group relative border-b border-r border-gray-200 p-4"
    >
      <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
        <img
          src={hit.image_urls[0]}
          alt={hit.name}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="mt-4 flex flex-col items-center space-y-2">
        <h3 className="text-center text-sm text-gray-700 ">
          <a href={`/product/${hit.objectID}`}>
            <span aria-hidden="true" className="absolute inset-0"></span>
            {hit.name}
          </a>
        </h3>
        <p className="text-sm font-semibold text-gray-700">
          ${hit.price.value}
        </p>
        <p className="mt-1 text-sm text-gray-500">{hit.color.original_name}</p>
      </div>
    </div>
  );
}
