import {http, HttpResponse} from 'msw';
import {setupServer} from 'msw/node';

const movies = [
  {id: 1, title: 'The Matrix'},
  {id: 2, title: 'Inception'},
];

const buildResponse = (query: string) => {
  const results = movies.filter(movie =>
    movie.title.toLowerCase().includes(query.toLowerCase()),
  );

  return {
    page: 1,
    results,
    total_pages: 1,
    total_results: results.length,
  };
};

export const handlers = [
  http.get('https://api.themoviedb.org/3/search/movie', async ({request}) => {
    const url = request?.url;
    let searchParams: URLSearchParams | undefined;
    let query = '';

    if (url) {
      const urlObj = new URL(url);
      searchParams = urlObj.searchParams;
      query = searchParams.get('query') || '';
    }

    await new Promise(resolve => setTimeout(resolve, 100));

    const response = buildResponse(query);

    return HttpResponse.json(response);
  }),
  http.get('*', async () => {
    return new HttpResponse({}, {status: 500});
  }),
];

export const server = setupServer(...handlers);
