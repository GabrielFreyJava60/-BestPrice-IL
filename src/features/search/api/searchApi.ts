import { searchShufersal } from './shufersalApi';
import { searchRamiLevy } from './ramiLevyApi';
import { searchVictory } from './victoryApi';
import { searchYbitan } from './ybitanApi';
import { searchMega } from './megaApi';
import { searchTivTaam } from './tivTaamApi';
import { Product, SearchResult, Chain } from '@/shared/types/product';

export const searchAllChains = async (query: string): Promise<SearchResult[]> => {
  const chains: Chain[] = ['shufersal', 'ramilevy', 'victory', 'ybitan', 'mega', 'tivtaam'];
  
  const promises = chains.map(async (chain): Promise<SearchResult> => {
    try {
      let products: Product[] = [];
      
      switch (chain) {
        case 'shufersal':
          products = await searchShufersal(query);
          break;
        case 'ramilevy':
          products = await searchRamiLevy(query);
          break;
        case 'victory':
          products = await searchVictory(query);
          break;
        case 'ybitan':
          products = await searchYbitan(query);
          break;
        case 'mega':
          products = await searchMega(query);
          break;
        case 'tivtaam':
          products = await searchTivTaam(query);
          break;
      }

      return {
        chain,
        products,
        isLoading: false,
        error: null,
      };
    } catch (error) {
      return {
        chain,
        products: [],
        isLoading: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  });

  return Promise.all(promises);
};
