"use client"
import styled from "styled-components";
import { T } from "@/assets/colors";
import { pulse } from "@/assets/animations";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { Menu, X } from "lucide-react"; // Install lucide-react if you haven't

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
  z-index: 101; /* Stay above mobile menu */

  a { text-decoration: none; color: inherit; }

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

// Updated NavLinks to handle mobile state
const NavLinks = styled.ul<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: 2rem;
  list-style: none;

  @media (max-width: 768px) {
    display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    top: 68px;
    left: 0;
    width: 100%;
    background: white;
    padding: 2rem;
    border-bottom: 1px solid ${T.grey200};
    gap: 1.5rem;
  }
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

const MobileToggle = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: ${T.navy};
  z-index: 101;

  @media (max-width: 768px) {
    display: block;
  }
`;

export function NavCard() {
  const [isUser, setIsUser] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    const { data: { user } } = await supabase.auth.getUser();
    setIsUser(!!user);
    setIsLoading(false);
  }

  if (isLoading) return null;

  return (
    <Nav>
      <NavInner>
        <Logo>
          <a href="/">vouch</a>
          <span />
        </Logo>

        <MobileToggle onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </MobileToggle>

        <NavLinks $isOpen={isOpen}>
          <li><NavLink href="/#how">How it works</NavLink></li>
          {!isUser ? (
            <li><NavLink href="/register">Register</NavLink></li>
          ) : (
            <li><NavLink href="/community-deals">Community deals</NavLink></li>
          )}
          <li><NavLink href="/deals">Deals</NavLink></li>
          <li><NavCta href="/deals">Browse Deals →</NavCta></li>
        </NavLinks>
      </NavInner>
    </Nav>
  );
}