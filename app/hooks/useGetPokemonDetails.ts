import { useEffect, useState } from "react";
import { getPokemonDetails } from "../services";

const useGetPokemonDetails = (pokeUrl: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!pokeUrl) return;

    const fetchPokemonDetails = async () => {
      setLoading(true);
      try {
        const pokeData = await getPokemonDetails(pokeUrl);
        setData(data);
      } catch (error) {
        setError(`Failed to load Pokémon details. ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [pokeUrl]);

  return { data, loading, error };
};

export default useGetPokemonDetails;
