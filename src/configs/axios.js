import axios from "axios";

export const apiFetch = axios.create({
  baseURL: "https://api.unsplash.com",
  withCredentials: false
});