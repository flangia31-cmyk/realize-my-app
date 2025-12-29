import { Calendar as CalendarIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import PharmacyCard from "@/components/PharmacyCard";
import { Pharmacy } from "@/hooks/usePharmacies";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

interface CalendarDayViewProps {
  date: Date;
  pharmacies: Pharmacy[];
  isLoading: boolean;
}

const CalendarDayView = ({ date, pharmacies, isLoading }: CalendarDayViewProps) => {
  const navigate = useNavigate();

  const dayName = new Intl.DateTimeFormat("fr-FR", { weekday: "long" }).format(date);

  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  return (
    <div>
      <Card className="p-4 mb-6 bg-secondary/50">
        <div className="flex items-start gap-3">
          <CalendarIcon className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <p className="font-semibold text-foreground capitalize">{dayName}</p>
            <p className="text-sm text-muted-foreground">
              {pharmacies.length} pharmacie(s) de garde
            </p>
          </div>
        </div>
      </Card>

      {pharmacies.length === 0 ? (
        <Card className="p-8 text-center">
          <CalendarIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Aucune pharmacie de garde ce jour</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {pharmacies.map((pharmacy) => (
            <PharmacyCard
              key={pharmacy.id}
              name={pharmacy.name}
              address={pharmacy.address}
              phone={pharmacy.phone || undefined}
              isOnCall={true}
              onClick={() => navigate(`/pharmacy/${pharmacy.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CalendarDayView;
