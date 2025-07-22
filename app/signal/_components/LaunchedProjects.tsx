"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Calendar, TrendingUp, TrendingDown, Lock } from "lucide-react";
import { getLaunchedProjects, LaunchedProject } from "@/service";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// 格式化数字为货币格式
const formatCurrency = (value: number): string => {
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

// 格式化价格
const formatPrice = (price: number): string => {
  if (price < 0.001) {
    return `$${price.toFixed(8)}`;
  } else if (price < 1) {
    return `$${price.toFixed(6)}`;
  } else {
    return `$${price.toFixed(4)}`;
  }
};

// 根据天数计算代币解锁进度（模拟）
// const calculateTokenProgress = (daysFromFirstUnlock: number): number => {
//   // 假设120天为完全解锁
//   const maxDays = 120;
//   const progress = Math.min((daysFromFirstUnlock / maxDays) * 100, 100);
//   return Math.max(progress, 10); // 最少显示10%
// };

export default function LaunchedProjects() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentProjects, setCurrentProjects] = useState<LaunchedProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalProjects, setTotalProjects] = useState(0);
  const [showComingSoonDialog, setShowComingSoonDialog] = useState(false);

  useEffect(() => {
    const fetchLaunchedProjects = async () => {
      setLoading(true);
      try {
        const response = await getLaunchedProjects(page, 6);
        console.log("response", response);
        if (response) {
          setCurrentProjects(response.data);
          setTotalPages(response.pagination.totalPages);
          setTotalProjects(response.pagination.total);
        }
      } catch (error) {
        console.error("Failed to fetch launched projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLaunchedProjects();
  }, [page]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">
          Successfully Launched Projects
        </h2>
        <Badge variant="outline" className="border-blue-500 text-blue-500">
          {totalProjects} Completed
        </Badge>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="bg-card border-border">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-muted animate-pulse"></AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded animate-pulse"></div>
                    <div className="h-3 bg-muted rounded animate-pulse w-16"></div>
                  </div>
                  <div className="w-16 h-6 bg-muted rounded animate-pulse"></div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="h-3 bg-muted rounded animate-pulse"></div>
                <div className="h-3 bg-muted rounded animate-pulse"></div>
                <div className="h-3 bg-muted rounded animate-pulse"></div>
                <div className="h-2 bg-muted rounded animate-pulse"></div>
                <div className="h-8 bg-muted rounded animate-pulse"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentProjects.map((project) => {
            const isPositive = Number(project.change24h) >= 0;
            // const tokenProgress = calculateTokenProgress(
            //   project.daysFromFirstUnlock
            // );

            return (
              <Card
                key={project.virtualId}
                className="bg-card border-border hover:bg-card/80 transition-colors"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage
                        src={project.tokenLogoUrl}
                        alt={project.tokenSymbol}
                        className="object-cover"
                      />
                      <AvatarFallback className="text-xs font-bold bg-muted text-muted-foreground">
                        {project.tokenSymbol.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-lg text-foreground">
                        {project.projectName}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {project.tokenSymbol}
                      </p>
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

                  <div className="flex items-center text-xs text-muted-foreground mt-2">
                    <Calendar className="w-3 h-3 mr-1" />
                    Launched {new Date(project.launchDate).toLocaleDateString()}
                  </div>
                </CardHeader>

                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Market Cap:
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {formatCurrency(project.finalMarketCap)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Current Price:
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {formatPrice(project.priceUSD)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Token First Unlock:
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {project.daysFromFirstUnlock}
                    </span>
                  </div>

                  {/* <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Token Unlock Progress:
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {tokenProgress.toFixed(1)}%
                    </span>
                  </div>

                  <div className="w-full bg-muted rounded-full h-2 mt-3">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${tokenProgress}%` }}
                    ></div>
                  </div> */}

                  <Button
                    variant="outline"
                    className="w-full mt-4 opacity-50 cursor-pointer"
                    onClick={() => setShowComingSoonDialog(true)}
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    View Insights
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  className={
                    page === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
              {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                let pageNumber;
                if (totalPages <= 7) {
                  pageNumber = i + 1;
                } else if (page <= 4) {
                  pageNumber = i + 1;
                } else if (page >= totalPages - 3) {
                  pageNumber = totalPages - 6 + i;
                } else {
                  pageNumber = page - 3 + i;
                }
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      onClick={() => setPage(pageNumber)}
                      isActive={page === pageNumber}
                      className="cursor-pointer"
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  className={
                    page === totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      <Dialog
        open={showComingSoonDialog}
        onOpenChange={setShowComingSoonDialog}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Coming Soon: Project Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>🚧 New interface loading…</div>
            <div>
              We’re building fast, stay tuned for the full experience. Stake or
              hold your $BUIDL early to unlock future rewards.
            </div>
          </div>
          <DialogFooter className="flex gap-2 mt-6">
            <Button
              className="flex-1"
              onClick={() => {
                window.open("https://app.virtuals.io/virtuals/34247", "_blank");
                setShowComingSoonDialog(false);
              }}
            >
              🚀 Stake Now
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setShowComingSoonDialog(false)}
            >
              Got It
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
