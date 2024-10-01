import {createApi} from '@reduxjs/toolkit/query/react';
import {env} from '../../env';
import {ListResponse, Movie} from './types';
import {dynamicBaseQuery} from './base-query';

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
      query: ({query, page}) =>
        `/search/movie?api_key=${env.TMDB_API_KEY}&query=${query}&page=${page}`,
    }),
    getSearchMoviesV2: builder.query<
      MovieListResponse,
      SearchMoviesQueryParams
    >({
      query: ({query, page}) =>
        `/search/movie?api_key=${env.TMDB_API_KEY}&query=${query}&page=${page}`,
      serializeQueryArgs: ({endpointName, queryArgs}) => {
        return `${endpointName}-${queryArgs.query}`;
      },
      merge: (currentCache, newData) => {
        currentCache.results = [
          ...(currentCache.results || []),
          ...newData.results,
        ];
        currentCache.page = newData.page;
        currentCache.total_pages = newData.total_pages;
      },
      forceRefetch({currentArg, previousArg}) {
        return (
          currentArg?.query !== previousArg?.query ||
          currentArg?.page !== previousArg?.page
        );
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
  useGetSearchMoviesV2Query,
} = movieApi;
