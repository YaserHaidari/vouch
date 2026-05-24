"use client"
import Link from "next/link";
import {  Menu, X } from "lucide-react";
import styles from "./NavBar.module.css";
import Image from "next/image";

export function MobileNav({ isUser }: { isUser: boolean }) {
  return (
    <nav className={styles.navbar}>
      <input type="checkbox" id="nav-toggle" className={styles.menuToggleInput} />
      <div className={styles.navInner}>
        <div className={styles.logo}>
           <Link href={"/"}><Image src={"/logo.svg"} loading={"eager"} width={120} height={120} alt="Logo"/></Link>
          <span />
        </div>

        <label htmlFor="nav-toggle" className={styles.menuToggleLabel}>
          <Menu size={28} className={styles.menuIcon} />
          <X size={28} className={styles.xIcon} />
        </label>

        <ul className={styles.navLinks}>
          <li><Link href="/#how">How it works</Link></li>
          <li>
            {isUser ? (
              <Link href="/community-deals">Community deals</Link>
            ) : (
              <Link href="/register">Register</Link>
            )}
          </li>
          <li><Link href="/deals">Deals</Link></li>
          <li>
            <Link href="/deals" className={styles.cta}>
              Browse Deals →
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}