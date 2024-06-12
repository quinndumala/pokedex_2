import React from "react";
import PokemonCard from "../components/PokemonCard";
import { InfiniteData } from "@tanstack/react-query";

interface PokemonListItem {
  imageUrl: string;
  name: string;
}

interface PokemonListProps {
  pokemons: InfiniteData<any, unknown> | undefined;
  innerRef: (node?: Element | null | undefined) => void;
}

const PokemonList = ({ pokemons, innerRef }: PokemonListProps) => (
  <>
    {pokemons?.pages?.map((page) =>
      page.map((pokemon: PokemonListItem, index: number) => {
        if (page.length === index + 1) {
          return (
            <PokemonCard
              image={pokemon.imageUrl}
              name={pokemon.name}
              key={pokemon.name}
              innerRef={innerRef}
            />
          );
        } else {
          return (
            <PokemonCard
              image={pokemon.imageUrl}
              name={pokemon.name}
              key={pokemon.name}
            />
          );
        }
      })
    )}
  </>
);

export default PokemonList;
