import type { PokemonDetails } from "../domain/pokemonDetails";

type AbilityEntry = PokemonDetails["abilities"][number];

function formatAbilityName(apiName: string): string {
  return apiName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

interface PokemonAbilitiesProps {
  abilities: AbilityEntry[];
}

export default function PokemonAbilities({ abilities }: PokemonAbilitiesProps) {
  const ordered = [...abilities].sort((a, b) => a.slot - b.slot);

  return (
    <div className="card mt-6 w-full max-w-lg bg-base-200 shadow-md">
      <div className="card-body gap-4 py-6">
        <ul className="flex w-full flex-col gap-3">
          <h2 className="card-title text-lg">Abilities</h2>
          {ordered.map((entry) => (
            <li
              key={`${entry.ability.name}-${entry.slot}`}
              className="flex flex-col gap-1"
            >
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0 text-sm">
                <span className="font-medium">
                  {formatAbilityName(entry.ability.name)}
                </span>
                {entry.is_hidden ? (
                  <span className="text-xs opacity-70">Hidden</span>
                ) : null}
              </div>
              {entry.shortEffect ? (
                <p className="text-sm leading-snug opacity-70">
                  {entry.shortEffect}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
