import { PokemonDetails } from "../domain/pokemonDetails";
import { PokemonDto } from "./pokemon.dto";

export function mapPokemonDetails(pokemonData: PokemonDto): PokemonDetails {
  return {
    id: pokemonData.id,
    name: pokemonData.name,
    height: pokemonData.height,
    weight: pokemonData.weight,
    types: pokemonData.types,
    abilities: pokemonData.abilities,
    cry: pokemonData.cries.latest,
    stats: pokemonData.stats,
    imageUrl: pokemonData.imageUrl,
    flavorText: pokemonData.flavorText,
  };
}
