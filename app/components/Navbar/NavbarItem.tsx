"use client";
import Link from "next/link";
import { MenuItem } from "../Menu/items";
import { useIsActivePath } from "@/app/hooks/useIsActivePath";

interface NavbarItemProps {
  item: MenuItem;
}

function NavbarItem({ item }: NavbarItemProps) {
  const { url, icon } = item;
  const isActive = useIsActivePath(url);

  return (
    <li>
      <Link className={isActive ? "focus" : ""} href={url}>
        {icon}
      </Link>
    </li>
  );
}

export default NavbarItem;
