import type { Response, Movie, Genre } from "../types/appTypes";
import { tmdbFetch } from "../fetch/tmdb";
import { useState, useEffect } from "react";

export const useMovie = () => {
  const [results, setResults] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);

  //   use the discover endpoint to fetch popular movies
  const fetchPopular = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await tmdbFetch<Response<Movie>>("discover/movie", {
        page: "1",
      });
      setResults(data.results);
      setTotalPages(data.total_pages);
    } catch (error) {
      setError("Failed to fetch popular movies");
      console.error("Fetch popular movies error", error);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchByGenre = async (genreId: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await tmdbFetch<Response<Movie>>("discover/movie", {
        with_genres: genreId.toString(),
        page: "1",
      });
      setResults(data.results);
      setTotalPages(data.total_pages);
    } catch (error) {
      setError(`Failed to fetch movies for genre ID ${genreId}`);
      console.error("Couldn't find movies for genre", error);
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
    console.log(selectedGenre);
  }, [selectedGenre]);

  const loadMore = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await tmdbFetch<Response<Movie>>("discover/movie", {
        page: (currentPage + 1).toString(),
        ...(selectedGenre && { with_genres: selectedGenre.id.toString() }),
      });
      setCurrentPage(data.page);
      setTotalPages(data.total_pages);
      setResults((prev) => [...prev, ...data.results]);
    } catch (error) {
      setError("Failed to load more movies");
      console.error("Next page movies error", error);
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
