export interface SearchResult {
  score: number;
  full_name: string;
  job_title: string;
  skills: string[];
  summary: string;
  industry: string;
  location_name: string;
  company: string;
}

export interface SearchResponse {
  total: number;
  next_page: string | null;
  results: SearchResult[];
}
