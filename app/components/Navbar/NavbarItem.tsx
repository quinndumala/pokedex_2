import Link from "next/link";
import { MenuItem } from "../Menu/items";

interface NavbarItemProps {
  item: MenuItem;
}

function NavbarItem({ item }: NavbarItemProps) {
  return (
    <>
      {/* <li className={item.isActive ? "active" : ""}> */}
      <li>
        <Link href={item.url}>{item.icon}</Link>
      </li>
    </>
  );
}

export default NavbarItem;
