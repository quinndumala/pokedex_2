import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MenuKey } from "../components/Menu/items";

type PokemonUiState = {
  activeMenuItem: MenuKey;

  // actions
  setMenuItem: (menuItem: MenuKey) => void;

  // optional: future-friendly
  isMenuItem: (menuItem: MenuKey) => boolean;
};

// Only persist serializable state
type PokemonUiPersistedState = Pick<PokemonUiState, "activeMenuItem">;

const DEFAULT_MENU_KEY: MenuKey = "home";

export const usePokemonUiStore = create<PokemonUiState>()(
  persist(
    (set, get) => ({
      activeMenuItem: DEFAULT_MENU_KEY,
      setMenuItem: (activeMenuItem) => set({ activeMenuItem }),
      isMenuItem: (menuItem) => get().activeMenuItem === menuItem,
    }),
    {
      name: "pokemon-ui",
      partialize: (s): PokemonUiPersistedState => ({
        activeMenuItem: s.activeMenuItem,
      }),
    }
  )
);
