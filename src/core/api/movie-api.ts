import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {env} from '../../env';

type Movie = {
  id: number;
  title: string;
};

type ListResponse<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};

type MovieResponse = ListResponse<Movie>;

type QueryParams = {
  query: string;
  page: number;
};

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org/3',
  }),
  endpoints: builder => ({
    getSearchMovies: builder.query<MovieResponse, QueryParams>({
      query: ({query, page}) =>
        `/search/movie?api_key=${env.TMDB_API_KEY}&query=${query}&page=${page}`,
    }),
  }),
});

export const {useLazyGetSearchMoviesQuery} = movieApi;
