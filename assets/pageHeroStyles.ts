"user client"
import styled from "styled-components";
import { fadeUp, shimmer } from "./animations";
import { T } from "./colors";

// ─── Hero strip ───────────────────────────────────────────
export const PageHero = styled.div`
  background: ${T.navy};
  padding: 3rem 2rem 0;
  position: relative;
  overflow: hidden;
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse at 80% 50%,
      rgba(0, 100, 210, 0.25) 0%,
      transparent 60%
    );
    pointer-events: none;
  }
`;


export const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
export const PageHeroInner = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;
export const PageHeroTop = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  padding-bottom: 2rem;
`;
export const PageHeroText = styled.div``;
export const Breadcrumb = styled.p`
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.45);
  margin-bottom: 0.6rem;
  font-weight: 500;
  a {
    color: rgba(255, 255, 255, 0.45);
    text-decoration: none;
    &:hover {
      color: rgba(255, 255, 255, 0.7);
    }
  }
`;
export const PageTitle = styled.h1`
  font-family: "Bricolage Grotesque", sans-serif;
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 800;
  color: #fff;
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin-bottom: 0.6rem;
  animation: ${fadeUp} 0.6s ease both;
`;
export const PageSubtitle = styled.p`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.95rem;
  animation: ${fadeUp} 0.6s 0.1s ease both;
`;

// ─── Hero ─────────────────────────────────────────────────
export const HeroSection = styled.section`
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
export const PageBody = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2.5rem 2rem 5rem;
`;
export const SubmitBtn = styled.button`
  width: 100%;
  margin-top: 8px;
  background: ${T.yellow};
  color: ${T.navy};
  border: none;
  border-radius: 10px;
  padding: 13px;
  font-family: "DM Sans", sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition:
    background 0.2s,
    transform 0.15s;
  &:hover {
    background: #e6bb00;
    transform: translateY(-1px);
  }
  &:disabled {
    background: ${T.grey200};
    color: ${T.grey400};
    cursor: default;
    transform: none;
  }
`;
export const CloseBtn = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: ${T.grey100};
  border: 1px solid ${T.grey200};
  color: ${T.grey400};
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;
  &:hover {
    background: ${T.grey200};
    color: ${T.navy};
  }
`;

export const HeroInner = styled.div`
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

export const HeroBadge = styled.div`
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

export const HeroHeading = styled.h1`
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

export const HeroDesc = styled.p`
  font-size: 1.05rem;
  color: ${T.grey600};
  line-height: 1.7;
  max-width: 480px;
  margin-bottom: 2rem;
  font-weight: 400;
  animation: ${fadeUp} 0.7s 0.2s ease both;
`;

export const HeroCtas = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  animation: ${fadeUp} 0.7s 0.3s ease both;
`;

export const HeroVisual = styled.div`
  animation: ${fadeUp} 0.7s 0.35s ease both;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;