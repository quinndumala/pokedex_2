import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MenuKey } from "../components/Menu/items";

type PokemonUiState = {
  activeMenuItem: MenuKey;
  setMenuItem: (menuItem: MenuKey) => void;
  isMenuItem: (menuItem: MenuKey) => boolean;
  showAnimatedPokeapiSprite: boolean;
  setShowAnimatedPokeapiSprite: (show: boolean) => void;
};

type PokemonUiPersistedState = Pick<
  PokemonUiState,
  "activeMenuItem" | "showAnimatedPokeapiSprite"
>;

const DEFAULT_MENU_KEY: MenuKey = "home";

export const usePokemonUiStore = create<PokemonUiState>()(
  persist(
    (set, get) => ({
      activeMenuItem: DEFAULT_MENU_KEY,
      setMenuItem: (activeMenuItem) => set({ activeMenuItem }),
      isMenuItem: (menuItem) => get().activeMenuItem === menuItem,
      showAnimatedPokeapiSprite: false,
      setShowAnimatedPokeapiSprite: (showAnimatedPokeapiSprite) =>
        set({ showAnimatedPokeapiSprite }),
    }),
    {
      name: "pokemon-ui",
      partialize: (s): PokemonUiPersistedState => ({
        activeMenuItem: s.activeMenuItem,
        showAnimatedPokeapiSprite: s.showAnimatedPokeapiSprite,
      }),
    }
  )
);
