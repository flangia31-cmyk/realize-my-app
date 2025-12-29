import { Card } from "@/components/ui/card";
import { Pharmacy } from "@/hooks/usePharmacies";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface CalendarMonthViewProps {
  month: Date;
  pharmacies: Pharmacy[];
  isLoading: boolean;
  onDayClick: (date: Date) => void;
}

const CalendarMonthView = ({ month, pharmacies, isLoading, onDayClick }: CalendarMonthViewProps) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Get first day of month
  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
  // Get last day of month
  const lastDay = new Date(month.getFullYear(), month.getMonth() + 1, 0);
  
  // Get the day of week for the first day (0 = Sunday, 1 = Monday, etc.)
  // Adjust for Monday start (0 = Monday, 6 = Sunday)
  const startDayOfWeek = (firstDay.getDay() + 6) % 7;
  
  // Create array of days
  const days: (Date | null)[] = [];
  
  // Add empty days for alignment
  for (let i = 0; i < startDayOfWeek; i++) {
    days.push(null);
  }
  
  // Add actual days
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push(new Date(month.getFullYear(), month.getMonth(), i));
  }

  const weekDays = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

  if (isLoading) {
    return <Skeleton className="h-80 w-full" />;
  }

  return (
    <Card className="p-4">
      {/* Week day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((date, index) => {
          if (!date) {
            return <div key={`empty-${index}`} className="h-12" />;
          }

          const isToday = date.getTime() === today.getTime();
          const hasOnCall = pharmacies.length > 0;

          return (
            <button
              key={date.toISOString()}
              onClick={() => onDayClick(date)}
              className={cn(
                "h-12 rounded-lg flex flex-col items-center justify-center transition-all hover:bg-secondary",
                isToday && "ring-2 ring-primary bg-primary/10",
                hasOnCall && !isToday && "bg-success/10"
              )}
            >
              <span className={cn(
                "text-sm font-medium",
                isToday ? "text-primary" : "text-foreground"
              )}>
                {date.getDate()}
              </span>
              {hasOnCall && (
                <span className="w-1.5 h-1.5 rounded-full bg-success mt-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="w-2 h-2 rounded-full bg-success" />
          <span>Pharmacies de garde</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="w-2 h-2 rounded-full bg-primary" />
          <span>Aujourd'hui</span>
        </div>
      </div>
    </Card>
  );
};

export default CalendarMonthView;
