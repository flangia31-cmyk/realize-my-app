import { useState } from "react";
import { ArrowLeft, Heart, MapPin, Phone, Clock, ParkingCircle, Accessibility, Star, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import BottomNav from "@/components/BottomNav";
import { useNavigate, useParams } from "react-router-dom";
import { usePharmacy } from "@/hooks/usePharmacies";
import { useToast } from "@/hooks/use-toast";

const PharmacyDetail = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  const { data: pharmacy, isLoading, error } = usePharmacy(id || "");

  if (error) {
    toast({
      title: "Erreur",
      description: "Impossible de charger les détails de la pharmacie",
      variant: "destructive",
    });
  }

  const formatOpeningHours = (hours: any) => {
    if (!hours || typeof hours !== 'object') return null;
    
    const daysOrder = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
    const daysTranslation: Record<string, string> = {
      lundi: 'Lundi',
      mardi: 'Mardi',
      mercredi: 'Mercredi',
      jeudi: 'Jeudi',
      vendredi: 'Vendredi',
      samedi: 'Samedi',
      dimanche: 'Dimanche',
    };

    return daysOrder
      .filter(day => hours[day])
      .map(day => ({
        day: daysTranslation[day],
        hours: hours[day]
      }));
  };

  const handleCall = () => {
    if (pharmacy?.phone) {
      window.location.href = `tel:${pharmacy.phone}`;
    }
  };

  const handleSubmitReview = () => {
    if (rating > 0) {
      // Submit review logic here
      setRating(0);
      setComment("");
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-4 py-4 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="text-primary-foreground hover:bg-primary/80"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Détails de la pharmacie</h1>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsFavorite(!isFavorite)}
          className="text-primary-foreground hover:bg-primary/80"
        >
          <Heart className={isFavorite ? "h-5 w-5 fill-current" : "h-5 w-5"} />
        </Button>
      </header>

      <main className="px-4 py-6 max-w-lg mx-auto space-y-6">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : !pharmacy ? (
          <Card className="p-5 shadow-card">
            <p className="text-center text-muted-foreground">Pharmacie introuvable</p>
          </Card>
        ) : (
          <>
            {/* Contact Actions */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="default"
                className="h-auto py-4 flex flex-col gap-2"
                onClick={handleCall}
                disabled={!pharmacy.phone}
              >
                <Phone className="h-5 w-5" />
                <span className="text-sm font-medium">Appeler</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-4 flex flex-col gap-2"
                onClick={() => {
                  if (pharmacy.latitude && pharmacy.longitude) {
                    window.open(`https://www.google.com/maps/search/?api=1&query=${pharmacy.latitude},${pharmacy.longitude}`, '_blank');
                  }
                }}
                disabled={!pharmacy.latitude || !pharmacy.longitude}
              >
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Itinéraire</span>
              </Button>
            </div>

            {/* Pharmacy Info */}
            <Card className="p-5 shadow-card">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-xl font-bold text-foreground">{pharmacy.name}</h2>
                {pharmacy.is_on_call && (
                  <Badge className="bg-success text-success-foreground">De Garde</Badge>
                )}
              </div>

              {/* Address & Phone */}
              <div className="space-y-3 mb-4">
                <div className="flex items-start gap-3 text-foreground">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{pharmacy.address}</span>
                </div>
                {pharmacy.phone && (
                  <div className="flex items-center gap-3 text-foreground">
                    <Phone className="h-5 w-5 text-primary" />
                    <span className="text-sm">{pharmacy.phone}</span>
                  </div>
                )}
              </div>

              {/* Services */}
              <div className="space-y-3 mb-4 pt-4 border-t border-border">
                <h3 className="font-semibold text-foreground mb-3">Services</h3>
                {pharmacy.has_parking && (
                  <div className="flex items-center gap-3 text-foreground">
                    <ParkingCircle className="h-5 w-5 text-primary" />
                    <span className="text-sm">Parking disponible</span>
                  </div>
                )}
                
                {pharmacy.is_pmr && (
                  <div className="flex items-center gap-3 text-foreground">
                    <Accessibility className="h-5 w-5 text-primary" />
                    <span className="text-sm">Accès PMR</span>
                  </div>
                )}
              </div>

              {/* Opening Hours */}
              {pharmacy.opening_hours && formatOpeningHours(pharmacy.opening_hours) && (
                <div className="pt-4 border-t border-border">
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Horaires d'ouverture
                  </h3>
                  <div className="space-y-2">
                    {formatOpeningHours(pharmacy.opening_hours)?.map((schedule) => (
                      <div key={schedule.day} className="flex justify-between text-sm">
                        <span className="font-medium text-foreground">{schedule.day}</span>
                        <span className="text-muted-foreground">{schedule.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
        </Card>

            {/* Rating Section */}
            <Card className="p-5 shadow-card">
          <h3 className="font-semibold text-foreground mb-3">Noter cette pharmacie</h3>
          
          <div className="flex gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="focus:outline-none transition-transform hover:scale-110"
              >
                <Star
                  className={`h-8 w-8 ${
                    star <= rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground"
                  }`}
                />
              </button>
            ))}
          </div>

          <Textarea
            placeholder="Votre commentaire (optionnel)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="mb-3"
            rows={3}
          />

              <Button
                onClick={handleSubmitReview}
                disabled={rating === 0}
                className="w-full"
              >
                Envoyer la notation
              </Button>
            </Card>
          </>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default PharmacyDetail;
