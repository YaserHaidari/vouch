import { supabase } from "@/utils/supabase/client";
import { DEAL_T } from "@/assets/types/DEAL_T";

export const Deals = async (): Promise<DEAL_T[]> => {
  const { data, error } = await supabase.from("deals").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data.filter(
    (d: DEAL_T) => new Date(d.offer_expiry_date).getTime() > Date.now(),
  );
};
