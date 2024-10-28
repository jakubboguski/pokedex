const pokemonTypeColors: { [key: string]: string } = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
} as const;

interface PokemonTypeColors {
  backgroundColor: string;
  textColor: string;
}

function getContrastColor(backgroundColor: string): string {
  backgroundColor = backgroundColor.replace(/^#/, "");

  const r = parseInt(backgroundColor.substring(0, 2), 16);
  const g = parseInt(backgroundColor.substring(2, 4), 16);
  const b = parseInt(backgroundColor.substring(4, 6), 16);

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.5 ? "#000000" : "#FFFFFF";
}

export function getPokemonTypeColors(type: string): PokemonTypeColors {
  const backgroundColor = pokemonTypeColors[type.toLowerCase()];
  if (!backgroundColor) {
    throw new Error(`Unknown Pokémon type: ${type}`);
  }

  const textColor = getContrastColor(backgroundColor);

  return {
    backgroundColor,
    textColor,
  };
}
