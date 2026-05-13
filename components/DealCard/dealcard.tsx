import React from "react";
import styled from "styled-components";
import Link from "next/link";

// --- Tokens (Keep consistent with your main page) ---
const T = {
  navy: "#1A1A2E",
  blue: "#0064D2",
  grey50: "#F8F9FA",
  grey100: "#F0F1F3",
  grey200: "#E2E4E9",
  grey400: "#9DA3AE",
  grey600: "#5A6172",
  white: "#FFFFFF",
};

// --- Styled Components ---
const CardWrapper = styled.div`
  background: ${T.white};
  border: 1.5px solid ${T.grey200};
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.25s, box-shadow 0.25s;
  text-decoration: none;
  color: inherit;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
  }
`;

const CardImageArea = styled.div<{ $bg: string }>`
  height: 140px;
  background: ${(p) => p.$bg};
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
`;

const CardBadgeRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CategoryPill = styled.span`
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  color: ${T.white};
  background: rgba(255, 255, 255, 0.2);
  padding: 0.3rem 0.7rem;
  border-radius: 100px;
  backdrop-filter: blur(4px);
`;

const StatusBadge = styled.span<{ $status: string }>`
  font-size: 0.7rem;
  font-weight: 800;
  padding: 0.3rem 0.7rem;
  border-radius: 100px;
  background: ${(p) => (p.$status === "active" ? "#E6F7ED" : "#FFFBE6")};
  color: ${(p) => (p.$status === "active" ? "#1B7A3A" : "#7A5F00")};
`;

const BrandEmoji = styled.div`
  font-size: 2.5rem;
  align-self: center;
`;

const CardBody = styled.div`
  padding: 1.25rem;
  flex-grow: 1;
`;

const BrandName = styled.div`
  font-size: 0.85rem;
  font-weight: 600;
  color: ${T.grey400};
  margin-bottom: 0.25rem;
`;

const CardTitle = styled.h3`
  font-family: "Bricolage Grotesque", sans-serif;
  font-size: 1.2rem;
  font-weight: 800;
  color: ${T.navy};
  margin-bottom: 0.75rem;
`;

const CardDesc = styled.p`
  font-size: 0.85rem;
  color: ${T.grey600};
  line-height: 1.4;
  margin-bottom: 0.4rem;
  display: flex;
  align-items: flex-start;
  gap: 6px;

  &::before { content: "•"; color: ${T.blue}; }
`;

const CardMeta = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;


const CardMetaRow = styled.div`
  font-size: 0.78rem;
  color: ${T.grey600};
  font-weight: 500;
  span { color: ${T.navy}; font-weight: 700; }
`;

const CardDivider = styled.div`
  height: 1px;
  background: ${T.grey100};
  margin: 0 1.25rem;
`;

const CardFooter = styled.div`
  padding: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const RewardBox = styled.div`
  .label { font-size: 0.7rem; color: ${T.grey400}; font-weight: 600; text-transform: uppercase; }
  .value { font-family: "Bricolage Grotesque", sans-serif; font-size: 1rem; font-weight: 800; color: ${T.navy}; }
`;

const ViewBtn = styled(Link)`
  background: ${T.navy};
  color: ${T.white};
  font-size: 0.8rem;
  font-weight: 700;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: #111827;
    color: ${T.yellow};
  }
`;

// --- Component Logic ---
interface DealCardProps {
  deal: any; // Ideally replace with your Deal interface
  bg: string;
  emoji: string;
  style?: React.CSSProperties;
  note: string;
}

export const DealCardComponent = ({ deal, bg, emoji, style, note }: DealCardProps) => {
  const [isExpanded, setIsExpanded] = React.useState(false); // State to track toggle
  const instructions = deal.requirements?.instructions ?? [];
  
  // Decide how many instructions to show
  const visibleInstructions = isExpanded ? instructions : instructions.slice(0, 3);
  const hasMore = instructions.length > 3;

  return (
    <CardWrapper style={style}>
      <CardImageArea $bg={bg}>
        <CardBadgeRow>
          <CategoryPill>{deal.return_type}</CategoryPill>
          <StatusBadge $status={deal.status}>
            {deal.status === "active" ? "Active" : deal.status === "coming_soon" ? "Soon" : "Expired"}
          </StatusBadge>
        </CardBadgeRow>
        <BrandEmoji>{emoji}</BrandEmoji>
      </CardImageArea>

      <CardBody>
        <BrandName>{deal.brand_name}</BrandName>
        <CardTitle>Earn up to ${deal.payout_estimate}</CardTitle>

        {/* Render only visible instructions */}
        {visibleInstructions.map((step: string, idx: number) => (
          <CardDesc key={idx}>{step}</CardDesc>
        ))}

        {/* View More / Less Toggle */}
        {hasMore && (
          <button
            onClick={(e) => {
              e.preventDefault(); // Prevent link navigation
              e.stopPropagation(); // Prevent card click
              setIsExpanded(!isExpanded);
            }}
            style={{
              background: "none",
              border: "none",
              color: T.blue,
              fontSize: "0.8rem",
              fontWeight: 700,
              cursor: "pointer",
              padding: "4px 0",
              marginTop: "4px"
            }}
          >
            {isExpanded ? "↑ View Less" : `+ View detailed steps`}
          </button>
        )}

        <CardMeta>
          {deal.requirements?.initial_deposit > 0 && (
            <CardMetaRow>Min. deposit: <span>${deal.requirements.initial_deposit}</span></CardMetaRow>
          )}
          {deal.offer_expiry_date && (
            <CardMetaRow>
              Expires: <span>{new Date(deal.offer_expiry_date).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" })}</span>
            </CardMetaRow>
          )}
          {/* Note section below expiry */}
          <CardMetaRow>
           {note}
          </CardMetaRow>
          {deal.is_cash_convertible && (
            <CardMetaRow><span style={{ color: T.blue }}>💵 Redeemable for Cash</span></CardMetaRow>
          )}
        </CardMeta>
      </CardBody>

      <CardDivider />
      <CardFooter>
        <RewardBox>
          <div className="label">YOU RECEIVE</div>
          <div className="value">
            {deal.return_type === "credit" && `$${deal.payout_estimate} Credit`}
            {deal.return_type === "cash" && `$${deal.payout_estimate} Cash`}
            {deal.return_type === "stocks" && `$${deal.payout_estimate} in Stocks`}
          </div>
        </RewardBox>
        {deal.status !== "expired" && (
          <ViewBtn href={`/deals/${deal.uuid}`}>Claim deal →</ViewBtn>
        )}
      </CardFooter>
    </CardWrapper>
  );
};