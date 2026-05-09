import { supabase } from "@/utils/supabase/client";


export async function getDealStats() {
  const { data, error } = await supabase.from('deals').select("*");
  if (error) {
    console.log(error);
    return { numOfDeals: 0, valueOfDeals: 0, popularDeals: [] };
  } else {
    const numOfDeals = data.length;
    let sum = 0;
    data.forEach((d) => {
      sum += Number(d.payout_estimate);
    });

    const popularDeals =  data.filter((value) => value.popular === true)
    return { numOfDeals, valueOfDeals: sum, popularDeals };
  }
}


getDealStats()