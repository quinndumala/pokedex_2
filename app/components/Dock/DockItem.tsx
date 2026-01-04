"use client";

import { MenuItem } from "../Menu/items";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DockItemProps {
  item: MenuItem;
}

function DockItem({ item }: DockItemProps) {
  const pathname = usePathname();
  const { icon, label, url } = item;
  const baseClasses = "flex flex-col items-center justify-center w-16";
  const isActive =
    item.url === "/"
      ? pathname === "/"
      : pathname === item.url || pathname.startsWith(item.url + "/");
  const activeClass = isActive ? "dock-active text-black" : "text-gray-500";
  const textConditionalClass = isActive ? "font-semibold" : "";

  return (
    <Link
      href={url}
      className={`${baseClasses} ${activeClass}`}
      aria-current={isActive ? "page" : undefined}
    >
      {icon}
      <span className={`dock-label text-xs ${textConditionalClass}`}>
        {label}
      </span>
    </Link>
  );
}

export default DockItem;
