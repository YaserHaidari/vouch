"use client";

import styled, { createGlobalStyle, keyframes } from "styled-components";
import { getDealStats } from "./lib/deals_stats";
import { useEffect, useState } from "react";
import { DealCardComponent } from "../components/DealCard/dealcard";
import { T } from "@/assets/colors";
import { pulse, fadeUp,float,shimmer } from "@/assets/animations";
import {
  Deal,
  ReturnType,
  RETURN_TYPE_EMOJI,
  RETURN_TYPE_BG,
} from "./lib/deals";
import { supabase } from "@/utils/supabase/client";
import { NavCard } from "@/components/NavCard/navcard";
import { FooterCard } from "@/components/FooterCard/footercard";
const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    font-family: 'DM Sans', sans-serif;
    background: #ffffff;
    color: #1A1A2E;
    -webkit-font-smoothing: antialiased;
  }
`;

// ─── Tokens ───────────────────────────────────────────────


// ─── Hero ─────────────────────────────────────────────────
const HeroSection = styled.section`
  background: ${T.white};
  padding: 5rem 2rem 4rem;
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: ${T.grey200};
  }
`;

const HeroInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

const HeroBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: ${T.yellowLight};
  border: 1px solid #f0d800;
  border-radius: 100px;
  padding: 0.3rem 0.9rem;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: #7a5f00;
  margin-bottom: 1.2rem;
  animation: ${fadeUp} 0.7s ease both;

  &::before {
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${T.yellow};
    display: inline-block;
  }
`;

const HeroHeading = styled.h1`
  font-family: "Bricolage Grotesque", sans-serif;
  font-size: clamp(2.4rem, 5vw, 3.6rem);
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.04em;
  color: ${T.navy};
  margin-bottom: 1.2rem;
  animation: ${fadeUp} 0.7s 0.1s ease both;

  em {
    font-style: normal;
    background: linear-gradient(90deg, ${T.blue}, #0099ff, ${T.blue});
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: ${shimmer} 3s linear infinite;
  }
`;

const HeroDesc = styled.p`
  font-size: 1.05rem;
  color: ${T.grey600};
  line-height: 1.7;
  max-width: 480px;
  margin-bottom: 2rem;
  font-weight: 400;
  animation: ${fadeUp} 0.7s 0.2s ease both;
`;

const HeroCtas = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  animation: ${fadeUp} 0.7s 0.3s ease both;
`;

const BtnPrimary = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: ${T.yellow};
  color: ${T.navy};
  padding: 0.8rem 1.8rem;
  border-radius: 10px;
  font-weight: 700;
  font-size: 0.95rem;
  text-decoration: none;
  transition:
    background 0.2s,
    transform 0.15s,
    box-shadow 0.2s;
  font-family: "DM Sans", sans-serif;

  &:hover {
    background: #e8bd00;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(255, 208, 0, 0.35);
  }
`;

const BtnSecondary = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  color: ${T.blue};
  padding: 0.8rem 1.8rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  border: 1.5px solid ${T.blue};
  transition:
    background 0.2s,
    transform 0.15s;
  font-family: "DM Sans", sans-serif;

  &:hover {
    background: ${T.blueLight};
    transform: translateY(-2px);
  }
`;

// Hero right — referral card visual
const HeroVisual = styled.div`
  animation: ${fadeUp} 0.7s 0.35s ease both;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ReferralCard = styled.div`
  background: ${T.white};
  border: 1.5px solid ${T.grey200};
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  animation: ${float} 4s ease-in-out infinite;
`;

const CardTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const ServiceBadge = styled.div<{ $color: string; $bg: string }>`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  color: ${(p) => p.$color};

  .icon {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: ${(p) => p.$bg};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
  }
`;

const LiveTag = styled.span`
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: #1b7a3a;
  background: #e6f7ed;
  padding: 0.25rem 0.65rem;
  border-radius: 100px;
  display: flex;
  align-items: center;
  gap: 5px;

  &::before {
    content: "";
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #1b7a3a;
    display: inline-block;
    animation: ${pulse} 1.8s ease-in-out infinite;
  }
`;

const CodeBox = styled.div`
  background: ${T.grey50};
  border: 1px dashed ${T.grey200};
  border-radius: 10px;
  padding: 0.8rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CodeText = styled.span`
  font-family: "DM Mono", "Courier New", monospace;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: ${T.navy};
`;

const CopyBtn = styled.button`
  background: ${T.blue};
  color: #fff;
  border: none;
  border-radius: 7px;
  padding: 0.4rem 0.9rem;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  font-family: "DM Sans", sans-serif;
  transition: background 0.2s;
  &:hover {
    background: #004fb0;
  }
`;

const MiniStat = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.8rem;
`;

const MiniStatItem = styled.div`
  flex: 1;
  text-align: center;
  padding: 0.7rem;
  background: ${T.grey50};
  border-radius: 10px;

  .val {
    font-family: "Bricolage Grotesque", sans-serif;
    font-size: 1.3rem;
    font-weight: 700;
    color: ${T.navy};
  }
  .lbl {
    font-size: 0.73rem;
    color: ${T.grey400};
    font-weight: 500;
    margin-top: 1px;
  }
`;

// ─── Stats Bar ────────────────────────────────────────────
const StatsBar = styled.div`
  background: ${T.navy};
  padding: 2.5rem 2rem;
`;

const StatsInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 2rem;
`;

const StatItem = styled.div`
  text-align: center;

  .num {
    font-family: "Bricolage Grotesque", sans-serif;
    font-size: 2.4rem;
    font-weight: 800;
    color: ${T.yellow};
    letter-spacing: -0.03em;
  }
  .lbl {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.6);
    margin-top: 0.2rem;
    font-weight: 400;
  }
`;

// ─── How It Works ─────────────────────────────────────────
const HowSection = styled.section`
  background: ${T.grey50};
  padding: 5rem 2rem;
`;

const SectionInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3.5rem;
`;

const SectionEyebrow = styled.p`
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${T.blue};
  margin-bottom: 0.75rem;
`;

const SectionTitle = styled.h2`
  font-family: "Bricolage Grotesque", sans-serif;
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 800;
  color: ${T.navy};
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin-bottom: 0.8rem;
`;

const SectionSubtitle = styled.p`
  color: ${T.grey600};
  font-size: 1rem;
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.6;
`;

const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  position: relative;
`;

const StepCard = styled.div<{ $accent: string }>`
  background: ${T.white};
  border: 1.5px solid ${T.grey200};
  border-radius: 16px;
  padding: 2rem 1.6rem;
  position: relative;
  overflow: hidden;
  transition:
    transform 0.25s,
    box-shadow 0.25s,
    border-color 0.25s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
    border-color: ${(p) => p.$accent};
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${(p) => p.$accent};
    border-radius: 16px 16px 0 0;
  }
`;

const StepNumber = styled.div<{ $accent: string }>`
  font-family: "Bricolage Grotesque", sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${(p) => p.$accent};
  margin-bottom: 1rem;
`;

const StepIcon = styled.div<{ $bg: string }>`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${(p) => p.$bg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  margin-bottom: 1.2rem;
`;

const StepTitle = styled.h3`
  font-family: "Bricolage Grotesque", sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  color: ${T.navy};
  margin-bottom: 0.5rem;
`;

const StepDesc = styled.p`
  font-size: 0.88rem;
  color: ${T.grey600};
  line-height: 1.6;
`;

// ─── Deals Section ────────────────────────────────────────
const DealsSection = styled.section`
  background: ${T.white};
  padding: 5rem 2rem;
`;

const DealsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 3rem;
`;

const DealBonus = styled.div`
  .label {
    font-size: 0.72rem;
    color: ${T.grey400};
    font-weight: 500;
  }
  .value {
    font-family: "Bricolage Grotesque", sans-serif;
    font-size: 1.1rem;
    font-weight: 800;
    color: ${T.navy};
  }
`;

const SignUpLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: ${T.yellow};
  color: ${T.navy};
  font-weight: 700;
  font-size: 0.85rem;
  padding: 0.5rem 1.1rem;
  border-radius: 8px;
  text-decoration: none;
  transition:
    background 0.2s,
    transform 0.15s;

  &:hover {
    background: #e8bd00;
    transform: translateY(-1px);
  }
`;

// ─── Trust Section ────────────────────────────────────────
const TrustSection = styled.section`
  background: ${T.grey50};
  padding: 4rem 2rem;
  border-top: 1px solid ${T.grey200};
  border-bottom: 1px solid ${T.grey200};
`;

const TrustGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2.5rem;
`;

const TrustItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${T.grey600};
  font-size: 0.88rem;
  font-weight: 500;

  .icon {
    width: 36px;
    height: 36px;
    background: ${T.white};
    border: 1.5px solid ${T.grey200};
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
  }
`;

// ─── CTA Banner ───────────────────────────────────────────
const CtaBanner = styled.section`
  background: ${T.blue};
  padding: 5rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -60px;
    right: -60px;
    width: 240px;
    height: 240px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.05);
  }
  &::after {
    content: "";
    position: absolute;
    bottom: -40px;
    left: -40px;
    width: 180px;
    height: 180px;
    border-radius: 50%;
    background: rgba(255, 208, 0, 0.08);
  }
`;

const CtaTitle = styled.h2`
  font-family: "Bricolage Grotesque", sans-serif;
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 800;
  color: ${T.white};
  letter-spacing: -0.03em;
  margin-bottom: 0.8rem;
  position: relative;
  z-index: 1;
`;

const CtaDesc = styled.p`
  color: rgba(255, 255, 255, 0.75);
  font-size: 1rem;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
`;

const CtaBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: ${T.yellow};
  color: ${T.navy};
  padding: 0.9rem 2.2rem;
  border-radius: 10px;
  font-weight: 700;
  font-size: 1rem;
  text-decoration: none;
  position: relative;
  z-index: 1;
  transition:
    background 0.2s,
    transform 0.15s,
    box-shadow 0.2s;

  &:hover {
    background: #e8bd00;
    transform: translateY(-2px);
    box-shadow: 0 10px 28px rgba(255, 208, 0, 0.3);
  }
`;



// ─── Data ─────────────────────────────────────────────────
const steps = [
  {
    num: "Step 01",
    icon: "🔗",
    bg: "#E8F1FC",
    accent: T.blue,
    title: "Browse deals",
    desc: "Vouch brings the best offers from top Australian & International services — all in one place.",
  },
  {
    num: "Step 02",
    icon: "📋",
    bg: T.yellowLight,
    accent: "#C8A200",
    title: "Grab the link",
    desc: "Each deal comes with a unique link. Clicking on the link will take you to service provider's signup page .",
  },
  {
    num: "Step 03",
    icon: "✅",
    bg: "#E6F7ED",
    accent: "#1B7A3A",
    title: "Sign up & get rewarded",
    desc: "Sign up to the service and unlock your bonus — automatically.",
  },
  {
    num: "Step 04",
    icon: "🎉",
    bg: "#FDE8EF",
    accent: "#C0325C",
    title: "Enjoy your reward",
    desc: "Credits, cashback, free months — real rewards just for signing up the smart way.",
  },
];



// ─── Page ─────────────────────────────────────────────────
export default function VouchHome() {
  const [stats, setStats] = useState<{
    numOfDeals: number;
    valueOfDeals: number;
    popularDeals: Deal[];
  }>({ numOfDeals: 0, valueOfDeals: 0, popularDeals: [] });
  const [isLoading, setIsLoading] = useState<boolean>();

  async function fetchData() {
    setIsLoading(true);
    try {
      const val = await getDealStats();
      setStats(val);
      setIsLoading(false);
    } catch (err) {
      console.error("Fetch failed:", err);
    }

    const {data: {user}} = await supabase.auth.getUser()
    // console.log(user)
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <GlobalStyle />

      {/* Nav */}
      <NavCard/>

      {/* Hero */}
      <HeroSection>
        <HeroInner>
          <div>
            <HeroBadge>Australia&apos;s #1 Smart Saving Community</HeroBadge>
            <HeroHeading>
              Sign up smarter.
              <br />
              <em>Get rewarded.</em>
            </HeroHeading>
            <HeroDesc>
              It’s exhausting watching the cost of living climb, so we’re here to help you reclaim your money by finding you deals, cashback, and exclusive rewards on your everyday bills.
            </HeroDesc>
            <HeroCtas>
              <BtnPrimary href="/deals">Browse deals →</BtnPrimary>
              <BtnSecondary href="#how">How it works</BtnSecondary>
            </HeroCtas>
          </div>

          {/* Referral card mockup */}
          <HeroVisual>
            <ReferralCard>
              <CardTop>
                <ServiceBadge $color={T.blue} $bg={T.blueLight}>
                  <div className="icon">📱</div>
                  Amaysim Mobile
                </ServiceBadge>
                <LiveTag>Live deal</LiveTag>
              </CardTop>

              <p
                style={{
                  fontSize: "0.85rem",
                  color: T.grey600,
                  marginBottom: "1rem",
                  lineHeight: 1.5,
                }}
              >
                Amaysim yearly sim $121 off + Bonus 80GB + $75 finder reward
              </p>

              <CodeBox>
                <CodeText>Limited time offer</CodeText>
                <CopyBtn>< a href="https://www.finder.com.au/finder-rewards/finder-amaysim-switching-promotion-terms-and-conditions-may-2026?rewards_ref=MmQ4OWVkNjMtMWUwYS00MDhhLTg2ODAtNjlmN2ZkM2Q4MjE2">Claim deal</a></CopyBtn>
              </CodeBox>

              <MiniStat>
                <MiniStatItem>
                  <div className="val">4</div>
                  <div className="lbl">Used this deal</div>
                </MiniStatItem>
                <MiniStatItem>
                  <div className="val">80GB</div>
                  <div className="lbl">Bonus data</div>
                </MiniStatItem>
                <MiniStatItem>
                  <div className="val">$199</div>
                  <div className="lbl">Expires 22nd May </div>
                </MiniStatItem>
              </MiniStat>
            </ReferralCard>
          </HeroVisual>
        </HeroInner>
      </HeroSection>

      {/* Stats */}
      <StatsBar>
        <StatsInner>
          <StatItem>
            <div className="num">{stats.numOfDeals}+</div>
            <div className="lbl">Live deals</div>
          </StatItem>
          <StatItem>
            <div className="num">5k+</div>
            <div className="lbl">Upto 5k+ Aussies signed up</div>
          </StatItem>
          <StatItem>
            <div className="num">${stats.valueOfDeals}+</div>
            <div className="lbl">In rewards value</div>
          </StatItem>
          <StatItem>
            <div className="num">100%</div>
            <div className="lbl">Free to use</div>
          </StatItem>
        </StatsInner>
      </StatsBar>

      {/* How it works */}
      <HowSection id="how">
        <SectionInner>
          <SectionHeader>
            <SectionEyebrow>How it works</SectionEyebrow>
            <SectionTitle>Four simple steps to your reward</SectionTitle>
            <SectionSubtitle>
              We scout the best deals so you don’t have to. Simply use our link,
              follow the quick instructions, and collect your reward. Need a
              hand? Contact our support team anytime.{" "}
            </SectionSubtitle>
          </SectionHeader>

          <StepsGrid>
            {steps.map((s) => (
              <StepCard key={s.num} $accent={s.accent}>
                <StepNumber $accent={s.accent}>{s.num}</StepNumber>
                <StepIcon $bg={s.bg}>{s.icon}</StepIcon>
                <StepTitle>{s.title}</StepTitle>
                <StepDesc>{s.desc}</StepDesc>
              </StepCard>
            ))}
          </StepsGrid>
        </SectionInner>
      </HowSection>
      <DealsSection id="deals">
        <SectionInner>
          <SectionHeader>
            <SectionEyebrow>Featured deals</SectionEyebrow>
            <SectionTitle>Top deals right now</SectionTitle>
            <SectionSubtitle>
              Fresh deals updated regularly. All vetted by the Vouch team.
            </SectionSubtitle>
          </SectionHeader>
          <DealsGrid>
            {stats.popularDeals?.map((d, i) => {
              // 1. Define your visual logic (colors and emojis)
              const returnType = d.return_type as ReturnType;
              const emoji = RETURN_TYPE_EMOJI[returnType] ?? "🎁";
              const cardBg =
                d.bg ||
                RETURN_TYPE_BG[returnType] ||
                `linear-gradient(135deg, ${T.navy}, #2d2d2d)`;

              return (
                <DealCardComponent
                  key={d.uuid}
                  deal={d} // Pass the whole data object
                  emoji={emoji} // Pass the computed emoji
                  bg={cardBg} // Pass the background color/gradient
                  note={d.note ? `Note: ${d.note}` : ''}
                  style={{ animationDelay: `${i * 0.05}s` }} // Optional: staggered entrance
                />
              );
            })}
          </DealsGrid>
        </SectionInner>
      </DealsSection>

      {/* Deals */}
      {/* <DealsSection id="deals">
        <SectionInner>
          <SectionHeader>
            <SectionEyebrow>Featured deals</SectionEyebrow>
            <SectionTitle>Top deals right now</SectionTitle>
            <SectionSubtitle>
              Fresh deals updated regularly. All vetted by the Vouch team.
            </SectionSubtitle>
          </SectionHeader>
          {isLoading ? (
            <div>Loading deals...</div> // Or a Skeleton component
          ) : (
            <DealsGrid>
              {stats.popularDeals?.map((d) => (
                <DealCard key={d.uuid}>
                  <DealHeader $bg={d.bg}>
                    <DealLogo>{d.brand}</DealLogo>
                    <DealCategory>{d.return_type}</DealCategory>
                  </DealHeader>
                  <DealBody>
                    <DealTitle>{d.brand_name}</DealTitle>
                    <DealDesc>{d.requirements.instructions}</DealDesc>
                    <DealFooter>
                      <DealBonus>
                        <div className="label">You get</div>
                        <div className="value">${d.payout_estimate}</div>
                      </DealBonus>
                      <SignUpLink href="#">Sign up →</SignUpLink>
                    </DealFooter>
                  </DealBody>
                </DealCard>
              ))}
            </DealsGrid>
          )}
        </SectionInner>
      </DealsSection> */}

      {/* Trust signals */}
      {/* <TrustSection>
        <TrustGrid>
          <TrustItem>
            <div className="icon">🇦🇺</div> Australian owned & operated
          </TrustItem>
          <TrustItem>
            <div className="icon">🔒</div> Community deals included
          </TrustItem>
          <TrustItem>
            <div className="icon">✅</div> All deals verified by Vouch
          </TrustItem>
          <TrustItem>
            <div className="icon">💸</div> Always free to use
          </TrustItem>
          <TrustItem>
            <div className="icon">📞</div> Aussie support team
          </TrustItem>
        </TrustGrid>
      </TrustSection> */}

      {/* CTA Banner */}
      <CtaBanner>
        <CtaTitle>Ready to get rewarded?</CtaTitle>
        <CtaDesc>
          Before you sign up to any new service, check out our special deals first.
        </CtaDesc>
        <CtaBtn href="/deals">Browse all deals →</CtaBtn>
      </CtaBanner>

      {/* Footer */}
      <FooterCard/>
    </>
  );
}
