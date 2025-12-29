import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pharmacy } from "@/hooks/usePharmacies";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface CalendarWeekViewProps {
  startDate: Date;
  pharmacies: Pharmacy[];
  isLoading: boolean;
  onDayClick: (date: Date) => void;
}

const CalendarWeekView = ({ startDate, pharmacies, isLoading, onDayClick }: CalendarWeekViewProps) => {
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    return date;
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {weekDays.map((date) => {
        const dayName = new Intl.DateTimeFormat("fr-FR", { weekday: "long" }).format(date);
        const dateNum = date.getDate();
        const isToday = date.getTime() === today.getTime();
        
        // For now, all on-call pharmacies are shown for every day (simplified)
        const dayPharmacies = pharmacies;

        return (
          <Card
            key={date.toISOString()}
            className={cn(
              "p-4 cursor-pointer transition-all hover:shadow-hover",
              isToday && "ring-2 ring-primary bg-primary/5"
            )}
            onClick={() => onDayClick(date)}
          >
            <div className="flex items-center gap-4">
              <div className="text-center min-w-[48px]">
                <div className={cn(
                  "text-2xl font-bold",
                  isToday ? "text-primary" : "text-foreground"
                )}>
                  {dateNum.toString().padStart(2, "0")}
                </div>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground capitalize">{dayName}</p>
                <p className="text-sm text-muted-foreground">
                  {dayPharmacies.length > 0 
                    ? `${dayPharmacies.length} pharmacie(s) de garde`
                    : "Aucune pharmacie de garde"
                  }
                </p>
              </div>
              {dayPharmacies.length > 0 && (
                <Badge variant="secondary" className="bg-success/20 text-success">
                  De garde
                </Badge>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default CalendarWeekView;
