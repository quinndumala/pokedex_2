import Image from "next/image";
import menuItems from "../Menu/items";
import NavbarItem from "./NavbarItem";

const PokeballIcon = () => {
  return (
    <Image
      src="/pokeball-icon.svg"
      alt="Pokeball Icon"
      width={30}
      height={30}
      className="align-middle"
    />
  );
};

const Navbar = () => {
  return (
    <div className="navbar sticky left-0 top-0 z-50 bg-base-100 shadow-md">
      <div className="flex-1">
        <button className="btn btn-ghost flex items-center px-3 py-2">
          <PokeballIcon />
          <span className="ml-2 text-xl">Pokedex</span>
        </button>
      </div>
      <div className="hidden flex-none justify-end lg:flex">
        <ul className="menu menu-vertical rounded-box lg:menu-horizontal">
          {menuItems.map((item, index) => (
            <NavbarItem key={index} item={item} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
