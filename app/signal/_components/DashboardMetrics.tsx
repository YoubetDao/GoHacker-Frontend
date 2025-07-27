"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Users, DollarSign } from "lucide-react";
import { EcosystemInfo, getEcosystemInfo } from "@/service";

const metrics = [
  {
    title: "Total Projects Launched",
    key: "totalGenesesProjects",

    icon: Activity,
  },
  {
    title: "Total Geneses Market Cap",
    key: "totalGenesesMarketCapUSD",
    icon: DollarSign,
  },
  {
    title: "Total Developers",
    key: "totalDevelopers",
    icon: Users,
  },
  {
    title: "Total Virgens",
    key: "totalUsers",
    icon: Users,
  },
];

export default function DashboardMetrics() {
  const [metricsData, setMetricsData] = useState<EcosystemInfo | null>(null);
  useEffect(() => {
    const fetchMetrics = async () => {
      const metrics = await getEcosystemInfo();
      setMetricsData(metrics);
    };
    fetchMetrics();
  }, []);

  console.log("metrics", metricsData);
  return (
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
              {metricsData?.[metric.key as keyof EcosystemInfo] as string}
            </div>
            {/* <p className="text-xs text-primary">
              {metric.change} from last month
            </p> */}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
