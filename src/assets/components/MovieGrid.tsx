import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Genres from "./genre";
import { useMovie } from "../hooks/useMovie";
import type { Movie } from "../types/appTypes";
import { format } from "date-fns";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
const MovieGrid = () => {
  const {
    selectedGenre,
    setSelectedGenre,
    results,
    currentPage,
    totalPages,
    loadMore,
    isLoading,
  } = useMovie();

  const navigate = useNavigate();

  const handleNavigate = (movie_id: number) => {
    navigate(`/movie/${movie_id}`, { state: { id: movie_id } });
  };
  const observerRef = useRef<HTMLDivElement>(null);
  const PAGE_LIMIT = 6;
  useEffect(() => {
    //   watch the bottom div in the component to know when it enters the viewport
    //   logic to add :: tuesday - logic to re-render the grid once current Page >= page limit
    const watcher = new IntersectionObserver((entries) => {
      if (
        entries[0].isIntersecting &&
        !isLoading &&
        currentPage < totalPages &&
        currentPage < PAGE_LIMIT
      ) {
        setTimeout(() => {
          loadMore();
        }, 700);
      }
    });

    if (observerRef.current) watcher.observe(observerRef.current);

    return () => watcher.disconnect();
  }, [currentPage, loadMore, isLoading]);
  return (
    <Stack
      sx={{
        overflowX: "hidden",
        width: "100%",
        height: "auto",
        padding: { xs: 1, md: 2 },
      }}
      spacing={1.5}
    >
      <Typography variant="h4" sx={{ color: "primary.main" }}>
        {selectedGenre
          ? `Discover ${selectedGenre.name} Movies`
          : "Discover Movies"}
      </Typography>
      <Genres setGenre={setSelectedGenre} filmType="movie" />

      <GridActual results={results} navToMovie={handleNavigate} />
      <Box
        ref={observerRef}
        sx={{
          width: "100%",
          height: "100px",
          maxHeight: "20px",
          color: "black",
          display: "flex",
          justifyContent: "center",
          padding: 2,
        }}
      >
        {isLoading && <CircularProgress size={20} />}
      </Box>
    </Stack>
  );
};

interface GridProps {
  results: Movie[];
  navToMovie: (id: number) => void;
}
const GridActual = ({ results, navToMovie }: GridProps) => {
  return (
    <Grid container spacing={{ xs: 3, sm: 2.5, lg: 3 }} sx={{ px: 2 }}>
      {results.map((movie) => (
        <Grid
          size={{ xs: 6, sm: 4, md: 3, lg: 2 }}
          key={movie.id}
          sx={{
            color: "primary.main",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MovieCard film={movie} handleNav={navToMovie}></MovieCard>
        </Grid>
      ))}
    </Grid>
  );
};

interface MovieCardProps {
  film: Movie;
  handleNav: (id: number) => void;
}

const MovieCard = ({ film, handleNav }: MovieCardProps) => {
  const formattedDate = film.release_date
    ? format(new Date(film.release_date), "MMMM dd, yyyy")
    : "TBA";
  return (
    <Stack
      sx={{
        width: { xs: "100%", lg: "90%" },
        height: { xs: "280px" },
        alignItems: "start",
      }}
      spacing={1.2}
    >
      <Box
        component={"img"}
        sx={{ width: "100%", height: "205px", borderRadius: 0.8 }}
        src={`https://image.tmdb.org/t/p/w780/${film.poster_path}`}
        onClick={() => handleNav(film.id)}
      ></Box>

      {/* info */}
      <Stack
        sx={{
          width: "100%",
          flex: 1,
          alignItems: "start",
          color: "primary.main",
          px: 0.5,
          justifyContent: "space-between",
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: "500" }}>
          {film.title}
        </Typography>
        <Typography variant="caption">{formattedDate}</Typography>
      </Stack>
    </Stack>
  );
};
export default MovieGrid;
