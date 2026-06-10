"use client";
import { useMemo, useState } from "react";
import { DEAL_T, CATEGORY_T, CATEGORIES } from "@/assets/types/DEAL_T";
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
  const [activeCategory, setActiveCategory] = useState<CATEGORY_T | "All">(
    "All",
  );
  const [searchVal, setSearchVal] = useState<string>("");

  function handleSearch(e: React.ChangeEvent<HTMLFormElement>) {
    console.log(e.target.value);
    setSearchVal(e.target.value);
  }

  const displayDeals = useMemo(() => {
    if (!searchVal) {
      if (activeCategory !== "All") {
        return deals.filter((d) => d.category === activeCategory);
      }
    }
    if (activeCategory === "All") {
      return deals.filter((d) =>
        d.brand_name.toLowerCase().includes(searchVal.toLowerCase()),
      );
    }
    return deals.filter(
      (d) =>
        d.category === activeCategory &&
        d.brand_name.toLowerCase().includes(searchVal.toLowerCase()),
    );
  }, [activeCategory, searchVal]);

  function capitalise(value: string){
    const captilisedCategory = value.charAt(0).toUpperCase() + value.slice(1)
    return captilisedCategory
  }

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
              Vetted offers from Australia&apos;s best services. Updated
              weekly.
            </p>
          </div>
          <div className={styles.dealCount}>
            {count}
            <span>live deals</span>
          </div>
        </div>
        <div className={styles.filterRow}>
  <div className={styles.tabsWrapper}>
    <TabBarFilter
      activeCategory={activeCategory}
      onCategoryChange={setActiveCategory}
    />
  </div>
  <select
    className={styles.categoryDropdown}
    value={activeCategory}
    onChange={(e) => setActiveCategory(e.target.value as CATEGORY_T | "All")}
  >

    {CATEGORIES.map((cat) => (
      <option key={cat} value={cat}>{capitalise(cat)}</option>
    ))}
  </select>
  <form className={styles.searchForm}>
    <span className={styles.searchIcon}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    </span>
    <input
      className={styles.searchInput}
      type="text"
      onChange={handleSearch}
      placeholder="Search deals…"
    />
  </form>
</div>
      </div>
    </div>

    <div className={styles.pageBody}>
      {displayDeals.length > 0 ? (
        <div className={styles.dealsGrid}>
          {displayDeals.map((deal, i) => (
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
