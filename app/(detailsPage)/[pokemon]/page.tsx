"use client";

import Image from "next/image";
import { capitalizeFirstLetter } from "@/app/util";
import useGetPokemonDetails from "../../hooks/useGetPokemonDetails";
import useGetPokemonTcgArtwork from "../../hooks/useGetPokemonTcgArtwork";
import PokemonTcgCarousel from "../../components/PokemonTcgCarousel";
import PokemonAbilities from "../../components/PokemonAbilities";
import PokemonStatsBars from "../../components/PokemonStatsBars";
import PokemonTypeIcons from "../../components/PokemonTypeIcons";
import { useParams } from "next/navigation";
import Skeleton from "react-loading-skeleton";

function DetailsPage() {
  const { pokemon } = useParams<{ pokemon: string }>();
  const { data, loading, error } = useGetPokemonDetails(pokemon);
  const displayName = capitalizeFirstLetter(data?.name ?? "");
  const tcgDexNumber =
    loading === true || error !== null || !data ? null : data.id;
  const { cards: tcgCards, loading: tcgLoading } =
    useGetPokemonTcgArtwork(tcgDexNumber);

  const errorState = () => (
    <div className="mx-14 flex h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-3xl font-bold">Not Found</h1>
    </div>
  );

  const loadingState = () => (
    <>
      <figure>
        <Skeleton width={250} height={250} />
      </figure>
      <h1 className="mb-1 mt-4 text-4xl font-bold">
        <Skeleton width={200} />
      </h1>
      <div className="mb-3 flex justify-center">
        <Skeleton width={100} height={20} />
      </div>
      <p className="text-lg">
        <Skeleton count={3} width={300} />
      </p>
      <div className="mt-6 w-full max-w-lg space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i}>
            <Skeleton className="mb-1" width={120} />
            <Skeleton height={12} />
          </div>
        ))}
      </div>
    </>
  );

  const pageContent = () => (
    <div className="mx-5 flex flex-col items-center">
      <figure>
        <Image
          src={data?.imageUrl ?? ""}
          alt={displayName}
          width={250}
          height={250}
        />
      </figure>
      <div>
        <h1 className="mb-0 text-3xl font-bold">{displayName}</h1>
      </div>
      {data?.types?.length ? (
        <div className="pt-2">
          <PokemonTypeIcons types={data.types} />
        </div>
      ) : null}
      <p className="text-md max-w-lg text-center">
        {data?.flavorText?.flavor_text}
      </p>
      {data?.abilities?.length ? (
        <PokemonAbilities abilities={data.abilities} />
      ) : null}
      {data?.stats ? <PokemonStatsBars stats={data.stats} /> : null}
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-8">
      {loading === true ? (
        <div className="mx-5 flex flex-col items-center">{loadingState()}</div>
      ) : error ? (
        errorState()
      ) : (
        <>
          {pageContent()}
          <div className="w-full">
            <PokemonTcgCarousel
              cards={tcgCards}
              loading={tcgLoading}
              pokemonName={displayName}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default DetailsPage;
