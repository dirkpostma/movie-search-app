import React from 'react';

import {useSearchMoviesInfiniteQuery} from './use-search-movies-infinite-query';
import {Screen} from '../../core/ui/atoms/screen';
import {H1, P} from '../../core/ui/atoms/typography';
import {Button, ScrollView} from 'react-native';
import {
  setMockBaseQuery,
  setProductionBaseQuery,
} from '../../core/api/base-query';

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
      <Button title="Load More" onPress={loadMore} />
      <Button title="Set the matrix" onPress={() => setQuery('the matrix')} />
      <Button title="Set inception" onPress={() => setQuery('inception')} />
      <Button title="Set mock baseQuery" onPress={() => setMockBaseQuery()} />
      <Button
        title="Set production baseQuery"
        onPress={() => setProductionBaseQuery()}
      />

      <P>
        {JSON.stringify(
          {query, isLoading, isFetching, error, hasMore},
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
