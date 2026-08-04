import { Deals } from "@/assets/dealsFunction/deals";
import { DEAL_T } from "@/assets/types/DEAL_T";
import { createTool } from "@mastra/core/tools";
import { z } from "zod";

export const dealTool = createTool({
  id: "find-deal",
  description: "Find a deal",
  inputSchema: z.object({
    dealType: z.string().describe("Deal category"),
  }),
  outputSchema: z.object({
    deals: z.array(
      z.object({
        payoutEstimate: z.number(),
        dealCategory: z.string(),
        dealInstructions: z.object({
          instructions: z.array(z.string()),
          initialDeposit: z.number(),
        }),
        link: z.string(),
        referral_code: z.string().nullable(),
      }),
    ),
  }),
  execute: async (inputData) => {
    return await getDeal(inputData.dealType);
  },
});

async function getDeal(dealType: string) {
  const deals: DEAL_T[] = await Deals();

  const matchingDeals = deals.filter((d) => d.category == "internet");

  console.log("----------------------------------------");
  console.log(matchingDeals);
  console.log("----------------------------------------");
  if (matchingDeals.length === 0) {
    return {
      deals: [],
      message: `No deals found for "${dealType}". Do not retry with a different value; summarize what's available instead.`,
    };
  }

  return {
    deals: matchingDeals.map((deal) => ({
      payoutEstimate: deal.payout_estimate,
      dealCategory: deal.category,
      dealInstructions: {
        instructions: deal.requirements.instructions,
        initialDeposit: deal.requirements.initial_deposit,
      },
      link: deal.link,
      referral_code: deal.referral_code,
    })),
  };
}
