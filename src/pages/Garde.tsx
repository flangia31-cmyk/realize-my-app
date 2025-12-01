import { useState } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import PharmacyCard from "@/components/PharmacyCard";
import BottomNav from "@/components/BottomNav";
import { useNavigate } from "react-router-dom";

const Garde = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"jour" | "semaine" | "mois">("jour");
  const [currentDate] = useState(new Date(2025, 10, 28)); // 28 novembre 2025

  const pharmaciesDeGarde = [
    {
      id: 1,
      name: "Pharmacie du Centre",
      address: "Avenue de la Réunification, Centreville",
      phone: "+237 699 123 456",
    },
    {
      id: 2,
      name: "Pharmacie de l'Espoir",
      address: "Dagopy, Avenue de la Réunification",
      phone: "+237 697 345 678",
    },
    {
      id: 3,
      name: "Pharmacie du Nord",
      address: "Quartier Pitoaré, Route de Kousséri",
      phone: "+237 696 456 789",
    },
  ];

  const monthSchedule = [
    { date: 1, day: "Samedi", status: "aucune" },
    { date: 2, day: "Dimanche", status: "aucune" },
    { date: 3, day: "Lundi", status: "aucune" },
    { date: 4, day: "Mardi", status: "aucune" },
    { date: 5, day: "Mercredi", status: "aucune" },
    { date: 6, day: "Jeudi", status: "aucune" },
    { date: 7, day: "Vendredi", status: "aucune" },
  ];

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-4 py-4 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="text-primary-foreground hover:bg-primary/80"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold">Calendrier des Gardes</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary-foreground hover:bg-primary/80"
          >
            Aujourd'hui
          </Button>
        </div>

        {/* View Mode Tabs */}
        <div className="flex gap-2">
          <Button
            variant={viewMode === "jour" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setViewMode("jour")}
            className={
              viewMode === "jour"
                ? "bg-card text-foreground"
                : "text-primary-foreground hover:bg-primary/80"
            }
          >
            <CalendarIcon className="h-4 w-4 mr-1" />
            Jour
          </Button>
          <Button
            variant={viewMode === "semaine" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setViewMode("semaine")}
            className={
              viewMode === "semaine"
                ? "bg-card text-foreground"
                : "text-primary-foreground hover:bg-primary/80"
            }
          >
            <CalendarIcon className="h-4 w-4 mr-1" />
            Semaine
          </Button>
          <Button
            variant={viewMode === "mois" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setViewMode("mois")}
            className={
              viewMode === "mois"
                ? "bg-card text-foreground"
                : "text-primary-foreground hover:bg-primary/80"
            }
          >
            <CalendarIcon className="h-4 w-4 mr-1" />
            Mois
          </Button>
        </div>
      </header>

      <main className="px-4 py-6 max-w-lg mx-auto">
        {/* Date Navigation */}
        <Card className="p-4 mb-6 shadow-card">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <span className="font-medium text-foreground capitalize">
              {formatDate(currentDate)}
            </span>
            <Button variant="ghost" size="icon">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </Card>

        {viewMode === "jour" && (
          <div>
            <Card className="p-4 mb-6 bg-secondary/50">
              <div className="flex items-start gap-3">
                <CalendarIcon className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">Vendredi</p>
                  <p className="text-sm text-muted-foreground">
                    {pharmaciesDeGarde.length} pharmacie(s) de garde
                  </p>
                </div>
              </div>
            </Card>

            <div className="space-y-3">
              {pharmaciesDeGarde.map((pharmacy) => (
                <PharmacyCard
                  key={pharmacy.id}
                  name={pharmacy.name}
                  address={pharmacy.address}
                  phone={pharmacy.phone}
                  isOnCall={true}
                  onClick={() => navigate(`/pharmacy/${pharmacy.id}`)}
                />
              ))}
            </div>
          </div>
        )}

        {viewMode === "mois" && (
          <div className="space-y-2">
            {monthSchedule.map((item) => (
              <Card
                key={item.date}
                className="p-4 shadow-card hover:shadow-hover transition-shadow cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="text-center min-w-[48px]">
                    <div className="text-2xl font-bold text-foreground">
                      {item.date.toString().padStart(2, "0")}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{item.day}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.status === "aucune" ? "Aucune pharmacie de garde" : item.status}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default Garde;
