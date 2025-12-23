export async function getPokemonData({ pageParam }: { pageParam: number }) {
  const limit = 21;
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${pageParam}`
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.status}`);
  }

  const data = await res.json();
  let filtered = await data.results.map((pokemon: {}, index: number) => {
    let paddedIndex =
      pageParam === 0
        ? ("00" + (index + 1)).slice(-3)
        : ("00" + (index + 1 + pageParam)).slice(-3);

    const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedIndex}.png`;
    return {
      ...pokemon,
      imageUrl: image,
    };
  });

  return filtered;
}

export async function getPokemonDetails(pokemon: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon${pokemon}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.status}`);
  }

  const data = await res.json();
  return data;
}
