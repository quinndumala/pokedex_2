import DockItem from "./DockItem";
import menuItems, { MenuItem } from "../Menu/items";

interface DockProps {
  items?: MenuItem[];
}

function Dock({ items = menuItems }: DockProps) {
  return (
    <>
      <div
        className="dock dock-md fixed bottom-0 left-0 right-0 z-50 border-t border-base-300 bg-base-100 lg:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="mx-auto flex w-full max-w-md justify-between px-5 py-4 md:justify-center md:px-0">
          <div
            className="dock dock-md fixed bottom-0 left-0 right-0 z-50 border-t border-base-300 bg-base-100 lg:hidden"
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
          >
            <div className="mx-auto flex w-full max-w-md justify-between px-5 py-4 md:justify-center md:px-0">
              {items.map((item, index) => (
                <DockItem key={index} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dock;
