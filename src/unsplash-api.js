import axios from "axios";
import { perPage } from "./components/App/App.jsx";

axios.defaults.baseURL = "https://api.unsplash.com/";
const API_KEY = "zhbd5bnlj4Z33BsoLbD2q24h_6OBL81KvaMbhV7hWk4";

export async function fetchImagesByWord(inputValue, page) {
  const response = await axios.get(`/search/photos/?client_id=${API_KEY}`, {
    params: {
      query: `${inputValue}`,
      page: page,
      per_page: perPage,
      orientation: "landscape",
    },
  });
  return response.data;
}
