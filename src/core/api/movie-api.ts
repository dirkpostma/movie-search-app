import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {env} from '../../env';
import {ListResponse, Movie} from './types';

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
  baseQuery: fetchBaseQuery({baseUrl: 'https://api.themoviedb.org/3'}),
  endpoints: builder => ({
    getSearchMovies: builder.query<MovieListResponse, SearchMoviesQueryParams>({
      query: ({query, page}) =>
        `/search/movie?api_key=${env.TMDB_API_KEY}&query=${query}&page=${page}`,
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
  useGetMoviePopularQuery,
} = movieApi;
