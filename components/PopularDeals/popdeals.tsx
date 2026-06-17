import { Deals } from "@/assets/dealsFunction/deals";
import { DEAL_T } from "@/assets/types/DEAL_T";
import { DealCardComponent } from "../DealCard/dealcard";
import styles from './popdeals.module.css'
import { STATS_T } from "@/assets/types/STATS_T";


export default async function PopularDeals() {
  // await new Promise((resolve) => setTimeout(resolve, 10000));
  const deal: DEAL_T[] = (await Deals()) ?? [];
  const statistics: STATS_T = { valueOfDeals: 0, numOfDeals: 0, popularDeals: [] }
  statistics.popularDeals = deal.filter((value: DEAL_T) => {
    return value.popular;
  });
  return (
    <div className={styles.dealgrid}>
      {statistics.popularDeals?.map((d, i) => {
        // 1. Define your visual logic (colors and emojis)
        return (
          <DealCardComponent
            key={d.uuid}
            deal={d} // Pass the whole data object
            note={d.note ? `Note: ${d.note}` : ""}
            style={{ animationDelay: `${i * 0.05}s` }} // Optional: staggered entrance
          />
        );
      })}
    </div>
  );
}