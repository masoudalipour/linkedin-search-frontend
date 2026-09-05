import axios from "axios";
import type { SearchResponse } from "../types/search";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export async function searchProfiles(params: {
  q?: string;
  skill?: string;
  job_title?: string;
}) {
  const response = await api.get<SearchResponse>("/search", {
    params,
  });

  return response.data;
}
