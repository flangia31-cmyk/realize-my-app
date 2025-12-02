import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Pharmacy {
  id: string;
  name: string;
  address: string;
  phone: string | null;
  latitude: number | null;
  longitude: number | null;
  opening_hours: any;
  is_on_call: boolean;
  has_parking: boolean;
  is_pmr: boolean;
  created_at: string;
  updated_at: string;
}

export interface PharmacyFilters {
  searchQuery?: string;
  isOnCall?: boolean;
  hasParking?: boolean;
  isPMR?: boolean;
}

export const usePharmacies = (filters?: PharmacyFilters) => {
  return useQuery({
    queryKey: ["pharmacies", filters],
    queryFn: async () => {
      let query = supabase.from("pharmacies").select("*");

      // Apply filters
      if (filters?.isOnCall !== undefined) {
        query = query.eq("is_on_call", filters.isOnCall);
      }
      if (filters?.hasParking !== undefined) {
        query = query.eq("has_parking", filters.hasParking);
      }
      if (filters?.isPMR !== undefined) {
        query = query.eq("is_pmr", filters.isPMR);
      }
      if (filters?.searchQuery) {
        query = query.or(
          `name.ilike.%${filters.searchQuery}%,address.ilike.%${filters.searchQuery}%`
        );
      }

      const { data, error } = await query.order("name");

      if (error) throw error;
      return data as Pharmacy[];
    },
  });
};

export const usePharmacy = (id: string) => {
  return useQuery({
    queryKey: ["pharmacy", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pharmacies")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as Pharmacy;
    },
    enabled: !!id,
  });
};
