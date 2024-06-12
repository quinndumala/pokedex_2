import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPokemonData } from "../services";

const useGetInfinitePokemon = () => {
  const { ref, inView } = useInView();
  const initialLoadLength = 21;

  const {
    data: pokemons,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["pokemons"],
    queryFn: getPokemonData,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage =
        lastPage.length === initialLoadLength
          ? allPages.length * initialLoadLength
          : undefined;
      return nextPage;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      console.log("Fetch next page");
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  return { ref, pokemons, error, isFetchingNextPage, status };
};

export default useGetInfinitePokemon;
