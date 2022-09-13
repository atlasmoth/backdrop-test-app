export const APP_COLORS = {
  grey: "#E5E5E5",
  black: "#212227",
  white: "#fff",
  red: "#DE0202",
};

// add to build pipeline
const API_KEY =
  "live_83JPCzHUeJT2Pe9aSl1HalkJgPSOdy8rvbjOwKmjzQEhlt18SorQPZnchCamKfWm";

export const fetchCats = async (limit = 10) => {
  const catsUrl = `https://api.thecatapi.com/v1/images/search?limit=${limit}&api_key=${API_KEY}&has_breeds=1`;

  const res = await fetch(catsUrl, {
    method: "GET",
    headers: {
      "Content-Type": "Application/json",
    },
  });
  if (!res.ok || !res.status.toString().startsWith("2"))
    throw new Error("Ooops, something went wrong");
  const catsData = await res.json();
  if (!Array.isArray(catsData))
    throw new Error("Data returned is not an array");
  return catsData;
};
