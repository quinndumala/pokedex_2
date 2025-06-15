import menuItems from "../Menu/items";

function Menu() {
  return (
    <>
      <ul className="menu menu-vertical rounded-box lg:menu-horizontal">
        {menuItems.map((item, index) => (
          <li key={index} className={item.isActive ? "active" : ""}>
            <a>{item.icon}</a>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Menu;
