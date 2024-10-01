import {createApi} from '@reduxjs/toolkit/query/react';
import {env} from '../../env';
import {ListResponse, Movie} from './types';
import {dynamicBaseQuery} from './base-query';
import {sanitizeQuery} from '../utils/sanitizeQuery';

type MovieListResponse = ListResponse<Movie>;

type PaginationQueryParams = {
  page: number;
};

type SearchMoviesQueryParams = PaginationQueryParams & {
  query: string;
};

type MoviePopularQueryParams = PaginationQueryParams;

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: dynamicBaseQuery,
  endpoints: builder => ({
    getSearchMovies: builder.query<MovieListResponse, SearchMoviesQueryParams>({
      query: ({query, page}) => {
        const sanitizedQuery = sanitizeQuery(query);
        return `/search/movie?api_key=${env.TMDB_API_KEY}&query=${sanitizedQuery}&page=${page}`;
      },
    }),
    getMoviePopular: builder.query<MovieListResponse, MoviePopularQueryParams>({
      query: ({page}) =>
        `/movie/popular?api_key=${env.TMDB_API_KEY}&page=${page}`,
    }),
    getMovieById: builder.query<Movie, {id: number}>({
      query: ({id}) => `/movie/${id}?api_key=${env.TMDB_API_KEY}`,
    }),
  }),
});

export const {
  useLazyGetSearchMoviesQuery,
  useGetMovieByIdQuery,
  useLazyGetMoviePopularQuery,
} = movieApi;
