import { useState } from "react";
import { ArrowLeft, Locate, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";
import { useNavigate } from "react-router-dom";

const PharmaciesMap = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-4 py-4 shadow-md flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="text-primary-foreground hover:bg-primary/80"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold">Toutes les pharmacies</h1>
      </header>

      {/* Map Container */}
      <div className="flex-1 relative bg-muted">
        {/* Placeholder for map - would integrate with Google Maps or similar */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Navigation className="h-8 w-8 text-primary" />
            </div>
            <p className="text-muted-foreground">
              La carte des pharmacies s'affichera ici
            </p>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              Intégration Google Maps à venir avec marqueurs pour toutes les pharmacies
            </p>
          </div>
        </div>

        {/* Floating Action Buttons */}
        <div className="absolute right-4 bottom-24 flex flex-col gap-3">
          <Button
            size="icon"
            className="h-12 w-12 rounded-full shadow-lg bg-card hover:bg-card/90 text-foreground"
          >
            <Locate className="h-5 w-5" />
          </Button>
          
          <Button
            size="icon"
            className="h-12 w-12 rounded-full shadow-lg"
          >
            <Navigation className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default PharmaciesMap;
