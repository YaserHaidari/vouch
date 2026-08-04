import { createBrowserClient } from '@supabase/ssr';
import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      flowType: "pkce"
    }
  }
);

const Deals = async () => {
  const { data, error } = await supabase.from("deals").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data.filter(
    (d) => new Date(d.offer_expiry_date).getTime() > Date.now()
  );
};

const dealTool = createTool({
  id: "find-deal",
  description: "Find a deal",
  inputSchema: z.object({
    dealType: z.string().describe("Deal category")
  }),
  outputSchema: z.object({
    deals: z.array(
      z.object({
        payoutEstimate: z.number(),
        dealCategory: z.string(),
        dealInstructions: z.object({
          instructions: z.array(z.string()),
          initialDeposit: z.number()
        }),
        link: z.string(),
        referral_code: z.string().nullable()
      })
    )
  }),
  execute: async (inputData) => {
    return await getDeal(inputData.dealType);
  }
});
async function getDeal(dealType) {
  const deals = await Deals();
  const matchingDeals = deals.filter((d) => d.category == "internet");
  console.log("----------------------------------------");
  console.log(matchingDeals);
  console.log("----------------------------------------");
  if (matchingDeals.length === 0) {
    return {
      deals: [],
      message: `No deals found for "${dealType}". Do not retry with a different value; summarize what's available instead.`
    };
  }
  return {
    deals: matchingDeals.map((deal) => ({
      payoutEstimate: deal.payout_estimate,
      dealCategory: deal.category,
      dealInstructions: {
        instructions: deal.requirements.instructions,
        initialDeposit: deal.requirements.initial_deposit
      },
      link: deal.link,
      referral_code: deal.referral_code
    }))
  };
}

export { dealTool };
