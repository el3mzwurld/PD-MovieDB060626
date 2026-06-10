import { useNavigate, useParams } from "react-router-dom";
import { useMovieDetails } from "../hooks/useMovieDetails";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import type { CastMember, MovieDetailsFinal, Video } from "../types/appTypes";
import { useEffect, useState } from "react";
import { format } from "date-fns";

const MoviePage = () => {
  const { id } = useParams();
  const theme = useTheme();
  const { details, isLoading, error } = useMovieDetails(Number(id));
  const navigate = useNavigate();
  const [trailer, setTrailer] = useState<Video | null>(null);

  const findTrailer = (results: MovieDetailsFinal) => {
    if (!results) return;

    const result =
      results.videos.results.find(
        (vid) =>
          vid.type === "Trailer" && vid.site === "YouTube" && vid.official,
      ) ??
      results.videos.results.find(
        (vid) =>
          vid.type === "Teaser" && vid.site === "YouTube" && vid.official,
      );
    if (result) setTrailer(result);
  };

  useEffect(() => {
    if (!details) return;
    findTrailer(details);
  }, [details]);

  const formattedDate = details?.release_date
    ? format(new Date(details.release_date), "MMMM dd, yyyy")
    : "TBA";

  return (
    <Stack
      sx={{
        width: "100%",
        height: "100vh",
        backgroundColor: theme.palette.primary.dark,
      }}
    >
      <Box
        component={"header"}
        sx={{
          width: "100%",
          height: "auto",
          padding: 1,
          fontWeight: 600,
          fontFamily: "dm sans",
          fontSize: { xs: 10, lg: 12 },
          color: "white",
          p: { xs: 1.5, md: 2 },
          cursor: "pointer",
        }}
      >
        <span onClick={() => navigate(-1)}>{`<`} Go back</span>
      </Box>

      <Stack
        spacing={{ xs: 1.5, lg: 2 }}
        sx={{
          width: "100%",
          height: "auto",
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={1}
          sx={{ height: "auto", width: "100%", px: { lg: 2 } }}
        >
          {/* movie image and information */}
          <Box
            component={"section"}
            sx={{
              width: { xs: "100%" },
              height: "auto",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 1.5,
              padding: { xs: 1, lg: "5px 10px" },
              alignItems: { xs: "center", lg: "start" },
              justifyContent: "space-between",
            }}
          >
            {/* image */}
            <Box
              component={"img"}
              sx={{
                width: { xs: "125px", lg: "200px" },
                height: { xs: "210px", lg: "280px" },
              }}
              src={
                details?.poster_path
                  ? `https://image.tmdb.org/t/p/w780/${details.poster_path}`
                  : details?.backdrop_path
                    ? `https://image.tmdb.org/t/p/w780/${details.backdrop_path}`
                    : "/placeholder.png"
              }
            />

            {/* information */}
            <Stack
              sx={{
                width: { xs: "100%", lg: "100%" },
                height: "100%",
                padding: { xs: 2 },
                color: "white",
                fontFamily: "dm sans",
                fontWeight: 500,
                alignContent: { xs: "center", lg: "start" },
                justifyContent: { xs: "center", lg: "start" },
              }}
              spacing={1.2}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: "12px",
                }}
              >
                <Typography variant="caption">Title</Typography>
                {details?.title}
              </span>

              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: "12px",
                }}
              >
                <Typography variant="caption">Release Date</Typography>
                {formattedDate}
              </span>

              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: "12px",
                }}
              >
                <Typography variant="caption">Runtime</Typography>
                {details?.runtime ? `${details.runtime} minutes` : "N/A"}
              </span>

              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: "12px",
                }}
              >
                <Typography variant="caption">Rating</Typography>
                {details?.vote_average
                  ? `${details.vote_average} / 10 on TMDb`
                  : "N/A"}
              </span>

              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                }}
              >
                <Typography
                  variant={"caption"}
                  sx={{
                    fontStyle: "italic",
                    fontFamily: "inter",
                    py: 1,
                    color: "text.disabled",
                  }}
                >
                  {details?.tagline ? `"${details.tagline}"` : ""}
                </Typography>
              </span>
            </Stack>
          </Box>

          {/* trailer / teaser */}
          <Box
            component={"section"}
            sx={{
              width: { xs: "100%", lg: "60%" },
              height: "auto",
              padding: { xs: 2, lg: 0.5 },
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: { xs: "220px", lg: "325px" },
                overflow: "hidden",
                display: "flex",
                alignItems: { xs: "center", lg: "start" },
                justifyContent: "center",
              }}
            >
              {trailer ? (
                <Box
                  component="iframe"
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  sx={{
                    width: "100%",
                    aspectRatio: "16/9",
                    border: "none",
                    borderRadius: 1,
                  }}
                  allowFullScreen
                />
              ) : (
                <Typography
                  sx={{
                    color: "white",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  No trailer available
                </Typography>
              )}
            </Box>
          </Box>
        </Stack>

        {/* overview */}
        <Box
          component={"section"}
          sx={{
            width: "100%",
            height: "auto",
            padding: { xs: 1, md: 1 },
            color: "white",
            fontFamily: "dm sans",
            pl: { lg: 1.5 },
          }}
        >
          <Typography variant="h3">Overview</Typography>
          <Typography
            variant="body2"
            sx={{
              width: { lg: 7 / 10 },
              lineHeight: 2,
              color: "white",
              fontFamily: "dm sans",
              mt: 1.25,
            }}
          >
            {details && details.overview}
          </Typography>
        </Box>

        {/* cast */}
        <Box
          component={"section"}
          sx={{
            width: "100%",
            height: "auto",
            padding: { xs: 1, md: 1 },
            color: "white",
            fontFamily: "dm sans",
            pl: { lg: 1.5 },
          }}
        >
          <Typography variant="h3">Cast Members</Typography>

          <Stack
            direction={"row"}
            sx={{
              padding: { xs: 0.5, md: 1 },
              display: "flex",
              marginY: { xs: 1.5, md: 2 },
              rowGap: { xs: 1.5, md: 2 },
              columnGap: 3,
              overflowX: "scroll",
              width: "100%",
            }}
          >
            {details &&
              details.credits.cast.map((cast) => (
                <CastCard member={cast} key={cast.order} />
              ))}
          </Stack>
        </Box>
      </Stack>
    </Stack>
  );
};

interface CastProps {
  member: CastMember;
}

const CastCard = ({ member }: CastProps) => {
  const colors = [
    "#FFB3C1",
    "#FFD9A6",
    "#D6F4FF",
    "#C8E6C9",
    "#FFE5B4",
    "#FAD6E8",
    "#DCE8FF",
    "#B8F1DA",
  ];

  const randomColor = (arr: Array<string>): string => {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const color = arr[randomIndex];
    return color;
  };
  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <Stack
      spacing={0.8}
      sx={{ width: "auto", height: "auto", alignItems: "center" }}
    >
      <Box
        sx={{
          height: { xs: 45, md: 50 },
          borderRadius: "100px",
          backgroundColor: randomColor(colors),
          width: { xs: 45, md: 50 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "600",
          color: "black",
        }}
      >
        {initials}
      </Box>
      <Typography variant="body2" sx={{ textAlign: "center" }}>
        {member.name}
      </Typography>
    </Stack>
  );
};

export default MoviePage;
