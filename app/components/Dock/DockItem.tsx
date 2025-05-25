export interface DockItem {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}

interface DockItemProps {
  item: DockItem;
}

function DockMenuItem({ item }: DockItemProps) {
  const { icon, label, isActive } = item;
  const baseClasses = "mx-4 flex flex-col items-center";
  const activeClass = isActive ? "dock-active" : "";

  return (
    <button className={`${baseClasses} ${activeClass}`}>
      {icon}
      <span className="dock-label text-xs">{label}</span>
    </button>
  );
}

export default DockMenuItem;
