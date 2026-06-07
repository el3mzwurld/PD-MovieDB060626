import { tmdbFetch } from "../fetch/tmdb";
import type { SearchResult, Response } from "../types/appTypes";
import { useEffect, useState } from "react";
export const useSearch = (query: string) => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // helper to fetch search results
  const fetchSearchResults = async (
    searchQuery: string,
    signal?: AbortSignal,
  ) => {
    setIsLoading(true);
    setError("");

    try {
      const data = await tmdbFetch<Response<SearchResult>>(
        `search/multi`,
        {
          query: searchQuery,
          adult: "no",
        },
        signal,
      );
      // new feature :: saturday -- yet to test :
      // i hope to catch any user queires that don't exist on the API...
      // If it doesn't exist? send an error message to the UI that no film was found for the query and stop the fetch
      if (data.results.length == 0) {
        setError("No films found for this query");
        return;
      }
      //filter search results to only return films, no people as of yet
      const filteredResults = data.results.filter(
        (result) => result.media_type !== "person",
      );
      setResults(filteredResults);
    } catch (err) {
      // i want to catch abort errors and ignore them, since what it's really telling us is that the user has typed a new character in the query
      if ((err as Error).name === "AbortError") return;
      setError("Failed to fetch search results.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const controller = new AbortController();
    fetchSearchResults(query, controller.signal);
    return () => {
      controller.abort();
    };
  }, [query]);

  return {
    results,
    isLoading,
    error,
  };
};
