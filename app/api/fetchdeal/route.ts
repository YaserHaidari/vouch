import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/client";

export async function POST(req: Request) {
  const deals_stats: { numberOfDeals: number; valueOfDeals: number; popularDeals: any[] } = {
    numberOfDeals: 0,
    valueOfDeals: 0,
    popularDeals: [],
  };

  const { data, error } = await supabase.from("deals").select("*");
  if (error) {
    console.log(error);
    return NextResponse.json(deals_stats, { status: 504 });
  } else {
    deals_stats.numberOfDeals = data.length;
    let sum = 0;
    data.forEach((d) => {
      sum += Number(d.payout_estimate);
    });
    deals_stats.valueOfDeals = sum;
    deals_stats.popularDeals = data.filter((value) => value.popular === true);
    return NextResponse.json(deals_stats, { status: 200 });
  }
}