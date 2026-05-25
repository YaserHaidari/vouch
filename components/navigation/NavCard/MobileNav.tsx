"use client";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import styles from "./NavBar.module.css";
import Image from "next/image";
import styled from "styled-components";
import { T } from "@/assets/colors";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";

const FooterLogo = styled.div`
  font-family: "Bricolage Grotesque", sans-serif;
  font-weight: 800;
  font-size: 1.4rem;
  color: #000;
  display: flex;
  align-items: center;
  gap: 6px;

  span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${T.yellow};
    display: inline-block;
  }
`;

export function MobileNav({ isUser }: { isUser: boolean }) {

  return (
    <nav className={styles.navbar}>
      <input
        type="checkbox"
        id="nav-toggle"
        className={styles.menuToggleInput}
      />
      <div className={styles.navInner}>
        <FooterLogo>
          <a href="/">vouch</a>
          <span></span>
        </FooterLogo>

        <label htmlFor="nav-toggle" className={styles.menuToggleLabel}>
          <Menu size={28} className={styles.menuIcon} />
          <X size={28} className={styles.xIcon} />
        </label>

        <ul className={styles.navLinks}>
          <li>
            <Link href="/#how">How it works</Link>
          </li>
          <li>
            {isUser ? (
              <Link href="/community-deals">Community deals</Link>
            ) : (
              <Link href="/register">Register</Link>
            )}
          </li>
          <li>
            <Link href="/deals" className={styles.cta}>
              Browse Smart Deals →
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
