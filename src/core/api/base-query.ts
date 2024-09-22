import {BaseQueryFn, fetchBaseQuery} from '@reduxjs/toolkit/query';
import { fetchMoviesMock } from './mock-movies';

const parseQueryParams = (queryString: string): Record<string, string> => {
  const params: Record<string, string> = {};
  const pairs = queryString.replace(/^\?/, '').split('&');
  for (const pair of pairs) {
    const [key, value] = pair.split('=');
    params[decodeURIComponent(key)] = decodeURIComponent(value || '');
  }
  return params;
};

const mockBaseQuery: BaseQueryFn = async args => {
  try {
    let data;
    if (typeof args === 'string') {
      const [path, queryString] = args.split('?');
      const params = parseQueryParams(queryString || '');
      const page = parseInt(params.page || '1', 10);

      if (path.includes('/search/movie')) {
        const query = params.query || '';
        data = await fetchMoviesMock(query, page);
      } else if (path.includes('/movie/popular')) {
        data = await fetchMoviesMock(undefined, page);
      } else {
        throw new Error('Unsupported endpoint');
      }
    } else {
      throw new Error('Unsupported query format');
    }
    return {data};
  } catch (error) {
    return {error: error instanceof Error ? error.message : 'Unknown error'};
  }
};

const productionBaseQuery = fetchBaseQuery({
  baseUrl: 'https://api.themoviedb.org/3',
});

export const setProductionBaseQuery = () => {
  currentBaseQuery = productionBaseQuery;
};

export const setMockBaseQuery = () => {
  currentBaseQuery = mockBaseQuery;
};

let currentBaseQuery: BaseQueryFn = productionBaseQuery;

export const dynamicBaseQuery: BaseQueryFn = async (
  args,
  api,
  extraOptions,
) => {
  return currentBaseQuery(args, api, extraOptions);
};
