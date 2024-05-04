import axios from "axios";

const baseURL = "https://www.dnd5eapi.co/api/";

export const instance = axios.create({
  baseURL,
});
