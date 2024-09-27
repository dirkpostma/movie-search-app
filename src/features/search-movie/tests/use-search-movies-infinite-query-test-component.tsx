import React from 'react';

import {useSearchMoviesInfiniteQuery} from '../use-search-movies-infinite-query';
import {MainTemplate} from '../../../core/ui/templates/main-template';
import {H1} from '../../../core/ui/atoms/typography';
import {Button, ScrollView, Text, View} from 'react-native';
import {
  setDefaultFetchFunction,
  setFetchFunction,
  setMockBaseQuery,
  setProductionBaseQuery,
} from '../../../core/api/base-query';
import {SearchMovieTextInput} from '../../../core/ui/molecules/search-movie-text-input';

const setErrorResponse = () =>
  setFetchFunction(async () => {
    throw new Error('Test error response');
  });

export const UseSearchMoviesInfiniteQueryTestComponent = () => {
  const {
    setQuery,
    movies,
    isLoading,
    isFetching,
    error,
    loadMore,
    hasMore,
    retryLastPage,
  } = useSearchMoviesInfiniteQuery();

  return (
    <MainTemplate>
      <H1>Test Infinite Query Hook</H1>
      <SearchMovieTextInput onChange={e => setQuery(e.nativeEvent.text)} />
      <View>
        <Button title="Load More" onPress={loadMore} />
        <Button title="Mock baseQuery" onPress={() => setMockBaseQuery()} />
        <Button title="Set error response" onPress={setErrorResponse} />
        <Button
          title="Set default response"
          onPress={setDefaultFetchFunction}
        />
        <Button
          title="Production baseQuery"
          onPress={() => setProductionBaseQuery()}
        />
      </View>

      <View>
        <Text>isLoading: {isLoading ? 'true' : 'false'}</Text>
        <Text>isFetching: {isFetching ? 'true' : 'false'}</Text>
        <Text>error: {error ? 'true' : 'false'}</Text>
        <Text>hasMore: {hasMore ? 'true' : 'false'}</Text>
        <Text>numResults: {movies.length}</Text>
        <Text>----</Text>
      </View>

      {error && (
        <>
          <Text>An error occurred</Text>
          <Button title="Retry" onPress={retryLastPage} />
        </>
      )}

      <ScrollView>
        {movies.map(movie => (
          <Text key={movie.id}>{movie.title}</Text>
        ))}
      </ScrollView>
    </MainTemplate>
  );
};
