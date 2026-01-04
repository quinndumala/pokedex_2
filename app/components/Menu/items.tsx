import { HomeIcon, SearchIcon, SettingsIcon } from "../icons";

export type MenuKey = "home" | "search" | "settings";
export interface MenuItem {
  key: MenuKey;
  label: string;
  icon: React.ReactNode;
  url: string;
}

const menuItems: MenuItem[] = [
  {
    key: "home",
    label: "Home",
    icon: <HomeIcon />,
    url: "/",
  },
  {
    key: "search",
    label: "Search",
    icon: <SearchIcon />,
    url: "/search",
  },
  {
    key: "settings",
    label: "Settings",
    icon: <SettingsIcon />,
    url: "/settings",
  },
];

export default menuItems;
