import { HomeIcon, PokeballIcon, SettingsIcon } from "../icons";

const dockItems = [
  {
    label: "Home",
    icon: <HomeIcon />,
    isActive: false,
  },
  {
    label: "Inbox",
    icon: <PokeballIcon />,
    isActive: true,
  },
  {
    label: "Settings",
    icon: <SettingsIcon />,
    isActive: false,
  },
];

export default dockItems;
