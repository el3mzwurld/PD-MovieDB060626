import React, { useState } from "react";
import { useSearch } from "../hooks/useSearch";
import { Box, Snackbar, Stack, Typography, Alert } from "@mui/material";
import { useTheme } from "@mui/material";
import type { Movie, SearchResult, TVShow } from "../types/appTypes";
import { AnimatePresence, motion } from "motion/react";

// image and icon imports
import logo from "../img/logo.svg";
import CircularProgress from "@mui/material/CircularProgress";
import { IoMdSearch } from "react-icons/io";
import MovieGrid from "../components/MovieGrid";
import TVGrid from "../components/TVGrid";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [query, setQuery] = useState("");
  const theme = useTheme();
  const [component, setComponent] = useState<"movie" | "tv">("movie");
  // search hook
  const { results, error, isLoading } = useSearch(query);

  const handlePageChange = (newComp: "movie" | "tv") => {
    if (newComp === component) {
      return;
    }
    setComponent(newComp);
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        width: "100%",
        height: "100vh",
        minHeight: "100vh",
        overflow: "auto",
        color: "text.white",
      }}
    >
      {/* header */}
      <Box
        component={"header"}
        sx={{
          width: "100%",
          backgroundColor: theme.palette.primary.main,
          paddingY: { xs: "0.5rem", md: "0.8rem" },
          height: "auto",
          [theme.breakpoints.down("lg")]: {
            maxHeight: "55px",
          },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack
          direction={"row"}
          sx={{
            width: "100%",
            height: { xs: "48px", lg: "100%" },
            px: { xs: 0.8, lg: 1.5 },
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* logo */}
          <Stack
            component={motion.div}
            direction={"row"}
            spacing={1.2}
            sx={{ alignItems: "center", justifyContent: "center" }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: [0, 0.6, 0.8, 1], x: [-50, 0] }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <Box
              component={"img"}
              src={logo}
              sx={{
                width: { xs: "20px", md: "35px" },
                height: { xs: "20px", md: "35px" },
              }}
            ></Box>
            <Typography variant="body2" sx={{ fontFamily: "Playwrite GB J" }}>
              FilmVault
            </Typography>
          </Stack>

          <SearchBar
            setQuery={setQuery}
            isLoading={isLoading}
            results={results}
            query={query}
          />
        </Stack>
      </Box>

      <Box
        component={"main"}
        sx={{ width: "100%", minHeight: "100vh", overflowX: "hidden" }}
      >
        {/* first section */}
        <Box component={"section"} sx={{ display: "none" }}>
          {/* stack - row */}
          {/* 1st component : automatic slider showing top rated movies */}
          {/* 2nd component : randomizer div showing upcoming movies, upon every re-render it should randomize again */}
        </Box>
        <Box
          component={"section"}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          {/* AnimatePresence component to move between discovering movies and TVshows component
              The idea:: since it's a SPA, i don't want to have 2 separate components stacking on top of each other and then pagination logic for both
              so i want to implement a kind of infinite scroll to help the UX, so the user doesn't actually have to click next page every time for the app to get more movies
              To achieve this, i'm thinking of using a kind of logic you usually see in login/signup SPA's or mobile apps, where you can just switch between
              forms in the same component, with a snappy animation to make it look sharp 
          */}
          <Stack
            direction={"row"}
            spacing={1.5}
            sx={{
              alignItems: "center",
              justifyContent: "center",
              py: 2,
              color: "primary.main",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                cursor: "pointer",
                position: "relative",
                width: "auto",
                textAlign: "center",
                "::before": {
                  position: "absolute",
                  top: "110%",
                  width: "50%",
                  backgroundColor: "primary.main",
                  height: "2px",
                  content: "''",
                  left: "50%",
                  transform: "translate(-50%, -110%)",
                  display: component == "movie" ? "block" : "none",
                },
              }}
              onClick={() => handlePageChange("movie")}
            >
              Movie
            </Typography>
            <Typography
              variant="h4"
              sx={{
                cursor: "pointer",
                position: "relative",
                width: "auto",
                textAlign: "center",
                "::before": {
                  position: "absolute",
                  top: "110%",
                  width: "50%",
                  backgroundColor: "primary.main",
                  height: "2px",
                  content: "''",
                  left: "50%",
                  transform: "translate(-50%, -110%)",
                  display: component == "movie" ? "none" : "block",
                },
              }}
              onClick={() => handlePageChange("tv")}
            >
              TV
            </Typography>
          </Stack>

          <AnimatePresence mode="wait">
            {component === "movie" ? (
              <Box
                component={motion.div}
                sx={{ height: "auto", width: "100%" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              >
                <MovieGrid />
              </Box>
            ) : (
              <Box
                component={motion.div}
                sx={{ height: "auto", width: "100%" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              >
                <TVGrid />
              </Box>
            )}
          </AnimatePresence>
        </Box>
      </Box>
      {/* error toast modal */}
      {error && (
        <Snackbar
          open={true}
          autoHideDuration={3500}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert severity="error" variant="filled">
            {error}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

// search bar
interface SearchProps {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  results: SearchResult[];
  query: string;
}
const SearchBar = ({ setQuery, isLoading, results, query }: SearchProps) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleNavigate = (film_id: number, filmType: "movie" | "tv") => {
    if (filmType === "movie") {
      navigate(`/movie/${film_id}`, { state: { id: film_id } });
      return;
    }
    navigate(`/tv/${film_id}`, { state: { id: film_id } });
  };
  return (
    <>
      <Stack
        direction={"row"}
        sx={{
          width: { xs: "60%", lg: "450px" },
          maxWidth: { lg: "450px" },
          height: "38px",
          position: "relative",
          alignItems: "center",
          justifyContent: "end",
          overflow: "visible",
          zIndex: 100,
        }}
      >
        <Box
          component={"input"}
          sx={{
            height: "100%",
            width: "90%",
            backgroundColor: theme.palette.secondary.light,
            px: 1.02,
            py: 0.2,
            [theme.breakpoints.down("md")]: {
              fontSize: "14px",
            },
            border: "none",
            ":focus": {
              outline: "none",
              border: "none",
            },
            fontFamily: "Inter",
          }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Box
          component={"button"}
          sx={{
            width: { xs: "35px", lg: "40px" },
            height: "100%",
            backgroundColor: theme.palette.info.main,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            border: "none",
          }}
        >
          {isLoading ? (
            <CircularProgress size={15} />
          ) : (
            <IoMdSearch size={15} color="black" />
          )}
        </Box>
        {results.length !== 0 ? (
          <Box
            component={motion.div}
            className="search-container"
            sx={{
              position: "absolute",
              top: "150%",
              width: { xs: "120%", sm: "98.5%", lg: "98%" },
              height: "300px",
              maxHeight: "300px",
              backgroundColor: "#111111",
              borderRadius: { xs: 0.5, sm: 0 },
              padding: 1,
              overflowY: "auto",
              overflowX: "hidden",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeIn", delay: 1 }}
          >
            {results.length != 0 &&
              results.map((film, index) => (
                <SearchCard
                  film={film}
                  key={index}
                  handleNav={handleNavigate}
                />
              ))}
          </Box>
        ) : null}
      </Stack>
    </>
  );
};

// search card, single card for each index of the results array
interface SearchCardProps {
  film: SearchResult;
  handleNav: (id: number, type: "movie" | "tv") => void;
}

const SearchCard = ({ film, handleNav }: SearchCardProps) => {
  const title =
    film.media_type === "movie" ? (film as Movie).title : (film as TVShow).name;
  const release =
    film.media_type === "movie"
      ? (film as Movie).release_date
      : (film as TVShow).first_air_date;

  return (
    <Stack
      direction={"row"}
      sx={{
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        borderBottom: "0.8px solid",
        borderColor: "secondary.light",
        height: { xs: "160px", lg: "150px" },
        flexShrink: 0,
      }}
      onClick={() => {
        if (film.media_type === "person") {
          return;
        }
        handleNav(film.id, film.media_type);
      }}
    >
      <Box
        component={"img"}
        sx={{ width: { xs: "100px", sm: "85px" } }}
        height={"90%"}
        src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
      ></Box>
      <Stack
        sx={{
          width: "40%",
          height: "90%",
          justifyContent: "space-between",
          alignItems: "end",
          p: 1,
        }}
      >
        <Typography variant="caption" sx={{ color: "text.disabled" }}>
          {film.media_type == "tv" && "TV SHOW"}
          {film.media_type == "movie" && "MOVIE"}
        </Typography>

        <Stack spacing={1} sx={{ alignItems: "center" }}>
          <Typography
            variant="caption"
            sx={{
              color: "text.disabled",
              width: "100%",
              textAlign: "right",
              fontSize: { xs: "8px" },
            }}
          >
            {/* fixed bug :: saturday, App kept on throwing an undefined error on a property 
            i knew was a string, so i couldn't perform toUpperCase,
             fixed by checking for undefined status before using string method */}
            {typeof title != "undefined"
              ? title.toUpperCase()
              : "Title not found"}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: "text.disabled",
              width: "100%",
              textAlign: "right",
              fontSize: { xs: "8px" },
            }}
          >
            {release}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};
export default Home;
