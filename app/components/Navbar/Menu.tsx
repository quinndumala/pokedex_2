import Link from "next/link";
import menuItems from "../Menu/items";

function Menu() {
  return (
    <>
      <ul className="menu menu-vertical rounded-box lg:menu-horizontal">
        {menuItems.map((item, index) => (
          <li key={index} className={item.isActive ? "active" : ""}>
            <Link href={item.url}>{item.icon}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Menu;
