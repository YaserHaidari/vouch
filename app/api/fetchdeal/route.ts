import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/client";
import { Deal } from "@/app/lib/deals";
export interface DealsStats {
  deals: Deal[];
  numberOfDeals: number;
  valueOfDeals: number;
  popularDeals: Deal[];
}
export async function POST(req: Request) {

  const deals_stats:  DealsStats = {
    deals: [],
    numberOfDeals: 0,
    valueOfDeals: 0,
    popularDeals: []
  }

  const { data, error } = await supabase.from("deals").select("*");
  if (error) {
    console.log(error);
    return NextResponse.json(deals_stats, { status: 504 });
  } else {
    deals_stats.numberOfDeals = data.length;
    deals_stats.deals = data;
    let sum = 0;
    data.forEach((d) => {
      sum += Number(d.payout_estimate);
    });
    deals_stats.valueOfDeals = sum;
    deals_stats.popularDeals = data.filter((value) => value.popular === true);
    return NextResponse.json(deals_stats, { status: 200 });
  }
}