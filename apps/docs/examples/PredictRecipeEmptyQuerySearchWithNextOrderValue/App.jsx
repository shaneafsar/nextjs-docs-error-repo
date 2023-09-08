import { predictClient as algoliapredict } from '@algolia/predict';
import { usePredict } from '@algolia/predict-react';
import algoliasearch from 'algoliasearch';
import {
  InstantSearch,
  Configure,
  useHits,
} from 'react-instantsearch-hooks-web';

import PredictUserProfileProvider from './PredictUserProfileProvider';

const appID = 'R8RE8U05N4';
const apiKey = 'aefa7ff5dd2b5bfbed2e40c83bbcf2d1';
const userID = 'f113038826.975074955';
const indexName = 'products';

const searchClient = algoliasearch(appID, apiKey);
const predictClient = algoliapredict(appID, apiKey, 'eu');

export default function App() {
  return (
    <PredictUserProfileProvider predictClient={predictClient} userID={userID}>
      <PersonalizedProducts />
    </PredictUserProfileProvider>
  );
}

function PersonalizedProducts() {
  const { orderValue } = usePredict();

  return (
    <div className="p-2">
      <InstantSearch searchClient={searchClient} indexName={indexName}>
        <Hits />
        <Configure
          hitsPerPage={12}
          // Filter products less than or equal to the next order value
          numericFilters={orderValue ? [`price.value<=${orderValue}`] : []}
        />
      </InstantSearch>
    </div>
  );
}

function Hits() {
  const { hits } = useHits();

  return (
    <div className="grid grid-cols-3 border-l border-t border-gray-200">
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
      className="group relative border-r border-b border-gray-200 p-4"
    >
      <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
        <img
          src={hit.image_urls[0]}
          alt={hit.name}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="mt-4 flex flex-col items-center space-y-2">
        <h3 className="text-sm text-center text-gray-700 ">
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