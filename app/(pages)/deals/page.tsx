import { Suspense } from "react";
import {
  PageHero,
  PageHeroInner,
  PageHeroTop,
  PageHeroText,
  Breadcrumb,
  PageTitle,
  PageSubtitle,
} from "@/assets/pageHeroStyles";
import { Metadata } from "next";
import { Deals } from "@/assets/dealsFunction/deals";
import { DealsClient } from "@/components/DealsClient/dealsClient";
import Link from "next/link";

export const metadata: Metadata = {
  title: "All Smart Deals & Referrals",
  description: "From discounted utility bills and exclusive service offers to top-rated referral programs, Vouch smart deals help you save money and discover new ways to earn. Whether you're looking for the best rates on everyday essentials or want to benefit from sharing trusted services with friends, our curated deals and referral opportunities are designed to maximize your savings and rewards. Start browsing and unlock the smartest ways to save and earn today!",
  keywords: [
    "smart deals", "referrals", "discounts", "cashback", "Australia", "save money", "earn rewards", "utility bills", "exclusive offers", "ozbargain"
  ],
  openGraph: {
    title: "All Smart Deals & Referrals",
    description: "Discover the best deals and referral programs in Australia. Save money and earn rewards with Vouch.",
    url: "https://vouch.net.au/deals",
    images: [{ url: "https://vouch.net.au/loog.svg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "All Smart Deals & Referrals",
    description: "Discover the best deals and referral programs in Australia. Save money and earn rewards with Vouch.",
    images: ["https://vouch.net.au/logo.svg"],
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
export function Deader(){
  return(
    <PageHero style={{ paddingBottom: "0" }}>
        <PageHeroInner>
          <PageHeroTop>
            <PageHeroText>
              <Breadcrumb><Link href="/">Home</Link> / Deals</Breadcrumb>
              <PageTitle>{"dealNote"}</PageTitle>
              <PageSubtitle>Vetted offers from Australia's best services. Updated weekly.</PageSubtitle>
            </PageHeroText>
          </PageHeroTop>
        </PageHeroInner>
      </PageHero>
  )
}
export default async function DealsPage() {
  const deals = (await Deals()) || [];
  const count = deals.filter(d => d.status === "active").length;

  return (
    <>
      {/* <NavCard /> */}
      <Suspense fallback={<Deader/>}>
      <DealsClient dealNote="All Smart Deals" deals={deals} count={count} />

      </Suspense>
    </>
  );
}