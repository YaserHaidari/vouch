import { Deals } from "@/assets/dealsFunction/deals";
import { DEAL_T } from "@/assets/types/DEAL_T";
import { DealCardComponent } from "@/components/DealCard/dealcard";

export default async function Referrals() {
  const deals: DEAL_T[] = await Deals();
  const activeDeals: DEAL_T[] = deals.filter(
    (item) => item.deal_type == "referral",
  );
  console.log(activeDeals);
  return (
    <div>
      {activeDeals.map((item, index) => {
        return <DealCardComponent key={index} deal={item} note={item.note} />;
      })}
    </div>
  );
}
