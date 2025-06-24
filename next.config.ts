import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/leaderboard/builders',
        destination: 'https://api.hunknownz.xyz:2096/leaderboard/builders',
      },
      {
        source: '/api/leaderboard/builders/:path*',
        destination: 'https://api.hunknownz.xyz:2096/leaderboard/builders/:path*',
      },
    ];
  },
};

export default nextConfig;
