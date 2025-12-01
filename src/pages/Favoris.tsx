import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PharmacyCard from "@/components/PharmacyCard";
import BottomNav from "@/components/BottomNav";
import { useNavigate } from "react-router-dom";

const Favoris = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const favoritePharmacies = [
    {
      id: 1,
      name: "Pharmacie de l'Espoir",
      address: "Dagopy",
      phone: "+237 697 345 678",
      isOnCall: true,
      hasParking: false,
      isPMR: false,
    },
    {
      id: 2,
      name: "Pharmacie du Nord",
      address: "Pitoaré",
      phone: "+237 696 456 789",
      isOnCall: true,
      hasParking: true,
      isPMR: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-4 py-6 shadow-md">
        <h1 className="text-2xl font-bold mb-4">Favoris</h1>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Rechercher une pharmacie..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card text-foreground border-0 shadow-sm"
          />
        </div>
      </header>

      <main className="px-4 py-6 max-w-lg mx-auto">
        {/* Info */}
        <div className="mb-4 text-sm text-muted-foreground">
          {favoritePharmacies.length} pharmacies disponibles
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <Button
            variant={sortBy === "default" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("default")}
            className="whitespace-nowrap"
          >
            Par défaut
          </Button>
          <Button
            variant={sortBy === "name" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("name")}
            className="whitespace-nowrap"
          >
            Par nom
          </Button>
          <Button
            variant={sortBy === "distance" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("distance")}
            className="whitespace-nowrap"
          >
            Par quartier
          </Button>
        </div>

        {/* Favorites List */}
        {favoritePharmacies.length > 0 ? (
          <div className="space-y-3">
            {favoritePharmacies.map((pharmacy) => (
              <PharmacyCard
                key={pharmacy.id}
                name={pharmacy.name}
                address={pharmacy.address}
                phone={pharmacy.phone}
                isOnCall={pharmacy.isOnCall}
                hasParking={pharmacy.hasParking}
                isPMR={pharmacy.isPMR}
                onClick={() => navigate(`/pharmacy/${pharmacy.id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              Aucune pharmacie favorite pour le moment
            </p>
            <Button onClick={() => navigate("/")}>
              Explorer les pharmacies
            </Button>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default Favoris;
