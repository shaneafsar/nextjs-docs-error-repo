import { predictClient as algoliapredict } from "@algolia/predict";
import { usePredict } from "@algolia/predict-react";
import algoliarecommend from "@algolia/recommend";
import { RelatedProducts } from "@algolia/recommend-react";
import algoliasearch from "algoliasearch";

import getPriceRange from "./getPriceRange";
import PredictUserProfileProvider from "./PredictUserProfileProvider";
import ProductWrapper from "./ProductWrapper";

const appID = "R8RE8U05N4";
const apiKey = "aefa7ff5dd2b5bfbed2e40c83bbcf2d1";
const userID = "f240886669.502033431";
const indexName = "products";
const objectID = "A0E20000000252A";

const searchClient = algoliasearch(appID, apiKey);
const searchIndex = searchClient.initIndex(indexName);
const recommendClient = algoliarecommend(appID, apiKey);
const predictClient = algoliapredict(appID, apiKey, "eu");

export default function App() {
  return (
    <PredictUserProfileProvider predictClient={predictClient} userID={userID}>
      <PersonalizedProductPage referenceObjectID={objectID} />
    </PredictUserProfileProvider>
  );
}

function PersonalizedProductPage({ referenceObjectID }) {
  const { orderValue } = usePredict();

  return (
    <ProductWrapper
      searchIndex={searchIndex}
      objectID={referenceObjectID}
      productComponent={Product}
    >
      <RelatedProducts
        recommendClient={recommendClient}
        headerComponent={() => (
          <h2 className="mb-2 text-lg font-bold tracking-tight">For You</h2>
        )}
        indexName={indexName}
        objectIDs={[referenceObjectID]}
        maxRecommendations={6}
        itemComponent={Product}
        view={(props) => (
          <div className="grid grid-cols-3 border-l border-t border-gray-200">
            {props.items.map((item) => (
              <props.itemComponent key={item.objectID} item={item} />
            ))}
          </div>
        )}
        queryParameters={{
          // Re-rank products based on the user's next order value price range
          optionalFilters: orderValue
            ? [`price_range:${getPriceRange(orderValue)}`]
            : [],
        }}
      />
    </ProductWrapper>
  );
}

function Product({ item, className }) {
  return (
    <div
      className={`group relative border-b border-r border-gray-200 p-4 ${className}`}
    >
      <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
        <img
          src={item.image_urls[0]}
          alt={item.name}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="mt-4 flex flex-col items-center space-y-2">
        <h3 className="text-center text-sm text-gray-700 ">
          <a href={`/product/${item.objectID}`}>
            <span aria-hidden="true" className="absolute inset-0"></span>
            {item.name}
          </a>
        </h3>
        <p className="text-sm font-semibold text-gray-700">
          ${item.price.value}
        </p>
        <p className="mt-1 text-sm text-gray-500">{item.color.original_name}</p>
      </div>
    </div>
  );
}
