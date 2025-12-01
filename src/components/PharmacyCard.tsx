import { MapPin, Phone, Clock, ParkingCircle, Accessibility } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface PharmacyCardProps {
  name: string;
  address: string;
  phone: string;
  isOnCall?: boolean;
  hasParking?: boolean;
  isPMR?: boolean;
  onClick?: () => void;
  className?: string;
}

const PharmacyCard = ({
  name,
  address,
  phone,
  isOnCall = false,
  hasParking = false,
  isPMR = false,
  onClick,
  className,
}: PharmacyCardProps) => {
  return (
    <Card
      className={cn(
        "p-4 shadow-card hover:shadow-hover transition-all duration-200 cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
          <MapPin className="h-6 w-6 text-primary" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold text-foreground text-base">{name}</h3>
            {isOnCall && (
              <Badge className="bg-success text-success-foreground shrink-0">
                De Garde
              </Badge>
            )}
          </div>
          
          <div className="space-y-1.5 text-sm">
            <div className="flex items-start gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span className="line-clamp-1">{address}</span>
            </div>
            
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4 flex-shrink-0" />
              <span>{phone}</span>
            </div>

            {(hasParking || isPMR) && (
              <div className="flex items-center gap-3 mt-2">
                {hasParking && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <ParkingCircle className="h-4 w-4" />
                    <span>Parking</span>
                  </div>
                )}
                {isPMR && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Accessibility className="h-4 w-4" />
                    <span>PMR</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PharmacyCard;
