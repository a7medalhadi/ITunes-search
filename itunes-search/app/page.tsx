"use client";

import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";
import {
  PodcastHeader,
  PodcastResults,
  ErrorState,
  EmptyState,
  InitialState,
} from "@/components/podcast";
import { searchPodcasts } from "@/lib/services/podcastApi";
import { SEARCH_CONSTANTS } from "@/lib/config/constants";
import { ErrorBoundary } from "@/components/features";
import { LoadingSkeleton } from "@/components/ui";
import { Podcast } from "@/lib/types/Podcast";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialSearch = searchParams.get("q") || "";

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Debounce
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // search if term is at least 2 characters
    if (searchTerm.trim().length < SEARCH_CONSTANTS.MIN_SEARCH_LENGTH) {
      setDebouncedSearch("");
      // remove search param
      const params = new URLSearchParams(window.location.search);
      params.delete("q");
      router.replace(`${window.location.pathname}?${params.toString()}`, { scroll: false });
      return;
    }

    debounceTimerRef.current = setTimeout(() => {
      const trimmedSearch = searchTerm.trim();
      setDebouncedSearch(trimmedSearch);
      // Update URL with new search term
      const params = new URLSearchParams(window.location.search);
      params.set("q", trimmedSearch);
      router.replace(`${window.location.pathname}?${params.toString()}`, { scroll: false });
    }, SEARCH_CONSTANTS.DEBOUNCE_DELAY);

    // clean on unmount
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchTerm, router]);

  const {
    data: podcasts,
    error,
    isFetching,
  } = useQuery<Podcast[]>({
    queryKey: ["itunes-search", debouncedSearch],
    queryFn: () => searchPodcasts(debouncedSearch),
    enabled:
      !!debouncedSearch &&
      debouncedSearch.length >= SEARCH_CONSTANTS.MIN_SEARCH_LENGTH,
    staleTime: SEARCH_CONSTANTS.CACHE_STALE_TIME,
    gcTime: SEARCH_CONSTANTS.CACHE_GC_TIME,
  });

  const isSearching =
    isFetching ||
    (searchTerm.trim().length >= SEARCH_CONSTANTS.MIN_SEARCH_LENGTH &&
      searchTerm.trim() !== debouncedSearch);

  const isEmpty =
    podcasts && podcasts.length === 0 && debouncedSearch && !isSearching;

  const isInitialState = !debouncedSearch && !isSearching;
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background">
        <PodcastHeader
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          isSearching={isSearching}
        />
        <main className="container mx-auto px-4 py-8">
          {isInitialState && <InitialState />}
          {isSearching && <LoadingSkeleton text="جاري البحث..." />}
          {error && <ErrorState error={error} />}
          {isEmpty && <EmptyState debouncedSearch={debouncedSearch} />}
          {podcasts && podcasts.length > 0 && !isSearching && (
            <PodcastResults podcasts={podcasts} />
          )}
        </main>
      </div>
    </ErrorBoundary>
  );
}
