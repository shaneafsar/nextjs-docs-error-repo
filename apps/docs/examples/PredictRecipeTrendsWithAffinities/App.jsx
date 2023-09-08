import { predictClient as algoliapredict } from "@algolia/predict";
import { usePredict } from "@algolia/predict-react";
import algoliarecommend from "@algolia/recommend";
import { TrendingItems } from "@algolia/recommend-react";

import mapAffinityToOptionalFilter from "./mapAffinityToOptionalFilter";
import PredictUserProfileProvider from "./PredictUserProfileProvider";

const appID = "R8RE8U05N4";
const apiKey = "aefa7ff5dd2b5bfbed2e40c83bbcf2d1";
const userID = "f113038826.975074955";
const indexName = "products";

const recommendClient = algoliarecommend(appID, apiKey);
const predictClient = algoliapredict(appID, apiKey, "eu");

export default function App() {
  return (
    <PredictUserProfileProvider predictClient={predictClient} userID={userID}>
      <PersonalizedTrendingProducts />
    </PredictUserProfileProvider>
  );
}

function PersonalizedTrendingProducts() {
  const { affinities } = usePredict();

  // Get the top 5 affinities with probabilities greater than 50%
  const topAffinities = affinities
    .filter((affinity) => affinity.probability > 0.5)
    .slice(0, 5);

  return (
    <TrendingItems
      recommendClient={recommendClient}
      indexName={indexName}
      headerComponent={() => null}
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
        optionalFilters: topAffinities.map(mapAffinityToOptionalFilter),
      }}
    />
  );
}

function Product({ item }) {
  return (
    <div
      key={item.objectID}
      className="group relative border-b border-r border-gray-200 p-4"
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
