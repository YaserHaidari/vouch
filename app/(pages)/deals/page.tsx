import { Suspense } from "react";
import styled from "styled-components";
import { supabase } from "@/utils/supabase/client";
import { DealCardComponent } from "@/components/DealCard/dealcard";
import { T } from "@/assets/colors";
import { NavCard } from "@/components/navigation/NavCard/navcard";
import {
  PageHero,
  PageHeroInner,
  PageHeroTop,
  PageHeroText,
  Breadcrumb,
  PageTitle,
  PageSubtitle,
} from "@/assets/pageHeroStyles";
import { TabBarFilter } from "@/components/TabBarFilter/TabBarFilter";
import { Metadata } from "next";
import { Deals } from "@/assets/dealsFunction/deals";
import { DEAL_T } from "@/assets/types/DEAL_T";
import { DealsClient } from "@/components/DealsClient/dealsClient";
import Loading from "./loading";
import Link from "next/link";

export const metadata: Metadata = {
  title: "All Deals",
  description: "Vetted offers from Australia's best services. Updated weekly.",
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