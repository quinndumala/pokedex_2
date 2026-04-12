"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { usePokemonUiStore } from "../stores/useUiStore";
import ScaledAnimatedSprite from "./ScaledShowdownSprite";

type PokemonSpriteFigureProps = {
  imageUrl: string;
  gifUrl: string | null;
  alt: string;
  staticSize: number;
  animatedMaxWidth?: number;
  animatedMaxHeight?: number;
};

export default function PokemonSprite({
  imageUrl,
  gifUrl,
  alt,
  staticSize,
  animatedMaxWidth = staticSize,
  animatedMaxHeight = staticSize,
}: PokemonSpriteFigureProps) {
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
    <figure
      className={
        useAnimatedSprite
          ? "flex shrink-0 items-center justify-center"
          : undefined
      }
      style={
        useAnimatedSprite
          ? { width: staticSize, height: staticSize }
          : undefined
      }
    >
      {useAnimatedSprite ? (
        <ScaledAnimatedSprite
          src={spriteSrc}
          alt={alt}
          maxWidth={animatedMaxWidth}
          maxHeight={animatedMaxHeight}
          onError={() => {
            if (gifUrl) {
              setGifFailed(true);
            }
          }}
        />
      ) : (
        <Image
          src={spriteSrc}
          alt={alt}
          width={staticSize}
          height={staticSize}
        />
      )}
    </figure>
  );
}
