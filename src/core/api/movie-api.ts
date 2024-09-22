import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {env} from '../../env';
import {ListResponse, Movie} from './types';

type MovieResponse = ListResponse<Movie>;

type QueryParams = {
  query: string;
  page: number;
};

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({baseUrl: 'https://api.themoviedb.org/3'}),
  endpoints: builder => ({
    getSearchMovies: builder.query<MovieResponse, QueryParams>({
      query: ({query, page}) =>
        `/search/movie?api_key=${env.TMDB_API_KEY}&query=${query}&page=${page}`,
    }),
    getMovieById: builder.query<Movie, { id: number }>({
      query: ({id}) =>
        `/movie/${id}?api_key=${env.TMDB_API_KEY}`,
    }),
  }),
});

export const {useLazyGetSearchMoviesQuery, useGetMovieByIdQuery} = movieApi;
