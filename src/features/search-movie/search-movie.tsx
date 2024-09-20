import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {MovieList} from './movie-list';

interface Movie {
  id: number;
  title: string;
}

type Props = {
  query: string;
  onSearch: (text: string) => void;
  movies: Movie[];
  isLoading: boolean;
  isLoadingMore: boolean;
  error: boolean;
  onLoadMore: () => void;
};

export const SearchMovie = ({
  query,
  onSearch,
  movies,
  isLoading,
  isLoadingMore,
  error,
  onLoadMore,
}: Props) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={query}
        onChange={e => onSearch(e.nativeEvent.text)}
        placeholder="Search movies..."
        style={styles.textInput}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
        spellCheck={false}
        importantForAutofill="no"
        contextMenuHidden={true}
        textContentType="none"
      />

      {isLoading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>Error loading movies</Text>
      ) : !isLoadingMore && query && movies.length === 0 ? (
        <Text>No movies found</Text>
      ) : (
        <MovieList
          movies={movies}
          isLoadingMore={isLoadingMore}
          onLoadMore={onLoadMore}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {padding: 16, paddingTop: 100, flex: 1},
  textInput: {padding: 8, borderColor: 'gray', borderWidth: 1},
});
