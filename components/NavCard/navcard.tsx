
"use client"
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { T } from "@/assets/colors";
import { pulse, fadeUp, float, shimmer } from "@/assets/animations";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";

const Nav = styled.nav`
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.95);
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
  font-family: "Bricolage Grotesque", sans-serif;
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

  @media (max-width: 640px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: ${T.grey600};
  text-decoration: none;
  font-size: 0.92rem;
  font-weight: 500;
  transition: color 0.2s;
  &:hover {
    color: ${T.navy};
  }
`;

const NavCta = styled.a`
  background: ${T.blue};
  color: #fff;
  padding: 0.55rem 1.3rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  transition:
    background 0.2s,
    transform 0.15s;
  &:hover {
    background: #004fb0;
    transform: translateY(-1px);
  }
`;

export function NavCard() {
  const [isUser, setIsUser] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser(): Promise<boolean> {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setIsLoading(false);
    if (user) {
      setIsUser(true);
      return true;
    } else {
      setIsUser(false);
      return false;
    }
  }
  return isLoading ? (
    <></>
  ) : (
    <Nav>
      <NavInner>
        <Logo>
          vouch
          <span />
        </Logo>
        <NavLinks>
          <li>
            <NavLink href="/#how">How it works</NavLink>
          </li>
          {!isUser ? (
            <li>
              <NavLink href="/register">Register </NavLink>
            </li>
          ) : (
            <>
              <li>
                <NavLink href="/community">Community deals</NavLink>
              </li>
            </>
          )}
          <li>
            <NavLink href="/deals">Deals</NavLink>
          </li>
          <li>
            <NavCta href="#deals">Browse Deals →</NavCta>
          </li>
        </NavLinks>
      </NavInner>
    </Nav>
  );
}
