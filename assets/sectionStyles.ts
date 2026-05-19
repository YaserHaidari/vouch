import styled from "styled-components";
import { T } from "./colors";


export const HowSection = styled.section`
  background: ${T.grey50};
  padding: 5rem 2rem;
`;

export const SectionInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3.5rem;
`;

export const SectionEyebrow = styled.p`
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${T.blue};
  margin-bottom: 0.75rem;
`;

export const SectionTitle = styled.h2`
  font-family: "Bricolage Grotesque", sans-serif;
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 800;
  color: ${T.navy};
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin-bottom: 0.8rem;
`;

export const SectionSubtitle = styled.p`
  color: ${T.grey600};
  font-size: 1rem;
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.6;
`;