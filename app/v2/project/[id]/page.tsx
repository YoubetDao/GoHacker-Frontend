"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info, Lock } from "lucide-react";
import { useState } from "react";

import { Header } from "./_components/Headers";
import { TradingEvent } from "./_components/TradingEvent";
import { Genesis } from "./_components/Genesis";
import { Stackers } from "./_components/Stackers";
import { Holders } from "./_components/Holders";
import { useHasMinBuidlBalance } from "@/hooks/useHasMinBuidlBalance";
import { Clusters } from "./_components/Clusters";

export default function ProjectDetailPage() {
  const { hasMinBalance } = useHasMinBuidlBalance();
  const [activeTab, setActiveTab] = useState("trading");
  const [hasTradesData, setHasTradesData] = useState<boolean | null>(null); // null 表示尚未检查

  const handleTradesAvailable = (hasData: boolean) => {
    if (hasTradesData === null) {
      // 首次设置数据状态
      setHasTradesData(hasData);
      // 如果没有交易数据，切换到第一个非交易标签
      if (!hasData) {
        setActiveTab("genesis");
      }
    }
  };

  // Tab说明内容
  const tabDescriptions = {
    trading:
      "View all trading events and transactions for this project, including buys, sells, and price movements.",
    genesis:
      "Access detailed information about Genesis participation, including early supporters and initial contributions.",
    holders:
      "Analyze token holder distribution, top holders, and holding patterns over time.",
    staking:
      "View staking statistics, rewards, and participant data for this project.",
  };

  // 带有Info图标的Tab触发器组件
  const TabWithInfo = ({
    value,
    children,
    description,
  }: {
    value: string;
    children: React.ReactNode;
    description: string;
  }) => (
    <TabsTrigger value={value}>
      <div className="flex items-center gap-1">
        {children}
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="h-3 w-3 text-muted-foreground hover:text-foreground cursor-help" />
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs">
            <p>{description}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TabsTrigger>
  );

  // VIP Tab 触发器组件
  const VipTabTrigger = ({
    value,
    children,
    description,
  }: {
    value: string;
    children: React.ReactNode;
    description: string;
  }) => (
    <TabsTrigger value={value}>
      <div className="flex items-center gap-1">
        <div className="flex items-center gap-2">
          {children}
          {!hasMinBalance && (
            <Badge
              variant="outline"
              className="bg-gradient-to-r from-[#004FFF] to-[#8C00FF] text-white border-none text-xs"
            >
              VIP
            </Badge>
          )}
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="h-3 w-3 text-muted-foreground hover:text-foreground cursor-help" />
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs">
            <p>{description}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TabsTrigger>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card/50">
        <Header showTradingView={hasTradesData === true} />

        <div className="p-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-6">
              {/* detail tab */}
              <Card>
                <CardContent className="p-0">
                  <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="w-full"
                  >
                    <TabsList
                      className={`grid w-full ${
                        hasTradesData === true ? "grid-cols-5" : "grid-cols-4"
                      }`}
                    >
                      {hasTradesData === true && (
                        <TabWithInfo
                          value="trading"
                          description={tabDescriptions.trading}
                        >
                          Trading Events
                        </TabWithInfo>
                      )}
                      <VipTabTrigger
                        value="genesis"
                        description={tabDescriptions.genesis}
                      >
                        Genesis Participation
                      </VipTabTrigger>
                      <VipTabTrigger
                        value="holders"
                        description={tabDescriptions.holders}
                      >
                        Holders
                      </VipTabTrigger>
                      <VipTabTrigger
                        value="staking"
                        description={tabDescriptions.staking}
                      >
                        Stakers
                      </VipTabTrigger>
                      <VipTabTrigger
                        value="Cluster"
                        description={tabDescriptions.staking}
                      >
                        Cluster
                      </VipTabTrigger>
                    </TabsList>

                    <TabsContent value="trading" className="p-6">
                      <TradingEvent onTradesAvailable={handleTradesAvailable} />
                    </TabsContent>

                    <TabsContent value="genesis" className="p-6">
                      {hasMinBalance ? (
                        <Genesis />
                      ) : (
                        <div className="flex items-center justify-center py-12">
                          <div className="text-center space-y-4">
                            <h3 className="text-xl font-semibold flex items-center justify-center gap-2">
                              <Lock className="w-5 h-5" />
                              VIP Access Required
                            </h3>
                            <p className="text-muted-foreground max-w-md">
                              This feature requires VIP membership. Hold at
                              least 100,000 $BUIDL tokens to access Genesis
                              participation data.
                            </p>
                            <Button
                              onClick={() => {
                                window.open(
                                  "https://app.virtuals.io/virtuals/34247",
                                  "_blank"
                                );
                              }}
                              className="bg-gradient-to-r from-[#004FFF] to-[#8C00FF] hover:from-[#0040CC] hover:to-[#7A26E6] mt-4"
                            >
                              Buy BUIDL Now
                            </Button>
                          </div>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="holders" className="p-6">
                      {hasMinBalance ? (
                        <Holders />
                      ) : (
                        <div className="flex items-center justify-center py-12">
                          <div className="text-center space-y-4">
                            <h3 className="text-xl font-semibold flex items-center justify-center gap-2">
                              <Lock className="w-5 h-5" />
                              VIP Access Required
                            </h3>
                            <p className="text-muted-foreground max-w-md">
                              This feature requires VIP membership. Hold at
                              least 100,000 $BUIDL tokens to access holder
                              analytics.
                            </p>
                            <Button
                              onClick={() => {
                                window.open(
                                  "https://app.virtuals.io/virtuals/34247",
                                  "_blank"
                                );
                              }}
                              className="bg-gradient-to-r from-[#004FFF] to-[#8C00FF] hover:from-[#0040CC] hover:to-[#7A26E6] mt-4"
                            >
                              Buy BUIDL Now
                            </Button>
                          </div>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="staking" className="p-6">
                      {hasMinBalance ? (
                        <Stackers />
                      ) : (
                        <div className="flex items-center justify-center py-12">
                          <div className="text-center space-y-4">
                            <h3 className="text-xl font-semibold flex items-center justify-center gap-2">
                              <Lock className="w-5 h-5" />
                              VIP Access Required
                            </h3>
                            <p className="text-muted-foreground max-w-md">
                              This feature requires VIP membership. Hold at
                              least 100,000 $BUIDL tokens to access staking
                              statistics.
                            </p>
                            <Button
                              onClick={() => {
                                window.open(
                                  "https://app.virtuals.io/virtuals/34247",
                                  "_blank"
                                );
                              }}
                              className="bg-gradient-to-r from-[#004FFF] to-[#8C00FF] hover:from-[#0040CC] hover:to-[#7A26E6] mt-4"
                            >
                              Buy BUIDL Now
                            </Button>
                          </div>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="Cluster" className="p-6">
                      {hasMinBalance ? (
                        <Clusters />
                      ) : (
                        <div className="flex items-center justify-center py-12">
                          <div className="text-center space-y-4">
                            <h3 className="text-xl font-semibold flex items-center justify-center gap-2">
                              <Lock className="w-5 h-5" />
                              VIP Access Required
                            </h3>
                            <p className="text-muted-foreground max-w-md">
                              This feature requires VIP membership. Stake at
                              least 50,000 $BUIDL tokens or hold at least 100,000 
                              $BUIDL tokens to access cluster analytics.
                            </p>
                            <Button
                              onClick={() => {
                                window.open(
                                  "https://app.virtuals.io/virtuals/34247",
                                  "_blank"
                                );
                              }}
                              className="bg-gradient-to-r from-[#004FFF] to-[#8C00FF] hover:from-[#0040CC] hover:to-[#7A26E6] mt-4"
                            >
                              Buy BUIDL Now
                            </Button>
                          </div>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
