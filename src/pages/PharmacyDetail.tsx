import { useState } from "react";
import { ArrowLeft, Heart, MapPin, Phone, Clock, ParkingCircle, Accessibility, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import BottomNav from "@/components/BottomNav";
import { useNavigate, useParams } from "react-router-dom";

const PharmacyDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock data - would come from API/database
  const pharmacy = {
    name: "Pharmacie de l'Espoir",
    address: "Dagopy, Avenue de la Réunification, Garoua",
    phone: "+237 697 345 678",
    isOnCall: true,
    hasParking: true,
    isPMR: true,
    hasNightService: true,
    description: "Pharmacie moderne au cœur de Maroua avec un personnel qualifié et des médicaments de qualité.",
    rating: 4.0,
    reviewCount: 12,
    reviews: [
      {
        id: 1,
        author: "Isaac Touza",
        rating: 4,
        comment: "Service à améliorer",
        date: "2025-11-23",
      },
    ],
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
        {/* Pharmacy Info */}
        <Card className="p-5 shadow-card">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">{pharmacy.name}</h2>
            {pharmacy.isOnCall && (
              <Badge className="bg-success text-success-foreground">De Garde</Badge>
            )}
          </div>

          {/* Services */}
          <div className="space-y-3 mb-4">
            {pharmacy.hasNightService && (
              <div className="flex items-center gap-3 text-foreground">
                <Clock className="h-5 w-5 text-primary" />
                <span className="text-sm">Horaires normaux</span>
              </div>
            )}
            
            {pharmacy.hasParking && (
              <div className="flex items-center gap-3 text-foreground">
                <ParkingCircle className="h-5 w-5 text-primary" />
                <span className="text-sm">Parking disponible</span>
              </div>
            )}
            
            {pharmacy.isPMR && (
              <div className="flex items-center gap-3 text-foreground">
                <Accessibility className="h-5 w-5 text-primary" />
                <span className="text-sm">Accès PMR</span>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="pt-4 border-t border-border">
            <h3 className="font-semibold text-foreground mb-2">Description</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {pharmacy.description}
            </p>
          </div>
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

        {/* Reviews */}
        <Card className="p-5 shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="font-semibold text-foreground">Avis des utilisateurs</h3>
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{pharmacy.rating}</span>
              <span className="text-muted-foreground">({pharmacy.reviewCount})</span>
            </div>
          </div>

          <div className="space-y-4">
            {pharmacy.reviews.map((review) => (
              <div key={review.id} className="border-t border-border pt-4 first:border-0 first:pt-0">
                <div className="flex items-start justify-between mb-2">
                  <span className="font-semibold text-foreground">{review.author}</span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3.5 w-3.5 ${
                          i < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{review.comment}</p>
                <span className="text-xs text-muted-foreground">{review.date}</span>
              </div>
            ))}
          </div>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

export default PharmacyDetail;
