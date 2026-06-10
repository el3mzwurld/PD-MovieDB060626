import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useTV } from "../hooks/useTV";
import type { TVShow } from "../types/appTypes";
import { format } from "date-fns";
import Genres from "./genre";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const TVGrid = () => {
  const {
    selectedGenre,
    setSelectedGenre,
    results,
    error,
    currentPage,
    totalPages,
    loadMore,
    isLoading,
  } = useTV();
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

  const navigate = useNavigate();
  const handleNavigate = (movie_id: number) => {
    navigate(`/movie/${movie_id}`);
  };
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

      <GridActual results={results} handleNav={handleNavigate} />

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
  results: TVShow[];
  handleNav: (id: number) => void;
}

const GridActual = ({ results, handleNav }: GridProps) => {
  return (
    <Grid
      component={motion.div}
      container
      spacing={{ xs: 3, sm: 2.5, lg: 3 }}
      rowSpacing={1}
      sx={{ px: 2 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
    >
      {results.map((show) => (
        <Grid
          size={{ xs: 6, sm: 4, md: 3, lg: 2 }}
          key={show.id}
          sx={{
            color: "primary.main",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TVCard film={show} hanleNav={handleNav}></TVCard>
        </Grid>
      ))}
    </Grid>
  );
};

interface TVCardProps {
  film: TVShow;
  hanleNav: (id: number) => void;
}

const TVCard = ({ film, hanleNav }: TVCardProps) => {
  const formattedDate = film.first_air_date
    ? format(new Date(film.first_air_date), "MMMM dd, yyyy")
    : "TBA";
  return (
    <Stack
      sx={{ width: "95%", height: { xs: "280px" }, alignItems: "start" }}
      spacing={1.2}
    >
      <Box
        component={"img"}
        sx={{ width: "100%", height: "205px", borderRadius: 0.8 }}
        onClick={() => hanleNav(film.id)}
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
