import {
  PokemonDetails,
  PokemonSprite,
  PokemonSpriteKind,
} from "../domain/pokemonDetails";
import { PokemonDto } from "./pokemon.dto";

type PokemonDetailsDto = Omit<PokemonDto, "abilities"> & {
  abilities: PokemonDetails["abilities"];
};

export function mapPokemonDetails(
  pokemonData: PokemonDetailsDto
): PokemonDetails {
  const sprites = mapPokemonSprites(pokemonData);
  const showdown = sprites.find((s) => s.kind === PokemonSpriteKind.SHOWDOWN);

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
    gifUrl: showdown?.front_default ?? null,
    sprites,
    flavorText: pokemonData.flavorText,
  };
}

export function mapPokemonSprites(pokemonData: PokemonDto): PokemonSprite[] {
  const officialArtwork = pokemonData.sprites.other?.["official-artwork"];
  const dreamWorld = pokemonData.sprites.other?.dream_world;
  const showdown = pokemonData.sprites.other?.showdown;

  return [
    {
      kind: PokemonSpriteKind.OFFICIAL_ARTWORK,
      front_default: officialArtwork?.front_default ?? null,
      front_shiny: officialArtwork?.front_shiny ?? null,
    },
    {
      kind: PokemonSpriteKind.DREAM_WORLD,
      front_default: (dreamWorld?.front_default as string | null) ?? null,
    },
    {
      kind: PokemonSpriteKind.SHOWDOWN,
      front_default: (showdown?.front_default as string | null) ?? null,
      front_shiny: (showdown?.front_shiny as string | null) ?? null,
    },
  ].filter((s) => s.front_default || s.front_shiny);
}
