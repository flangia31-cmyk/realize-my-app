import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Pharmacy } from "./usePharmacies";

export const useOnCallPharmacies = () => {
  return useQuery({
    queryKey: ["pharmacies", "on-call"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pharmacies")
        .select("*")
        .eq("is_on_call", true)
        .order("name");

      if (error) throw error;
      return data as Pharmacy[];
    },
  });
};
