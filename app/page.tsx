import styled, { createGlobalStyle } from "styled-components";
import { DealCardComponent } from "../components/DealCard/dealcard";
import { T } from "@/assets/colors";
import { pulse, float } from "@/assets/animations";
import { NavCard } from "@/components/navigation/NavCard/navcard";
import { FooterCard } from "@/components/navigation/FooterCard/footercard";
import {
  HeroBadge,
  HeroCtas,
  HeroDesc,
  HeroHeading,
  HeroInner,
  HeroSection,
  HeroVisual,
} from "@/assets/pageHeroStyles";
import { BtnPrimary, BtnSecondary, CopyBtn, CtaBtn } from "@/assets/btnStyles";

import { Metadata } from "next";
import {
  SectionTitle,
  SectionSubtitle,
  SectionInner,
  SectionHeader,
  SectionEyebrow,
  HowSection,
} from "@/assets/sectionStyles";
import { steps } from "@/assets/data/steps";
import { Deals } from "@/assets/dealsFunction/deals";
import { DEAL_T } from "@/assets/types/DEAL_T";
import { stat } from "fs";
import { DealsClient } from "@/components/DealsClient/dealsClient";


export const metadata: Metadata = {
  title:
    "We find the best deals for you in Australia so you get rewarded for signing up.",
  description: "",
  keywords: [],
  openGraph: {
    url: "vouch.net.au",
    images: [{ url: "", width: 100, height: 100 }],
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
    },
  },
};

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

// ─── Page ─────────────────────────────────────────────────
const statistics: {valueOfDeals: number, numOfDeals: number, popularDeals: DEAL_T[]} = 
{valueOfDeals: 0, numOfDeals: 0, popularDeals: [] }

export default async function VouchHome() {
  const deal: DEAL_T[] = (await Deals()) || []

  statistics.popularDeals = deal.filter((value: DEAL_T) => {
        return value.popular
    })

    statistics.numOfDeals = deal.length - 1
    function calculateTotalValueOfDeals(): number{
        let sum =0;
        deal.forEach((item: DEAL_T) => {
            sum += item.payout_estimate
        })
        return sum - 1;
    }
    statistics.valueOfDeals = calculateTotalValueOfDeals()

  return (
    <>
      <GlobalStyle />

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
              It’s exhausting watching the cost of living climb, so we’re here
              to help you reclaim your money by finding you deals, cashback, and
              exclusive rewards on your everyday bills.
            </HeroDesc>
            <HeroCtas>
              <BtnPrimary href="/deals">Browse Smart Deals →</BtnPrimary>
              <BtnSecondary href="#how">How it works</BtnSecondary>
            </HeroCtas>
          </div>

          {/* Referral card mockup */}
          {/* <HeroVisual>
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
                <CopyBtn>
                  <a href="https://www.finder.com.au/finder-rewards/finder-amaysim-switching-promotion-terms-and-conditions-may-2026?rewards_ref=MmQ4OWVkNjMtMWUwYS00MDhhLTg2ODAtNjlmN2ZkM2Q4MjE2">
                    Claim deal
                  </a>
                </CopyBtn>
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
          </HeroVisual> */}
        </HeroInner>
      </HeroSection>

      {/* Stats */}
      <StatsBar>
        <StatsInner>
          <StatItem>
            <div className="num">{statistics.numOfDeals}+</div>
            <div className="lbl">Live deals</div>
          </StatItem>
          <StatItem>
            <div className="num">5k+</div>
            <div className="lbl">Upto 5k+ Aussies signed up</div>
          </StatItem>
          <StatItem>
            <div className="num">${statistics.valueOfDeals}+</div>
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
            {statistics.popularDeals?.map((d, i) => {
              // 1. Define your visual logic (colors and emojis)
              return (
                <DealCardComponent
                  key={d.uuid}
                  deal={d} // Pass the whole data object
                  note={d.note ? `Note: ${d.note}` : ""}
                  style={{ animationDelay: `${i * 0.05}s` }} // Optional: staggered entrance
                />
              );
            })}
          </DealsGrid>
        </SectionInner>
      </DealsSection>

      {/* CTA Banner */}
      <CtaBanner>
        <CtaTitle>Ready to get rewarded?</CtaTitle>
        <CtaDesc>
          Before you sign up to any new service, check out our special deals
          first.
        </CtaDesc>
        <CtaBtn href="/deals">Browse Smart Deals →</CtaBtn>
      </CtaBanner>

      {/* Footer */}
      {/* <FooterCard /> */}
    </>
  );
}

