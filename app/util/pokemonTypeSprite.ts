const TYPE_SPRITE_BASE =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-ix/scarlet-violet";

export function pokemonTypeSpriteUrl(typeResourceUrl: string): string | null {
  const match = /\/type\/(\d+)\/?$/.exec(typeResourceUrl);
  if (!match) return null;
  const id = parseInt(match[1], 10);
  if (Number.isNaN(id)) return null;
  if (id >= 19) {
    return `${TYPE_SPRITE_BASE}/${id}.png`;
  }
  return `${TYPE_SPRITE_BASE}/small/${id}.png`;
}
