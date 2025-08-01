import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/v1/ranks/developers",
        destination: "http://43.130.247.176:5200/v1/ranks/developers",
      },
      {
        source: "/api/leaderboard/:path*",
        destination: "https://api.hunknownz.xyz:2096/leaderboard/:path*",
      },
      {
        source: "/api/yapper/:path*",
        destination: "https://api.hunknownz.xyz:2096/yapper/:path*",
      },
      {
        source: "/api/ecosystem/:path*",
        destination: "https://api.hunknownz.xyz:2096/ecosystem/:path*",
      },
      {
        source: "/api/geneses/:path*",
        destination: "https://api.hunknownz.xyz:2096/geneses/:path*",
      },
      {
        source: "/v1/applications",
        destination: "http://43.130.247.176:5200/v1/applications",
      },
      {
        source: "/v1/:path*",
        destination: "http://43.130.247.176:5200/:path*",
      },
    ];
  },
};

export default nextConfig;
