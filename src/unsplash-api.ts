import axios from "axios";
import { perPage } from "./components/App/App.js";
import { Image } from "./types.js";

axios.defaults.baseURL = "https://api.unsplash.com/";
const API_KEY = "zhbd5bnlj4Z33BsoLbD2q24h_6OBL81KvaMbhV7hWk4";

interface FetchImagesByWordResponse {
  results: Image[];
  total: number;
  total_pages: number;
}

export async function fetchImagesByWord(inputValue: string, page: number) {
  const response = await axios.get<FetchImagesByWordResponse>(`/search/photos/?client_id=${API_KEY}`, {
    params: {
      query: `${inputValue}`,
      page: page,
      per_page: perPage,
      orientation: "landscape",
    },
  });
  return response.data;
}
