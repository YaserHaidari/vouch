"use client";
import { supabase } from "@/utils/supabase/client";
import { useEffect, useMemo, useState } from "react";

export default function home() {
  enum ReturnType {
    Credit = "Credit",
    Voucher = "Voucher",
    Stocks = "Stocks",
  }
  type DealStatus = "active" | "expired" | "coming_soon";

  type DEALS = {
    brand_name: string;
    brand_id: string,
    row_id: string;
    created_at: Date,
    updated_at: Date,
    num: number;
    status: DealStatus;
    link: string;
    offer_expiry_date: string;
    requirements: {
        initial_deposit: number;
        instructions: []
    }
    return_type: ReturnType;
    is_cash_convertible: boolean;
    payout_estimate: string;
  };

  const [allDeals, setAllDeals] = useState<DEALS[]>([]);

  const fetchData = async () => {
    const { data, error } = await supabase.from("deals").select("*");
    if (error) {
      return console.log("error");
    }
    console.log(data);
    setAllDeals(data || ["empty"]);
    return data;
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>HAHA</h1>
      {allDeals.map((deal) => (
        <div key={deal.row_id}>
          <p>{deal.brand_name}</p>
        </div>
      ))}
    </div>
  );
}
