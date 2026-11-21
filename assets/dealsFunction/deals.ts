import { supabase } from "@/utils/supabase/client";
import { DEAL_T } from "@/assets/types/DEAL_T";

export const Deals = async () => {
  const { data, error } = await supabase
  .from("deals_1")
  .select("*, deal_ref(*), deal_sav(*)").eq('status', 'active');

  if (error) {
    console.log("DB ERR")
    throw new Error(error.message);
  }
  return data
};
