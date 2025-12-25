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
