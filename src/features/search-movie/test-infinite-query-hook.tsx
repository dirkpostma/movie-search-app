import React from 'react';

import {useSearchMoviesInfiniteQuery} from './use-search-movies-infinite-query';
import {Screen} from '../../core/ui/atoms/screen';
import {H1, P} from '../../core/ui/atoms/typography';
import {Button, ScrollView} from 'react-native';
import {
  setMockBaseQuery,
  setProductionBaseQuery,
} from '../../core/api/base-query';
import {SearchMovieTextInput} from '../../core/ui/molecules/search-movie-text-input';

export const TestInfiniteQueryHook = () => {
  const {
    query,
    setQuery,
    movies,
    isLoading,
    isFetching,
    error,
    loadMore,
    hasMore,
  } = useSearchMoviesInfiniteQuery();

  return (
    <Screen>
      <H1>Test Infinite Query Hook</H1>
      <SearchMovieTextInput onChange={e => setQuery(e.nativeEvent.text)} />
      <Button title="Load More" onPress={loadMore} />
      <Button title="Mock baseQuery" onPress={() => setMockBaseQuery()} />
      <Button title="Production baseQuery" onPress={() => setProductionBaseQuery()}/>

      <P>
        {JSON.stringify(
          {
            query,
            isLoading,
            isFetching,
            error,
            hasMore,
            numResults: movies.length,
          },
          null,
          2,
        )}
      </P>
      <ScrollView>
        <P>
          {JSON.stringify(
            movies.map(movie => ({id: movie.id, title: movie.title})),
            null,
            2,
          )}
        </P>
      </ScrollView>
    </Screen>
  );
};
