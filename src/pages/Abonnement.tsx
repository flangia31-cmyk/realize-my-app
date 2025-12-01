import { ArrowLeft, Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import BottomNav from "@/components/BottomNav";
import { useNavigate } from "react-router-dom";

const Abonnement = () => {
  const navigate = useNavigate();

  const plans = [
    {
      id: "free",
      name: "Gratuit",
      price: "0 FCFA",
      current: false,
      features: [
        "Consulter les pharmacies de garde",
        "Recherche limitée (5 recherches/jour)",
        "Vue liste uniquement",
      ],
    },
    {
      id: "mensuel",
      name: "Mensuel Premium",
      price: "500 FCFA / mois",
      badge: "Actuel",
      current: true,
      expires: "Expire le: 28/12/2025",
      features: [
        "Toutes les fonctionnalités gratuites",
        "Recherche illimitée",
        "Ajouter aux favoris illimité",
        "Carte interactive des pharmacies",
        "Informations de contact complètes",
        "Localisation GPS précise",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-4 py-4 shadow-md">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="text-primary-foreground hover:bg-primary/80"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Choisir un abonnement</h1>
        </div>
      </header>

      <main className="px-4 py-6 max-w-lg mx-auto space-y-4">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`p-5 shadow-card ${
              plan.current ? "border-2 border-primary" : ""
            }`}
          >
            <div className="mb-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {plan.current && <Star className="h-4 w-4 fill-primary text-primary" />}
                    <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
                  </div>
                  {plan.expires && (
                    <p className="text-sm text-muted-foreground">{plan.expires}</p>
                  )}
                </div>
                {plan.badge && (
                  <Badge className="bg-success text-success-foreground">
                    {plan.badge}
                  </Badge>
                )}
              </div>
              <p className="text-2xl font-bold text-primary">{plan.price}</p>
            </div>

            <div className="space-y-2.5 mb-5">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-foreground">{feature}</span>
                </div>
              ))}
            </div>

            <Button
              className="w-full"
              variant={plan.current ? "outline" : "default"}
              disabled={plan.current}
            >
              {plan.current ? "Abonnement actuel" : "Choisir ce plan"}
            </Button>
          </Card>
        ))}

        {/* Info Section */}
        <Card className="p-4 bg-muted/50 border-0">
          <p className="text-sm text-muted-foreground text-center">
            Vous pouvez annuler votre abonnement à tout moment depuis les paramètres
          </p>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

export default Abonnement;
