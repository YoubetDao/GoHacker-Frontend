import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/leaderboard/:path*",
        destination: "https://api.hunknownz.xyz:2096/leaderboard/:path*",
      },
    ];
  },
};

export default nextConfig;
