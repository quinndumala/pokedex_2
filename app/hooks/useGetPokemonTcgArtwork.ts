import { useEffect, useState } from "react";
import type { PokemonTcgCardArt } from "../domain/tcgCard";

const useGetPokemonTcgArtwork = (dexNumber: number | null | undefined) => {
  const [cards, setCards] = useState<PokemonTcgCardArt[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (dexNumber == null || dexNumber < 1) {
      setCards([]);
      setError(null);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setCards([]);
    setError(null);

    const load = async () => {
      try {
        const res = await fetch(`/api/pokemon-tcg/${dexNumber}`, {
          signal: controller.signal,
        });
        if (!res.ok) {
          throw new Error(`Request failed: ${res.status}`);
        }
        const body: { cards?: PokemonTcgCardArt[] } = await res.json();
        setCards(body.cards ?? []);
      } catch (e) {
        if (e instanceof Error && e.name === "AbortError") return;
        setError(e instanceof Error ? e.message : "Failed to load TCG artwork");
        setCards([]);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    void load();
    return () => controller.abort();
  }, [dexNumber]);

  return { cards, loading, error };
};

export default useGetPokemonTcgArtwork;
