import "server-only";
import Link from "next/link";
import { CSSProperties, Suspense } from "react";
import { Metadata } from "next";
import { steps } from "@/assets/data/steps";
import StatisticsBanner from "@/components/StatisticBanner/statsbanner";
import PopularDeals from "@/components/PopularDeals/popdeals";
import "./styles.css";
import '@/assets/colors/colors.css'



export const metadata: Metadata = {
  title: "Vouch - Smart Deals & Rewards Australia",
  description:
    "Join Australia's #1 smart saving community. Discover the best deals, exclusive offers, and top referral rewards to help you save money on everyday bills. Vouch finds and vets the smartest ways for you to earn and save as the cost of living rises.",
  keywords: [
    "smart deals",
    "Australia deals",
    "save money",
    "cashback",
    "referral rewards",
    "discounts",
    "bills",
    "exclusive offers",
    "sign up bonuses",
    "cost of living",
  ],
  openGraph: {
    title: "Vouch - Smart Deals & Rewards Australia",
    description:
      "Discover the best deals, exclusive offers, and referral rewards in Australia. Save money and earn rewards with Vouch.",
    url: "https://vouch.net.au/",
    images: [
      {
        url: "/logo.svg",
        width: 1200,
        height: 630,
        alt: "Vouch Logo and Smart Deals",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vouch - Smart Deals & Rewards Australia",
    description:
      "Discover the best deals, exclusive offers, and referral rewards in Australia. Save money and earn rewards with Vouch.",
    images: ["/logo.svg"],
    site: "@vouchau",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
    },
  },
};

export const dynamic = "force-dynamic";

export default function VouchHome() {
  return (
    <>
      {/* Hero */}
      <section className="hero-section">
        <div className="hero-inner">
          <div>
            <span className="hero-badge">
              Australia&apos;s #1 Smart Saving Community
            </span>
            <h1 className="hero-heading">
              Sign up smarter.
              <br />
              <em>Get rewarded.</em>
            </h1>
            <p className="hero-desc">
              It’s exhausting watching the cost of living climb, so we’re here
              to help you reclaim your money by finding you deals, cashback,
              exclusive rewards on your everyday bills and to help you avoid
              loyalty tax.
            </p>
            <div className="hero-ctas">
              <Link href="/deals" className="btn-primary">
                Browse Deals →
              </Link>
              <Link href="/#how" className="btn-secondary">
                How it works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <Suspense
        fallback={
          <div className="stats-skeleton">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="stats-skeleton-item">
                <div className="stats-skeleton-num" />
                <div className="stats-skeleton-label" />
              </div>
            ))}
          </div>
        }
      >
        <StatisticsBanner />
      </Suspense>

      {/* How it works */}
      <section id="how" className="how-section">
        <div className="section-inner">
          <div className="section-header">
            <span className="section-eyebrow">How it works</span>
            <h2 className="section-title">Four simple steps to your reward</h2>
            <p className="section-subtitle">
              We scout the best deals so you don’t have to. Simply use our link,
              follow the quick instructions, and collect your reward. Need a
              hand? Contact our support team anytime.
            </p>
          </div>

          <div className="steps-grid">
            {steps.map((s) => (
              <div
                key={s.num}
                className="step-card"
                style={
                  {
                    "--accent": s.accent,
                    "--icon-bg": s.bg,
                  } as CSSProperties
                }
              >
                <div className="step-number">{s.num}</div>
                <div className="step-icon">{s.icon}</div>
                <h3 className="step-title">{s.title}</h3>
                <p className="step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deals Section */}
      <section id="deals" className="deals-section">
        <div className="section-inner">
          <div className="section-header">
            <span className="section-eyebrow">Featured deals</span>
            <h2 className="section-title">Top deals right now</h2>
            <p className="section-subtitle">
              Fresh deals updated regularly. All vetted by the Vouch team.
            </p>
          </div>
        </div>

        <Suspense fallback={<h1>Loading</h1>}>
          <PopularDeals />
        </Suspense>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <h2 className="cta-title">Ready to get rewarded?</h2>
        <p className="cta-desc">
          Before you sign up to any new service, check out our special deals
          first.
        </p>
        <Link href="/deals" className="cta-btn">
          Browse Smart Deals →
        </Link>
      </section>
    </>
  );
}