import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  compiler: {
    styledComponents: true,
  },
  serverExternalPackages: [
      '@mastra/duckdb',
    '@duckdb/node-api',
    '@duckdb/node-bindings',
  ],
  // output: 'export',
  trailingSlash: true,
  allowedDevOrigins: ['192.168.0.12'],
};

export default nextConfig;
