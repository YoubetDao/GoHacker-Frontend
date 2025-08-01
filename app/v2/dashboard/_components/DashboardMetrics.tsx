"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Activity,
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { EcosystemInfo, TokenData, getEcosystemInfo } from "@/service";
import { useRouter } from "next/navigation";

const metrics = [
  {
    title: "Total Success Launched",
    key: "totalGenesesProjects",
    icon: Activity,
  },
  {
    title: "Total Geneses Market Cap",
    key: "totalGenesesMarketCapUSD",
    icon: DollarSign,
  },
  {
    title: "Total Virgens",
    key: "totalUsers",
    icon: Users,
  },
];

// 格式化价格函数
const formatPrice = (price: number): string => {
  if (price === 0) return "$0.00";
  if (price < 0.00001) return "<$0.00001";
  return `$${price.toFixed(6)}`;
};

// 格式化成交量函数
const formatVolume = (volume: number): string => {
  if (volume >= 1000000) {
    return `$${(volume / 1000000).toFixed(1)}M`;
  } else if (volume >= 1000) {
    return `$${(volume / 1000).toFixed(1)}K`;
  } else {
    return `$${volume.toFixed(0)}`;
  }
};

// 格式化百分比函数
const formatPercent = (percent: number): string => {
  return `${percent > 0 ? "+" : ""}${percent.toFixed(2)}%`;
};

export default function DashboardMetrics() {
  const [metricsData, setMetricsData] = useState<EcosystemInfo | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchMetrics = async () => {
      const metrics = await getEcosystemInfo();
      setMetricsData(metrics);
    };
    fetchMetrics();
  }, []);

  // 从API数据中获取涨跌幅数据，如果没有则使用空数组
  const topGainersData: TokenData[] = metricsData?.topGainers || [];
  const topLosersData: TokenData[] = metricsData?.topLosers || [];

  return (
    <div className="space-y-6">
      {/* 基础指标 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <Card key={metric.title} className="bg-card/50 border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {(() => {
                  const value =
                    metricsData?.[metric.key as keyof EcosystemInfo];
                  if (metric.key === "totalGenesesMarketCapUSD") {
                    return `$${Number(value || 0).toLocaleString()}`;
                  }
                  return typeof value === "number" || typeof value === "string"
                    ? value
                    : "--";
                })()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 涨跌幅榜单 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Gainers */}
        <Card className="bg-card/50 border-border shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-lg font-semibold">
              <div className="flex items-center">
                <div className="bg-green-500/10 p-2 rounded-lg mr-3">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <span className="text-foreground">
                    Top Gainers ({topGainersData.length})
                  </span>
                  <div className="text-xs text-muted-foreground font-normal">
                    24-hour price gainers
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[420px] overflow-y-auto">
              <div className="px-4">
                <table className="w-full">
                  <thead className="sticky top-0 bg-card/95 backdrop-blur-sm z-10">
                    <tr className="border-b border-border/50">
                      <th className="text-left py-3 text-xs font-medium text-muted-foreground" style={{width: "40%"}}>
                        Rank/Project
                      </th>
                      <th className="text-right py-3 text-xs font-medium text-muted-foreground" style={{width: "20%"}}>
                        Price
                      </th>
                      <th className="text-right py-3 text-xs font-medium text-muted-foreground" style={{width: "20%"}}>
                        Volume
                      </th>
                      <th className="text-right py-3 text-xs font-medium text-muted-foreground" style={{width: "20%"}}>
                        24h Change
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {topGainersData.map((token) => (
                      <tr
                        key={token.virtualId}
                        className="border-b border-border/20 hover:bg-green-500/5 transition-colors duration-200 group cursor-pointer"
                        onClick={() => {
                          router.push(`/v2/project/${token.virtualId}`);
                        }}
                      >
                        <td className="py-3" style={{width: "40%"}}>
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-3 flex-shrink-0">
                              <AvatarImage
                                src={token.image?.url}
                                alt={`${token.name} logo`}
                              />
                              <AvatarFallback className="bg-gradient-to-br from-green-400/20 to-green-600/20 text-green-600 font-bold text-xs">
                                {token.name?.charAt(0)?.toUpperCase() ||
                                  token.symbol?.charAt(0)?.toUpperCase() ||
                                  "?"}
                              </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0 flex-1">
                              <div className="font-medium text-sm text-foreground truncate">
                                {token.name}
                              </div>
                              <div className="text-xs text-muted-foreground truncate">
                                ${token.symbol}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="text-right py-3 text-sm font-medium" style={{width: "20%"}}>
                          <div className="text-foreground">
                            {formatPrice(token.currentPriceUSD)}
                          </div>
                        </td>
                        <td className="text-right py-3 text-xs" style={{width: "20%"}}>
                          <div className="text-muted-foreground">
                            {formatVolume(token.volume24hUSD)}
                          </div>
                        </td>
                        <td className="text-right py-3" style={{width: "20%"}}>
                          <div className="inline-flex items-center bg-green-500/10 text-green-500 px-2 py-1 rounded-md text-xs font-semibold">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            {formatPercent(token.priceChangePercent24h)}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Losers */}
        <Card className="bg-card/50 border-border shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-lg font-semibold">
              <div className="flex items-center">
                <div className="bg-red-500/10 p-2 rounded-lg mr-3">
                  <TrendingDown className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <span className="text-foreground">
                    Top Losers ({topLosersData.length})
                  </span>
                  <div className="text-xs text-muted-foreground font-normal">
                    24-hour price losers
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[420px] overflow-y-auto">
              <div className="px-4">
                <table className="w-full">
                  <thead className="sticky top-0 bg-card/95 backdrop-blur-sm z-10">
                    <tr className="border-b border-border/50">
                      <th className="text-left py-3 text-xs font-medium text-muted-foreground" style={{width: "40%"}}>
                        Rank/Project
                      </th>
                      <th className="text-right py-3 text-xs font-medium text-muted-foreground" style={{width: "20%"}}>
                        Price
                      </th>
                      <th className="text-right py-3 text-xs font-medium text-muted-foreground" style={{width: "20%"}}>
                        Volume
                      </th>
                      <th className="text-right py-3 text-xs font-medium text-muted-foreground" style={{width: "20%"}}>
                        24h Change
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {topLosersData.map((token) => (
                      <tr
                        key={token.virtualId}
                        className="border-b border-border/20 hover:bg-red-500/5 transition-colors duration-200 group cursor-pointer"
                        onClick={() => {
                          router.push(`/v2/project/${token.virtualId}`);
                        }}
                      >
                        <td className="py-3" style={{width: "40%"}}>
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-3 flex-shrink-0">
                              <AvatarImage
                                src={token.image?.url}
                                alt={`${token.name} logo`}
                              />
                              <AvatarFallback className="bg-gradient-to-br from-red-400/20 to-red-600/20 text-red-600 font-bold text-xs">
                                {token.name?.charAt(0)?.toUpperCase() ||
                                  token.symbol?.charAt(0)?.toUpperCase() ||
                                  "?"}
                              </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0 flex-1">
                              <div className="font-medium text-sm text-foreground truncate">
                                {token.name}
                              </div>
                              <div className="text-xs text-muted-foreground truncate">
                                ${token.symbol}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="text-right py-3 text-sm font-medium" style={{width: "20%"}}>
                          <div className="text-foreground">
                            {formatPrice(token.currentPriceUSD)}
                          </div>
                        </td>
                        <td className="text-right py-3 text-xs" style={{width: "20%"}}>
                          <div className="text-muted-foreground">
                            {formatVolume(token.volume24hUSD)}
                          </div>
                        </td>
                        <td className="text-right py-3" style={{width: "20%"}}>
                          <div className="inline-flex items-center bg-red-500/10 text-red-500 px-2 py-1 rounded-md text-xs font-semibold">
                            <TrendingDown className="w-3 h-3 mr-1" />
                            {formatPercent(token.priceChangePercent24h)}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
