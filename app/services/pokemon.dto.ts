import { PokeAPI } from "pokeapi-types";
import { PokemonCry } from "../domain/pokemonDetails";

export interface PokemonDto extends PokeAPI.Pokemon {
  cries: PokemonCry;
  imageUrl: string;
}
