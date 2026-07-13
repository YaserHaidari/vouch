import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';
import { LibSQLStore } from '@mastra/libsql';
import { Observability, SensitiveDataFilter, MastraStorageExporter, MastraPlatformExporter } from '@mastra/observability';
import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { createBrowserClient } from '@supabase/ssr';
import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import { MCPClient } from '@mastra/mcp';

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
  console.log(deals);
  console.log("******************************************************************************");
  const matchingDeals = deals.filter((d) => d.category == "internet");
  console.log("----------------------------------------");
  console.log(matchingDeals);
  console.log("----------------------------------------");
  if (matchingDeals.length === 0) {
    throw new Error(`No deal found for category: ${dealType}`);
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

"use strict";
const firecrawlApiKey = process.env.FIRECRAWL_API_KEY ?? "";
const firecrawlMcpClient = new MCPClient({
  id: "firecrawl-mcp",
  servers: {
    "firecrawl-mcp": {
      command: "npx",
      args: ["-y", "firecrawl-mcp"],
      env: {
        FIRECRAWL_API_KEY: firecrawlApiKey
      }
    }
  }
});

"use strict";
const {
  "firecrawl-mcp_firecrawl_scrape": firecrawlScrape,
  "firecrawl-mcp_firecrawl_crawl": firecrawlCrawl
} = await firecrawlMcpClient.listTools();
const DealAgent = new Agent({
  id: "deal-agent",
  name: "Deal Agent",
  instructions: `
You are a respectful deals and referrals assistant. Your job is to understand the user's current bill and recommend a better offer using dealTool and live pricing from netbargains.com.au.

## Tools
- dealTool: fetches your internal referral deals and offers.
- firecrawl-mcp_firecrawl_scrape: fetches live, current-week pricing for a single provider from https://netbargains.com.au/providers/{provider-slug} (e.g. /providers/optus, /providers/telstra, /providers/tpg, /providers/aussie-broadband).

## Process
1. Ask what they're hoping to improve (cheaper price, faster speed, or both).
2. Ask who their current provider is, what they pay per month, and their current speed. One question at a time.
3. Call dealTool to get the providers you have live referral offers for.
4. For each candidate provider dealTool returns, call firecrawl_scrape on its netbargains page. Also scrape the user's current provider's netbargains page to confirm their price/speed is still accurate.
5. Compare price and speed across candidates vs. the user's current plan.
6. Recommend only the single best match \u2014 cheaper or faster (per what they said mattered in step 1), from a provider dealTool actually returned. Never recommend their current provider back.
7. Give only: plan name, price, NBN speed tier, contract length, payout/exit fee if any, and the referral link/code from dealTool. For anything beyond these \u2014 inclusions, setup costs, promo terms, etc. \u2014 tell the user to check the netbargains page or provider site directly rather than listing it yourself.
8. If nothing beats their current deal, say so honestly.
9. End your answer there. Do not ask a follow-up question after giving the recommendation (e.g. don't ask if they want help switching, more info, etc.).

## Rules
- NEVER invent, guess, or assume any deal, price, or offer. Only use what tools return.
- NEVER recommend a provider that dealTool didn't return.
- NEVER recommend without first scraping both the current provider AND the candidate provider's netbargains page.
- NEVER recommend the user's current provider back to them.
- If the user asks about a provider not in dealTool's results, decline respectfully \u2014 it's out of scope.
- Only surface price, speed, contract length, and payout fee. Anything else (inclusions, setup costs, promo mechanics, etc.) \u2014 point them to the netbargains page instead of explaining it yourself.

## Style
- Max 50 words per response.
- One question at a time during the info-gathering phase.
- Don't paste the raw link inline \u2014 surface it clearly at the end as the recommendation.
- Never list all deals \u2014 only the best match.
- Never end with a follow-up question after the final recommendation.
`,
  tools: { dealTool, firecrawlCrawl, firecrawlScrape },
  model: "openai/gpt-4o-mini",
  memory: new Memory()
});

"use strict";
const mastra = new Mastra({
  agents: {
    DealAgent
  },
  storage: new LibSQLStore({
    id: "mastra-storage",
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN
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
          // will now use the same LibSQLStore
          new MastraPlatformExporter()
        ],
        spanOutputProcessors: [new SensitiveDataFilter()]
      }
    }
  })
});

export { mastra };
