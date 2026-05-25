import styled from "styled-components";
import { NavCard } from "@/components/navigation/NavCard/navcard";
import { DealCardComponent } from "@/components/DealCard/dealcard";
import { T } from "@/assets/colors";
import { fadeUp } from "@/assets/animations";
import {
  PageHero,
  PageHeroInner,
  PageHeroTop,
  PageHeroText,
  Breadcrumb,
  PageTitle,
  PageSubtitle,
  PageBody,
} from "@/assets/pageHeroStyles";
import { supabase } from "@/utils/supabase/client";
import { DEAL_T } from "@/assets/types/DEAL_T";
import { TabBarFilter } from "@/components/TabBarFilter/TabBarFilter";
import { DealsClient } from "@/components/DealsClient/dealsClient";

const SORT_OPTIONS = ["Newest", "A–Z", "Highest payout"] as const;
type SortOption = (typeof SORT_OPTIONS)[number];



// ─── Filter bar ───────────────────────────────────────────
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

const ResultsCount = styled.span`
  font-size: 0.82rem;
  color: ${T.grey400};
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
    grid-template-columns: repeat(3, 1fr);
  }
`;
const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: ${T.grey400};
  .icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  h3 {
    font-family: "Bricolage Grotesque", sans-serif;
    font-size: 1.2rem;
    font-weight: 700;
    color: ${T.navy};
    margin-bottom: 0.4rem;
  }
  p {
    font-size: 0.9rem;
  }
`;

// ─── Modal ────────────────────────────────────────────────
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(17, 24, 39, 0.5);
  backdrop-filter: blur(4px);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Modal = styled.div`
  background: ${T.white};
  border: 1.5px solid ${T.grey200};
  border-radius: 20px;
  width: 100%;
  max-width: 520px;
  /* Allow scrolling on small screens */
  max-height: 90vh;
  overflow-y: auto;
  padding: 36px;
  position: relative;
  box-shadow: 0 20px 60px rgba(17, 24, 39, 0.15);
  animation: slideUp 0.22s ease;
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(16px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ModalTitle = styled.h2`
  font-family: "Bricolage Grotesque", sans-serif;
  font-size: 1.4rem;
  font-weight: 800;
  color: ${T.navy};
  letter-spacing: -0.03em;
  margin-bottom: 4px;
`;

const ModalSub = styled.p`
  font-size: 0.85rem;
  color: ${T.grey400};
  margin-bottom: 1.5rem;
  line-height: 1.5;
`;

const Field = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  color: ${T.grey600};
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin-bottom: 6px;
  font-family: "DM Sans", sans-serif;
`;

const Input = styled.input`
  width: 100%;
  background: ${T.grey50};
  border: 1.5px solid ${T.grey200};
  border-radius: 10px;
  color: ${T.navy};
  font-family: "DM Sans", sans-serif;
  font-size: 0.9rem;
  padding: 10px 14px;
  outline: none;
  transition:
    border-color 0.15s,
    background 0.15s;
  &:focus {
    border-color: ${T.blue};
    background: ${T.white};
  }
  &::placeholder {
    color: ${T.grey400};
  }
`;

const SelectInput = styled.select`
  width: 100%;
  background: ${T.grey50};
  border: 1.5px solid ${T.grey200};
  border-radius: 10px;
  color: ${T.navy};
  font-family: "DM Sans", sans-serif;
  font-size: 0.9rem;
  padding: 10px 14px;
  outline: none;
  cursor: pointer;
  transition: border-color 0.15s;
  &:focus {
    border-color: ${T.blue};
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  background: ${T.grey50};
  border: 1.5px solid ${T.grey200};
  border-radius: 10px;
  color: ${T.navy};
  font-family: "DM Sans", sans-serif;
  font-size: 0.9rem;
  padding: 10px 14px;
  outline: none;
  resize: vertical;
  min-height: 80px;
  transition:
    border-color 0.15s,
    background 0.15s;
  &:focus {
    border-color: ${T.blue};
    background: ${T.white};
  }
  &::placeholder {
    color: ${T.grey400};
  }
`;

const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

// ─── Checkbox row ─────────────────────────────────────────
const CheckboxRow = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-family: "DM Sans", sans-serif;
  font-size: 0.88rem;
  color: ${T.navy};
  font-weight: 500;
  user-select: none;

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    accent-color: ${T.blue};
    cursor: pointer;
    flex-shrink: 0;
  }
`;

// ─── Divider ──────────────────────────────────────────────
const Divider = styled.div`
  height: 1px;
  background: ${T.grey200};
  margin: 1.25rem 0;
`;

const SuccessState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 24px 0;
  text-align: center;
  .icon {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: #d1fae5;
    font-size: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  h3 {
    font-family: "Bricolage Grotesque", sans-serif;
    font-size: 1.25rem;
    font-weight: 800;
    color: ${T.navy};
  }
  p {
    font-size: 0.85rem;
    color: ${T.grey400};
    line-height: 1.5;
  }
`;
export default async function CommunityDeals({
  searchParams,
}: {
  searchParams: { category: string };
}) {
  const { category } = await searchParams;
  const { data: deals = [] } = await supabase
    .from("community_deals")
    .select("*");
  const activeCategory = category ?? "All";
  const filteredDeals: DEAL_T[] =
    activeCategory !== "All"
      ? (deals ?? []).filter((d: DEAL_T) => d.category === activeCategory)
      : (deals ?? []);
  const count = filteredDeals.filter((d) => d.status == "active").length;
  return (
    <>
      <NavCard />
      <DealsClient dealNote="Community deals" deals={deals} count={count} />
    </>
  );
}
