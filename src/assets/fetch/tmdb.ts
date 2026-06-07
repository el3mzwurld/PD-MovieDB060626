const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNzM0MmQ0NDliYWM2ZDM0MjE1Mjc1MDE3Mjg5MjhhMSIsIm5iZiI6MTc4MDQ4MzI1OC41MTgwMDAxLCJzdWIiOiI2YTIwMDRiYTRmNTZhNjQ4N2FiNzU0Y2EiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.JXbv7jyZ7yp38ZlO3KO7Xuubs5yvWvo5ot_WhlWl68I";
const BASE_URL = "https://api.themoviedb.org/3/";

export async function tmdbFetch<T>(
  endpoint: string,
  params: Record<string, string> = {},
  signal?: AbortSignal,
): Promise<T> {
  const url = new URL(`${BASE_URL}${endpoint}`);

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
