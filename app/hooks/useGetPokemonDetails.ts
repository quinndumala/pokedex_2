import { useEffect, useState } from "react";
import { getPokemonDetails } from "../services";
import { PokemonDetails } from "../domain/pokemonDetails";

const useGetPokemonDetails = (pokemon: string) => {
  const [data, setData] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pokemon) return;

    const fetchPokemonDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const pokeData = await getPokemonDetails(pokemon);
        setData(pokeData);
      } catch (error) {
        setError(`Failed to load Pokémon details. ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [pokemon]);

  return { data, loading, error };
};

export default useGetPokemonDetails;
