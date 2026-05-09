import styled from "styled-components";
import { fadeUp } from "./animations";
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