import { DEAL_T } from "@/assets/types/DEAL_T";
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
        <div className="deal-provider">{deal.brand_name}</div>
        <h1 className="deal-headline">
          Sign up and pocket
          <br />
          up to ${deal.payout_estimate} back.
        </h1>
        <div className="deal-reward-badge">
          <div className="deal-reward-label">You receive</div>
          <div className="deal-reward-value">${deal.payout_estimate}</div>
          <div className="deal-reward-sub">{deal.return_type}</div>
        </div>
        <div className="deal-cta">
          <a href={deal.link}>
            <button className="deal-cta-btn">Claim this deal</button>
        </a>
          {/* <button className="deal-share-btn">Share</button> */}
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
