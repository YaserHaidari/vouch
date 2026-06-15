"use client";
import React from "react";
import Link from "next/link";
import styles from "./DealCard.module.css";
import { DEAL_T, RETURN_TYPE_T } from "@/assets/types/DEAL_T";

type DealCardProps = {
  deal: DEAL_T;
  style?: React.CSSProperties;
  note: string;
};

export const DealCardComponent = ({ deal, style, note }: DealCardProps) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const instructions = deal.requirements?.instructions ?? [];
  const visibleInstructions = isExpanded
    ? instructions
    : instructions.slice(0, 3);
  const hasMore = instructions.length > 3;

 
  function setTimer(expiryDate: string) {
    const expiry = new Date(expiryDate);
    const today = new Date();

    if (Number.isNaN(expiry.getTime())) return "Invalid date";

    // Normalize both to midnight (date-only comparison)
    expiry.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const diffDays = Math.round(
      (expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (diffDays < 0) return "Expired";
    if (diffDays === 0) return "Ends today";
    if (diffDays === 1) return "Ends in 1 day";
    return `${diffDays} days`;
  }
  return (
    <div style={style} className={styles.card}>


      <div className={styles.cardBody}>
        <div className={styles.brandName}>{deal.brand_name}</div>
        <h3 className={styles.cardTitle}>
          {deal.is_referral
            ? `Earn up to $${deal.payout_estimate}`
            : `Get up to $${deal.payout_estimate}`}
        </h3>

        {visibleInstructions.map((step: string, idx: number) => (
          <p key={idx} className={styles.cardDesc}>
            {step}
          </p>
        ))}

        {hasMore && (
          <button
            className={styles.toggleBtn}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
          >
            {isExpanded ? "↑ View Less" : "+ View detailed steps"}
          </button>
        )}

        <div className={styles.cardMeta}>
          {deal.requirements?.initial_deposit > 0 && (
            <div className={styles.metaRow}>
              Min. deposit: <span>${deal.requirements.initial_deposit}</span>
            </div>
          )}
          {deal.offer_expiry_date && (
            <div className={styles.metaRow}>
              Expires:{" "}
              <span>
                {new Date(deal.offer_expiry_date).toLocaleDateString("en-AU", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          )}
          {note && <div className={styles.metaRow}>{note}</div>}
          {deal.is_cash_convertible && (
            <div className={styles.metaRow}>
              <span className={styles.cashBadge}>💵 Redeemable for Cash</span>
            </div>
          )}
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.cardFooter}>
        <div className={styles.rewardBox}>
          <div className={styles.rewardLabel}>YOU RECEIVE</div>
          <div className={styles.rewardValue}>
            {deal.return_type == RETURN_TYPE_T.credit &&
              `$${deal.payout_estimate} Credit`}
            {deal.return_type == RETURN_TYPE_T.cash &&
              `$${deal.payout_estimate} Cash`}
            {deal.return_type == RETURN_TYPE_T.stocks &&
              `$${deal.payout_estimate} in Stocks`}
          </div>
        </div>
        {deal.status !== "expired" && (
          <a
            href={deal.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.viewBtn}
          >
            Claim deal →
          </a>
        )}
      </div>
      <div className={styles.divider} />
      <div className={styles.expiryFooter}>
        <span className={styles.expiryLabel}>Ends in</span>
        <span className={styles.expiryValue}>
          {setTimer(deal.offer_expiry_date)}
        </span>
      </div>
    </div>
  );
};
