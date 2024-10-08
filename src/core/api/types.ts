export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  overview: string;
};

export type ListResponse<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
  query?: string;
};
