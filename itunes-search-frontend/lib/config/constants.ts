export const SEARCH_CONSTANTS = {
  DEBOUNCE_DELAY: 500,
  MIN_SEARCH_LENGTH: 2,
  CACHE_STALE_TIME: 5 * 60 * 1000, // 5 minutes
  CACHE_GC_TIME: 10 * 60 * 1000, // 10 minutes
} as const;

export const LAYOUT_STORAGE_KEY = "podcast-layout-preference";
