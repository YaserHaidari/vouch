import { supabase } from "@/utils/supabase/client";
import { DEAL_T } from "@/assets/types/DEAL_T";
import { DealsClient } from "@/components/DealsClient/dealsClient";

export default async function CommunityDeals({
  searchParams,
}: {
  searchParams: { category: string };
}) {
  const { category } = await searchParams;
  const { data } = await supabase.from("community_deals").select("*");

  function currentTime() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today.getTime();
  }
  const deals: DEAL_T[] =
    data?.filter(
      (d: DEAL_T) => new Date(d.offer_expiry_date).getTime() > currentTime(),
    ) ?? [];

  const activeCategory = category ?? "All";
  const filteredDeals: DEAL_T[] =
    activeCategory !== "All"
      ? deals.filter((d: DEAL_T) => d.category === activeCategory)
      : (deals ?? []);
  const count = filteredDeals.filter((d) => d.status == "active").length;
  return (
    <>
      <DealsClient
        dealNote="Community deals"
        deals={deals ? deals : []}
        count={count}
      />
    </>
  );
}
