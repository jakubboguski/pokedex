import { useQuery } from "@tanstack/react-query";
import { PokemonService } from "@/services";
import { CONFIG } from "@/utils";
import { usePokemon } from "./use-pokemon";

const getPokemonUrl = (id: number) => `${CONFIG.api}/pokemon/${id}/`;

type Evolution = {
  name: string;
  url: string;
};

type EvolutionChain = {
  species: {
    name: string;
    url: string;
  };
  evolves_to: EvolutionChain[];
};

const getEvolutionDetails = (
  chain: EvolutionChain,
  currentPokemonId: number
) => {
  const evolutions: Evolution[] = [];

  let currentChain = chain;
  while (currentChain) {
    const { species } = currentChain;
    const speciesId = species.url.split("/").filter(Boolean).pop();

    if (speciesId !== String(currentPokemonId)) {
      evolutions.push({
        name: species.name,
        url: getPokemonUrl(Number(speciesId)),
      });
    }

    currentChain = currentChain.evolves_to[0];
  }

  return evolutions;
};

export const usePokemonWithEvolution = (pokemonId: number, limitMoves = 5) => {
  const pokemon = usePokemon(pokemonId, limitMoves);

  const pokemonSpecies = useQuery({
    queryKey: ["pokemonSpecies", pokemonId],
    queryFn: () => PokemonService.getPokemonSpecies(pokemonId),
    enabled: !!pokemonId,
  });

  const evolutionChainUrl = pokemonSpecies.data?.evolution_chain?.url;
  const evolutionChain = useQuery({
    queryKey: ["evolutionChain", evolutionChainUrl],
    queryFn: () => PokemonService.getEvolutionChain(evolutionChainUrl),
    enabled: !!evolutionChainUrl,
  });

  const evolution = evolutionChain.data
    ? getEvolutionDetails(evolutionChain.data.chain, pokemonId)
    : [];

  return {
    pokemon,
    evolution: {
      data: evolution,
      loading: pokemonSpecies.isLoading || evolutionChain.isLoading,
      error: evolutionChain.error || pokemonSpecies.error,
    },
    isLoading:
      pokemon.isLoading || pokemonSpecies.isLoading || evolutionChain.isLoading,
  };
};
