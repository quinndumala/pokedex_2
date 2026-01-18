import { PokeAPI } from "pokeapi-types";

export interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonType[];
  abilities: PokemonAbility[];
  cry: string;
  stats: PokemonStats[];
  imageUrl?: string;
  sprites?: PokemonSprite[];
  flavorText: PokeAPI.FlavorText;
}

export enum PokemonSpriteKind {
  OFFICIAL_ARTWORK = "official-artwork",
  DREAM_WORLD = "dream_world",
  SHOWDOWN = "showdown",
}

export interface PokemonSprite {
  kind: PokemonSpriteKind;
  front_default: string | null;
  front_shiny?: string | null;
}

interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface PokemonAbility {
  slot: number;
  is_hidden: boolean;
  ability: {
    name: string;
    url: string;
  };
}

export interface PokemonCry {
  latest: string;
  legacy: string;
}

interface PokemonStats {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}
