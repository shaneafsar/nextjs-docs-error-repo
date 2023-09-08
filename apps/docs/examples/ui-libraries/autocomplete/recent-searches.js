import { autocomplete } from '@algolia/autocomplete-js'
import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches'

import "@algolia/autocomplete-theme-classic"

const recentSearchesPlugin = createLocalStorageRecentSearchesPlugin({
  key: 'RECENT_SEARCH',
  limit: 5
})

autocomplete({
  container: document.getElementById("app"),
  plugins: [recentSearchesPlugin],
  openOnFocus: true,
})