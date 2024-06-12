import React, { useEffect } from "react";
import Grid from "../components/Grid";
import PokemonList from "../components/PokemonList";
import useGetInfinitePokemon from "../hooks/useGetInfinitePokemon";

export default function HomePage() {
  const { ref, pokemons, error, isFetchingNextPage, status } =
    useGetInfinitePokemon();

  useEffect(() => {
    console.log("pokemons...", pokemons);
  }, [pokemons]);

  //if (status === 'loading') return <p>Loading...</p>;
  if (status === "error" && error) return <p>Error: {error.message}</p>;

  return (
    <Grid>
      <PokemonList pokemons={pokemons} innerRef={ref} />
      {isFetchingNextPage && <p>Loading more...</p>}
    </Grid>
  );
}
