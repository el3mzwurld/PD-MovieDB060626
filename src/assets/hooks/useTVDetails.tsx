import type { TVShowDetailsFinal } from "../types/appTypes";
import { tmdbFetch } from "../fetch/tmdb";
import { useEffect, useState } from "react";

export const useTVDetails = (tvID: number) => {
  const [details, setDetails] = useState<TVShowDetailsFinal | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDetails = async (id: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await tmdbFetch<TVShowDetailsFinal>(`tv/${id}`, {
        append_to_response: "credits,videos",
      });
      setDetails(data);
    } catch (error) {
      setError("Failed to fetch TV show details");
      console.error("Fetch TV show details error", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchDetails(tvID);
  }, [tvID]);
  return {
    details,
    isLoading,
    error,
  };
};
