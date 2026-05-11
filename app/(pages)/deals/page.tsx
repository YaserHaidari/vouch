"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import styled, { keyframes } from "styled-components";
import "../deals/../../styles.css";
import { supabase } from "@/utils/supabase/client";
import {
  Deal,
  DealStatus,
  RETURN_TYPE_EMOJI,
  RETURN_TYPE_BG,
  CATEGORIES,
  SORT_OPTIONS,
} from "./deals";
import { DealCardComponent } from "@/components/DealCard/dealcard";
import { T } from "@/assets/colors";
import { NavCard } from "@/components/NavCard/navcard";
import { fadeUp, pulse } from "@/assets/animations";
import { PageHero, PageHeroInner, PageHeroTop, PageHeroText, Breadcrumb, PageTitle, PageSubtitle } from "@/assets/pageHeroStyles";


const DealCount = styled.div`
  font-family: "Bricolage Grotesque", sans-serif;
  font-size: 2rem;
  font-weight: 800;
  color: ${T.yellow};
  text-align: right;
  span {
    display: block;
    font-family: "DM Sans", sans-serif;
    font-size: 0.78rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.5);
    letter-spacing: 0.04em;
    text-transform: uppercase;
    margin-top: 2px;
  }
`;

const TabBar = styled.div`
  display: flex;
  gap: 0;
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  margin-top: 0.5rem;
`;
const Tab = styled.button<{ $active: boolean }>`
  flex-shrink: 0;
  background: none;
  border: none;
  cursor: pointer;
  font-family: "DM Sans", sans-serif;
  font-size: 0.88rem;
  font-weight: ${(p) => (p.$active ? "600" : "500")};
  color: ${(p) => (p.$active ? T.yellow : "rgba(255,255,255,0.55)")};
  padding: 0.9rem 1.3rem;
  border-bottom: 2px solid ${(p) => (p.$active ? T.yellow : "transparent")};
  transition:
    color 0.2s,
    border-color 0.2s;
  white-space: nowrap;
  &:hover {
    color: ${(p) => (p.$active ? T.yellow : "rgba(255,255,255,0.85)")};
  }
`;

// ─── Filter + Sort bar ────────────────────────────────────
const FilterBar = styled.div`
  background: ${T.white};
  border-bottom: 1px solid ${T.grey200};
  padding: 0 2rem;
  position: sticky;
  top: 68px;
  z-index: 90;
`;
const FilterInner = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem 0;
  flex-wrap: wrap;
`;
const FilterLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
`;
const FilterChip = styled.button<{ $active: boolean }>`
  background: ${(p) => (p.$active ? T.navy : T.white)};
  color: ${(p) => (p.$active ? T.white : T.grey600)};
  border: 1.5px solid ${(p) => (p.$active ? T.navy : T.grey200)};
  border-radius: 100px;
  padding: 0.35rem 1rem;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  font-family: "DM Sans", sans-serif;
  transition: all 0.2s;
  white-space: nowrap;
  &:hover {
    border-color: ${T.navy};
    color: ${(p) => (p.$active ? T.white : T.navy)};
  }
`;
const FilterLabel = styled.span`
  font-size: 0.82rem;
  color: ${T.grey400};
  font-weight: 500;
`;
const SortSelect = styled.select`
  font-family: "DM Sans", sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  color: ${T.navy};
  background: ${T.white};
  border: 1.5px solid ${T.grey200};
  border-radius: 8px;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  &:focus {
    outline: none;
    border-color: ${T.blue};
  }
`;
const ResultsCount = styled.span`
  font-size: 0.82rem;
  color: ${T.grey400};
`;

// ─── Main layout ──────────────────────────────────────────
const PageBody = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2.5rem 2rem 5rem;
`;

// ─── Deal Card ────────────────────────────────────────────
const DealsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(272px, 1fr));
  gap: 1.5rem;
`;

const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  background: ${T.white};
  border: 1.5px solid ${T.grey200};
  border-radius: 16px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition:
    transform 0.25s,
    box-shadow 0.25s,
    border-color 0.25s;
  animation: ${fadeUp} 0.5s ease both;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.1);
    border-color: ${T.blue};
  }
`;

const CardImageArea = styled.div<{ $bg: string }>`
  background: ${(p) => p.$bg};
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      transparent 60%,
      rgba(0, 0, 0, 0.12) 100%
    );
  }
`;

const BrandEmoji = styled.div`
  font-size: 4rem;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15));
  z-index: 1;
`;

const CardBadgeRow = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  right: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
`;


const StatusBadge = styled.span<{ $status: DealStatus }>`
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 0.22rem 0.65rem;
  border-radius: 100px;
  background: ${(p) =>
    p.$status === "active"
      ? T.yellow
      : p.$status === "coming_soon"
        ? "#818CF8"
        : T.grey400};
  color: ${(p) => (p.$status === "active" ? T.navy : "#fff")};
`;



const ViewBtn = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: ${T.blueLight};
  color: ${T.blue};
  font-size: 0.82rem;
  font-weight: 700;
  padding: 0.45rem 1rem;
  border-radius: 8px;
  transition: background 0.2s;
  ${Card}:hover & {
    background: ${T.blue};
    color: #fff;
  }
`;

// ─── Section heading ──────────────────────────────────────
const SectionHeading = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  h2 {
    font-family: "Bricolage Grotesque", sans-serif;
    font-size: 1.3rem;
    font-weight: 800;
    color: ${T.navy};
    letter-spacing: -0.02em;
  }
`;

// ─── Loading / empty states ───────────────────────────────
const SkeletonCard = styled.div`
  background: ${T.white};
  border: 1.5px solid ${T.grey200};
  border-radius: 16px;
  overflow: hidden;
  height: 340px;
  @keyframes shimmer {
    0% {
      background-position: -400px 0;
    }
    100% {
      background-position: 400px 0;
    }
  }
  background: linear-gradient(
    90deg,
    ${T.grey100} 25%,
    ${T.grey50} 50%,
    ${T.grey100} 75%
  );
  background-size: 800px 100%;
  animation: shimmer 1.4s infinite;
`;

const StatusLabel: Record<DealStatus, string> = {
  active: "🟡 Active",
  expired: "⚫ Expired",
  coming_soon: "🔵 Coming soon",
};

const FILTER_OPTIONS = ["All deals", "Active only", "Coming soon"] as const;
type FilterOption = (typeof FILTER_OPTIONS)[number];

// ─── Page ─────────────────────────────────────────────────
export default function DealsPage() {
  const [allDeals, setAllDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeFilter, setActiveFilter] = useState<FilterOption>("All deals");
  const [sort, setSort] = useState<string>(SORT_OPTIONS[0]);

  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("deals").select("*");
    if (error) {
      console.error("Supabase error:", error);
    } else {
      setAllDeals(data ?? []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    const channel = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
        },
        (payload) => {
          console.log("recieed", payload);
          fetchData(); // re-fetch all deals on any change
        },
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  // Filter
  const filtered = allDeals.filter((d) => {
    const catMatch =
      activeCategory === "All" || d.return_type === activeCategory;
    const statusMatch =
      activeFilter === "All deals"
        ? true
        : activeFilter === "Active only"
          ? d.status === "active"
          : activeFilter === "Coming soon"
            ? d.status === "coming_soon"
            : true;
    return catMatch && statusMatch;
  });

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    if (sort === "A–Z") return a.brand_name.localeCompare(b.brand_name);
    if (sort === "Highest payout")
      return b.payout_estimate.localeCompare(a.payout_estimate);
    // Newest — fall back to created_at desc
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  return (
    <>
      {/* Nav */}
      <NavCard/>

      {/* Hero */}
      <PageHero>
        <PageHeroInner>
          <PageHeroTop>
            <PageHeroText>
              <Breadcrumb>
                <a href="/">Home</a> / Deals
              </Breadcrumb>
              <PageTitle>All referral deals</PageTitle>
              <PageSubtitle>
                Vetted referral offers from Australia's best services. Updated
                weekly.
              </PageSubtitle>
            </PageHeroText>
            <DealCount>
              {loading ? "—" : allDeals.length}
              <span>live deals</span>
            </DealCount>
          </PageHeroTop>

          {/* Category tabs — driven by ReturnType */}
          <TabBar>
            {CATEGORIES.map((cat) => (
              <Tab
                key={cat}
                $active={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </Tab>
            ))}
          </TabBar>
        </PageHeroInner>
      </PageHero>

      {/* Filter / sort bar */}
      <FilterBar>
        <FilterInner>
          <FilterLeft>
            <FilterLabel>Filter:</FilterLabel>
            {FILTER_OPTIONS.map((f) => (
              <FilterChip
                key={f}
                $active={activeFilter === f}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </FilterChip>
            ))}
          </FilterLeft>
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
            <ResultsCount>
              {loading ? "…" : `${sorted.length} deals`}
            </ResultsCount>
            <SortSelect value={sort} onChange={(e) => setSort(e.target.value)}>
              {SORT_OPTIONS.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </SortSelect>
          </div>
        </FilterInner>
      </FilterBar>

      {/* Main content */}
      <PageBody>
        <SectionHeading>
          <h2>
            {activeCategory === "All" ? "All deals" : `${activeCategory} deals`}
          </h2>
          {!loading && (
            <span style={{ fontSize: "0.85rem", color: T.grey400 }}>
              Showing {sorted.length} of {allDeals.length}
            </span>
          )}
        </SectionHeading>

        {/* Skeleton loading state */}
        {loading && (
          <DealsGrid>
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </DealsGrid>
        )}

        {/* Deal cards */}
        {!loading && (
          <DealsGrid>
            {sorted.map((deal, i) => (
              <DealCardComponent
                key={deal.row_id}
                deal={deal}
                emoji={RETURN_TYPE_EMOJI[deal.return_type] ?? "🎁"}
                bg={
                  RETURN_TYPE_BG[deal.return_type] ??
                  `linear-gradient(135deg, ${T.navy}, #2d2d2d)`
                }
                style={{ animationDelay: `${i * 0.05}s` }}
              />
            ))}
          </DealsGrid>
        )}

        {/* Empty state */}
        {!loading && sorted.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "4rem 2rem",
              color: T.grey400,
            }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🔍</div>
            <p
              style={{
                fontFamily: "Bricolage Grotesque",
                fontSize: "1.2rem",
                fontWeight: 700,
                color: T.navy,
                marginBottom: "0.4rem",
              }}
            >
              No deals found
            </p>
            <p style={{ fontSize: "0.9rem" }}>
              Try a different category or filter.
            </p>
          </div>
        )}
      </PageBody>
    </>
  );
}
