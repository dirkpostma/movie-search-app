import {BaseQueryFn, fetchBaseQuery} from '@reduxjs/toolkit/query';
import {fetchMovieByIdMock, fetchMoviesMock} from './mock-movies';
import {env} from '../../env';

export const MOCK_API_DELAY_MS = 1000;

type QueryParams = Record<string, string>;

const parseQueryParams = (queryString: string): QueryParams => {
  const params: QueryParams = {};
  const pairs = queryString.replace(/^\?/, '').split('&');
  for (const pair of pairs) {
    const [key, value] = pair.split('=');
    params[decodeURIComponent(key)] = decodeURIComponent(value || '');
  }
  return params;
};

type FetchFunction = ({
  url,
  params,
}: {
  url: string;
  params: QueryParams;
}) => Promise<any>;

const defaultFetchFunction: FetchFunction = async ({url, params}) => {
  const page = parseInt(params.page || '1', 10);

  if (url.includes('/search/movie')) {
    const query = params.query || '';
    return await fetchMoviesMock(query, page);
  } else if (url.includes('/movie/popular')) {
    return await fetchMoviesMock(undefined, page);
  } else if (url.match(/\/movie\/\d+$/)) {
    const id = parseInt(url.split('/').pop() || '', 10);
    if (isNaN(id)) {
      throw new Error('Invalid movie ID');
    }
    return await fetchMovieByIdMock(id);
  } else {
    throw new Error('Unsupported endpoint');
  }
};

let currentFetchFunction: FetchFunction = defaultFetchFunction;

export const setFetchFunction = (fetchFunction: FetchFunction) => {
  currentFetchFunction = fetchFunction;
};

export const setDefaultFetchFunction = () => {
  setFetchFunction(defaultFetchFunction);
};

const mockBaseQuery: BaseQueryFn = async args => {
  await new Promise(resolve => setTimeout(resolve, MOCK_API_DELAY_MS));
  let data;

  try {
    if (typeof args === 'string') {
      const [url, queryString] = args.split('?');
      const params = parseQueryParams(queryString || '');
      data = await currentFetchFunction({url, params});
      return {data};
    } else {
      throw new Error('Unsupported format mockBaseQuery');
    }
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

let currentBaseQuery: BaseQueryFn = env.IS_E2E
  ? mockBaseQuery
  : productionBaseQuery;

export const dynamicBaseQuery: BaseQueryFn = async (
  args,
  api,
  extraOptions,
) => {
  return currentBaseQuery(args, api, extraOptions);
};
