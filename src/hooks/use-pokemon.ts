import { DefaultError, useQuery } from "@tanstack/react-query";
import { PokemonService } from "@/services";
import { Pokemon } from "@/models";

export const usePokemon = (pokemonId: number, limitMoves: number) => {
  return useQuery<Pokemon, DefaultError>({
    queryKey: ["pokemon", pokemonId],
    queryFn: () => PokemonService.getPokemon(pokemonId),
    select: (data) => ({ ...data, moves: data.moves.slice(0, limitMoves) }),
    enabled: !!pokemonId,
  });
};
