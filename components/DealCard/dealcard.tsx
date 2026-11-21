"use client";
import React, { useId, useState } from "react";

import styles from "./DealCard.module.css";
import { DEAL_T, REWARD_TYPE_T } from "@/assets/types/DEAL_T";

type DealCardProps = {
  deal: DEAL_T;
  style?: React.CSSProperties;
  note?: string;
};

// "2026-12-06" -> local date (avoids the UTC shift that new Date("2026-12-06") causes)
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

function expiryLabel(days: number): string {
  if (days < 0) return "Expired";
  if (days === 0) return "Ends today";
  if (days === 1) return "Ends tomorrow";
  return `${days} days left`;
}

function rewardSuffix(type: DEAL_T["reward_type"]): string {
  switch (type) {
    case REWARD_TYPE_T.credit:
      return "credit";
    case REWARD_TYPE_T.cash:
      return "cash";
    case REWARD_TYPE_T.stocks:
      return "in stocks";
    case REWARD_TYPE_T.voucher:
      return "voucher";
    default:
      return "";
  }
}

// Saving: "You save" + "$1000"
// Referral (or anything else): "You receive" + "$200 credit"
function rewardInfo(deal: DEAL_T): { label: string; value: string } | null {
  if (deal.reward_value == null) return null;
  const amount = `$${deal.reward_value}`;

  if (deal.deal_type === "saving") {
    return { label: "You save", value: amount };
  }

  const suffix = rewardSuffix(deal.reward_type);
  return {
    label: "You receive",
    value: suffix ? `${amount} ${suffix}` : amount,
  };
}

export const DealCardComponent = ({ deal, style, note }: DealCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const detailsId = useId();

  const details = deal.deal_sav?.requirements ?? deal.deal_ref?.requirements;
  const instructions: string[] = details?.instructions ?? [];
  const minCost = details?.min_cost ?? deal.requirements?.min_cost ?? 0;

  const expiry = parseDate(deal.offer_expiry_date);
  const days = daysLeft(expiry);
  const isExpired = deal.status === "expired" || (days !== null && days < 0);
  const isUrgent = days !== null && days >= 0 && days <= 7;

  const reward = rewardInfo(deal);
  const title =
    deal.deal_title ??
    (deal.deal_type === "saving"
      ? `Save up to $${deal.reward_value}`
      : `Get up to $${deal.reward_value}`);

  const hasDetails = Boolean(
    deal.deal_summary ||
      instructions.length > 0 ||
      minCost > 0 ||
      note ||
      expiry ||
      deal.deal_ref?.is_cash_convertible,
  );

  // The grid wraps each card in a clickable div, so stop clicks reaching it
  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <article
      style={style}
      className={`${styles.card} ${isExpired ? styles.cardExpired : ""}`}
    >
      <div className={styles.body}>
        <div className={styles.top}>
          <span className={styles.brand}>{deal.brand_name}</span>
          {days !== null && (
            <span
              className={`${styles.chip} ${isUrgent ? styles.chipUrgent : ""}`}
            >
              {expiryLabel(days)}
            </span>
          )}
        </div>

        <h3 className={styles.title}>{title}</h3>

        {hasDetails && (
          <>
            <button
              type="button"
              className={styles.toggle}
              aria-expanded={isExpanded}
              aria-controls={detailsId}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsExpanded((open) => !open);
              }}
            >
              {isExpanded ? "Hide details" : "How it works"}
              <span className={styles.chevron} aria-hidden="true" />
            </button>

            <div
              id={detailsId}
              className={styles.details}
              data-open={isExpanded}
              inert={!isExpanded}
            >
              <div className={styles.detailsInner}>
                <div className={styles.detailsContent}>
                  {deal.deal_summary && (
                    <p className={styles.summary}>{deal.deal_summary}</p>
                  )}

                  {instructions.length > 0 && (
                    <ol className={styles.steps}>
                      {instructions.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ol>
                  )}

                  <ul className={styles.facts}>
                    {minCost > 0 && (
                      <li>
                        {deal.deal_type === "referral"
                          ? "Min. deposit"
                          : "Minimum cost"}{" "}
                        <strong>${minCost}</strong>
                      </li>
                    )}
                    {expiry && (
                      <li>
                        Ends{" "}
                        <strong>
                          {expiry.toLocaleDateString("en-AU", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </strong>
                      </li>
                    )}
                    {deal.deal_ref?.is_cash_convertible && (
                      <li>
                        <strong>Can be redeemed for cash</strong>
                      </li>
                    )}
                  </ul>

                  {note && <p className={styles.note}>{note}</p>}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className={styles.footer}>
        <div className={styles.reward}>
          {reward && (
            <>
              <span className={styles.rewardLabel}>{reward.label}</span>
              <span className={styles.rewardValue}>{reward.value}</span>
            </>
          )}
        </div>

        {isExpired ? (
          <span className={styles.ended}>Offer ended</span>
        ) : (
          <a
            href={deal.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cta}
            onClick={stop}
          >
            Claim deal →
          </a>
        )}
      </div>
    </article>
  );
};