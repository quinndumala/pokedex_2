import { PokemonDetails } from "../domain/pokemonDetails";
import { PokemonDto } from "./pokemon.dto";
import { mapPokemonDetails } from "./pokemonMapper";

type PokemonListItem = { name: string; url: string };

type ImageUrlInput = { id: number } | { offset: number; indexInPage: number };

const POKEMON_IMAGE_BASE =
  "https://assets.pokemon.com/assets/cms2/img/pokedex/detail";

function getPokemonImageUrl(input: ImageUrlInput) {
  const pokemonNumber =
    "id" in input ? input.id : input.offset + input.indexInPage + 1;

  const padded = String(pokemonNumber).padStart(3, "0");
  return `${POKEMON_IMAGE_BASE}/${padded}.png`;
}
export async function getPokemonData({ pageParam }: { pageParam: number }) {
  const limit = 21;
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${pageParam}`
  );

  if (!res.ok) throw new Error(`Failed to fetch data: ${res.status}`);

  const data: { results: PokemonListItem[] } = await res.json();

  return data.results.map((pokemon, indexInPage) => ({
    ...pokemon,
    imageUrl: getPokemonImageUrl({ offset: pageParam, indexInPage }),
  }));
}

export async function getPokemonDetails(
  pokemon: string
): Promise<PokemonDetails> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon${pokemon}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.status}`);
  }

  const data: PokemonDto = await res.json();
  return mapPokemonDetails({
    ...data,
    imageUrl: getPokemonImageUrl({ id: data.id }),
  });
}
