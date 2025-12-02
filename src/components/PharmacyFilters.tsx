import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, X, Accessibility, Car, Clock } from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface PharmacyFiltersProps {
  onFilterChange: (filters: {
    isOnCall?: boolean;
    hasParking?: boolean;
    isPMR?: boolean;
  }) => void;
  activeFilters: {
    isOnCall?: boolean;
    hasParking?: boolean;
    isPMR?: boolean;
  };
}

const PharmacyFilters = ({ onFilterChange, activeFilters }: PharmacyFiltersProps) => {
  const [open, setOpen] = useState(false);

  const toggleFilter = (key: "isOnCall" | "hasParking" | "isPMR") => {
    const newFilters = { ...activeFilters };
    if (newFilters[key] === true) {
      delete newFilters[key];
    } else {
      newFilters[key] = true;
    }
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    onFilterChange({});
    setOpen(false);
  };

  const activeFilterCount = Object.keys(activeFilters).length;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="relative">
          <Filter className="h-4 w-4 mr-2" />
          Filtres
          {activeFilterCount > 0 && (
            <Badge
              variant="default"
              className="ml-2 h-5 w-5 p-0 flex items-center justify-center rounded-full"
            >
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filtres</SheetTitle>
          <SheetDescription>
            Filtrez les pharmacies selon vos besoins
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          <div
            onClick={() => toggleFilter("isOnCall")}
            className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
              activeFilters.isOnCall
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            }`}
          >
            <Clock className="h-5 w-5 text-primary" />
            <div className="flex-1">
              <p className="font-medium">De garde</p>
              <p className="text-sm text-muted-foreground">
                Ouvertes actuellement
              </p>
            </div>
            {activeFilters.isOnCall && (
              <Badge variant="default">Actif</Badge>
            )}
          </div>

          <div
            onClick={() => toggleFilter("hasParking")}
            className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
              activeFilters.hasParking
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            }`}
          >
            <Car className="h-5 w-5 text-primary" />
            <div className="flex-1">
              <p className="font-medium">Parking disponible</p>
              <p className="text-sm text-muted-foreground">
                Avec stationnement
              </p>
            </div>
            {activeFilters.hasParking && (
              <Badge variant="default">Actif</Badge>
            )}
          </div>

          <div
            onClick={() => toggleFilter("isPMR")}
            className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
              activeFilters.isPMR
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            }`}
          >
            <Accessibility className="h-5 w-5 text-primary" />
            <div className="flex-1">
              <p className="font-medium">Accessible PMR</p>
              <p className="text-sm text-muted-foreground">
                Personnes à mobilité réduite
              </p>
            </div>
            {activeFilters.isPMR && (
              <Badge variant="default">Actif</Badge>
            )}
          </div>

          {activeFilterCount > 0 && (
            <Button
              variant="outline"
              className="w-full"
              onClick={clearAllFilters}
            >
              <X className="h-4 w-4 mr-2" />
              Effacer tous les filtres
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default PharmacyFilters;
