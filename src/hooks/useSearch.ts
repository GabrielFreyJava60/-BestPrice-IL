import { useQuery } from '@tanstack/react-query';
import { searchAllChains } from '@/features/search/api/searchApi';
import { useSearchStore } from '@/features/search/store/searchStore';
import { useEffect } from 'react';

export const useSearch = (query: string) => {
  const { addRecentSearch, setSearchResults, setCurrentQuery } = useSearchStore();

  const queryResult = useQuery({
    queryKey: ['search', query],
    queryFn: () => searchAllChains(query),
    enabled: !!query && query.length > 0,
  });

  useEffect(() => {
    if (query && queryResult.data) {
      setSearchResults(queryResult.data);
      setCurrentQuery(query);
      addRecentSearch(query);
    }
  }, [query, queryResult.data, setSearchResults, setCurrentQuery, addRecentSearch]);

  return queryResult;
};

