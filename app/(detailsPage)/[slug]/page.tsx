"use client";

import useGetPokemonDetails from "../../hooks/useGetPokemonDetails";
import { usePathname } from "next/navigation";

function DetailsPage() {
  const pathName = usePathname();
  const { data, loading, error } = useGetPokemonDetails(pathName);

  console.log("Pathname:", pathName);

  console.log("Pokemon Details Data:", data);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-4xl font-bold">Details Page</h1>
      <p className="text-lg">This is the details page content.</p>
    </div>
  );
}

export default DetailsPage;
