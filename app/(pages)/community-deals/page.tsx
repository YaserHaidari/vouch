"use client";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { NavCard } from "@/components/NavCard/navcard";
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
} from "@/assets/pageHeroStyles";
import {
  Deal,
  ReturnType,
  RETURN_TYPE_EMOJI,
  RETURN_TYPE_BG,
  CATEGORIES,
} from "@/app/lib/deals";

import { Category } from "@/app/lib/deals";
import { supabase } from "@/utils/supabase/client";
// ─── Mock community data ──────────────────────────────────
const MOCK_COMMUNITY_DEALS: Deal[] = [
  {
    uuid: "c1",
    brand_name: "Boost Mobile",
    brand_id: "123",
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000),
    num: 1,
    status: "active",
    link: "https://example.com/referral",
    offer_expiry_date: new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000,
    ).toISOString(),
    requirements: {
      initial_deposit: 0,
      instructions: ["Sign up", "Use referral link"],
    },
    return_type: ReturnType.Credit,
    is_cash_convertible: false,
    payout_estimate: "1",
    popular: true,
    category: Category.Banking,
    bg: "#0064D2",
    note: "",
  },
];

const SORT_OPTIONS = ["Newest", "A–Z", "Highest payout"] as const;
type SortOption = (typeof SORT_OPTIONS)[number];

// ─── Hero extras ──────────────────────────────────────────
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

const PostBtn = styled.button`
  background: ${T.yellow};
  color: ${T.navy};
  border: none;
  border-radius: 10px;
  padding: 0.5rem 1.2rem;
  font-family: "DM Sans", sans-serif;
  font-size: 0.88rem;
  font-weight: 700;
  cursor: pointer;
  transition:
    background 0.2s,
    transform 0.15s;
  white-space: nowrap;
  &:hover {
    background: #e6bb00;
    transform: translateY(-1px);
  }
`;

// ─── Page body ────────────────────────────────────────────
const PageBody = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2.5rem 2rem 5rem;
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

const CloseBtn = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: ${T.grey100};
  border: 1px solid ${T.grey200};
  color: ${T.grey400};
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;
  &:hover {
    background: ${T.grey200};
    color: ${T.navy};
  }
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

const SubmitBtn = styled.button`
  width: 100%;
  margin-top: 8px;
  background: ${T.yellow};
  color: ${T.navy};
  border: none;
  border-radius: 10px;
  padding: 13px;
  font-family: "DM Sans", sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition:
    background 0.2s,
    transform 0.15s;
  &:hover {
    background: #e6bb00;
    transform: translateY(-1px);
  }
  &:disabled {
    background: ${T.grey200};
    color: ${T.grey400};
    cursor: default;
    transform: none;
  }
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

// ─── Empty form state ─────────────────────────────────────
const EMPTY_FORM = {
  brand_name: "",
  return_type: "" as ReturnType | "",
  category: (CATEGORIES.filter((c) => c !== "All")[0] ?? "") as Category | "",
  payout_estimate: "",
  referral_link: "",
  referral_code: "",
  offer_expiry_date: "",
  is_cash_convertible: false,
  note: "",
};

// ─── Page ─────────────────────────────────────────────────
export default function CommunityPage() {
  const [deals, setDeals] = useState<Deal[]>([]);

  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    await supabase
      .from("community_deals")
      .select("*")
      .eq("is_approved", true)
      .then(({ data }) => {
        console.log(data)
        if (data) setDeals(data as Deal[]);
      });
  }
  // Filter deals by category
  const filteredDeals =
    activeCategory === "All"
      ? deals
      : deals.filter((deal) => deal.category === activeCategory);

  function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  function handleClose() {
    setShowForm(false);
    setSubmitted(false);
    setForm(EMPTY_FORM);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!form.brand_name || !form.payout_estimate || !form.referral_link)
      return;

    const {
      data: { user },
    } = await supabase.auth.getUser();
    const display_name = user?.user_metadata.full_name;
    fetch("/api/postdeal", {
      headers: { "content-type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        brand_name: form.brand_name,
        return_type: form.return_type || null,
        category: form.category || null,
        payout_estimate: form.payout_estimate,
        link: form.referral_link,
        referral_code: form.referral_code || null,
        offer_expiry_date: form.offer_expiry_date || null,
        is_cash_convertible: form.is_cash_convertible,
        display_name: display_name,
        note: form.note || null,
        is_referral: true,
      }),
    });

    setSubmitted(true);
    setTimeout(() => {
      handleClose();
    }, 2500);
  }

  const canSubmit =
    form.brand_name.trim() !== "" &&
    form.payout_estimate.trim() !== "" &&
    form.referral_link.trim() !== "";

  return (
    <>
      <NavCard />

      {/* Hero */}
      <PageHero>
        <PageHeroInner>
          <PageHeroTop>
            <PageHeroText>
              <Breadcrumb>
                <a href="/">Home</a> / Community Referrals
              </Breadcrumb>
              <PageTitle>Community referrals</PageTitle>
              <PageSubtitle>
                Deals shared by the Vouch community. Every submission is
                reviewed before going live.
              </PageSubtitle>
            </PageHeroText>
            <DealCount>
              {deals.length}
              <span>community deals</span>
            </DealCount>
          </PageHeroTop>

          {/* Category tabs — driven by Category */}
          <TabBar>
            {CATEGORIES.map((cat) => (
              <Tab
                key={cat}
                $active={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              >
                {capitalize(cat)}
              </Tab>
            ))}
          </TabBar>
        </PageHeroInner>
      </PageHero>

      {/* Filter bar */}
      <FilterBar>
        <FilterInner>
          <ResultsCount>
            {filteredDeals.length} referral
            {filteredDeals.length !== 1 ? "s" : ""}
          </ResultsCount>
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
            <PostBtn onClick={() => setShowForm(true)}>
              + Post a referral
            </PostBtn>
          </div>
        </FilterInner>
      </FilterBar>

      {/* Main content */}
      <PageBody>
        {filteredDeals.length > 0 ? (
          <DealsGrid>
            {filteredDeals.map((deal, i) => (
              <DealCardComponent
                key={deal.uuid}
                deal={deal}
                note={deal.note ? `Note: ${deal.note}` : ""}
                emoji={RETURN_TYPE_EMOJI[deal.return_type] ?? "🎁"}
                bg={
                  RETURN_TYPE_BG[deal.return_type] ??
                  `linear-gradient(135deg, ${T.navy}, #2d2d2d)`
                }
                style={{ animationDelay: `${i * 0.05}s` }}
              />
            ))}
          </DealsGrid>
        ) : (
          <EmptyState>
            <div className="icon">🔍</div>
            <h3>No referrals found</h3>
            <p>Be the first to post one in this category.</p>
          </EmptyState>
        )}
      </PageBody>

      {/* Modal */}
      {showForm && (
        <Overlay onClick={(e) => e.target === e.currentTarget && handleClose()}>
          <Modal>
            <CloseBtn type="button" onClick={handleClose}>
              ✕
            </CloseBtn>

            {submitted ? (
              <SuccessState>
                <div className="icon">✓</div>
                <h3>Referral submitted!</h3>
                <p>
                  Our team will review it before it goes live.
                  <br />
                  Thanks for contributing to the community!
                </p>
              </SuccessState>
            ) : (
              <form onSubmit={handleSubmit}>
                <ModalTitle>Post a referral</ModalTitle>
                <ModalSub>
                  Submitted referrals are reviewed by our team before going
                  live.
                </ModalSub>

                {/* ── Brand & submitter ── */}
                <TwoCol>
                  <Field>
                    <Label>Brand name *</Label>
                    <Input
                      placeholder="e.g. Boost Mobile"
                      value={form.brand_name}
                      onChange={(e) =>
                        setForm({ ...form, brand_name: e.target.value })
                      }
                    />
                  </Field>
                </TwoCol>

                {/* ── Links ── */}
                <Field>
                  <Label>Referral link *</Label>
                  <Input
                    placeholder="https://..."
                    value={form.referral_link}
                    onChange={(e) =>
                      setForm({ ...form, referral_link: e.target.value })
                    }
                  />
                </Field>

                <Field>
                  <Label>Referral code</Label>
                  <Input
                    placeholder="e.g. SARAH50  (if separate from link)"
                    value={form.referral_code}
                    onChange={(e) =>
                      setForm({ ...form, referral_code: e.target.value })
                    }
                  />
                </Field>

                <Divider />

                {/* ── Reward details ── */}
                <TwoCol>
                  <Field>
                    <Label>Reward / payout *</Label>
                    <Input
                      placeholder="e.g. $50 cashback"
                      value={form.payout_estimate}
                      onChange={(e) =>
                        setForm({ ...form, payout_estimate: e.target.value })
                      }
                    />
                  </Field>
                  <Field>
                    <Label>Expiry date</Label>
                    <Input
                      type="date"
                      value={form.offer_expiry_date}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) =>
                        setForm({ ...form, offer_expiry_date: e.target.value })
                      }
                    />
                  </Field>
                </TwoCol>

                <TwoCol>
                  <Field>
                    <Label>Return type</Label>
                    <SelectInput
                      value={form.return_type}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          return_type: e.target.value as ReturnType,
                        })
                      }
                    >
                      <option value="">Select…</option>
                      {Object.values(ReturnType).map((rt) => (
                        <option key={rt} value={rt}>
                          {RETURN_TYPE_EMOJI[rt]} {rt}
                        </option>
                      ))}
                    </SelectInput>
                  </Field>
                  <Field>
                    <Label>Category</Label>
                    <SelectInput
                      value={form.category}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          category: e.target.value as Category,
                        })
                      }
                    >
                      {CATEGORIES.filter((c) => c !== "All").map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </SelectInput>
                  </Field>
                </TwoCol>

                <Field>
                  <CheckboxRow>
                    <input
                      type="checkbox"
                      checked={form.is_cash_convertible}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          is_cash_convertible: e.target.checked,
                        })
                      }
                    />
                    Reward is cash-convertible
                  </CheckboxRow>
                </Field>

                <Divider />

                {/* ── Extra notes ── */}
                <Field>
                  <Label>Note</Label>
                  <Textarea
                    placeholder="Any extra details, promo codes, or requirements..."
                    value={form.note}
                    onChange={(e) => setForm({ ...form, note: e.target.value })}
                  />
                </Field>

                <SubmitBtn type="submit" disabled={!canSubmit}>
                  Submit for review →
                </SubmitBtn>
              </form>
            )}
          </Modal>
        </Overlay>
      )}
    </>
  );
}
