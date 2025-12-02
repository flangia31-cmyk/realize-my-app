import { useState, useMemo } from "react";
import { Search, Calendar, MapPin as MapPinIcon, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PharmacyCard from "@/components/PharmacyCard";
import PharmacyFilters from "@/components/PharmacyFilters";
import BottomNav from "@/components/BottomNav";
import { useNavigate } from "react-router-dom";
import { usePharmacies } from "@/hooks/usePharmacies";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<{
    isOnCall?: boolean;
    hasParking?: boolean;
    isPMR?: boolean;
  }>({});

  const { data: pharmacies, isLoading, error } = usePharmacies({
    searchQuery,
    ...filters,
  });

  const onCallPharmacies = useMemo(() => {
    return pharmacies?.filter((p) => p.is_on_call) || [];
  }, [pharmacies]);

  if (error) {
    toast({
      title: "Erreur",
      description: "Impossible de charger les pharmacies",
      variant: "destructive",
    });
  }

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
        {/* Filters */}
        <div className="flex justify-end mb-4">
          <PharmacyFilters
            onFilterChange={setFilters}
            activeFilters={filters}
          />
        </div>

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
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : onCallPharmacies.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Aucune pharmacie de garde aujourd'hui
              </p>
            ) : (
              onCallPharmacies.map((pharmacy) => (
                <PharmacyCard
                  key={pharmacy.id}
                  name={pharmacy.name}
                  address={pharmacy.address}
                  phone={pharmacy.phone || ""}
                  isOnCall={pharmacy.is_on_call}
                  hasParking={pharmacy.has_parking}
                  isPMR={pharmacy.is_pmr}
                  onClick={() => navigate(`/pharmacy/${pharmacy.id}`)}
                />
              ))
            )}
          </div>
        </section>

        {/* All Pharmacies */}
        <section className="mt-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Toutes les Pharmacies
          </h2>

          <div className="space-y-3">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : !pharmacies || pharmacies.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                {searchQuery || Object.keys(filters).length > 0
                  ? "Aucune pharmacie ne correspond à vos critères"
                  : "Aucune pharmacie disponible"}
              </p>
            ) : (
              pharmacies.map((pharmacy) => (
                <PharmacyCard
                  key={pharmacy.id}
                  name={pharmacy.name}
                  address={pharmacy.address}
                  phone={pharmacy.phone || ""}
                  isOnCall={pharmacy.is_on_call}
                  hasParking={pharmacy.has_parking}
                  isPMR={pharmacy.is_pmr}
                  onClick={() => navigate(`/pharmacy/${pharmacy.id}`)}
                />
              ))
            )}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default Index;
