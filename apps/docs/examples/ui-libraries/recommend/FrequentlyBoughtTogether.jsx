import algoliarecommend from '@algolia/recommend'
import { frequentlyBoughtTogether } from '@algolia/recommend-js'

import { RelatedItem } from './components/RelatedItem.jsx'

import './Recommend.css'

const appId = '853MYZ81KY'
const apiKey = 'aed9b39a5a489d4a6c9a66d40f66edbf'
const recommendClient = algoliarecommend(appId, apiKey)

export function RecommendFrequentlyBoughtTogether(
  container,
  { indexName = 'flagship_fashion', objectID = 'UN242L03I' } = {}
) {
  frequentlyBoughtTogether({
    container,
    recommendClient,
    indexName,
    objectIDs: [objectID],
    itemComponent: RelatedItem,
    headerComponent: () => null,
    maxRecommendations: 3,
  })
}