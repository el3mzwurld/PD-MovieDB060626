const API_KEY = import.meta.env.API_KEY;
const BASE_URL = "https://api.themoviedb.org/3/";

export async function tmdbFetch<T>(
  endpoint: string,
  params: Record<string, string> = {},
  signal?: AbortSignal,
): Promise<T> {
  const url = new URL(`${BASE_URL}${endpoint}`);

  // set the search parameters into the URL Object
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      accept: "applications/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    signal,
  });

  if (!response.ok) {
    throw new Error(`TMDB Fecth Error ${response.status}`);
  }

  return response.json();
}
