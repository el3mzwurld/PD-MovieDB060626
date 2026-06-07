import type { MovieDetailsFinal } from "../types/appTypes";
import { tmdbFetch } from "../fetch/tmdb";
import { useEffect, useState } from "react";

export const useMovieDetails = (movieID: number) => {
  const [details, setDetails] = useState<MovieDetailsFinal | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDetails = async (id: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await tmdbFetch<MovieDetailsFinal>(`movie/${id}`, {
        append_to_response: "credits,videos",
      });
      setDetails(data);
    } catch (error) {
      setError("Failed to fetch movie details");
      console.error("Fetch movie details error", error);
    } finally {
      setIsLoading(false);
    }
  };
  // fetch when there's a movieID passed, which basically means the user has clicked a movie card.
  useEffect(() => {
    fetchDetails(movieID);
  }, [movieID]);
  return {
    details,
    isLoading,
    error,
  };
};
