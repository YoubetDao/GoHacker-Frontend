"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("trading");

  const handleVipTabClick = (tabValue: string) => {
    if (!hasMinBalance) {
      setIsDialogOpen(true);
      return;
    }
    setActiveTab(tabValue);
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
  }) => {
    if (hasMinBalance) {
      return (
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
    }

    return (
      <div
        className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm cursor-pointer hover:bg-muted/50"
        onClick={() => handleVipTabClick(value)}
      >
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-2">
            {children}
            <Badge
              variant="outline"
              className="bg-gradient-to-r from-[#004FFF] to-[#8C00FF] text-white border-none text-xs"
            >
              VIP
            </Badge>
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
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card/50">
        <Header />

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
                    <TabsList className="grid w-full grid-cols-5">
                      <TabWithInfo
                        value="trading"
                        description={tabDescriptions.trading}
                      >
                        Trading Events
                      </TabWithInfo>
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
                      <TradingEvent />
                    </TabsContent>

                    {hasMinBalance && (
                      <>
                        <TabsContent value="genesis" className="p-6">
                          <Genesis />
                        </TabsContent>

                        <TabsContent value="holders" className="p-6">
                          <Holders />
                        </TabsContent>

                        <TabsContent value="staking" className="p-6">
                          <Stackers />
                        </TabsContent>
                        <TabsContent value="Cluster" className="p-6">
                          <Clusters />
                        </TabsContent>
                      </>
                    )}
                  </Tabs>

                  {/* Purchase Guide Dialog */}
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className="bg-gradient-to-r from-[#004FFF] to-[#8C00FF] text-white border-none"
                          >
                            VIP
                          </Badge>
                          Exclusive Feature
                        </DialogTitle>
                        <DialogDescription>
                          This feature is exclusively available to VIP members.
                          Become a VIP to unlock Genesis participation data,
                          holder analytics, staking statistics, and more
                          advanced features.
                        </DialogDescription>
                      </DialogHeader>

                      <div className="space-y-4">
                        <div className="rounded-lg bg-muted/50 p-4">
                          <h4 className="font-medium mb-2">
                            VIP Member Benefits:
                          </h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>
                              • Access detailed Genesis participation data
                            </li>
                            <li>• Get comprehensive token holder analytics</li>
                            <li>• View staking statistics and insights</li>
                            <li>• Unlock exclusive data insights</li>
                          </ul>
                        </div>

                        <div className="text-sm text-muted-foreground">
                          <p>
                            <strong>Membership Requirement:</strong> Hold at
                            least 100,000 BUIDL tokens
                          </p>
                        </div>
                      </div>

                      <DialogFooter className="flex-col sm:flex-row gap-2">
                        <Button
                          variant="outline"
                          onClick={() => setIsDialogOpen(false)}
                        >
                          Maybe Later
                        </Button>
                        <Button
                          onClick={() => {
                            // Add logic to redirect to purchase page
                            window.open(
                              "https://app.virtuals.io/virtuals/34247",
                              "_blank"
                            );
                            setIsDialogOpen(false);
                          }}
                          className="bg-gradient-to-r from-[#004FFF] to-[#8C00FF] hover:from-[#0040CC] hover:to-[#7A26E6]"
                        >
                          Buy BUIDL Now
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
