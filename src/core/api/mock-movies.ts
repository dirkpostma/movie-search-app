import page1 from './movie/popular/page_1.json';
import page2 from './movie/popular/page_2.json';
import page3 from './movie/popular/page_3.json';

const mockMovies = [...page1.results, ...page2.results, ...page3.results];

export const filterMoviesMock = (query?: string) => {
  if (!query) {
    return mockMovies;
  }

  return mockMovies.filter(movie =>
    movie.title.toLowerCase().includes(query.toLowerCase()),
  );
};

export const fetchMoviesMock = async (
  query?: string,
  page: number = 1,
  pageSize: number = 5,
) => {
  const allMovies = filterMoviesMock(query);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedMovies = allMovies.slice(startIndex, endIndex);
  const totalResults = allMovies.length;
  const totalPages = Math.ceil(totalResults / pageSize);

  return {
    results: paginatedMovies,
    total_pages: totalPages,
    page: page,
    total_results: totalResults,
  };
};

export const fetchMovieByIdMock = async (id: number) => {
  const movie = mockMovies.find(m => m.id === id);

  if (!movie) {
    throw new Error(`Movie with id ${id} not found`);
  }

  return movie;
};
