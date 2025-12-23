import { HomeIcon, SearchIcon, SettingsIcon } from "../icons";

export interface MenuItem {
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  url: string;
}

const menuItems: MenuItem[] = [
  {
    label: "Home",
    icon: <HomeIcon />,
    isActive: false,
    url: "/",
  },
  {
    label: "Search",
    icon: <SearchIcon />,
    isActive: false,
    url: "/search",
  },
  {
    label: "Settings",
    icon: <SettingsIcon />,
    isActive: false,
    url: "/settings",
  },
];

export default menuItems;
