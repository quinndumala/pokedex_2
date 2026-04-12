import React from "react";
import { capitalizeFirstLetter } from "../util";
import Link from "next/link";
import PokemonSprite from "./PokemonSprite";

interface PokemonCardProps {
  name: string;
  imageUrl: string;
  gifUrl: string | null;
  innerRef?: (node?: Element | null | undefined) => void;
}

const PokemonCard = ({
  name,
  imageUrl,
  gifUrl,
  innerRef,
}: PokemonCardProps) => {
  const displayName = capitalizeFirstLetter(name);

  return (
    <Link href={`/${encodeURIComponent(name)}`}>
      <div className="card transform-gpu cursor-pointer bg-base-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
        <div className="card-body items-center gap-4 text-center">
          <div ref={innerRef} />
          <PokemonSprite
            imageUrl={imageUrl}
            gifUrl={gifUrl}
            alt={displayName}
            staticSize={250}
          />
          <h2 className="card-title">{displayName}</h2>
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;
