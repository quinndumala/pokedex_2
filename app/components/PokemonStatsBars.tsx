import type { PokemonDetails } from "../domain/pokemonDetails";

type StatEntry = PokemonDetails["stats"][number];

/** Highest base stat possible */
const STAT_MAX = 255;

const STAT_LABELS: Record<string, string> = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Sp. Atk",
  "special-defense": "Sp. Def",
  speed: "Speed",
};

const STAT_ORDER = [
  "hp",
  "attack",
  "defense",
  "special-attack",
  "special-defense",
  "speed",
] as const;

function formatStatName(apiName: string): string {
  return STAT_LABELS[apiName] ?? apiName.replace(/-/g, " ");
}

interface PokemonStatsBarsProps {
  stats: StatEntry[];
}

export default function PokemonStatsBars({ stats }: PokemonStatsBarsProps) {
  const orderIndex = (name: string) => {
    const i = STAT_ORDER.indexOf(name as (typeof STAT_ORDER)[number]);
    return i === -1 ? STAT_ORDER.length : i;
  };
  const ordered = [...stats].sort(
    (a, b) => orderIndex(a.stat.name) - orderIndex(b.stat.name)
  );

  const meanBaseStat =
    stats.length === 0
      ? 0
      : stats.reduce((sum, s) => sum + s.base_stat, 0) / stats.length;

  return (
    <div className="card mt-6 w-full max-w-lg bg-base-200 shadow-md">
      <div className="card-body gap-4 py-6">
        <ul className="flex w-full flex-col gap-3">
          {ordered.map((s) => (
            <li key={s.stat.name} className="flex flex-col gap-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium">
                  {formatStatName(s.stat.name)}
                </span>
                <span className="opacity-70">{s.base_stat}</span>
              </div>
              <progress
                className={`progress h-3 w-full ${
                  s.base_stat > meanBaseStat
                    ? "progress-success"
                    : "progress-neutral"
                }`}
                max={STAT_MAX}
                value={s.base_stat}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
