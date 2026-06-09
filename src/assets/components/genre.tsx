import { Box, Stack, Typography, useTheme } from "@mui/material";
import type { Genre } from "../types/appTypes";
import { useEffect, useState } from "react";
import { number } from "motion/react";

interface GenreProps {
  setGenre: React.Dispatch<React.SetStateAction<Genre | null>>;
  filmType: "movie" | "tv";
}

const Genres = ({ setGenre, filmType }: GenreProps) => {
  const [genreList, setGenreList] = useState<Array<Genre>>([]);

  useEffect(() => {
    if (filmType === "movie") {
      setGenreList(genres);
      return;
    }
    setGenreList(tvGenres);
  }, [filmType]);

  const genres = [
    // main genres
    { id: 28, name: "Action" },
    { id: 35, name: "Comedy" },
    { id: 18, name: "Drama" },
    { id: 27, name: "Horror" },
    { id: 878, name: "Sci-Fi" },
    { id: 53, name: "Thriller" },
    { id: 10749, name: "Romance" },
    { id: 14, name: "Fantasy" },

    // sub genres
    { id: 80, name: "Crime" },
    { id: 16, name: "Animation" },
    { id: 99, name: "Documentary" },
  ];
  const tvGenres = [
    // main genres
    { id: 10759, name: "Action" },
    { id: 35, name: "Comedy" },
    { id: 18, name: "Drama" },
    { id: 9648, name: "Mystery" },
    { id: 10765, name: "Sci-Fi" },
    { id: 80, name: "Crime" },
    { id: 10749, name: "Romance" },
    { id: 10762, name: "Kids" },

    // sub genres
    { id: 16, name: "Animation" },
    { id: 99, name: "Documentary" },
    { id: 10764, name: "Reality" },
  ];
  const theme = useTheme();
  return (
    <Stack
      direction={"row"}
      sx={{
        width: "100%",
        height: { xs: "55px", lg: "68px" },
        px: 1,
        py: 0.5,
        // backgroundColor: "black",
        alignItems: "center",
        overflowX: "auto",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        msOverflowStyle: {
          display: "none",
        },
      }}
      spacing={1.5}
    >
      {genreList.map((obj, index) => (
        <Box
          sx={{
            width: { xs: "96px", lg: "120px" },
            height: "40px",
            display: "flex",
            flexShrink: 0,
            fontFamily: "dm sans",
            borderRadius: 0.8,
            background: theme.palette.primary.main,
            position: "relative",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          key={index}
          onClick={() => setGenre(obj)}
        >
          <Typography variant="body2"> {obj.name}</Typography>
        </Box>
      ))}
    </Stack>
  );
};

export default Genres;
