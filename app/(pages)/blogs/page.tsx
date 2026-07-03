import "server-only";
import Link from "next/link";
import styles from "./blog.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  keywords: [
    "bills",
    "NBN",
    "AGL energy",
    "Telstra NBN",
    "best internet provider near me",
    "cheap electricity Australia",
    "energy comparison Australia",
    "save money on bills",
    "cheapest energy supplier",
    "reduce electricity bill",
  ],
  title: "Stop Overpaying: How to Slash Your Energy & Internet Bills | [Vouch]",
  description:
    "Everyday Australians are overpaying on electricity and internet. Learn how to compare energy providers, churn NBN plans, and cut hundreds from your bills each year.",
  robots: {
    index: true,
    follow: true,
  },
};

export default async function Blogs() {
  const blogSummary = [
    {
      title: "Saving money on utility bills",
      id: 1,
      summary:
        "Slash bills without sacrificing comfort. Learn to optimise energy habits, switch providers to avoid loyalty taxes, and secure better deals. Read more to find out how to start saving today..",
    },
    {
      title: "The Honest Guide to Making Side Cash with Uber in Australia",
      id: 2,
      summary:
        "Turn spare evenings into real income without a second job. Learn how to stack bonus pay, Quests, and a $1,000 sign-up bonus to make Uber worth your time. Read more to see if it's right for you.",
    },
  ];

  return (
    <div className={styles.page}>
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          Australia's #1 Smart Saving Community
        </div>
        <h1 className={styles.heroTitle}>
          Smart reads.{" "}
          <span className={styles.heroTitleAccent}>Smarter savings.</span>
        </h1>
        <p className={styles.heroSubtitle}>
          Tips, guides, and insights to help you keep more of your money — on
          everything from bills to investing.
        </p>
      </div>

      {/* Blog Cards */}
      <div className={styles.grid}>
        {blogSummary.map((item, index) => (
          <div key={item.id} className={styles.card}>
            <span className={styles.cardNumber}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <h2 className={styles.cardTitle}>
              <Link href={`/blogs/${item.id}`}>{item.title}</Link>
            </h2>
            <p className={styles.cardSummary}>{item.summary}</p>
            <Link href={`/blogs/${item.id}`} className={styles.readMore}>
              Read more
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
