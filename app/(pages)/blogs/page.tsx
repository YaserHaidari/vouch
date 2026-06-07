import "server-only"
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
  const blogs = [
    {
      title: "Saving money on utility bills",
      id: 1,
      summary:
        "Discover practical strategies to cut your electricity, gas, and water costs without sacrificing comfort. We break down the best deals available right now.",
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
        {blogs.map((item, index) => (
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