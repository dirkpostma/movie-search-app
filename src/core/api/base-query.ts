import {BaseQueryFn, fetchBaseQuery} from '@reduxjs/toolkit/query';
import {Movie} from './types';

const fetchSomeData = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const mockData: Movie[] = [
    {
      id: 1,
      title: 'Inception',
      overview: 'Inception overview',
      poster_path: '/inception.jpg',
      release_date: '2001-01-01',
    },
    {
      id: 2,
      title: 'The Matrix',
      overview: 'Overview of The Matrix',
      poster_path: '/thematrix.jpg',
      release_date: '2002-02-02',
    },
  ];

  return {
    results: mockData,
    total_pages: 1,
    page: 1,
    total_results: 2,
  };
};

// See https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#customizing-queries-with-basequery
const mockBaseQuery: BaseQueryFn = async () => {
  try {
    const data = await fetchSomeData();
    return {data};
  } catch (error) {
    return {error};
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
