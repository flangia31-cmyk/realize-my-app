import { ArrowLeft, Star, Bell, MapPin, CreditCard, HelpCircle, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import BottomNav from "@/components/BottomNav";
import { useNavigate } from "react-router-dom";

const Parametres = () => {
  const navigate = useNavigate();

  const settingsSections = [
    {
      title: "Notifications",
      items: [
        { icon: Bell, label: "Notifications push", hasSwitch: true, enabled: true },
        { icon: MapPin, label: "Localisation", hasSwitch: true, enabled: true },
      ],
    },
    {
      title: "Compte",
      items: [
        { icon: CreditCard, label: "Abonnement", onClick: () => navigate("/abonnement") },
        { icon: Star, label: "Noter l'application" },
      ],
    },
    {
      title: "Support",
      items: [
        { icon: HelpCircle, label: "Aide et support" },
        { icon: LogOut, label: "Se déconnecter", variant: "destructive" },
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
          <h1 className="text-xl font-semibold">Paramètres</h1>
        </div>
      </header>

      <main className="px-4 py-6 max-w-lg mx-auto space-y-6">
        {settingsSections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <h2 className="text-sm font-semibold text-muted-foreground mb-3 px-1">
              {section.title}
            </h2>
            <Card className="shadow-card overflow-hidden">
              {section.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className={`
                    flex items-center justify-between p-4 cursor-pointer
                    hover:bg-muted/50 transition-colors
                    ${itemIndex !== section.items.length - 1 ? "border-b border-border" : ""}
                  `}
                  onClick={item.onClick}
                >
                  <div className="flex items-center gap-3">
                    <item.icon
                      className={`h-5 w-5 ${
                        item.variant === "destructive" ? "text-destructive" : "text-muted-foreground"
                      }`}
                    />
                    <span
                      className={`font-medium ${
                        item.variant === "destructive" ? "text-destructive" : "text-foreground"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                  {item.hasSwitch && <Switch defaultChecked={item.enabled} />}
                </div>
              ))}
            </Card>
          </div>
        ))}

        {/* App Version */}
        <div className="text-center pt-4">
          <p className="text-sm text-muted-foreground">Version 1.0.0</p>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Parametres;
