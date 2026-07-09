import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';
import { LibSQLStore } from '@mastra/libsql';
import { DuckDBStore } from '@mastra/duckdb';
import { MastraCompositeStore } from '@mastra/core/storage';
import { Observability, SensitiveDataFilter, MastraStorageExporter, MastraPlatformExporter } from '@mastra/observability';
import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { createBrowserClient } from '@supabase/ssr';
import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

"use strict";
const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      flowType: "pkce"
    }
  }
);

"use strict";
const Deals = async () => {
  const { data, error } = await supabase.from("deals").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data.filter(
    (d) => new Date(d.offer_expiry_date).getTime() > Date.now()
  );
};

"use strict";
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
        referral_code: z.string()
      })
    )
  }),
  execute: async (inputData) => {
    return await getDeal(inputData.dealType);
  }
});
async function getDeal(dealType) {
  const deals = await Deals();
  console.log(deals);
  const matchingDeals = deals.filter((d) => d.category === dealType);
  console.log(matchingDeals);
  if (matchingDeals.length === 0) {
    throw new Error(`No deal found for category: ${dealType}`);
  }
  console.log(matchingDeals);
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

"use strict";
const DealAgent = new Agent({
  id: "deal-agent",
  name: "Deal Agent",
  instructions: `
  You are a respectful deals and referrals assistant. Your job is to understand user's current bill structure and recommend offers that you have access too via dealTool.

  ## Tools
  - dealTool: fetches your internal referral deals and offers.making any comparison.

  ## Example Conversation regarding internet
  user: I'm looking for a good deal on internet.
  assistant: Who is your current provider?
  user: I'm with Telstra.
  assistant: How much do you pay to your current provider?
  user: I pay $99 and I want to find something cheaper.
  assistant: [calls dealTool to fetch available referral offers]
  assistant: Aussie Broadband has a $79/month NBN 50 plan \u2014 faster and $11 cheaper than your current Telstra plan. Want the referral link?

  ## Rules
- NEVER invent, guess, or assume any deal, price, or offer. Only use what your tools return.
- NEVER make a recommendation without first scraping the user's current provider's pricing page.
- NEVER make a recommendation without first calling dealTool to retrieve available offers.
- NEVER recommend the user's current provider back to them.
- ALWAYS ask who their current provider is before doing anything else.
- ALWAYS use the providers that you recieve from dealTool
- if user asks about a provider that is not part of dealTool respond in respectful manner that it is out of your scope.
## Process
1. Ask who their current provider is and what they currently pay.
2. Ask one clarifying question at a time to understand their needs (speed, budget, contract preference).
3. Once you have enough context:
   b. Call dealTool to get available referral deals.
4. Compare the two and recommend the best match for the user's needs.
5. Provide user with the [link] to the following deal & the referral code
6. If no deal is better than what they have, say so honestly.

## Style
- Don't include the link as part of word. Max 50 words per response.
- Ask one question at a time.
- Never list all deals \u2014 only surface the best match.`,
  tools: { dealTool },
  model: "openai/gpt-4o",
  memory: new Memory()
});

"use strict";
const mastra = new Mastra({
  agents: {
    DealAgent
  },
  storage: new MastraCompositeStore({
    id: "composite-storage",
    default: new LibSQLStore({
      id: "mastra-storage",
      url: "file:./mastra.db"
    }),
    domains: {
      observability: await new DuckDBStore().getStore("observability")
    }
  }),
  logger: new PinoLogger({
    name: "Mastra",
    level: "info"
  }),
  observability: new Observability({
    configs: {
      default: {
        serviceName: "mastra",
        exporters: [
          new MastraStorageExporter(),
          // Persists observability events to Mastra Storage
          new MastraPlatformExporter()
          // Sends observability events to Mastra Platform (if MASTRA_PLATFORM_ACCESS_TOKEN is set)
        ],
        spanOutputProcessors: [
          new SensitiveDataFilter()
          // Redacts sensitive data like passwords, tokens, keys
        ]
      }
    }
  })
});

export { mastra };
