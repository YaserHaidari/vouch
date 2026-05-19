import styled from "styled-components";
import { T } from "./colors";

export const CopyBtn = styled.button`
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

export const BtnPrimary = styled.a`
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

export const BtnSecondary = styled.a`
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

export const CtaBtn = styled.a`
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