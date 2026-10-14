import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
