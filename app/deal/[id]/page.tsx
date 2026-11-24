import Link from "next/link";
import { notFound } from "next/navigation";
import { Poppins } from "next/font/google";
import { DEAL_T, REWARD_TYPE_T } from "@/assets/types/DEAL_T";
import { supabase } from "@/utils/supabase/client";
import "./style.css";
import { CopyURL } from "@/components/CopyUrl/page";

// add titleFont.variable to a wrapper's className


// Same shelf-ticket font as the deals list
const ticketFont = Poppins({
  subsets: ["latin"],
  weight: ["800", "900"],
  display: "swap",
});

const ONGOING_AFTER_DAYS = 365;
const URGENT_WITHIN_DAYS = 7;

// "2026-12-06" -> local date (avoids the UTC shift of new Date("2026-12-06"))
function parseDate(value: string | null | undefined): Date | null {
  if (!value) return null;
  const [y, m, d] = value.slice(0, 10).split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}

function daysLeft(expiry: Date | null): number | null {
  if (!expiry) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.round((expiry.getTime() - today.getTime()) / 86_400_000);
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function expiryText(expiry: Date | null, days: number | null): string | null {
  if (!expiry || days === null) return null;
  if (days < 0) return `Ended ${formatDate(expiry)}`;
  if (days > ONGOING_AFTER_DAYS) return "Ongoing offer";
  if (days === 0) return "Ends today";
  if (days === 1) return "Ends tomorrow";
  return `Ends ${formatDate(expiry)}, ${days} days left`;
}

function rewardSuffix(type: DEAL_T["reward_type"]): string {
  switch (type) {
    case REWARD_TYPE_T.credit:
      return "credit";
    case REWARD_TYPE_T.cash:
      return "cash";
    case REWARD_TYPE_T.stocks:
      return "stocks";
    case REWARD_TYPE_T.voucher:
      return "voucher";
    default:
      return "";
  }
}

// Saving: "You save" + "$1,000"
// Referral (or anything else): "You receive" + "$200" + "Reward: credit"
function rewardInfo(
  deal: DEAL_T,
): { label: string; value: number; suffix: string } | null {
  if (deal.reward_value == null) return null;

  if (deal.deal_type === "saving") {
    return { label: "You save", value: deal.reward_value, suffix: "" };
  }
  return {
    label: "You receive",
    value: deal.reward_value,
    suffix: rewardSuffix(deal.reward_type),
  };
}

// 1000 -> { whole: "1,000", cents: "" }   12.5 -> { whole: "12", cents: "50" }
function splitMoney(n: number) {
  const whole = Math.trunc(n).toLocaleString("en-AU");
  const c = Math.round((n - Math.trunc(n)) * 100);
  return { whole, cents: c > 0 ? String(c).padStart(2, "0") : "" };
}

export default async function Deal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data, error } = await supabase
    .from("deals_1")
    .select("*, deal_ref(*), deal_sav(*)")
    .eq("id", id)
    .single();

  if (error) console.error(error);
  if (!data) notFound();

  const deal = data as DEAL_T;

  const details = deal.deal_ref?.requirements ?? deal.deal_sav?.requirements;
  const instructions: string[] = details?.instructions ?? [];
  const minCost = details?.min_cost ?? deal.requirements?.min_cost ?? 0;

  const expiry = parseDate(deal.offer_expiry_date);
  const days = daysLeft(expiry);
  const isExpired = deal.status === "expired" || (days !== null && days < 0);
  const isUrgent =
    !isExpired && days !== null && days <= URGENT_WITHIN_DAYS;

  const reward = rewardInfo(deal);
  const money = reward ? splitMoney(reward.value) : null;
  const title =
    deal.deal_title ??
    (deal.deal_type === "saving"
      ? `Save up to $${deal.reward_value}`
      : `Get up to $${deal.reward_value}`);

  const hasGoodToKnow = Boolean(
    minCost > 0 || deal.deal_ref?.is_cash_convertible || deal.note,
  );

  return (
    <main>
      <section className="hero">
        <div className="inner">
          <p className="breadcrumb">
            <Link href="/">Home</Link> / <Link href="/deals">Deals</Link> /{" "}
            {deal.brand_name}
          </p>

          <h1 className="title">{title}</h1>

          <div className="heroBottom">
            {reward && money && (
              <div
                className="ticket"
                style={{ fontFamily: ticketFont.style.fontFamily }}
              >
                <span className="ticketLabel">{reward.label}</span>
                <span className="ticketPrice">
                  <span className="ticketDollar">$</span>
                  <span
                    className={`ticketWhole${
                      money.whole.length > 5 ? " ticketWholeLong" : ""
                    }`}
                  >
                    {money.whole}
                  </span>
                  {money.cents && (
                    <span className="ticketCents">{money.cents}</span>
                  )}
                </span>
                {reward.suffix && (
                  <span className="ticketNote">Reward: {reward.suffix}</span>
                )}
              </div>
            )}

            <div className="actions">
              {isExpired ? (
                <span className="ended">Offer ended</span>
              ) : (
                <div className="actionRow">
                  <a
                    href={deal.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta"
                  >
                    Claim deal
                  </a>
                  <CopyURL />
                </div>
              )}
              {expiryText(expiry, days) && (
                <p className={`expiry${isUrgent ? " expiryUrgent" : ""}`}>
                  {expiryText(expiry, days)}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="body">
        <div className="inner">
          <div className="content">
            {deal.deal_summary && (
              <p className="summary">{deal.deal_summary}</p>
            )}

            {instructions.length > 0 && (
              <div className="section">
                <h2 className="heading">How to claim</h2>
                <ol className="steps" role="list">
                  {instructions.map((step, i) => (
                    <li key={i}>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {hasGoodToKnow && (
              <div className="section">
                <h2 className="heading">Good to know</h2>
                <ul className="facts" role="list">
                  {minCost > 0 && (
                    <li>
                      <span>
                        {deal.deal_type === "referral"
                          ? "Minimum deposit"
                          : "Minimum cost"}
                      </span>
                      <strong>${minCost.toLocaleString("en-AU")}</strong>
                    </li>
                  )}
                  {deal.deal_ref?.is_cash_convertible && (
                    <li>
                      <span>Can be redeemed for cash</span>
                    </li>
                  )}
                </ul>
                {deal.note && <p className="note">{deal.note}</p>}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}