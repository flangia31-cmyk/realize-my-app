import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PharmaciesMap from "./pages/PharmaciesMap";
import PharmacyDetail from "./pages/PharmacyDetail";
import Favoris from "./pages/Favoris";
import Garde from "./pages/Garde";
import Parametres from "./pages/Parametres";
import Abonnement from "./pages/Abonnement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/pharmacies" element={<PharmaciesMap />} />
          <Route path="/pharmacy/:id" element={<PharmacyDetail />} />
          <Route path="/favoris" element={<Favoris />} />
          <Route path="/garde" element={<Garde />} />
          <Route path="/parametres" element={<Parametres />} />
          <Route path="/abonnement" element={<Abonnement />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
