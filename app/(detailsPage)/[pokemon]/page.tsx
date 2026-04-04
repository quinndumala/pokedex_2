"use client";

import Image from "next/image";
import { capitalizeFirstLetter } from "@/app/util";
import useGetPokemonDetails from "../../hooks/useGetPokemonDetails";
import useGetPokemonTcgArtwork from "../../hooks/useGetPokemonTcgArtwork";
import PokemonTcgCarousel from "../../components/PokemonTcgCarousel";
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
      <h1 className="mb-4 mt-4 text-4xl font-bold">
        <Skeleton width={200} />
      </h1>
      <p className="text-lg">
        <Skeleton count={3} width={300} />
      </p>
    </>
  );

  const pageContent = () => (
    <>
      <figure>
        <Image
          src={data?.imageUrl ?? ""}
          alt={displayName}
          width={250}
          height={250}
        />
      </figure>
      <h1 className="mb-4 text-3xl font-bold">{displayName}</h1>
      <p className="text-md max-w-lg text-center">{data?.flavorText?.flavor_text}</p>
      <PokemonTcgCarousel
        cards={tcgCards}
        loading={tcgLoading}
        pokemonName={displayName}
      />
    </>
  );

  return (
    <div className="mx-14 flex min-h-screen flex-col items-center justify-center py-16">
      {loading === true ? loadingState() : error ? errorState() : pageContent()}
    </div>
  );
}

export default DetailsPage;
