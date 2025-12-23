import { useEffect, useState } from "react";
import { getPokemonDetails } from "../services";

const useGetPokemonDetails = (pokemon: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!pokemon) return;

    const fetchPokemonDetails = async () => {
      setLoading(true);
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
