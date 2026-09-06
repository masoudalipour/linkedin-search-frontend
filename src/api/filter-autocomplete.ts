import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export async function getAutocomplete(
  field: "skills" | "job_title",
  q: string,
) {
  const response = await axios.get(`${API_URL}/autocomplete`, {
    params: {
      field,
      q,
    },
  });

  return response.data;
}
