"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import styles from "./NavBar.module.css";

export function MobileNav({ isUser }: { isUser: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navInner}>
        <Link href="/" className={styles.logo} onClick={close}>
          vouch
          <span className={styles.logoDot} />
        </Link>

        <button
          className={styles.menuToggleLabel}
          onClick={() => setIsOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        <ul className={`${styles.navLinks} ${isOpen ? styles.navOpen : ""}`}>
          <Link href="/#how" onClick={close}>
            How it works
          </Link>

          {isUser ? (
            <>
              <Link href="/community-deals" onClick={close}>
                Community deals
              </Link>
              <Link href="/post-deal" onClick={close}>
                Post deals
              </Link>
            </>
          ) : (
            <Link href="/register" onClick={close}>
              Register
            </Link>
          )}
          <Link href="/blogs" onClick={close}>
            Blogs
          </Link>
          <Link href="/referrals" onClick={close}>
            Referrals
          </Link>

          <Link href="/deals" className={styles.cta} onClick={close}>
            Browse Smart Deals
          </Link>
        </ul>
      </div>
    </nav>
  );
}
