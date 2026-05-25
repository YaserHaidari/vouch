"use client";
import { useState } from "react";
import { DEAL_T, CATEGORY_T } from "@/assets/types/DEAL_T";
import { TabBarFilter } from "@/components/TabBarFilter/TabBarFilter";
import { DealCardComponent } from "@/components/DealCard/dealcard";
import { PageBody } from "@/assets/pageHeroStyles"; // move PageBody to shared styles
import styled from "styled-components";
import { T } from "@/assets/colors";
import {
  PageHero,
  PageHeroInner,
  PageHeroTop,
  PageHeroText,
  Breadcrumb,
  PageTitle,
  PageSubtitle,
} from "@/assets/pageHeroStyles";

const DealsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
  @media (min-width: 768px) { grid-template-columns: repeat(2, 1fr); }
  @media (min-width: 1024px) { grid-template-columns: repeat(3, 1fr); }
  @media (min-width: 1280px) { grid-template-columns: repeat(4, 1fr); }
`;
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
export function DealsClient({ deals, count, dealNote }: { deals: DEAL_T[], count: number, dealNote: string}) {
  const [activeCategory, setActiveCategory] = useState<CATEGORY_T | "All">("All");

  const filteredDeals = activeCategory === "All"
    ? deals
    : deals.filter(d => d.category === activeCategory);

  return (
    <>
      {/* Dark hero */}
      <PageHero style={{ paddingBottom: "0" }}>
        <PageHeroInner>
          <PageHeroTop>
            <PageHeroText>
              <Breadcrumb><a href="/">Home</a> / Deals</Breadcrumb>
              <PageTitle>{dealNote}</PageTitle>
              <PageSubtitle>Vetted offers from Australia's best services. Updated weekly.</PageSubtitle>
            </PageHeroText>
            <DealCount>
              {count}
              <span>live deals</span>
            </DealCount>
          </PageHeroTop>
          <TabBarFilter activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
        </PageHeroInner>
      </PageHero>

      {/* White grid — outside PageHero */}
      <PageBody>
        {filteredDeals.length > 0 ? (
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
        ) : (
          <div style={{ textAlign: "center", padding: "4rem 2rem", color: T.grey400 }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🔍</div>
            <p style={{ fontFamily: "Bricolage Grotesque", fontSize: "1.2rem", fontWeight: 700, color: T.navy, marginBottom: "0.4rem" }}>
              No deals found
            </p>
            <p style={{ fontSize: "0.9rem" }}>Try a different category or check back soon.</p>
          </div>
        )}
      </PageBody>
    </>
  );
}