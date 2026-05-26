import { supabase } from "@/utils/supabase/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { data, error } = await supabase.from("deals").select("*");
  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
  return NextResponse.json({ data }, { status: 200 });
}
