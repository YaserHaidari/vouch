'use server'

import { createClient } from "@/utils/supabase/server"
import styled from "styled-components";
import { T } from "@/assets/colors";
import { NavCard } from "@/components/navigation/NavCard/navcard";
import { FooterCard } from "@/components/navigation/FooterCard/footercard";

// ─── Styled Components ──────────────────────────────────────────
const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${T.white};
`;

const ContentArea = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 20px;
`;

const Modal = styled.div`
  background: ${T.white};
  border: 1.5px solid ${T.grey200};
  border-radius: 20px;
  width: 100%;
  max-width: 520px;
  padding: 36px;
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
`;

const Field = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  color: ${T.grey600};
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
  &:focus { outline: 2px solid ${T.blue}; }
`;

const SelectInput = styled(Input).attrs({ as: "select" })`
  cursor: pointer;
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
  min-height: 80px;
`;

const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

const Divider = styled.div`
  height: 1px;
  background: ${T.grey200};
  margin: 1.25rem 0;
`;

const CheckboxRow = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: "DM Sans", sans-serif;
  font-size: 0.88rem;
  color: ${T.navy};
  margin-bottom: 1rem;
  input { accent-color: ${T.blue}; }
`;

const SubmitBtn = styled.button`
  width: 100%;
  padding: 12px;
  background: ${T.navy};
  color: ${T.white};
  border: none;
  border-radius: 10px;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  margin-top: 1rem;
`;

export default async function PostDeal() {
  async function handlePostDeal(e: FormData) {
    "use server"
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()
    if (session?.user) {
      const f = Object.fromEntries(e.entries());
      const { error } = await supabase.from("community_deals").insert({
        brand_name: f.brand_name,
        link: f.referral_link,
        payout_estimate: f.payout_estimate,
        offer_expiry_date: f.offer_expiry_date || null,
        return_type: f.return_type || null,
        is_cash_convertible: f.is_cash_convertible === "true",
        category: f.category || null,
        referral_code: f.referral_code || null,
        note: f.note || null,
      });
      if (error) throw new Error(error.message);
    }
  }

  return (
    <PageWrapper>
      <NavCard />
      <ContentArea>
        <Modal>
          <ModalTitle>Post a referral</ModalTitle>
          <ModalSub>Submitted referrals are reviewed by our team.</ModalSub>
          <form action={handlePostDeal}>
            <Field>
              <Label>Brand name *</Label>
              <Input name="brand_name" required />
            </Field>
            <Field>
              <Label>Referral link *</Label>
              <Input name="referral_link" type="url" required />
            </Field>
            <Divider />
            <TwoCol>
              <Field>
                <Label>Reward / payout *</Label>
                <Input name="payout_estimate" required />
              </Field>
              <Field>
                <Label>Expiry date</Label>
                <Input name="offer_expiry_date" type="date" />
              </Field>
            </TwoCol>
            <Field>
              <Label>Return type</Label>
              <SelectInput name="return_type">
                <option value="">Select…</option>
                <option value="cashback">Cashback</option>
              </SelectInput>
            </Field>
            <CheckboxRow>
              <input type="checkbox" name="is_cash_convertible" value="true" />
              Reward is cash-convertible
            </CheckboxRow>
            <SubmitBtn type="submit">Submit for review →</SubmitBtn>
          </form>
        </Modal>
      </ContentArea>
      <FooterCard />
    </PageWrapper>
  )
}