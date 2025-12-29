import { useState } from "react";
import { Bell, BellOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const NotificationButton = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [dailyReminder, setDailyReminder] = useState(true);
  const [onCallAlert, setOnCallAlert] = useState(true);

  const handleEnableNotifications = async () => {
    if (!("Notification" in window)) {
      toast({
        title: "Non supporté",
        description: "Votre navigateur ne supporte pas les notifications.",
        variant: "destructive",
      });
      return;
    }

    const permission = await Notification.requestPermission();
    
    if (permission === "granted") {
      setNotificationsEnabled(true);
      toast({
        title: "Notifications activées",
        description: "Vous recevrez des alertes pour les pharmacies de garde.",
      });
      
      // Send a test notification
      new Notification("Pharmaguard", {
        body: "Les notifications sont maintenant activées !",
        icon: "/favicon.ico",
      });
    } else {
      toast({
        title: "Permission refusée",
        description: "Veuillez autoriser les notifications dans les paramètres de votre navigateur.",
        variant: "destructive",
      });
    }
  };

  const handleDisableNotifications = () => {
    setNotificationsEnabled(false);
    toast({
      title: "Notifications désactivées",
      description: "Vous ne recevrez plus d'alertes.",
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-primary-foreground hover:bg-primary/80"
        >
          {notificationsEnabled ? (
            <Bell className="h-5 w-5" />
          ) : (
            <BellOff className="h-5 w-5" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Notifications</h4>
            <p className="text-sm text-muted-foreground">
              Recevez des alertes pour les pharmacies de garde.
            </p>
          </div>

          {!notificationsEnabled ? (
            <Button onClick={handleEnableNotifications} className="w-full">
              <Bell className="h-4 w-4 mr-2" />
              Activer les notifications
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="daily-reminder" className="flex flex-col">
                  <span>Rappel quotidien</span>
                  <span className="text-xs text-muted-foreground">
                    Notification chaque matin
                  </span>
                </Label>
                <Switch
                  id="daily-reminder"
                  checked={dailyReminder}
                  onCheckedChange={setDailyReminder}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="on-call-alert" className="flex flex-col">
                  <span>Alertes de garde</span>
                  <span className="text-xs text-muted-foreground">
                    Quand une pharmacie est de garde
                  </span>
                </Label>
                <Switch
                  id="on-call-alert"
                  checked={onCallAlert}
                  onCheckedChange={setOnCallAlert}
                />
              </div>

              <Button 
                variant="outline" 
                onClick={handleDisableNotifications}
                className="w-full"
              >
                <BellOff className="h-4 w-4 mr-2" />
                Désactiver les notifications
              </Button>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationButton;
