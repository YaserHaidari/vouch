import "server-only";
import styled, { createGlobalStyle } from "styled-components";
import { T } from "@/assets/colors";
import {
  HeroBadge,
  HeroCtas,
  HeroDesc,
  HeroHeading,
  HeroInner,
  HeroSection,
} from "@/assets/pageHeroStyles";
import { BtnPrimary, BtnSecondary, CtaBtn } from "@/assets/btnStyles";
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
import { DEAL_T } from "@/assets/types/DEAL_T";
import { Suspense } from "react";
import StatisticsBanner from "@/components/StatisticBanner/statsbanner";
import PopularDeals from "@/components/PopularDeals/popdeals";

export const metadata: Metadata = {
  title: "Vouch - Smart Deals & Rewards Australia",
  description:
    "Join Australia's #1 smart saving community. Discover the best deals, exclusive offers, and top referral rewards to help you save money on everyday bills. Vouch finds and vets the smartest ways for you to earn and save as the cost of living rises.",
  keywords: [
    "smart deals",
    "Australia deals",
    "save money",
    "cashback",
    "referral rewards",
    "discounts",
    "bills",
    "exclusive offers",
    "sign up bonuses",
    "cost of living",
  ],
  openGraph: {
    title: "Vouch - Smart Deals & Rewards Australia",
    description:
      "Discover the best deals, exclusive offers, and referral rewards in Australia. Save money and earn rewards with Vouch.",
    url: "https://vouch.net.au/",
    images: [
      {
        url: "/logo.svg",
        width: 1200,
        height: 630,
        alt: "Vouch Logo and Smart Deals",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vouch - Smart Deals & Rewards Australia",
    description:
      "Discover the best deals, exclusive offers, and referral rewards in Australia. Save money and earn rewards with Vouch.",
    images: ["/logo.svg"],
    site: "@vouchau",
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

export const dynamic = "force-dynamic";

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


export default function VouchHome() {
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
              to help you reclaim your money by finding you deals, cashback,
              exclusive rewards on your everyday bills and to help you avoid
              loyalty tax.
            </HeroDesc>
            <HeroCtas>
              <BtnPrimary href="/deals">Browse Smart Deals →</BtnPrimary>
              <BtnSecondary href="/#how">How it works</BtnSecondary>
            </HeroCtas>
          </div>
        </HeroInner>
      </HeroSection>

      {/* Stats */}
      <Suspense
        fallback={
          <div
            style={{
              background: "#0f1f3d",
              padding: "3rem 2rem",
              display: "flex",
              justifyContent: "center",
              gap: "12rem",
            }}
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <div
                  style={{
                    height: "36px",
                    width: "80px",
                    background: "rgba(245, 216, 0, 0.3)",
                    borderRadius: "6px",
                  }}
                />
                <div
                  style={{
                    height: "14px",
                    width: "100px",
                    background: "rgba(255,255,255,0.1)",
                    borderRadius: "4px",
                  }}
                />
              </div>
            ))}
          </div>
        }
      >
        <StatisticsBanner />
      </Suspense>

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
        </SectionInner>

            {/* Popular deals */}
        <Suspense fallback={<h1>Loading</h1>}>
          <PopularDeals />
        </Suspense>
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
    </>
  );
}
