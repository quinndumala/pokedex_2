"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  computeUniformScaledSpriteDimensions,
  SHOWDOWN_SPRITE_UNIFORM_SCALE,
} from "@/app/util";

type ScaledAnimatedSpriteProps = {
  src: string;
  alt: string;
  maxWidth: number;
  maxHeight: number;
  uniformScale?: number;
  onError?: () => void;
};

export default function ScaledAnimatedSprite({
  src,
  alt,
  maxWidth,
  maxHeight,
  uniformScale = SHOWDOWN_SPRITE_UNIFORM_SCALE,
  onError,
}: ScaledAnimatedSpriteProps) {
  const [dims, setDims] = useState<{ width: number; height: number } | null>(
    null
  );

  useEffect(() => {
    setDims(null);
  }, [src]);

  return (
    <Image
      src={src}
      alt={alt}
      width={dims?.width ?? maxWidth}
      height={dims?.height ?? maxHeight}
      className="h-auto w-auto"
      style={
        dims
          ? { width: dims.width, height: dims.height }
          : { maxWidth, maxHeight, width: "auto", height: "auto" }
      }
      unoptimized
      onLoad={(e) => {
        const el = e.currentTarget;
        if (el.naturalWidth === 0 || el.naturalHeight === 0) return;
        setDims(
          computeUniformScaledSpriteDimensions(
            el.naturalWidth,
            el.naturalHeight,
            { uniformScale, maxWidth, maxHeight }
          )
        );
      }}
      onError={onError}
    />
  );
}
