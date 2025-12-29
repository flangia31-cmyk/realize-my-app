import { useState } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import BottomNav from "@/components/BottomNav";
import { useNavigate } from "react-router-dom";
import { useOnCallPharmacies } from "@/hooks/useOnCallPharmacies";
import CalendarDayView from "@/components/CalendarDayView";
import CalendarWeekView from "@/components/CalendarWeekView";
import CalendarMonthView from "@/components/CalendarMonthView";
import NotificationButton from "@/components/NotificationButton";

type ViewMode = "jour" | "semaine" | "mois";

const Garde = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<ViewMode>("jour");
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const { data: pharmacies = [], isLoading } = useOnCallPharmacies();

  const formatDateDisplay = (date: Date, mode: ViewMode) => {
    if (mode === "mois") {
      return new Intl.DateTimeFormat("fr-FR", {
        month: "long",
        year: "numeric",
      }).format(date);
    }
    
    if (mode === "semaine") {
      const startOfWeek = getStartOfWeek(date);
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(endOfWeek.getDate() + 6);
      
      return `${startOfWeek.getDate()} - ${endOfWeek.getDate()} ${new Intl.DateTimeFormat("fr-FR", { month: "long" }).format(endOfWeek)}`;
    }

    return new Intl.DateTimeFormat("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  const getStartOfWeek = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    d.setDate(diff);
    return d;
  };

  const navigate_date = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    
    switch (viewMode) {
      case "jour":
        newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1));
        break;
      case "semaine":
        newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7));
        break;
      case "mois":
        newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1));
        break;
    }
    
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setViewMode("jour");
  };

  const handleDayClick = (date: Date) => {
    setCurrentDate(date);
    setViewMode("jour");
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
          <div className="flex items-center gap-2">
            <NotificationButton />
            <Button
              variant="ghost"
              size="sm"
              onClick={goToToday}
              className="text-primary-foreground hover:bg-primary/80"
            >
              Aujourd'hui
            </Button>
          </div>
        </div>

        {/* View Mode Tabs */}
        <div className="flex gap-2">
          {(["jour", "semaine", "mois"] as ViewMode[]).map((mode) => (
            <Button
              key={mode}
              variant={viewMode === mode ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewMode(mode)}
              className={
                viewMode === mode
                  ? "bg-card text-foreground"
                  : "text-primary-foreground hover:bg-primary/80"
              }
            >
              <CalendarIcon className="h-4 w-4 mr-1" />
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </Button>
          ))}
        </div>
      </header>

      <main className="px-4 py-6 max-w-lg mx-auto">
        {/* Date Navigation */}
        <Card className="p-4 mb-6 shadow-card">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" onClick={() => navigate_date("prev")}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <span className="font-medium text-foreground capitalize">
              {formatDateDisplay(currentDate, viewMode)}
            </span>
            <Button variant="ghost" size="icon" onClick={() => navigate_date("next")}>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </Card>

        {/* Calendar Views */}
        {viewMode === "jour" && (
          <CalendarDayView
            date={currentDate}
            pharmacies={pharmacies}
            isLoading={isLoading}
          />
        )}

        {viewMode === "semaine" && (
          <CalendarWeekView
            startDate={getStartOfWeek(currentDate)}
            pharmacies={pharmacies}
            isLoading={isLoading}
            onDayClick={handleDayClick}
          />
        )}

        {viewMode === "mois" && (
          <CalendarMonthView
            month={currentDate}
            pharmacies={pharmacies}
            isLoading={isLoading}
            onDayClick={handleDayClick}
          />
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default Garde;
