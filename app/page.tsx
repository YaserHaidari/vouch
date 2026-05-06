'use client';

import styled, { createGlobalStyle, keyframes } from 'styled-components';

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
const T = {
  navy:    '#1A1A2E',
  blue:    '#0064D2',
  blueLight: '#E8F1FC',
  yellow:  '#FFD000',
  yellowLight: '#FFFBE6',
  grey50:  '#F8F9FA',
  grey100: '#F0F1F3',
  grey200: '#E2E4E9',
  grey400: '#9DA3AE',
  grey600: '#5A6172',
  white:   '#FFFFFF',
};

// ─── Animations ───────────────────────────────────────────
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50%       { transform: scale(1.15); opacity: 0.7; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-8px); }
`;

// ─── Nav ──────────────────────────────────────────────────
const Nav = styled.nav`
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid ${T.grey200};
  padding: 0 2rem;
`;

const NavInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 68px;
`;

const Logo = styled.div`
  font-family: 'Bricolage Grotesque', sans-serif;
  font-weight: 800;
  font-size: 1.6rem;
  color: ${T.navy};
  letter-spacing: -0.03em;
  display: flex;
  align-items: center;
  gap: 6px;

  span {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${T.yellow};
    margin-bottom: 2px;
    animation: ${pulse} 2.5s ease-in-out infinite;
  }
`;

const NavLinks = styled.ul`
  display: flex;
  align-items: center;
  gap: 2rem;
  list-style: none;

  @media (max-width: 640px) { display: none; }
`;

const NavLink = styled.a`
  color: ${T.grey600};
  text-decoration: none;
  font-size: 0.92rem;
  font-weight: 500;
  transition: color 0.2s;
  &:hover { color: ${T.navy}; }
`;

const NavCta = styled.a`
  background: ${T.blue};
  color: #fff;
  padding: 0.55rem 1.3rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s, transform 0.15s;
  &:hover { background: #004fb0; transform: translateY(-1px); }
`;

// ─── Hero ─────────────────────────────────────────────────
const HeroSection = styled.section`
  background: ${T.white};
  padding: 5rem 2rem 4rem;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
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
  border: 1px solid #F0D800;
  border-radius: 100px;
  padding: 0.3rem 0.9rem;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: #7A5F00;
  margin-bottom: 1.2rem;
  animation: ${fadeUp} 0.7s ease both;

  &::before {
    content: '';
    width: 6px; height: 6px;
    border-radius: 50%;
    background: ${T.yellow};
    display: inline-block;
  }
`;

const HeroHeading = styled.h1`
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: clamp(2.4rem, 5vw, 3.6rem);
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.04em;
  color: ${T.navy};
  margin-bottom: 1.2rem;
  animation: ${fadeUp} 0.7s 0.1s ease both;

  em {
    font-style: normal;
    background: linear-gradient(90deg, ${T.blue}, #0099FF, ${T.blue});
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
  transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
  font-family: 'DM Sans', sans-serif;

  &:hover {
    background: #E8BD00;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(255,208,0,0.35);
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
  transition: background 0.2s, transform 0.15s;
  font-family: 'DM Sans', sans-serif;

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
  box-shadow: 0 4px 24px rgba(0,0,0,0.06);
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
  color: ${p => p.$color};

  .icon {
    width: 36px; height: 36px;
    border-radius: 10px;
    background: ${p => p.$bg};
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
  }
`;

const LiveTag = styled.span`
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: #1B7A3A;
  background: #E6F7ED;
  padding: 0.25rem 0.65rem;
  border-radius: 100px;
  display: flex;
  align-items: center;
  gap: 5px;

  &::before {
    content: '';
    width: 5px; height: 5px;
    border-radius: 50%;
    background: #1B7A3A;
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
  font-family: 'DM Mono', 'Courier New', monospace;
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
  font-family: 'DM Sans', sans-serif;
  transition: background 0.2s;
  &:hover { background: #004fb0; }
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
    font-family: 'Bricolage Grotesque', sans-serif;
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
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: 2.4rem;
    font-weight: 800;
    color: ${T.yellow};
    letter-spacing: -0.03em;
  }
  .lbl {
    font-size: 0.85rem;
    color: rgba(255,255,255,0.6);
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
  font-family: 'Bricolage Grotesque', sans-serif;
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
  transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0,0,0,0.08);
    border-color: ${p => p.$accent};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: ${p => p.$accent};
    border-radius: 16px 16px 0 0;
  }
`;

const StepNumber = styled.div<{ $accent: string }>`
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${p => p.$accent};
  margin-bottom: 1rem;
`;

const StepIcon = styled.div<{ $bg: string }>`
  width: 48px; height: 48px;
  border-radius: 12px;
  background: ${p => p.$bg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  margin-bottom: 1.2rem;
`;

const StepTitle = styled.h3`
  font-family: 'Bricolage Grotesque', sans-serif;
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

const DealCard = styled.div`
  border: 1.5px solid ${T.grey200};
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.25s, box-shadow 0.25s;
  background: ${T.white};

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0,0,0,0.09);
  }
`;

const DealHeader = styled.div<{ $bg: string }>`
  background: ${p => p.$bg};
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DealLogo = styled.div`
  font-family: 'Bricolage Grotesque', sans-serif;
  font-weight: 800;
  font-size: 1.2rem;
  color: ${T.white};
`;

const DealCategory = styled.span`
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.75);
  background: rgba(255,255,255,0.15);
  padding: 0.25rem 0.65rem;
  border-radius: 100px;
`;

const DealBody = styled.div`
  padding: 1.4rem;
`;

const DealTitle = styled.h3`
  font-family: 'Bricolage Grotesque', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  color: ${T.navy};
  margin-bottom: 0.4rem;
`;

const DealDesc = styled.p`
  font-size: 0.85rem;
  color: ${T.grey600};
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const DealFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid ${T.grey100};
`;

const DealBonus = styled.div`
  .label { font-size: 0.72rem; color: ${T.grey400}; font-weight: 500; }
  .value {
    font-family: 'Bricolage Grotesque', sans-serif;
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
  transition: background 0.2s, transform 0.15s;

  &:hover { background: #E8BD00; transform: translateY(-1px); }
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
    width: 36px; height: 36px;
    background: ${T.white};
    border: 1.5px solid ${T.grey200};
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
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
    content: '';
    position: absolute;
    top: -60px; right: -60px;
    width: 240px; height: 240px;
    border-radius: 50%;
    background: rgba(255,255,255,0.05);
  }
  &::after {
    content: '';
    position: absolute;
    bottom: -40px; left: -40px;
    width: 180px; height: 180px;
    border-radius: 50%;
    background: rgba(255,208,0,0.08);
  }
`;

const CtaTitle = styled.h2`
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 800;
  color: ${T.white};
  letter-spacing: -0.03em;
  margin-bottom: 0.8rem;
  position: relative;
  z-index: 1;
`;

const CtaDesc = styled.p`
  color: rgba(255,255,255,0.75);
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
  transition: background 0.2s, transform 0.15s, box-shadow 0.2s;

  &:hover {
    background: #E8BD00;
    transform: translateY(-2px);
    box-shadow: 0 10px 28px rgba(255,208,0,0.3);
  }
`;

// ─── Footer ───────────────────────────────────────────────
const Footer = styled.footer`
  background: ${T.navy};
  padding: 3rem 2rem;
`;

const FooterInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.5rem;
`;

const FooterLogo = styled.div`
  font-family: 'Bricolage Grotesque', sans-serif;
  font-weight: 800;
  font-size: 1.4rem;
  color: ${T.white};
  display: flex;
  align-items: center;
  gap: 6px;

  span {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: ${T.yellow};
    display: inline-block;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

const FooterLink = styled.a`
  color: rgba(255,255,255,0.5);
  text-decoration: none;
  font-size: 0.85rem;
  transition: color 0.2s;
  &:hover { color: rgba(255,255,255,0.9); }
`;

const FooterCopy = styled.p`
  color: rgba(255,255,255,0.35);
  font-size: 0.8rem;
  width: 100%;
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255,255,255,0.08);
  margin-top: 1rem;
`;

// ─── Data ─────────────────────────────────────────────────
const steps = [
  {
    num: 'Step 01',
    icon: '🔗',
    bg: '#E8F1FC',
    accent: T.blue,
    title: 'Browse referral deals',
    desc: 'Vouch curates the best referral offers from top Australian services — all in one place.',
  },
  {
    num: 'Step 02',
    icon: '📋',
    bg: T.yellowLight,
    accent: '#C8A200',
    title: 'Grab the referral link',
    desc: 'Each deal comes with a unique referral link. One tap to copy — no account needed.',
  },
  {
    num: 'Step 03',
    icon: '✅',
    bg: '#E6F7ED',
    accent: '#1B7A3A',
    title: 'Sign up & get rewarded',
    desc: 'Use the link to sign up to the service and unlock your bonus — automatically.',
  },
  {
    num: 'Step 04',
    icon: '🎉',
    bg: '#FDE8EF',
    accent: '#C0325C',
    title: 'Enjoy your reward',
    desc: 'Credits, cashback, free months — real rewards just for signing up the smart way.',
  },
];

const deals = [
  {
    brand: 'Finder',
    category: 'Finance',
    bg: '#0D47A1',
    title: 'Compare & save on bills',
    desc: 'Sign up to Finder using our referral link and earn bonus credits to use on your first comparison.',
    bonus: '$20 credit',
  },
  {
    brand: 'Boost Mobile',
    category: 'Telco',
    bg: '#D32F2F',
    title: 'Switch & save on mobile',
    desc: 'New Boost Mobile customers get a bonus data add-on when they join via Vouch.',
    bonus: '10GB bonus data',
  },
  {
    brand: 'Canstar Blue',
    category: 'Energy',
    bg: '#00796B',
    title: 'Find a better energy deal',
    desc: 'Compare energy plans and get a gift card reward when you switch through our link.',
    bonus: '$30 gift card',
  },
];

// ─── Page ─────────────────────────────────────────────────
export default function VouchHome() {
  return (
    <>
      <GlobalStyle />

      {/* Nav */}
      <Nav>
        <NavInner>
          <Logo>vouch<span /></Logo>
          <NavLinks>
            <li><NavLink href="#how">How it works</NavLink></li>
            <li><NavLink href="#deals">Deals</NavLink></li>
            <li><NavLink href="#about">About</NavLink></li>
            <li><NavCta href="#deals">Browse Deals →</NavCta></li>
          </NavLinks>
        </NavInner>
      </Nav>

      {/* Hero */}
      <HeroSection>
        <HeroInner>
          <div>
            <HeroBadge>Australia&apos;s #1 Referral Network</HeroBadge>
            <HeroHeading>
              Sign up smarter.<br />
              <em>Get rewarded.</em>
            </HeroHeading>
            <HeroDesc>
              Vouch finds the best referral deals from top Aussie services so you get more just for signing up. No gimmicks. Just real rewards.
            </HeroDesc>
            <HeroCtas>
              <BtnPrimary href="#deals">Browse deals →</BtnPrimary>
              <BtnSecondary href="#how">How it works</BtnSecondary>
            </HeroCtas>
          </div>

          {/* Referral card mockup */}
          <HeroVisual>
            <ReferralCard>
              <CardTop>
                <ServiceBadge $color={T.blue} $bg={T.blueLight}>
                  <div className="icon">📱</div>
                  Boost Mobile
                </ServiceBadge>
                <LiveTag>Live deal</LiveTag>
              </CardTop>

              <p style={{ fontSize: '0.85rem', color: T.grey600, marginBottom: '1rem', lineHeight: 1.5 }}>
                Sign up using the Vouch referral link and get 10GB of bonus data on your first month.
              </p>

              <CodeBox>
                <CodeText>VOUCH-BOOST-10</CodeText>
                <CopyBtn>Copy link</CopyBtn>
              </CodeBox>

              <MiniStat>
                <MiniStatItem>
                  <div className="val">3,241</div>
                  <div className="lbl">Used this deal</div>
                </MiniStatItem>
                <MiniStatItem>
                  <div className="val">10GB</div>
                  <div className="lbl">Bonus data</div>
                </MiniStatItem>
                <MiniStatItem>
                  <div className="val">Free</div>
                  <div className="lbl">No cost to join</div>
                </MiniStatItem>
              </MiniStat>
            </ReferralCard>
          </HeroVisual>
        </HeroInner>
      </HeroSection>

      {/* Stats */}
      <StatsBar>
        <StatsInner>
          <StatItem><div className="num">50+</div><div className="lbl">Live referral deals</div></StatItem>
          <StatItem><div className="num">120k+</div><div className="lbl">Aussies signed up</div></StatItem>
          <StatItem><div className="num">$2M+</div><div className="lbl">In rewards claimed</div></StatItem>
          <StatItem><div className="num">100%</div><div className="lbl">Free to use</div></StatItem>
        </StatsInner>
      </StatsBar>

      {/* How it works */}
      <HowSection id="how">
        <SectionInner>
          <SectionHeader>
            <SectionEyebrow>How it works</SectionEyebrow>
            <SectionTitle>Four simple steps to your reward</SectionTitle>
            <SectionSubtitle>
              No complicated sign-up process. Just find a deal, use the link, and collect your bonus.
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

      {/* Deals */}
      <DealsSection id="deals">
        <SectionInner>
          <SectionHeader>
            <SectionEyebrow>Featured deals</SectionEyebrow>
            <SectionTitle>Top referral deals right now</SectionTitle>
            <SectionSubtitle>
              Fresh deals updated regularly. All vetted by the Vouch team.
            </SectionSubtitle>
          </SectionHeader>

          <DealsGrid>
            {deals.map((d) => (
              <DealCard key={d.brand}>
                <DealHeader $bg={d.bg}>
                  <DealLogo>{d.brand}</DealLogo>
                  <DealCategory>{d.category}</DealCategory>
                </DealHeader>
                <DealBody>
                  <DealTitle>{d.title}</DealTitle>
                  <DealDesc>{d.desc}</DealDesc>
                  <DealFooter>
                    <DealBonus>
                      <div className="label">You get</div>
                      <div className="value">{d.bonus}</div>
                    </DealBonus>
                    <SignUpLink href="#">Sign up →</SignUpLink>
                  </DealFooter>
                </DealBody>
              </DealCard>
            ))}
          </DealsGrid>
        </SectionInner>
      </DealsSection>

      {/* Trust signals */}
      <TrustSection>
        <TrustGrid>
          <TrustItem><div className="icon">🇦🇺</div> Australian owned & operated</TrustItem>
          <TrustItem><div className="icon">🔒</div> No personal data sold</TrustItem>
          <TrustItem><div className="icon">✅</div> All deals verified by Vouch</TrustItem>
          <TrustItem><div className="icon">💸</div> Always free to use</TrustItem>
          <TrustItem><div className="icon">📞</div> Aussie support team</TrustItem>
        </TrustGrid>
      </TrustSection>

      {/* CTA Banner */}
      <CtaBanner>
        <CtaTitle>Ready to get rewarded?</CtaTitle>
        <CtaDesc>Join over 120,000 Australians already using Vouch to get more from the services they sign up to.</CtaDesc>
        <CtaBtn href="#deals">Browse all deals →</CtaBtn>
      </CtaBanner>

      {/* Footer */}
      <Footer>
        <FooterInner>
          <FooterLogo>vouch<span /></FooterLogo>
          <FooterLinks>
            <FooterLink href="#">About</FooterLink>
            <FooterLink href="#">Privacy Policy</FooterLink>
            <FooterLink href="#">Terms of Use</FooterLink>
            <FooterLink href="#">Contact</FooterLink>
          </FooterLinks>
        </FooterInner>
        <FooterInner style={{ paddingTop: 0 }}>
          <FooterCopy>
            © {new Date().getFullYear()} Vouch Pty Ltd. All rights reserved. ABN 00 000 000 000. Made with ❤️ in Australia.
          </FooterCopy>
        </FooterInner>
      </Footer>
    </>
  );
}
