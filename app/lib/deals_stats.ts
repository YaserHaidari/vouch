import { supabase } from "@/utils/supabase/client";


export async function getDealStats() {
  const { data, error } = await supabase.from('deals').select("*");
  if (error) {
    console.log(error);
    return { numOfDeals: 0, valueOfDeals: 0, popularDeals: [] };
  } else {
    const filteredData = data.filter((item) => {
      return new Date(item.offer_expiry_date).getTime() > Date.now()
    })
    const numOfDeals = filteredData.length;
    let sum = 0;
    filteredData.forEach((d) => {
      sum += Number(d.payout_estimate);
    });

    const popularDeals =  filteredData.filter((value) => value.popular === true)
    return { numOfDeals, valueOfDeals: sum, popularDeals };
  }
}


