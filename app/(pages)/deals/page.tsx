import { Suspense } from "react";
import styled from "styled-components";
import { supabase } from "@/utils/supabase/client";
import { DealCardComponent } from "@/components/DealCard/dealcard";
import { T } from "@/assets/colors";
import { NavCard } from "@/components/NavCard/navcard";
import { fadeUp } from "@/assets/animations";
import {
  PageHero,
  PageHeroInner,
  PageHeroTop,
  PageHeroText,
  Breadcrumb,
  PageTitle,
  PageSubtitle,
} from "@/assets/pageHeroStyles";
import { TabBarFilter } from "@/components/TabBarFilter/TabBarFilter";
import { Metadata } from "next";
import { Deals } from "@/assets/dealsFunction/deals";
import { DEAL_T } from "@/assets/types/DEAL_T";

export const metadata: Metadata = {
  title: "All Deals",
  description: "Vetted offers from Australia's best services. Updated weekly.",
};

// ─── Deal Count ───────────────────────────────────────────
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

// ─── Main layout ──────────────────────────────────────────
const PageBody = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2.5rem 2rem 5rem;
`;

// ─── Deals Grid ───────────────────────────────────────────
const DealsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 1280px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

// ─── Skeleton ─────────────────────────────────────────────
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

// ─── Page ─────────────────────────────────────────────────
export default async function DealsPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const { category } = await searchParams;
  const activeCategory = category ?? "All";
  
  const deals = (await Deals()) || []

  const filteredDeals: DEAL_T[] = activeCategory !== "All"
  ? deals.filter(d => d.category === activeCategory)
  : deals
  const count = filteredDeals.filter((d => d.status == 'active')).length

  return (
    <>
      <NavCard />

      <PageHero>
        <PageHeroInner>
          <PageHeroTop>
            <PageHeroText>
              <Breadcrumb>
                <a href="/">Home</a> / Deals
              </Breadcrumb>
              <PageTitle>All deals</PageTitle>
              <PageSubtitle>
                Vetted offers from Australia's best services. Updated weekly.
              </PageSubtitle>
            </PageHeroText>
            <DealCount>
              {count ?? "—"}
              <span>live deals</span>
            </DealCount>
          </PageHeroTop>

          {/* Category tabs — reads activeCategory from URL, updates URL on click */}
          <Suspense fallback={null}>
            <TabBarFilter activeCategory={activeCategory} />
          </Suspense>
        </PageHeroInner>
      </PageHero>

      <PageBody>
        {/* Deal cards */}
        {filteredDeals.length > 0 && (
          <DealsGrid>
            {filteredDeals.map((deal, i) => (
              <DealCardComponent
                key={deal.uuid}
                deal={deal}
                note={deal.note ? `Note: ${deal.note}` : ""}
                style={{ animationDelay: `${i * 0.05}s` }}
              />
            ))}
          </DealsGrid>
        )}

        {/* Empty state */}
        {filteredDeals.length === 0 && (
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
              Try a different category or check back soon.
            </p>
          </div>
        )}
      </PageBody>
    </>
  );
}
