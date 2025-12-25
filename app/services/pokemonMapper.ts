import { PokemonDetails } from "../domain/pokemonDetails";
import { PokemonDto } from "./pokemon.dto";

export function mapPokemonDetails(data: PokemonDto): PokemonDetails {
  return {
    id: data.id,
    name: data.name,
    height: data.height,
    weight: data.weight,
    types: data.types,
    abilities: data.abilities,
    cry: data.cries.latest,
    stats: data.stats,
    imageUrl: data.imageUrl,
  };
}
