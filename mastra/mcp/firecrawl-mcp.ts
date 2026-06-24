import { MCPClient } from "@mastra/mcp";

const firecrawlApiKey = process.env.FIRECRAWL_API_KEY ?? ''

export const firecrawlMcpClient = new MCPClient({
    id: "firecrawl-mcp",
    servers: {
        "firecrawl-mcp": {
      command: "npx",
      args: ["-y", "firecrawl-mcp"],
      env: {
                FIRECRAWL_API_KEY: firecrawlApiKey,
            },
        },
    },
});