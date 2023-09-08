import algoliarecommend from "@algolia/recommend";
import { relatedProducts } from "@algolia/recommend-js";
import { horizontalSlider } from "@algolia/ui-components-horizontal-slider-js";

import { RelatedItem } from "./components/RelatedItem.jsx";

import "./HorizontalSlider.css";

const appId = "853MYZ81KY";
const apiKey = "aed9b39a5a489d4a6c9a66d40f66edbf";
const recommendClient = algoliarecommend(appId, apiKey);

export function RecommendRelatedProducts(
  container,
  { indexName = "flagship_fashion", objectID = "R3142L02X" } = {}
) {
  relatedProducts({
    container,
    recommendClient,
    indexName,
    objectIDs: [objectID],
    itemComponent: RelatedItem,
    headerComponent: () => null,
    maxRecommendations: 10,
    view: horizontalSlider,
  });
}
