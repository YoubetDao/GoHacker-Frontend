"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock } from "lucide-react";

const portfolioItems = [
  {
    name: "Virtual AI Assistant",
    symbol: "VAIA",
    balance: "15,420",
    avgBuyPrice: "$0.0845",
    currentPrice: "$0.1124",
    change24h: "+32.8%",
    holdingValue: "$1,733.09",
    pnl: "+$430.21",
    isProfit: true,
  },
  {
    name: "DeepChat Protocol",
    symbol: "DEEP",
    balance: "8,950",
    avgBuyPrice: "$0.0512",
    currentPrice: "$0.0467",
    change24h: "-8.8%",
    holdingValue: "$418.07",
    pnl: "-$40.28",
    isProfit: false,
  },
  {
    name: "Neural Network DAO",
    symbol: "NNDAO",
    balance: "2,340",
    avgBuyPrice: "$0.2890",
    currentPrice: "$0.3445",
    change24h: "+19.2%",
    holdingValue: "$806.13",
    pnl: "+$129.87",
    isProfit: true,
  },
];

export default function UserPortfolio() {
  // const totalValue = portfolioItems.reduce(
  //   (sum, item) =>
  //     sum + parseFloat(item.holdingValue.replace("$", "").replace(",", "")),
  //   0
  // );

  // const totalPnL = portfolioItems.reduce(
  //   (sum, item) => sum + parseFloat(item.pnl.replace(/[\$\+]/g, "")),
  //   0
  // );

  return (
    <div className="space-y-6">
      {/* 标题部分 - 不被遮盖 */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">My Portfolio</h2>
        {/* <div className="text-right">
          <div className="text-2xl font-bold text-foreground">
            ${totalValue.toLocaleString()}
          </div>
          <div
            className={`text-sm flex items-center ${
              totalPnL >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {totalPnL >= 0 ? (
              <TrendingUp className="w-4 h-4 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 mr-1" />
            )}
            {totalPnL >= 0 ? "+" : ""}${totalPnL.toFixed(2)}
          </div>
        </div> */}
      </div>

      {/* 内容部分 - 被遮盖 */}
      <div className="relative">
        {/* Overlay */}
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 rounded-lg flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-4 bg-muted rounded-full">
                <Lock className="w-8 h-8 text-muted-foreground" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Portfolio Coming Soon
              </h3>
              <p className="text-muted-foreground">
                Your portfolio data will be available shortly
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {portfolioItems.map((item) => (
            <Card
              key={item.symbol}
              className="bg-card border-border relative opacity-30"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg text-foreground">
                      {item.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {item.symbol}
                    </p>
                  </div>
                  <Badge
                    variant={item.isProfit ? "default" : "destructive"}
                    className={
                      item.isProfit
                        ? "bg-green-500/10 text-green-500 border-green-500/20"
                        : ""
                    }
                  >
                    {item.change24h}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Balance:
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {item.balance}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Avg Buy:
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {item.avgBuyPrice}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Current:
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {item.currentPrice}
                  </span>
                </div>
                <div className="border-t border-border pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-foreground">
                      Value:
                    </span>
                    <span className="text-sm font-bold text-foreground">
                      {item.holdingValue}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">P&L:</span>
                    <span
                      className={`text-sm font-bold ${
                        item.isProfit ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {item.pnl}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
