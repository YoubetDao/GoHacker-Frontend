"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import {
  Calendar,
  TrendingUp,
  TrendingDown,
  Lock,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { getLaunchedProjects, LaunchedProject } from "@/service";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// 排序类型定义
type SortField = "totalStakers" | "totalStakedAmount" | "holderCount";
type SortDirection = "asc" | "desc";

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
    return `$${price.toFixed(6)}`;
  } else if (price < 1) {
    return `$${price.toFixed(4)}`;
  } else {
    return `$${price.toFixed(3)}`;
  }
};

// 格式化质押金额
const formatStakedAmount = (amount: string): string => {
  const numAmount = parseFloat(amount);
  if (isNaN(numAmount)) return "N/A";

  if (numAmount >= 1e9) {
    return `${(numAmount / 1e9).toFixed(2)}B`;
  } else if (numAmount >= 1e6) {
    return `${(numAmount / 1e6).toFixed(2)}M`;
  } else if (numAmount >= 1e3) {
    return `${(numAmount / 1e3).toFixed(2)}K`;
  } else {
    return numAmount.toFixed(2);
  }
};

export default function LaunchedProjects() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentProjects, setCurrentProjects] = useState<LaunchedProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [showComingSoonDialog, setShowComingSoonDialog] = useState(false);

  // 排序状态
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  useEffect(() => {
    const fetchLaunchedProjects = async () => {
      setLoading(true);
      try {
        const response = await getLaunchedProjects(
          page,
          20,
          sortField || undefined,
          sortDirection
        );
        console.log("response", response);
        if (response) {
          setCurrentProjects(response.data);
          setTotalPages(response.pagination.totalPages);
        }
      } catch (error) {
        console.error("Failed to fetch launched projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLaunchedProjects();
  }, [page, sortField, sortDirection]);

  // 排序函数
  const handleSort = (field: SortField) => {
    let direction: SortDirection = "desc";

    if (sortField === field && sortDirection === "desc") {
      direction = "asc";
    }

    setSortField(field);
    setSortDirection(direction);
    // 重置到第一页，因为排序可能改变数据顺序
    setPage(1);
  };

  // 获取排序图标
  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-4 h-4" />;
    }
    return sortDirection === "asc" ? (
      <ArrowUp className="w-4 h-4" />
    ) : (
      <ArrowDown className="w-4 h-4" />
    );
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-foreground">
            Launched Projects
          </h2>
        </div>

        <Card className="bg-card border-border">
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-muted rounded-full animate-pulse"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded animate-pulse"></div>
                    <div className="h-3 bg-muted rounded animate-pulse w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">
          Launched Geneses
        </h2>
      </div>

      <Card className="bg-card border-border">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border hover:bg-transparent">
                <TableHead className="text-left font-semibold">
                  Project
                </TableHead>
                <TableHead className="text-right font-semibold">
                  Market Cap
                </TableHead>
                <TableHead className="text-right font-semibold">
                  Price
                </TableHead>
                <TableHead className="text-right font-semibold">
                  24h Change
                </TableHead>
                <TableHead className="text-center font-semibold">
                  <button
                    onClick={() => handleSort("holderCount")}
                    className="flex items-center justify-center gap-1 hover:text-foreground transition-colors w-full"
                  >
                    Holders
                    {getSortIcon("holderCount")}
                  </button>
                </TableHead>
                <TableHead className="text-center font-semibold">
                  <button
                    onClick={() => handleSort("totalStakers")}
                    className="flex items-center justify-center gap-1 hover:text-foreground transition-colors w-full"
                  >
                    Stakers
                    {getSortIcon("totalStakers")}
                  </button>
                </TableHead>
                <TableHead className="text-center font-semibold">
                  <button
                    onClick={() => handleSort("totalStakedAmount")}
                    className="flex items-center justify-center gap-1 hover:text-foreground transition-colors w-full"
                  >
                    Staking Amount
                    {getSortIcon("totalStakedAmount")}
                  </button>
                </TableHead>
                <TableHead className="text-center font-semibold">
                  Details
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentProjects.map((project) => {
                const isPositive = Number(project.change24h) >= 0;

                return (
                  <TableRow
                    key={project.virtualId}
                    className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                  >
                    <TableCell className="py-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
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
                          <div className="font-semibold text-foreground">
                            {project.projectName}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            ${project.tokenSymbol}
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground mt-1">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(project.launchDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="text-right font-medium">
                      {formatCurrency(project.finalMarketCap)}
                    </TableCell>

                    <TableCell className="text-right font-medium">
                      {formatPrice(project.priceUSD)}
                    </TableCell>

                    <TableCell className="text-right">
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
                    </TableCell>

                    <TableCell className="text-center font-medium">
                      {project.holderCount?.toLocaleString() || "N/A"}
                    </TableCell>

                    <TableCell className="text-center font-medium">
                      {project.totalStakers?.toLocaleString() || "N/A"}
                    </TableCell>

                    <TableCell className="text-center font-medium">
                      {formatStakedAmount(project.totalStakedAmount || "0")}
                    </TableCell>

                    <TableCell className="text-center">
                      <Button
                        variant="outline"
                        size="sm"
                        className="opacity-50 cursor-pointer"
                        onClick={() => setShowComingSoonDialog(true)}
                      >
                        <Lock className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(Math.max(1, page - 1))}
                  className={
                    page === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      onClick={() => handlePageChange(pageNum)}
                      isActive={page === pageNum}
                      className="cursor-pointer"
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    handlePageChange(Math.min(totalPages, page + 1))
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

      {/* Coming Soon Dialog */}
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
