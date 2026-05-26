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

export const metadata: Metadata = {
  title: "All Deals",
  description: "Vetted offers from Australia's best services. Updated weekly.",
};

export default async function DealsPage() {
  const deals = (await Deals()) || [];
  const count = deals.filter(d => d.status === "active").length;

  return (
    <>
      {/* <NavCard /> */}
      <DealsClient dealNote="All Smart Deals" deals={deals} count={count} />
    </>
  );
}