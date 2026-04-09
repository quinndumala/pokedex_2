"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
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
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveSlide = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const slides = Array.from(
      scroller.querySelectorAll<HTMLElement>("[data-tcg-slide]"),
    );
    if (slides.length === 0) return;

    const scrollerCenter = scroller.scrollLeft + scroller.clientWidth / 2;

    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    slides.forEach((slide, idx) => {
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const distance = Math.abs(scrollerCenter - slideCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = idx;
      }
    });

    setActiveIndex(closestIndex);
  }, []);

  const scrollBySlide = useCallback((direction: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const slide = el.querySelector<HTMLElement>("[data-tcg-slide]");
    const gap = 12;
    const delta = slide ? slide.offsetWidth + gap : el.clientWidth;
    el.scrollBy({ left: direction * delta, behavior: "smooth" });
  }, []);

  useEffect(() => {
    updateActiveSlide();
  }, [cards, updateActiveSlide]);

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
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 scroll-smooth md:px-8 lg:px-12 [scrollbar-width:thin]"
          onScroll={updateActiveSlide}
        >
          {cards.map((card, i) => (
            <article
              key={card.id}
              data-tcg-slide
              className={`flex w-[82%] min-w-[82%] shrink-0 snap-center items-center justify-center transition-all duration-300 md:w-[74%] md:min-w-[74%] lg:w-[66%] lg:min-w-[66%] ${
                activeIndex === i
                  ? "scale-100 opacity-100 blur-0"
                  : "scale-[0.94] opacity-70 blur-[1px]"
              }`}
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
