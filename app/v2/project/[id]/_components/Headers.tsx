"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Copy, TrendingDown, TrendingUp } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getProjectDetail, type ProjectDetail } from "@/service/detail";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export const Header = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjectDetail = async () => {
      try {
        const data = await getProjectDetail(id);
        setProject(data);
      } catch (error) {
        console.error("Failed to fetch project details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetail();
  }, [id]);

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
  };

  // Format price
  const formatPrice = (price: number): string => {
    if (price < 0.001) {
      return `$${price.toFixed(6)}`;
    } else if (price < 1) {
      return `$${price.toFixed(4)}`;
    } else {
      return `$${price.toFixed(3)}`;
    }
  };

  // Format market cap
  const formatMarketCap = (value: number): string => {
    if (value >= 1e9) {
      return `$${(value / 1e9).toFixed(2)}B`;
    } else if (value >= 1e6) {
      return `$${(value / 1e6).toFixed(2)}M`;
    } else if (value >= 1e3) {
      return `$${(value / 1e3).toFixed(2)}K`;
    } else {
      return `$${value.toFixed(2)}`;
    }
  };

  // Loading state or project not found
  if (loading || !project) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <Button variant="outline" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-muted animate-pulse"></AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <div className="h-5 bg-muted rounded w-24 animate-pulse"></div>
              <div className="h-4 bg-muted rounded w-48 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Project data loaded, handle display logic
  const isPositive = Number(project.change24h) >= 0;
  const contractAddress = project.dexscreenerUrl
    ? project.dexscreenerUrl.split("/").pop() || ""
    : "";

  console.log("project", project);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <Button variant="outline" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      <div className="flex items-center justify-between mb-6">
        {/* Left Side - Logo, Name, Address */}
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={project.tokenLogoUrl}
              alt={project.tokenSymbol}
              className="object-cover"
            />
            <AvatarFallback className="text-sm font-bold bg-muted text-muted-foreground">
              {project.tokenSymbol.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl font-bold text-foreground">
                {project.tokenSymbol}
              </h1>
              {/* <Badge variant="outline" className="text-xs px-2 py-0.5">
                {project.projectName}
              </Badge> */}
            </div>
            {contractAddress && (
              <button
                onClick={() => copyAddress(contractAddress)}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {contractAddress
                  ? `${contractAddress.slice(0, 6)}...${contractAddress.slice(
                      -4
                    )}`
                  : ""}
                <Copy className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
        <div className="flex items-center gap-8">
          {/* Price Section */}
          <div className="text-right">
            <div className="text-2xl font-bold text-foreground">
              {formatPrice(project.priceUSD)}
            </div>
            <Badge
              variant={isPositive ? "default" : "destructive"}
              className={
                isPositive
                  ? "bg-green-500/10 text-green-500 border-green-500/20"
                  : ""
              }
            >
              {isPositive ? (
                <TrendingUp className="w-3 h-3 mr-1" />
              ) : (
                <TrendingDown className="w-3 h-3 mr-1" />
              )}
              {project.change24h}%
            </Badge>
          </div>

          {/* Market Metrics */}
          <div className="flex items-center gap-6 text-sm">
            <div className="text-center">
              <div className="text-xs text-muted-foreground">Market Cap</div>
              <div className="font-medium text-foreground">
                {formatMarketCap(project.finalMarketCap)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-muted-foreground">Holders</div>
              <div className="font-medium text-foreground">
                {project.holderCount.toLocaleString()}
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-muted-foreground">Stakers</div>
              <div className="font-medium text-foreground">
                {project.totalStakers.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Price Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Trading View</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96 w-full">
            {project.dexscreenerUrl ? (
              <iframe
                src={`${project.dexscreenerUrl}?embed=1&theme=dark&trades=0&info=0`}
                className="w-full h-full border-0 rounded-lg"
                allow="clipboard-write"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">
                  No trading chart available
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
