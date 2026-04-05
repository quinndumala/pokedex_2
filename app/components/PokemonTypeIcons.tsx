import Image from "next/image";
import { pokemonTypeSpriteUrl } from "../util/pokemonTypeSprite";
import { capitalizeFirstLetter } from "../util";

type TypeSlot = {
  slot: number;
  type: { name: string; url: string };
};

type PokemonTypeIconsProps = {
  types: TypeSlot[];
};

function PokemonTypeIcons({ types }: PokemonTypeIconsProps) {
  const ordered = [...types].sort((a, b) => a.slot - b.slot);

  return (
    <div className="mb-3 flex flex-wrap items-center justify-center gap-3">
      {ordered.map(({ type }) => {
        const src = pokemonTypeSpriteUrl(type.url);
        if (!src) return null;
        const label = capitalizeFirstLetter(type.name);
        return (
          <div key={type.name} className="flex items-center">
            <Image
              src={src}
              alt=""
              width={72}
              height={24}
              className="h-5 w-auto max-w-[4.25rem] shrink-0 object-contain object-bottom"
              aria-hidden
            />
            <span className="inline-flex h-5 items-center bg-neutral-800 pl-2 pr-2.5 text-sm font-medium leading-none text-neutral-100">
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default PokemonTypeIcons;
