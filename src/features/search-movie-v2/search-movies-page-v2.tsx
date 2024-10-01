import React, {useCallback, useEffect, useState} from 'react';
import {SearchMovie} from '../../core/ui/organisms/search-movie';
import {MainTemplate} from '../../core/ui/templates/main-template';
import {useGetSearchMoviesV2Query} from '../../core/api/movie-api';

type Props = {
  onPressItem: (id: number) => void;
};

export const SearchMoviePageV2 = ({onPressItem}: Props) => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const {data, isLoading, isFetching, error, refetch} =
    useGetSearchMoviesV2Query({query, page}, {skip: query === ''});

  const loadMore = useCallback(() => {
    if (!isFetching && data && data.page < data.total_pages) {
      setPage(prevPage => prevPage + 1);
    }
  }, [data, isFetching]);

  useEffect(() => {
    setPage(1);
  }, [query]);

  return (
    <MainTemplate>
      <SearchMovie
        query={query}
        setQuery={setQuery}
        movies={isLoading ? [] : data?.results || []}
        isLoading={isLoading}
        isLoadingMore={isFetching}
        error={!!error}
        retry={refetch}
        onLoadMore={loadMore}
        onPressItem={onPressItem}
      />
    </MainTemplate>
  );
};
