import React, { useEffect } from "react";
import Grid from "../components/Grid";
import PokemonList from "../components/PokemonList";
import useGetInfinitePokemon from "../hooks/useGetInfinitePokemon";
import Loading from "../components/Loading";

export default function HomePage() {
  const { ref, pokemons, error, isFetchingNextPage, status } =
    useGetInfinitePokemon();

  useEffect(() => {
    console.log("pokemons...", pokemons);
  }, [pokemons]);

  if (status === "error" && error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Grid>
        <PokemonList pokemons={pokemons} innerRef={ref} />
      </Grid>
      <div>{isFetchingNextPage && <Loading />}</div>
    </>
  );
}
