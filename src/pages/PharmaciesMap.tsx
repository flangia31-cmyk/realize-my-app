import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Locate, Navigation, MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import BottomNav from "@/components/BottomNav";
import { useNavigate } from "react-router-dom";
import { usePharmacies } from "@/hooks/usePharmacies";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const PharmaciesMap = () => {
  const navigate = useNavigate();
  const { data: pharmacies, isLoading } = usePharmacies();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  
  const [mapboxToken, setMapboxToken] = useState(() => 
    localStorage.getItem("mapbox_token") || ""
  );
  const [tokenInput, setTokenInput] = useState("");
  const [mapError, setMapError] = useState<string | null>(null);

  // Initialize map when token is available
  useEffect(() => {
    if (!mapboxToken || !mapContainer.current || map.current) return;

    try {
      mapboxgl.accessToken = mapboxToken;

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [43.24, -11.70], // Comoros (Moroni)
        zoom: 9,
      });

      map.current.addControl(
        new mapboxgl.NavigationControl(),
        "top-right"
      );

      map.current.on("error", (e) => {
        console.error("Mapbox error:", e);
        setMapError("Erreur de chargement de la carte. Vérifiez votre token.");
      });

    } catch (error) {
      console.error("Error initializing map:", error);
      setMapError("Erreur d'initialisation de la carte.");
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [mapboxToken]);

  // Add pharmacy markers
  useEffect(() => {
    if (!map.current || !pharmacies) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Add new markers
    pharmacies.forEach((pharmacy) => {
      if (pharmacy.latitude && pharmacy.longitude) {
        const el = document.createElement("div");
        el.className = "pharmacy-marker";
        el.innerHTML = `
          <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg cursor-pointer border-2 border-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2a3 3 0 0 0-3 3v4a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
              <line x1="12" x2="12" y1="19" y2="22"/>
            </svg>
          </div>
        `;

        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <div class="p-2">
            <h3 class="font-semibold text-sm">${pharmacy.name}</h3>
            <p class="text-xs text-gray-600">${pharmacy.address}</p>
            ${pharmacy.is_on_call ? '<span class="text-xs text-green-600 font-medium">De garde</span>' : ''}
          </div>
        `);

        const marker = new mapboxgl.Marker(el)
          .setLngLat([pharmacy.longitude, pharmacy.latitude])
          .setPopup(popup)
          .addTo(map.current!);

        el.addEventListener("click", () => {
          navigate(`/pharmacy/${pharmacy.id}`);
        });

        markersRef.current.push(marker);
      }
    });
  }, [pharmacies, navigate]);

  const handleSaveToken = () => {
    if (tokenInput.trim()) {
      localStorage.setItem("mapbox_token", tokenInput.trim());
      setMapboxToken(tokenInput.trim());
      setMapError(null);
    }
  };

  const handleLocateMe = () => {
    if (!map.current) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        map.current?.flyTo({
          center: [position.coords.longitude, position.coords.latitude],
          zoom: 14,
        });
      },
      (error) => {
        console.error("Geolocation error:", error);
      }
    );
  };

  const handleFitAllPharmacies = () => {
    if (!map.current || !pharmacies?.length) return;

    const bounds = new mapboxgl.LngLatBounds();
    pharmacies.forEach((pharmacy) => {
      if (pharmacy.latitude && pharmacy.longitude) {
        bounds.extend([pharmacy.longitude, pharmacy.latitude]);
      }
    });

    map.current.fitBounds(bounds, { padding: 50 });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-4 py-4 shadow-md flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="text-primary-foreground hover:bg-primary/80"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold">Toutes les pharmacies</h1>
      </header>

      {/* Map Container */}
      <div className="flex-1 relative bg-muted">
        {!mapboxToken ? (
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <Card className="max-w-md w-full p-6 space-y-4">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-lg font-semibold">Configuration Mapbox</h2>
                <p className="text-sm text-muted-foreground">
                  Entrez votre token Mapbox pour afficher la carte des pharmacies.
                </p>
                <a 
                  href="https://mapbox.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-primary underline"
                >
                  Obtenir un token Mapbox gratuit
                </a>
              </div>
              <div className="space-y-3">
                <Input
                  type="text"
                  placeholder="pk.eyJ1Ijo..."
                  value={tokenInput}
                  onChange={(e) => setTokenInput(e.target.value)}
                />
                <Button onClick={handleSaveToken} className="w-full">
                  Sauvegarder et afficher la carte
                </Button>
              </div>
            </Card>
          </div>
        ) : isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : mapError ? (
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <Card className="max-w-md w-full p-6 space-y-4">
              <div className="text-center space-y-2">
                <p className="text-destructive">{mapError}</p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    localStorage.removeItem("mapbox_token");
                    setMapboxToken("");
                    setTokenInput("");
                    setMapError(null);
                  }}
                >
                  Réessayer avec un autre token
                </Button>
              </div>
            </Card>
          </div>
        ) : (
          <>
            <div ref={mapContainer} className="absolute inset-0" />
            
            {/* Floating Action Buttons */}
            <div className="absolute right-4 bottom-24 flex flex-col gap-3 z-10">
              <Button
                size="icon"
                className="h-12 w-12 rounded-full shadow-lg bg-card hover:bg-card/90 text-foreground"
                onClick={handleLocateMe}
              >
                <Locate className="h-5 w-5" />
              </Button>
              
              <Button
                size="icon"
                className="h-12 w-12 rounded-full shadow-lg"
                onClick={handleFitAllPharmacies}
              >
                <Navigation className="h-5 w-5" />
              </Button>
            </div>

            {/* Pharmacy count indicator */}
            <div className="absolute left-4 top-4 z-10">
              <Card className="px-3 py-2 shadow-lg">
                <p className="text-sm font-medium">
                  {pharmacies?.length || 0} pharmacies
                </p>
              </Card>
            </div>
          </>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default PharmaciesMap;