import { autocomplete } from '@algolia/autocomplete-js'
import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions'

import { searchClient } from './searchClient'

import '@algolia/autocomplete-theme-classic'

const querySuggestionsPlugin = createQuerySuggestionsPlugin({
  searchClient,
  indexName: 'instant_search_demo_query_suggestions',
  getSearchParams({ state }) {
    return { hitsPerPage: state.query ? 5 : 10 }
  },
  categoryAttribute: [
    'instant_search',
    'facets',
    'exact_matches',
    'categories',
  ],
  itemsWithCategories: 2,
  categoriesPerItem: 2,
})

autocomplete({
  container: document.querySelector('#app'),
  plugins: [querySuggestionsPlugin],
  openOnFocus: true,
})