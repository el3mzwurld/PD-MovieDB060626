import { Box, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Genres from "./genre";
import { useMovie } from "../hooks/useMovie";
import type { Movie } from "../types/appTypes";
import { format } from "date-fns";
const MovieGrid = () => {
  const {
    setSelectedGenre,
    results,
    isLoading,
    error,
    loadMore,
    selectedGenre,
    currentPage,
    totalPages,
  } = useMovie();
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
      <Genres setGenre={setSelectedGenre} filmType="tv" />

      <GridActual results={results} />
    </Stack>
  );
};

interface GridProps {
  results: Movie[];
}
const GridActual = ({ results }: GridProps) => {
  return (
    <Grid
      container
      spacing={{ xs: 3, sm: 2.5, lg: 3 }}
      sx={{ px: 2 }}
      columns={{ lg: 5 }}
    >
      {results.map((movie) => (
        <Grid
          size={{ xs: 6, sm: 4, md: 3, lg: 1 }}
          key={movie.id}
          sx={{
            color: "primary.main",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MovieCard film={movie}></MovieCard>
        </Grid>
      ))}
    </Grid>
  );
};

interface MovieCardProps {
  film: Movie;
}

const MovieCard = ({ film }: MovieCardProps) => {
  const formattedDate = film.release_date
    ? format(new Date(film.release_date), "MMMM dd, yyyy")
    : "TBA";
  return (
    <Stack
      sx={{ width: "85%", height: { xs: "280px" }, alignItems: "start" }}
      spacing={1.2}
    >
      <Box
        component={"img"}
        sx={{ width: "100%", height: "205px", borderRadius: 0.8 }}
        src={`https://image.tmdb.org/t/p/w780/${film.poster_path}`}
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
