"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { DEAL_T, CATEGORY_T, CATEGORIES } from "@/assets/types/DEAL_T";
import { TabBarFilter } from "@/components/TabBarFilter/TabBarFilter";
import styles from "./DealsClient.module.css";

// Geometric heavy sans, the closest free match to a supermarket shelf ticket
const ticketFont = Poppins({
  subsets: ["latin"],
  weight: ["800", "900"],
  display: "swap",
});

type SortKey = "saving" | "ends" | "brand";

type Row = {
  id: string;
  brand: string;
  title: string;
  category: CATEGORY_T;
  saving: number;
  daysLeft: number | null;
  rewardType: string;
  popular: boolean;
  summary: string;
  steps: string[];
  minCost: number;
  minContractMonths: number;
  initialDeposit: number;
  note?: string;
};

const MS_PER_DAY = 86_400_000;

function daysUntil(iso: string | null | undefined): number | null {
  if (!iso) return null;
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return null;
  return Math.max(0, Math.ceil((t - Date.now()) / MS_PER_DAY));
}

/**
 * Instructions can arrive as string[], an array of objects, a JSON string, or
 * one multi-line string. This turns any of those into a clean string[].
 */
function toSteps(raw: unknown): string[] {
  if (!raw) return [];

  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return toSteps(parsed);
    } catch {
      /* not JSON, treat as plain text */
    }
    return raw
      .split(/\r?\n/)
      .map((line) => line.replace(/^\s*(\d+[.)]|[-*•])\s*/, "").trim())
      .filter(Boolean);
  }

  if (Array.isArray(raw)) {
    return raw.flatMap((item) => {
      if (typeof item === "string") return item.trim() ? [item.trim()] : [];
      if (item && typeof item === "object") {
        const o = item as Record<string, unknown>;
        const text = o.text ?? o.instruction ?? o.description ?? o.step ?? o.title;
        return typeof text === "string" && text.trim() ? [text.trim()] : [];
      }
      return [];
    });
  }

  return [];
}

/**
 * Requirements live in three places: on the deal itself and on the
 * referral / saving sub-object. Prefer the type-specific one.
 */
function pickRequirements(d: DEAL_T) {
  const sources = [d.deal_ref?.requirements, d.deal_sav?.requirements, d.requirements];
  const steps =
    sources.map((r) => toSteps(r?.instructions)).find((x) => x.length > 0) ?? [];
  const minCost =
    sources.map((r) => r?.min_cost ?? 0).find((n) => n > 0) ?? 0;
  return { steps, minCost };
}

function toRow(d: DEAL_T): Row {
  const { steps, minCost } = pickRequirements(d);
  return {
    id: d.id,
    brand: d.brand_name,
    title: d.deal_title,
    category: d.category,
    saving: Number(d.reward_value) || 0,
    rewardType: d.reward_type,
    popular: Boolean(d.popular),
    daysLeft: daysUntil(d.offer_expiry_date),
    summary: d.deal_summary,
    steps,
    minCost,
    minContractMonths: d.deal_sav?.min_contract_length ?? 0,
    initialDeposit: d.deal_ref?.initial_deposit ?? 0,
    note: d.note || undefined,
  };
}

const ONGOING_AFTER_DAYS = 365;
const URGENT_WITHIN_DAYS = 7;

const isOngoing = (r: Row) =>
  r.daysLeft === null || r.daysLeft > ONGOING_AFTER_DAYS;
const isUrgent = (r: Row) =>
  !isOngoing(r) && (r.daysLeft as number) <= URGENT_WITHIN_DAYS;
const endsLabel = (r: Row) =>
  isOngoing(r)
    ? "Ongoing"
    : r.daysLeft === 0
      ? "Ends today"
      : r.daysLeft === 1
        ? "1 day left"
        : `${r.daysLeft} days left`;
const hasDetails = (r: Row) =>
  Boolean(r.summary) ||
  r.steps.length > 0 ||
  r.minCost > 0 ||
  r.minContractMonths > 0 ||
  r.initialDeposit > 0;
function splitMoney(n: number) {
  const whole = Math.trunc(n).toLocaleString("en-AU");
  const c = Math.round((n - Math.trunc(n)) * 100);
  return { whole, cents: c > 0 ? String(c).padStart(2, "0") : "" };
}
const money = (n: number) => `$${n.toLocaleString("en-AU")}`;
const compare = (a: number, b: number) => (a === b ? 0 : a < b ? -1 : 1);
const SORT_LABELS: Record<SortKey, string> = {
  saving: "biggest saving",
  ends: "ending soonest",
  brand: "brand name",
};
const capitalise = (v: string) => v.charAt(0).toUpperCase() + v.slice(1);

function SaveSticker({ r }: { r: Row }) {
  const hasDollars = r.saving > 0;
  const { whole, cents } = splitMoney(r.saving);
  return (
    <span
      className={styles.save}
      style={{ fontFamily: ticketFont.style.fontFamily }}
    >
      <span className={styles.saveLabel}>
        {hasDollars ? "Save up to" : "Special"}
      </span>
      {hasDollars ? (
        <>
          <span className={styles.price}>
            <span className={styles.dollar}>$</span>
            <span
              className={`${styles.whole} ${
                whole.length > 5 ? styles.wholeLong : ""
              }`}
            >
              {whole}
            </span>
            {cents && <span className={styles.cents}>{cents}</span>}
          </span>
          <span className={styles.saveNote}>{r.rewardType}</span>
        </>
      ) : (
        <span className={styles.bonusText}>Bonus</span>
      )}
    </span>
  );
}

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
  const [searchVal, setSearchVal] = useState("");
  const [sort, setSort] = useState<SortKey>("saving");
  const [openId, setOpenId] = useState<string | null>(null);

  const rows = useMemo(() => deals.map(toRow), [deals]);

  const displayRows = useMemo(() => {
    const q = searchVal.trim().toLowerCase();
    const endsValue = (r: Row) =>
      isOngoing(r) ? Infinity : (r.daysLeft as number);

    return rows
      .filter(
        (r) =>
          (activeCategory === "All" || r.category === activeCategory) &&
          (!q || `${r.brand} ${r.title}`.toLowerCase().includes(q)),
      )
      .sort((a, b) => {
        if (sort === "saving") return compare(b.saving, a.saving);
        if (sort === "ends") return compare(endsValue(a), endsValue(b));
        return a.brand.localeCompare(b.brand);
      });
  }, [rows, activeCategory, searchVal, sort]);

  function SortButton({ k, label }: { k: SortKey; label: string }) {
    const active = sort === k;
    return (
      <button
        type="button"
        className={`${styles.sortBtn} ${active ? styles.sortActive : ""}`}
        onClick={() => setSort(k)}
      >
        {label}
        {active && <span aria-hidden="true"> ↓</span>}
      </button>
    );
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
              onChange={(e) =>
                setActiveCategory(e.target.value as CATEGORY_T | "All")
              }
              aria-label="Category"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {capitalise(cat)}
                </option>
              ))}
            </select>
            <form
              className={styles.searchForm}
              role="search"
              onSubmit={(e) => e.preventDefault()}
            >
              <span className={styles.searchIcon}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <circle
                    cx="6.5"
                    cy="6.5"
                    r="5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M10.5 10.5L14 14"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <input
                className={styles.searchInput}
                type="search"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder="Search deals…"
                aria-label="Search deals"
              />
            </form>
          </div>
        </div>
      </div>

      <div className={styles.page}>
      <div className={styles.pageBody}>
        {displayRows.length > 0 ? (
          <div className={styles.list}>
            <p className={styles.listMeta}>
              {displayRows.length} {displayRows.length === 1 ? "deal" : "deals"},
              sorted by {SORT_LABELS[sort]}
            </p>
            <div className={styles.head}>
              <SortButton k="brand" label="Brand" />
              <span>Deal</span>
              <SortButton k="ends" label="Ends" />
              <span className={styles.right}>
                <SortButton k="saving" label="You save" />
              </span>
              <span />
            </div>

            <ul className={styles.items}>

              {displayRows.map((r) => {
                
                const open = openId === r.id;
                return (
                  <li key={r.id} className={styles.item}>
                    <div className={styles.row}>
                      <span className={styles.brand}>{r.brand}</span>

                      <div className={styles.deal}>
                        <div className={styles.titleLine}>
                          <Link
                            href={`/deal/${r.id}`}
                            className={styles.title}
                          >
                            {r.title}
                          </Link>
                          {r.popular && (
                            <span className={styles.hot}>Popular</span>
                          )}
                        </div>
                      
                        {hasDetails(r) && (
                          <button
                            type="button"
                            className={styles.toggle}
                            aria-expanded={open}
                            aria-controls={`more-${r.id}`}
                            onClick={() => setOpenId(open ? null : r.id)}
                          >
                            How it works
                            <span
                              className={styles.chevron}
                              aria-hidden="true"
                            />
                          </button>
                        )}
                      </div>

                      <span
                        className={`${styles.ends} ${
                          isUrgent(r) ? styles.urgent : ""
                        } ${isOngoing(r) ? styles.ongoing : ""}`}
                      >
                        {endsLabel(r)}
                      </span>

                      <SaveSticker r={r} />

                      {/* <Link href={`/${r.id}`} className={styles.cta}>
                        Claim deal
                        <span className={styles.srOnly}> from {r.brand}</span>
                      </Link> */}
                    </div>

                    {open && hasDetails(r) && (
                      <div id={`more-${r.id}`} className={styles.more}>
                        
                        {r.summary && <p>{r.summary}</p>}
                        {r.steps.length > 0 && (
                          <ol className={styles.steps}>
                            {r.steps.map((step, i) => (
                              <li key={i}>{step}</li>
                            ))}
                          </ol>
                        )}
                        {r.minCost > 0 && (
                          <p className={styles.minSpend}>
                            Minimum spend: {money(r.minCost)}
                          </p>
                        )}
                        {r.initialDeposit > 0 && (
                          <p className={styles.minSpend}>
                            Initial deposit: {money(r.initialDeposit)}
                          </p>
                        )}
                        {r.minContractMonths > 0 && (
                          <p className={styles.minSpend}>
                            Minimum contract: {r.minContractMonths}{" "}
                            {r.minContractMonths === 1 ? "month" : "months"}
                          </p>
                        )}
                          {r.note && (
                          <p className={styles.note}>Note: {r.note}</p>
                        )}
                      </div>
                      
                    )}
                  </li>
                );
              })}
            </ul>
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
      </div>
    </>
  );
}