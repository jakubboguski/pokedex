import {
  DefaultError,
  InfiniteData,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { Pokemon } from "@/models";
import { PokemonService } from "@/services";

export const usePokemons = (pageSize = 20) => {
  return useInfiniteQuery<
    Pokemon,
    DefaultError,
    InfiniteData<Pokemon, number>,
    string[],
    number
  >({
    queryKey: ["pokemons"],
    queryFn: ({ pageParam }) =>
      PokemonService.getPokemons({
        limit: pageSize,
        offset: pageParam,
      }),
    initialPageParam: 0,
    getNextPageParam: (_, allPages) => allPages.length * pageSize,
  });
};
