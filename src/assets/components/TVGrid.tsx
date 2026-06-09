import { Box, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useTV } from "../hooks/useTV";
import type { TVShow } from "../types/appTypes";
import { format } from "date-fns";
import Genres from "./genre";
import { motion } from "motion/react";
import { useRef } from "react";

const TVGrid = () => {
  const {
    selectedGenre,
    setSelectedGenre,
    results,
    error,
    currentPage,
    totalPages,
  } = useTV();
  const observerRef = useRef<HTMLDivElement>(null);
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
      <Typography
        component={motion.p}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeIn" }}
        variant="h4"
        sx={{ color: "primary.main" }}
      >
        {selectedGenre
          ? `Discover ${selectedGenre.name} Shows`
          : "Discover Shows"}
      </Typography>
      <Genres setGenre={setSelectedGenre} filmType="tv" />

      <GridActual results={results} />

      <Box></Box>
    </Stack>
  );
};

interface GridProps {
  results: TVShow[];
}

const GridActual = ({ results }: GridProps) => {
  return (
    <Grid
      container
      spacing={{ xs: 3, sm: 2.5, lg: 3 }}
      sx={{ px: 2 }}
      columns={{ lg: 5 }}
    >
      {results.map((show) => (
        <Grid
          size={{ xs: 6, sm: 4, md: 3, lg: 1 }}
          key={show.id}
          sx={{
            color: "primary.main",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TVCard film={show}></TVCard>
        </Grid>
      ))}
    </Grid>
  );
};

interface TVCardProps {
  film: TVShow;
}

const TVCard = ({ film }: TVCardProps) => {
  const formattedDate = film.first_air_date
    ? format(new Date(film.first_air_date), "MMMM dd, yyyy")
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
          {film.name}
        </Typography>
        <Typography variant="caption">{formattedDate}</Typography>
      </Stack>
    </Stack>
  );
};

export default TVGrid;
