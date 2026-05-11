"use client"
import { HTMLAttributes, useState } from "react";
import styled from "styled-components";
import { NavCard } from "@/components/NavCard/navcard";
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
import { ReactFormState } from "react-dom/client";

// ─── Page body ────────────────────────────────────────────
const PageBody = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 3rem 2rem 6rem;
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  gap: 4rem;
  align-items: start;
  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

// ─── Left panel ───────────────────────────────────────────
const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SectionLabel = styled.p`
  font-family: "DM Sans", sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${T.grey400};
  margin-bottom: 0.25rem;
`;

const LeftHeading = styled.h2`
  font-family: "Bricolage Grotesque", sans-serif;
  font-size: 1.9rem;
  font-weight: 800;
  color: ${T.navy};
  letter-spacing: -0.04em;
  line-height: 1.15;
  margin-bottom: 0.5rem;
  span { color: ${T.blue}; }
`;

const LeftBody = styled.p`
  font-family: "DM Sans", sans-serif;
  font-size: 0.95rem;
  color: ${T.grey400};
  line-height: 1.7;
`;

const ContactCardGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

const ContactCard = styled.div`
  background: ${T.white};
  border: 1.5px solid ${T.grey200};
  border-radius: 14px;
  padding: 1rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
  &:hover {
    border-color: ${T.blue};
    box-shadow: 0 4px 20px rgba(26, 86, 255, 0.07);
  }
`;

const ContactIcon = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 10px;
  background: ${T.blueLight};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  flex-shrink: 0;
`;

const ContactCardText = styled.div`
  h4 {
    font-family: "Bricolage Grotesque", sans-serif;
    font-size: 0.95rem;
    font-weight: 700;
    color: ${T.navy};
    margin-bottom: 2px;
  }
  p {
    font-family: "DM Sans", sans-serif;
    font-size: 0.82rem;
    color: ${T.grey400};
  }
`;

// ─── Form card ────────────────────────────────────────────
const FormCard = styled.div`
  background: ${T.white};
  border: 1.5px solid ${T.grey200};
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 4px 24px rgba(17, 24, 39, 0.05);
  @media (max-width: 480px) { padding: 1.5rem; }
`;

const FormTitle = styled.h3`
  font-family: "Bricolage Grotesque", sans-serif;
  font-size: 1.3rem;
  font-weight: 800;
  color: ${T.navy};
  letter-spacing: -0.03em;
  margin-bottom: 4px;
`;

const FormSub = styled.p`
  font-family: "DM Sans", sans-serif;
  font-size: 0.85rem;
  color: ${T.grey400};
  margin-bottom: 1.75rem;
  line-height: 1.5;
`;

const TypeRow = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
`;

const TypeChip = styled.button<{ $active: boolean }>`
  background: ${(p) => (p.$active ? T.navy : T.white)};
  color: ${(p) => (p.$active ? T.white : T.grey600)};
  border: 1.5px solid ${(p) => (p.$active ? T.navy : T.grey200)};
  border-radius: 100px;
  padding: 0.35rem 1rem;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  font-family: "DM Sans", sans-serif;
  transition: all 0.15s;
  white-space: nowrap;
  &:hover {
    border-color: ${T.navy};
    color: ${(p) => (p.$active ? T.white : T.navy)};
  }
`;

const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  @media (max-width: 480px) { grid-template-columns: 1fr; }
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
  transition: border-color 0.15s, background 0.15s;
  &:focus { border-color: ${T.blue}; background: ${T.white}; }
  &::placeholder { color: ${T.grey400}; }
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
  min-height: 130px;
  transition: border-color 0.15s, background 0.15s;
  &:focus { border-color: ${T.blue}; background: ${T.white}; }
  &::placeholder { color: ${T.grey400}; }
`;

const SubmitBtn = styled.button`
  width: 100%;
  margin-top: 0.5rem;
  background: ${T.yellow};
  color: ${T.navy};
  border: none;
  border-radius: 10px;
  padding: 13px;
  font-family: "DM Sans", sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s, transform 0.15s;
  &:hover { background: #e6bb00; transform: translateY(-1px); }
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
  gap: 14px;
  padding: 2rem 0;
  text-align: center;
  .icon {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: #d1fae5;
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  h3 {
    font-family: "Bricolage Grotesque", sans-serif;
    font-size: 1.3rem;
    font-weight: 800;
    color: ${T.navy};
  }
  p {
    font-family: "DM Sans", sans-serif;
    font-size: 0.88rem;
    color: ${T.grey400};
    line-height: 1.6;
    max-width: 300px;
  }
`;

const Divider = styled.div`
  height: 1px;
  background: ${T.grey200};
  margin: 1.25rem 0;
`;

// ─── Types ────────────────────────────────────────────────
const CONTACT_TYPES = ["General enquiry", "Feedback", "Report a deal", "Partnership"] as const;
type ContactType = (typeof CONTACT_TYPES)[number];

// ─── Page ─────────────────────────────────────────────────
export const ContactPageForm = () => {
  const [contactType, setContactType] = useState<ContactType>("General enquiry");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    subject: "",
    message: "",
  });

  const canSubmit = form.first_name && form.email && form.message;

  function handleSubmitForm(e: React.SubmitEvent<HTMLFormElement>){
    e.preventDefault()
    if (!canSubmit) return;
    // TODO: submit to backend
    setSubmitted(true);
    fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
  }
  const handleReset = () => {
    setSubmitted(false);
    setForm({ first_name: "", last_name: "", email: "", subject: "", message: "" });
    setContactType("General enquiry");
  };
  return (
    <>
      {/* Hero */}
      <PageHero>
        <PageHeroInner>
          <PageHeroTop>
            <PageHeroText>
              <Breadcrumb>
                <a href="/">Home</a> / Contact
              </Breadcrumb>
              <PageTitle>Get in touch</PageTitle>
              <PageSubtitle>
                Have a question, found a great deal, or just want to say hi? We'd love to hear from you.
              </PageSubtitle>
            </PageHeroText>
          </PageHeroTop>
        </PageHeroInner>
      </PageHero>

      {/* Body */}
      <PageBody>
        {/* Left panel */}
        <LeftPanel>
          <div>
            <SectionLabel>Contact us</SectionLabel>
            <LeftHeading>
              We're here<br />to <span>help.</span>
            </LeftHeading>
            <LeftBody>
              Whether you've spotted a great referral deal, have feedback on Vouch, or want to explore a partnership — reach out and we'll get back to you within 1–2 business days.
            </LeftBody>
          </div>

          <ContactCardGrid>
            {/* <ContactCard>
              <ContactIcon>📧</ContactIcon>
              <ContactCardText>
                <h4>Email us</h4>
                <p>hello@vouch.com.au</p>
              </ContactCardText>
            </ContactCard>
            <ContactCard>
              <ContactIcon>💬</ContactIcon>
              <ContactCardText>
                <h4>Community</h4>
                <p>Join the conversation on our deals page</p>
              </ContactCardText>
            </ContactCard> */}
            <ContactCard>
              <ContactIcon>⏱️</ContactIcon>
              <ContactCardText>
                <h4>Response time</h4>
                <p>Usually within 1–2 business days</p>
              </ContactCardText>
            </ContactCard>
          </ContactCardGrid>
        </LeftPanel>

        {/* Form */}
        <FormCard>
          {submitted ? (
            <SuccessState>
              <div className="icon">✓</div>
              <h3>Message sent!</h3>
              <p>
                Thanks for reaching out. We'll get back to you within 1–2 business days.
              </p>
              <SubmitBtn
                style={{ width: "auto", padding: "0.6rem 1.5rem", marginTop: "0.5rem" }}
                onClick={handleReset}
              >
                Send another →
              </SubmitBtn>
            </SuccessState>
          ) : (
            <>
              <FormTitle>Send us a message</FormTitle>
              <FormSub>Fill in the form and we'll get back to you shortly.</FormSub>

              <TypeRow>
                {CONTACT_TYPES.map((t) => (
                  <TypeChip
                    key={t}
                    $active={contactType === t}
                    onClick={() => setContactType(t)}
                  >
                    {t}
                  </TypeChip>
                ))}
              </TypeRow>

              <Divider />

              <form onSubmit={handleSubmitForm}>
              <TwoCol>
                <Field>
                  <Label>First name *</Label>
                  <Input
                    placeholder="Yaser"
                    value={form.first_name}
                    onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                  />
                </Field>
                <Field>
                  <Label>Last name</Label>
                  <Input
                    placeholder="H."
                    value={form.last_name}
                    onChange={(e) => setForm({ ...form, last_name: e.target.value })}
                  />
                </Field>
              </TwoCol>

              <Field>
                <Label>Email *</Label>
                <Input
                  placeholder="you@example.com"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </Field>

              <Field>
                <Label>Subject</Label>
                <Input
                  placeholder={`${contactType} — optional subject`}
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                />
              </Field>

              <Field>
                <Label>Message *</Label>
                <Textarea
                  placeholder="Tell us what's on your mind..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </Field>

              <SubmitBtn type="submit" disabled={!canSubmit}>
                Send message →
              </SubmitBtn>
              </form>
            </>
          )}
          
        </FormCard>

      </PageBody>
    </>
  );
}
