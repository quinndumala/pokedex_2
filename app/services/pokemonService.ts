import { PokeAPI } from "pokeapi-types";
import { PokemonDetails } from "../domain/pokemonDetails";
import { PokemonDto } from "./pokemon.dto";
import { mapPokemonDetails } from "./pokemonMapper";
import { buildAbilityShortEffectMap } from "./abilityShortEffect";
import { pickSingleFlavorTextEntry } from "./flavorTextHelper";

type PokemonListItem = { name: string; url: string };

type ImageUrlInput = { id: number } | { offset: number; indexInPage: number };

const POKEMON_IMAGE_BASE =
  "https://assets.pokemon.com/assets/cms2/img/pokedex/detail";

const SHOWDOWN_SPRITE_BASE =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown";

function getPokemonImageUrl(input: ImageUrlInput) {
  const pokemonNumber =
    "id" in input ? input.id : input.offset + input.indexInPage + 1;

  const padded = String(pokemonNumber).padStart(3, "0");
  return `${POKEMON_IMAGE_BASE}/${padded}.png`;
}

function getShowdownGifUrlForNationalDexId(id: number): string {
  return `${SHOWDOWN_SPRITE_BASE}/${id}.gif`;
}
export async function getPokemonData({ pageParam }: { pageParam: number }) {
  const limit = 21;
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${pageParam}`
  );

  if (!res.ok) throw new Error(`Failed to fetch data: ${res.status}`);

  const data: { results: PokemonListItem[] } = await res.json();

  return data.results.map((pokemon, indexInPage) => {
    const id = pageParam + indexInPage + 1;
    return {
      ...pokemon,
      imageUrl: getPokemonImageUrl({ offset: pageParam, indexInPage }),
      gifUrl: getShowdownGifUrlForNationalDexId(id),
    };
  });
}

export async function getPokemonDetails(
  pokemon: string
): Promise<PokemonDetails> {
  const [pokemonRes, speciesRes] = await Promise.all([
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`),
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`),
  ]);

  if (!pokemonRes.ok || !speciesRes.ok) throw new Error(`Failed to fetch data`);

  const [pokemonData, speciesData]: [PokemonDto, PokeAPI.PokemonSpecies] =
    await Promise.all([pokemonRes.json(), speciesRes.json()]);

  const shortEffectByUrl = await buildAbilityShortEffectMap(
    pokemonData.abilities.map((a) => a.ability.url)
  );

  const abilities = pokemonData.abilities.map((a) => ({
    ...a,
    shortEffect: shortEffectByUrl.get(a.ability.url) ?? null,
  }));

  return mapPokemonDetails({
    ...pokemonData,
    abilities,
    flavorText:
      pickSingleFlavorTextEntry(
        speciesData.flavor_text_entries,
        "en",
        "last"
      ) ?? speciesData.flavor_text_entries[0],
    imageUrl: getPokemonImageUrl({ id: pokemonData.id }),
  });
}
