
import { supabase } from "@/utils/supabase/client"
import { DEAL_T } from '@/assets/types/DEAL_T'

export const Deals = async (): Promise<DEAL_T[]> => {
    const { data, error } = await supabase.from("deals").select("*")
    console.log("FETCHING")
    if (error) {
        console.log(error)
        return []
    }
    return data
}

