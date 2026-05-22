
import styled from "styled-components";
import { T } from "./colors";

export const TabBar = styled.div`
  display: flex;
  gap: 0;
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  margin-top: 0.5rem;
`;
export const Tab = styled.button<{ $active: boolean }>`
  flex-shrink: 0;
  background: none;
  border: none;
  cursor: pointer;
  font-family: "DM Sans", sans-serif;
  font-size: 0.88rem;
  font-weight: ${(p) => (p.$active ? "600" : "500")};
  color: ${(p) => (p.$active ? T.yellow : "rgba(255,255,255,0.55)")};
  padding: 0.9rem 1.3rem;
  border-bottom: 2px solid ${(p) => (p.$active ? T.yellow : "transparent")};
  transition:
    color 0.2s,
    border-color 0.2s;
  white-space: nowrap;
  &:hover {
    color: ${(p) => (p.$active ? T.yellow : "rgba(255,255,255,0.85)")};
  }
`;


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