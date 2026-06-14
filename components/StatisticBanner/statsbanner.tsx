import { DEAL_T } from "@/assets/types/DEAL_T";
import { DealCardComponent } from "../DealCard/dealcard";
import { Deals } from "@/assets/dealsFunction/deals";
import styles from './statsbanner.module.css'
import { STATS_T } from "@/assets/types/STATS_T";




export default async function StatisticsBanner() {
  // await new Promise((resolve) => setTimeout(resolve, 10000));
  const deal: DEAL_T[] = (await Deals()) || [];

  const statistics: STATS_T = { valueOfDeals: 0, numOfDeals: 0, popularDeals: [] };
  statistics.popularDeals = deal.filter((value: DEAL_T) => {
    return value.popular;
  });

  statistics.numOfDeals = deal.length - 1;
  function calculateTotalValueOfDeals(): number {
    let sum = 0;
    deal.forEach((item: DEAL_T) => {
      sum += item.payout_estimate;
    });
    return sum - 1;
  }
  statistics.valueOfDeals = calculateTotalValueOfDeals();
  return (
    <div className={styles.statsBar}>
      <div className={styles.statsInner}>
        <div className={styles.statItem}>
          <div className={styles.num}>{statistics.numOfDeals}+</div>
          <div className={styles.lbl}>Live deals</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.num}>5k+</div>
          <div className={styles.lbl}>Upto 5k+ Aussies signed up</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.num}>${statistics.valueOfDeals}+</div>
          <div className={styles.lbl}>In rewards value</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.num}>100%</div>
          <div className={styles.lbl}>Free to use</div>
        </div>
      </div>
    </div>
  );
}
