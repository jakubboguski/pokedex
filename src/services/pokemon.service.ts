import axios from "axios";
import { CONFIG } from "@/utils";

class PokemonServiceImpl {
  allowedOrigin: string;

  constructor() {
    this.allowedOrigin = new URL(CONFIG.api).origin;
  }

  isValidUrl(url: string) {
    try {
      const parsedUrl = new URL(url);

      return (
        url.startsWith(CONFIG.api) && parsedUrl.origin === this.allowedOrigin
      );
    } catch (error) {
      return false;
    }
  }

  async getPokemons({ limit = 20, offset = 0 }) {
    const response = await axios.get(
      `${CONFIG.api}/pokemon/?limit=${limit}&offset=${offset}`
    );

    return response.data.results;
  }

  async getPokemon(id: number) {
    const url = `${CONFIG.api}/pokemon/${id}`;

    const response = await axios.get(url);
    return response.data;
  }

  async getPokemonSpecies(id: number) {
    const url = `${CONFIG.api}/pokemon-species/${id}`;

    const response = await axios.get(url);
    return response.data;
  }

  async getEvolutionChain(url: string) {
    if (!this.isValidUrl(url)) {
      throw new Error("Invalid URL");
    }

    const response = await axios.get(url);
    return response.data;
  }
}

export const PokemonService = new PokemonServiceImpl();
