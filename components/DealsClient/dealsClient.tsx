"use client";
import { useState } from "react";
import { DEAL_T, CATEGORY_T } from "@/assets/types/DEAL_T";
import { TabBarFilter } from "@/components/TabBarFilter/TabBarFilter";
import { DealCardComponent } from "@/components/DealCard/dealcard";
import Link from "next/link";
import styles from "./DealsClient.module.css";

export function DealsClient({
  deals,
  count,
  dealNote,
}: {
  deals: DEAL_T[];
  count: number;
  dealNote: string;
}) {
  const [activeCategory, setActiveCategory] = useState<CATEGORY_T | "All">("All");

  const filteredDeals =
    activeCategory === "All"
      ? deals
      : deals.filter((d) => d.category === activeCategory);

  return (
    <>

      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroTop}>
            <div className={styles.heroText}>
              <p className={styles.breadcrumb}>
                <Link href="/">Home</Link> / Deals
              </p>
              <h1 className={styles.pageTitle}>{dealNote}</h1>
              <p className={styles.pageSubtitle}>
                Vetted offers from Australia&apos;s best services. Updated weekly.
              </p>
            </div>
            <div className={styles.dealCount}>
              {count}
              <span>live deals</span>
            </div>
          </div>
          <TabBarFilter
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>
      </div>

      {/* Grid */}
      <div className={styles.pageBody}>
        {filteredDeals.length > 0 ? (
          <div className={styles.dealsGrid}>
            {filteredDeals.map((deal, i) => (
              <DealCardComponent
                key={deal.uuid}
                deal={deal}
                note={deal.note ? `Note: ${deal.note}` : ""}
                style={{ animationDelay: `${i * 0.05}s` }}
              />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🔍</div>
            <p className={styles.emptyTitle}>No deals found</p>
            <p className={styles.emptySubtitle}>
              Try a different category or check back soon.
            </p>
          </div>
        )}
      </div>
    </>
  );
}