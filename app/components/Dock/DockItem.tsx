import { MenuItem } from "../Menu/items";
import Link from "next/link";

interface DockItemProps {
  item: MenuItem;
}

function DockMenuItem({ item }: DockItemProps) {
  const { icon, label, isActive, url } = item;
  const baseClasses = "flex flex-col items-center justify-center w-16";
  const activeClass = isActive ? "dock-active" : "";

  return (
    <Link href={url}>
      <button className={`${baseClasses} ${activeClass}`}>
        {icon}
        <span className="dock-label text-xs">{label}</span>
      </button>
    </Link>
  );
}

export default DockMenuItem;
