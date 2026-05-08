import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  compiler: {
    styledComponents: true,
  },
  output: 'export',
  trailingSlash: true
};

export default nextConfig;
