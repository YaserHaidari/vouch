import { DEAL_T } from "@/assets/types/DEAL_T";
import { DealCardComponent } from "@/components/DealCard/dealcard";
import { supabase } from "@/utils/supabase/client";
import './style.css'
export default async function Deal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data, error } = await supabase
    .from("deals")
    .select("*")
    .eq("uuid", id)
    .single();
  if (error) {
    console.log(error);
  }
  const deal: DEAL_T = data;
  return (
    <div className="deal-page">
      <div className="deal-hero">
        <div className="deal-eyebrow">
          <span className="deal-eyebrow-dot" />
          Live deal · 13 days left
        </div>
        <div className="deal-provider">Aussie Broadband</div>
        <h1 className="deal-headline">
          Switch and pocket
          <br />
          up to $50 back.
        </h1>
        <div className="deal-reward-badge">
          <div className="deal-reward-label">You receive</div>
          <div className="deal-reward-value">${deal.payout_estimate}</div>
          <div className="deal-reward-sub">Account credit</div>
        </div>
        <div className="deal-cta">
          <button className="deal-cta-btn">Claim this deal</button>
          <button className="deal-share-btn">Share</button>
        <div className="deal-expires">
          Expires <strong>{deal.offer_expiry_date}</strong>
        </div>
        </div>
      </div>


      <div className="deal-body">
        <div className="deal-steps-label">How to claim</div>
        <div className="deal-steps">
          {deal?.requirements.instructions.map((step, i) => (
              <div className="deal-step" key={i}>
              <div className="deal-step-num">{i + 1}</div>
              <div className="deal-step-text">{step}</div>
            </div>
          ))}
          {deal.note && <div className="deal-note">{deal.note}</div>}
        </div>
      </div>
    </div>
  );
}
