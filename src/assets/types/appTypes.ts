// user should be able to select a genre fr both shows and movies....so, one type, used between movie and tv show types
export type Genre = {
  id: number;
  name: string;
};

// response type for both movies and tv shows, response type will change so we can use <T> to make it generic based on the type of response we fetch from a search or genre selection.
export type Response<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};

// movie type
export type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  overview: string;
  popularity: number;
};
// full movie object type
export type MovieDetails = {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genres: Genre[]; // full genre objects, not just ids
  overview: string;
  runtime: number | null;
  budget: number;
  revenue: number;
  status: string;
  tagline: string | null;
  homepage: string | null;
};
// tv show type
export type TVShow = {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  overview: string;
  popularity: number;
};
// full tv show type
export type TVShowDetails = {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  genres: Genre[];
  overview: string;
  number_of_seasons: number;
  number_of_episodes: number;
  status: string;
  tagline: string | null;
  homepage: string | null;
  episode_run_time: number[];
};

// cast member type, used for both movies and tv shows
export type CastMember = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
};
export type Credits = {
  cast: CastMember[];
};
export type Video = {
  id: string;
  name: string;
  site: string;
  type: string;
  key: string;
  official: boolean;
};
export type VideoResponse = {
  results: Video[];
};
export type MovieDetailsFinal = MovieDetails & {
  credits: Credits;
  videos: VideoResponse;
};
export type TVShowDetailsFinal = TVShowDetails & {
  credits: Credits;
  videos: VideoResponse;
};
export type SearchResult = (Movie | TVShow) & {
  media_type: "movie" | "tv" | "person";
};
