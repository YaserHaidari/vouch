import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
 
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
 
    const {
      brand_name,
      return_type,
      category,
      payout_estimate,
      link,
      referral_code,
      offer_expiry_date,
      is_cash_convertible,
      display_name,
      note,
      is_referral,
    } = body;
 
    // Validate required fields
    if (!brand_name || !payout_estimate || !link) {
      return NextResponse.json(
        { message: "Missing required fields: brand_name, payout_estimate, link" },
        { status: 400 }
      );
    }
 
    const supabase = await createClient();
 
    const { data, error } = await supabase
      .from("community_deals")
      .insert({
        brand_name,
        link,
        payout_estimate,
        display_name,
        offer_expiry_date,
        note,
        is_cash_convertible,
        referral_code,
        category,
        return_type
      }) 
    if (error) {
        console.log(error.message)
         throw error
    };

 
    return NextResponse.json({ message: "success", deal: data }, { status: 201 });
 
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ message }, { status: 500 });
  }
}
 