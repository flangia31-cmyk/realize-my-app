import { Home, MapPin, Heart, Settings } from "lucide-react";
import { NavLink } from "./NavLink";
import { cn } from "@/lib/utils";

const BottomNav = () => {
  const navItems = [
    { to: "/", icon: Home, label: "Accueil" },
    { to: "/pharmacies", icon: MapPin, label: "Pharmacies" },
    { to: "/favoris", icon: Heart, label: "Favoris" },
    { to: "/parametres", icon: Settings, label: "Paramètres" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 safe-area-pb">
      <div className="max-w-lg mx-auto px-4">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className="flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 text-muted-foreground hover:text-foreground"
                activeClassName="text-primary"
              >
                <item.icon className="h-5 w-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
