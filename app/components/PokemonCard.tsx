import Image from "next/image";
import React from "react";
import { capitalizeFirstLetter } from "../util";
import Link from "next/link";

interface PokemonCardProps {
  name: string;
  image: string;
  innerRef?: (node?: Element | null | undefined) => void;
}

const PokemonCard = ({ name, image, innerRef }: PokemonCardProps) => {
  const displayName = capitalizeFirstLetter(name);

  return (
    <Link href={`/${encodeURIComponent(name)}`}>
      <div className="card transform-gpu cursor-pointer bg-base-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
        <div className="card-body items-center gap-4 text-center">
          <div ref={innerRef} />
          <figure>
            <Image src={image} alt={displayName} width={250} height={250} />
          </figure>
          <h2 className="card-title">{displayName}</h2>
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;
