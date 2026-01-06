import { PokeAPI } from "pokeapi-types";

export function normalizeFlavorText(text: string) {
  return text
    .replace(/\f/g, " ")
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Picks a single flavor text entry in the preferred language.
 * prefer = "last" for cleaner/more modern wording.
 */
export function pickSingleFlavorTextEntry(
  entries: PokeAPI.PokemonSpecies["flavor_text_entries"],
  preferredLanguage = "en",
  prefer: "first" | "last" = "last"
): PokeAPI.PokemonSpecies["flavor_text_entries"][number] | null {
  const englishEntries = (entries ?? []).filter(
    (e) => e.language?.name === preferredLanguage
  );

  if (englishEntries.length === 0) return null;

  const picked =
    prefer === "last"
      ? englishEntries[englishEntries.length - 1]
      : englishEntries[0];

  return {
    ...picked,
    flavor_text: normalizeFlavorText(picked.flavor_text),
  };
}
