"use client";

import { usePokemonUiStore } from "../../stores/useUiStore";

export default function SettingsPage() {
  const showAnimatedPokeapiSprite = usePokemonUiStore(
    (s) => s.showAnimatedPokeapiSprite
  );
  const setShowAnimatedPokeapiSprite = usePokemonUiStore(
    (s) => s.setShowAnimatedPokeapiSprite
  );

  return (
    <div className="flex h-screen flex-col items-center justify-center px-6">
      <h1 className="mb-4 text-3xl font-bold">Settings</h1>
      <label className="flex max-w-md cursor-pointer items-start gap-3 rounded-lg border border-black/10 bg-white/5 p-4 dark:border-white/10">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 shrink-0 rounded border-gray-400"
          checked={showAnimatedPokeapiSprite}
          onChange={(e) => setShowAnimatedPokeapiSprite(e.target.checked)}
        />
        <span>
          <span className="block font-medium">Animated sprite</span>
          <span className="mt-1 block text-sm text-black/70 dark:text-white/70">
            When available, use the animated Showdown sprite on Pokémon detail
            pages instead of the static artwork.
          </span>
        </span>
      </label>
    </div>
  );
}
