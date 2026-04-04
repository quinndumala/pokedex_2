"use client";

import Image from "next/image";
import { useCallback, useRef } from "react";
import Skeleton from "react-loading-skeleton";
import type { PokemonTcgCardArt } from "../domain/tcgCard";

interface PokemonTcgCarouselProps {
  cards: PokemonTcgCardArt[];
  loading: boolean;
  pokemonName: string;
}

function PokemonTcgCarousel({
  cards,
  loading,
  pokemonName,
}: PokemonTcgCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBySlide = useCallback((direction: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const slide = el.querySelector<HTMLElement>("[data-tcg-slide]");
    const gap = 12;
    const delta = slide ? slide.offsetWidth + gap : el.clientWidth;
    el.scrollBy({ left: direction * delta, behavior: "smooth" });
  }, []);

  if (loading) {
    return (
      <section
        className="mt-10 w-full max-w-7xl"
        aria-busy="true"
        aria-label="Loading Pokémon TCG artwork"
      >
        <Skeleton className="h-[min(92vh,64rem)] w-full rounded-box" />
      </section>
    );
  }

  if (cards.length === 0) {
    return null;
  }

  return (
    <section
      className="mt-10 w-full max-w-7xl"
      aria-label={`Official Pokémon TCG cards featuring ${pokemonName}`}
    >
      <div className="relative flex flex-col gap-3">
        <div
          ref={scrollerRef}
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth [scrollbar-width:thin]"
        >
          {cards.map((card, i) => (
            <article
              key={card.id}
              data-tcg-slide
              className="flex w-full min-w-full shrink-0 snap-center items-center justify-center"
            >
              <figure className="flex min-h-0 w-full items-center justify-center">
                <Image
                  src={card.imageUrl}
                  alt={`${card.name} — ${card.setName}`}
                  width={1024}
                  height={1429}
                  className="h-auto max-h-[min(92vh,64rem)] w-auto max-w-full object-contain"
                  //sizes="(max-width: 1280px) 100vw, 1280px"
                  priority={i === 0}
                />
              </figure>
            </article>
          ))}
        </div>

        <div className="flex justify-center gap-2">
          <button
            type="button"
            className="btn btn-circle btn-ghost btn-sm"
            aria-label="Previous card"
            onClick={() => scrollBySlide(-1)}
          >
            ‹
          </button>
          <button
            type="button"
            className="btn btn-circle btn-ghost btn-sm"
            aria-label="Next card"
            onClick={() => scrollBySlide(1)}
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}

export default PokemonTcgCarousel;
