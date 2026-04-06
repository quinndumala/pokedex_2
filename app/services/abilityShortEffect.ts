import { PokeAPI } from "pokeapi-types";
import { normalizeFlavorText } from "./flavorTextHelper";

function pickEnglishShortEffect(
  entries: PokeAPI.Ability["effect_entries"]
): string | null {
  const en = (entries ?? []).find((e) => e.language?.name === "en");
  const raw = en?.short_effect?.trim();
  if (!raw) return null;
  return normalizeFlavorText(raw);
}

export async function fetchAbilityShortEffectByUrl(
  url: string
): Promise<string | null> {
  const res = await fetch(url);
  if (!res.ok) return null;
  const data: PokeAPI.Ability = await res.json();
  return pickEnglishShortEffect(data.effect_entries);
}

export async function buildAbilityShortEffectMap(
  abilityUrls: string[]
): Promise<Map<string, string | null>> {
  const unique = Array.from(new Set(abilityUrls));
  const pairs = await Promise.all(
    unique.map(async (url) => {
      const shortEffect = await fetchAbilityShortEffectByUrl(url);
      return [url, shortEffect] as const;
    })
  );
  return new Map(pairs);
}
