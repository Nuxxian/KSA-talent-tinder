import React from "react";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  ListBulletIcon,
} from "@radix-ui/react-icons";

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate }) => {
  const menuItems = [
    {
      id: "welcome",
      label: "Home",
      icon: <HomeIcon className="w-5 h-5" />,
    },
    {
      id: "discover",
      label: "Ontdekken",
      icon: <MagnifyingGlassIcon className="w-5 h-5" />,
    },
    {
      id: "overview",
      label: "Overzicht",
      icon: <ListBulletIcon className="w-5 h-5" />,
    },
  ];

  return (
    <nav
      className="bg-white border-t border-gray-100 z-50 safe-area-pb"
      style={{ boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.08)" }}
    >
      <div className="flex justify-around items-center py-1 px-2 max-w-md mx-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center py-2 px-2 rounded-md transition-all duration-150 min-w-0 flex-1 ${
              currentPage === item.id
                ? "scale-105"
                : "hover:bg-gray-50 active:scale-95"
            }`}
            style={{
              color:
                currentPage === item.id
                  ? "var(--ksa-blue)"
                  : "var(--ksa-text-light)",
            }}
          >
            <span className="mb-1">{item.icon}</span>
            <span className="text-xs font-medium truncate">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
