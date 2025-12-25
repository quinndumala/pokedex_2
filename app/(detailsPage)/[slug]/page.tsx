"use client";

import Image from "next/image";
import { capitalizeFirstLetter } from "@/app/util";
import useGetPokemonDetails from "../../hooks/useGetPokemonDetails";
import { usePathname } from "next/navigation";

function DetailsPage() {
  const pathName = usePathname();
  const { data, loading, error } = useGetPokemonDetails(pathName);
  const displayName = capitalizeFirstLetter(data?.name ?? "");

  console.log("Pathname:", pathName);

  console.log("Pokemon Details Data:", data);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <figure>
        <Image
          src={data?.imageUrl ?? ""}
          alt={displayName}
          width={250}
          height={250}
        />
      </figure>
      <h1 className="mb-4 text-4xl font-bold">{displayName}</h1>
      <p className="text-lg">This is the details page content.</p>
    </div>
  );
}

export default DetailsPage;
