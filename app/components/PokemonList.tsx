import React from "react";
import PokemonCard from "../components/PokemonCard";
import { InfiniteData } from "@tanstack/react-query";

interface PokemonListItem {
  imageUrl: string;
  name: string;
  pokeUrl: string;
  gifUrl: string | null;
}

interface PokemonListProps {
  pokemons: InfiniteData<any, unknown> | undefined;
  innerRef: (node?: Element | null | undefined) => void;
}

const PokemonList = ({ pokemons, innerRef }: PokemonListProps) => {
  return (
    <>
      {pokemons?.pages?.map((page) =>
        page.map((pokemon: PokemonListItem, index: number) => {
          if (page.length === index + 1) {
            return (
              <PokemonCard
                imageUrl={pokemon.imageUrl}
                gifUrl={pokemon.gifUrl}
                name={pokemon.name}
                key={pokemon.name}
                innerRef={innerRef}
              />
            );
          } else {
            return (
              <PokemonCard
                imageUrl={pokemon.imageUrl}
                gifUrl={pokemon.gifUrl}
                name={pokemon.name}
                key={pokemon.name}
              />
            );
          }
        })
      )}
    </>
  );
};

export default PokemonList;
