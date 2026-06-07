import React, { useEffect, useState } from "react";
import { useSearch } from "../hooks/useSearch";
import { Box, Snackbar, Stack, Typography, Alert } from "@mui/material";
import { useTheme } from "@mui/material";
import type { SearchResult } from "../types/appTypes";
import { motion } from "motion/react";

// image and icon imports
import logo from "../img/logo.svg";
import CircularProgress from "@mui/material/CircularProgress";
import { IoMdSearch } from "react-icons/io";
const Home = () => {
  const [query, setQuery] = useState("");
  const theme = useTheme();

  const { results, error, isLoading } = useSearch(query);

  const [openErrorModal, setOpenErrorModal] = useState(false);

  useEffect(() => {
    if (!error) {
      return;
    }
    setOpenErrorModal((prev) => !prev);
  }, [error]);

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
          />
        </Stack>
      </Box>
      {/* error modal */}
      <Snackbar
        open={openErrorModal}
        autoHideDuration={4000}
        onClose={() => setOpenErrorModal(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setOpenErrorModal(false)}
          severity="error"
          variant="filled"
        >
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

interface SearchProps {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  results: SearchResult[];
  query: string;
}
const SearchBar = ({ setQuery, isLoading, results, query }: SearchProps) => {
  const theme = useTheme();
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
              backgroundColor: "#111111e6",
              borderRadius: { xs: 0.5, sm: 0 },
              padding: 1,
              overflowY: "auto",
              overflowX: "hidden",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeIn" }}
          >
            {results.length != 0 &&
              results.map((film, index) => (
                <SearchCard film={film} key={index} />
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
}

const SearchCard = ({ film }: SearchCardProps) => {
  const title = film.media_type === "movie" ? film.title : film.name;
  const release =
    film.media_type === "movie" ? film.release_date : film.first_air_date;
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
