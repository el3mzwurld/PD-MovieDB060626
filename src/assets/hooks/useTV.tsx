import type { Response, TVShow, Genre } from "../types/appTypes";
import { tmdbFetch } from "../fetch/tmdb";
import { useEffect, useState } from "react";

export const useTV = () => {
  const [results, setResults] = useState<TVShow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);

  //   use the discover endpoint to fetch popular TV shows
  const fetchPopular = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await tmdbFetch<Response<TVShow>>("discover/tv", {
        page: "1",
      });
      setResults(data.results);
      setTotalPages(data.total_pages);
    } catch (error) {
      setError("Failed to fetch popular TV shows");
      console.error("Fetch popular TV shows error", error);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchByGenre = async (genreID: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await tmdbFetch<Response<TVShow>>("discover/tv", {
        with_genres: genreID.toString(),
        page: "1",
      });
      setResults(data.results);
      setTotalPages(data.total_pages);
    } catch (error) {
      setError(`Failed to fetch TV shows for genre ID ${genreID}`);
      console.error("Couldn't find TV shows for genre", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!selectedGenre) {
      fetchPopular();
      return;
    }
    const genreID = selectedGenre.id;
    fetchByGenre(genreID);
  }, [selectedGenre]);

  const loadMore = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await tmdbFetch<Response<TVShow>>("discover/tv", {
        page: (currentPage + 1).toString(),
        ...(selectedGenre && { with_genres: selectedGenre.id.toString() }), //conditionally check if there's a selected genre, if yes, add the with_genres param
      });
      setCurrentPage(data.page);
      setResults((prev) => [...prev, ...data.results]);
      setTotalPages(data.total_pages);
    } catch (error) {
      setError("Failed to load more TV shows");
      console.error("Load more TV shows error", error);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    results,
    isLoading,
    error,
    currentPage,
    totalPages,
    selectedGenre,
    setSelectedGenre,
    loadMore,
  };
};
