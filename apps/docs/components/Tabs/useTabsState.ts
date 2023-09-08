export const TABS_STATE_PREFIX = "ALGOLIA_DOCS_TABS_STATE:";

/**
 * Get tabs state (language, device, os...)
 * based on local storage and URL params.
 * URL params has priority over local storage and will
 * override previous local storage value if different.
 */
export const useTabsState = (state?: string) => {
  if (!state) {
    return null;
  }

  const localStorageStateName = `${TABS_STATE_PREFIX}${state}`;
  const params = Object.fromEntries(new URLSearchParams(location.search));
  if (params[state]) {
    // Update local storage when reading from URL
    localStorage.setItem(localStorageStateName, params[state]);
    return params[state];
  }

  // If not URL params, try to read from local storage
  return localStorage.getItem(localStorageStateName);
};
