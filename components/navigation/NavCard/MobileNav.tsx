"use client";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import styles from "./NavBar.module.css";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export function MobileNav({ isUser }: { isUser: boolean }) {
  const pathname = usePathname();

  return (
    <nav className={styles.navbar}>
      <input
        type="checkbox"
        id="nav-toggle"
        className={styles.menuToggleInput}
      />
      <div className={styles.navInner}>
        <Link href="/" className={styles.logo}>
          vouch
          <span className={styles.logoDot} />
        </Link>

        <label htmlFor="nav-toggle" className={styles.menuToggleLabel}>
          <Menu size={28} className={styles.menuIcon} />
          <X size={28} className={styles.xIcon} />
        </label>

        <ul className={styles.navLinks}>
          <Link href="/#how">How it works</Link>

          {isUser ? (
            <>
              <Link
                href="/community-deals"
              >
                Community deals
              </Link>
              <Link href="/post-deal">Post deals</Link>
            </>
          ) : (
            <Link href="/register">Register</Link>
          )}
          <Link href="/blogs">
            Blogs
          </Link>
          <Link href="/deals" className={styles.cta}>
            Browse Smart Deals
          </Link>
          
        </ul>
      </div>
    </nav>
  );
}
