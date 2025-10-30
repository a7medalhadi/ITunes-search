import { SEARCH_CONSTANTS } from "../config/constants";
import type { Podcast } from "../types/Podcast";

export async function searchPodcasts(
  searchTerm: string
): Promise<Podcast[]> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  if (!backendUrl) {
    throw new Error(
      " Please set NEXT_PUBLIC_BACKEND_URL environment variable."
    );
  }

  if (
    !searchTerm ||
    searchTerm.trim().length < SEARCH_CONSTANTS.MIN_SEARCH_LENGTH
  ) {
    return [];
  }

  const response = await fetch(
    `${backendUrl}/podcasts/search?term=${encodeURIComponent(
      searchTerm.trim()
    )}`
  );

  if (!response.ok) {
    throw new Error(`Search failed: ${response.statusText}`);
  }

  return response.json();
}
