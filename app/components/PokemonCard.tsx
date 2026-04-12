import Image from "next/image";
import React, { useEffect, useState } from "react";
import { capitalizeFirstLetter } from "../util";
import Link from "next/link";
import { usePokemonUiStore } from "../stores/useUiStore";
import ScaledAnimatedSprite from "./ScaledShowdownSprite";

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
  const showAnimatedPokeapiSprite = usePokemonUiStore(
    (s) => s.showAnimatedPokeapiSprite
  );
  const [gifFailed, setGifFailed] = useState(false);

  useEffect(() => {
    setGifFailed(false);
  }, [showAnimatedPokeapiSprite, gifUrl, imageUrl]);

  const useAnimatedSprite =
    showAnimatedPokeapiSprite && gifUrl !== null && gifUrl !== "" && !gifFailed;
  const spriteSrc = useAnimatedSprite ? gifUrl : imageUrl;

  return (
    <Link href={`/${encodeURIComponent(name)}`}>
      <div className="card transform-gpu cursor-pointer bg-base-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
        <div className="card-body items-center gap-4 text-center">
          <div ref={innerRef} />
          <figure
            className={
              useAnimatedSprite
                ? "flex h-[250px] w-[250px] shrink-0 items-center justify-center"
                : undefined
            }
          >
            {useAnimatedSprite ? (
              <ScaledAnimatedSprite
                src={spriteSrc}
                alt={displayName}
                maxWidth={250}
                maxHeight={250}
                onError={() => {
                  if (gifUrl) {
                    setGifFailed(true);
                  }
                }}
              />
            ) : (
              <Image
                src={spriteSrc}
                alt={displayName}
                width={250}
                height={250}
              />
            )}
          </figure>
          <h2 className="card-title">{displayName}</h2>
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;
