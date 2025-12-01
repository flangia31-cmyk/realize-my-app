import { useState } from "react";
import { Search, Calendar, MapPin as MapPinIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PharmacyCard from "@/components/PharmacyCard";
import BottomNav from "@/components/BottomNav";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const featuredPharmacies = [
    {
      id: 1,
      name: "Pharmacie de l'Espoir",
      address: "Dagopy, Avenue de la Réunification, Garoua",
      phone: "+237 697 345 678",
      isOnCall: true,
      hasParking: true,
      isPMR: false,
    },
    {
      id: 2,
      name: "Pharmacie du Nord",
      address: "Quartier Pitoaré, Route de Kousséri",
      phone: "+237 696 456 789",
      isOnCall: true,
      hasParking: true,
      isPMR: true,
    },
    {
      id: 3,
      name: "Pharmacie du Centre",
      address: "Avenue de la Réunification, Centre-ville",
      phone: "+237 699 123 456",
      isOnCall: false,
      hasParking: false,
      isPMR: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-accent text-primary-foreground px-4 py-6 shadow-md">
        <h1 className="text-2xl font-bold mb-4">Pharmacies de Garde</h1>
        
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
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Button
            variant="outline"
            className="h-auto py-4 flex flex-col gap-2 border-2"
            onClick={() => navigate("/garde")}
          >
            <Calendar className="h-6 w-6 text-primary" />
            <span className="text-sm font-medium">Calendrier des Gardes</span>
          </Button>
          
          <Button
            variant="outline"
            className="h-auto py-4 flex flex-col gap-2 border-2"
            onClick={() => navigate("/pharmacies")}
          >
            <MapPinIcon className="h-6 w-6 text-primary" />
            <span className="text-sm font-medium">Voir la Carte</span>
          </Button>
        </div>

        {/* Pharmacies de Garde Today */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">
              Pharmacies de Garde Aujourd'hui
            </h2>
            <Button variant="ghost" size="sm" className="text-primary">
              Voir tout
            </Button>
          </div>

          <div className="space-y-3">
            {featuredPharmacies
              .filter((p) => p.isOnCall)
              .map((pharmacy) => (
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
        </section>

        {/* All Pharmacies */}
        <section className="mt-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Toutes les Pharmacies
          </h2>

          <div className="space-y-3">
            {featuredPharmacies.map((pharmacy) => (
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
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default Index;
