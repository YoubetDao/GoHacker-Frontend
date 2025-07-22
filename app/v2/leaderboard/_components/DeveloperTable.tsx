"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useState, useCallback } from "react";
import {
  ChevronUp,
  ChevronDown,
  GithubIcon,
  TwitterIcon,
  Send,
  Info,
} from "lucide-react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

import { Developer, getDevelopers } from "@/service";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const SortField = [
  {
    type: "github_analysis.followers",
    label: "Followers",
  },
  {
    type: "github_analysis.stars",
    label: "Stars",
  },
  {
    type: "github_analysis.rating",
    label: "Rating",
    info: "Higher scores indicate stronger developer expertise and open-source influence, leading to more reliable projects with lower technical risk.",
  },
  {
    type: "github_analysis.activity",
    label: "Activity",
    info: "This measures how actively the developer is currently building and contributing to projects.",
  },
];

const isAddress = (name: string) => name.startsWith("0x");

// ====================== 工具函数 ==========================
const getRankDisplay = (rank: number) => {
  const colorMap = {
    1: "from-[#FFF35A] to-[#FF8924]",
    2: "from-[#80D7FF] to-[#6C90ED]",
    3: "from-[#FF9F46] to-[#A55513]",
  } as const;
  return rank <= 3 ? (
    <span
      className={` bg-gradient-to-b ${
        colorMap[rank as 1 | 2 | 3]
      } bg-clip-text text-transparent`}
    >
      TOP.{rank}
    </span>
  ) : (
    `#${rank}`
  );
};

const getStatusDisplay = (status: string) => {
  const map = {
    CANCELLED: ["Ended", "bg-gray-500/20 text-gray-400"],
    FAILED: ["Ended", "bg-red-500/20 text-red-400"],
    FINALIZED: ["Ended", "bg-green-500/20 text-green-400"],
    INITIALIZED: ["Upcoming", "bg-blue-500/20 text-blue-400"],
    STARTED: ["Live", "bg-purple-500/20 text-purple-400"],
  } as Record<string, [string, string]>;
  const [label, color] = map[status] ?? [
    status,
    "bg-gray-500/20 text-gray-400",
  ];
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
      {label}
    </span>
  );
};

type SortField =
  | "github_analysis.followers"
  | "github_analysis.stars"
  | "github_analysis.rating"
  | "github_analysis.activity";
type SortDirection = "asc" | "desc" | null;

interface DeveloperTableProps {
  statusFilter: string;
}

export default function DeveloperTable({ statusFilter }: DeveloperTableProps) {
  const [sortField, setSortField] = useState<SortField | null>(
    "github_analysis.rating"
  );
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [developerList, setDeveloperList] = useState<Developer[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // 三态排序简化
  const handleSort = (field: SortField) => {
    setSortField((prevField) =>
      prevField === field ? (sortDirection === "desc" ? null : field) : field
    );
    setSortDirection((prevDir) => {
      if (sortField !== field) return "asc";
      if (prevDir === "asc") return "desc";
      if (prevDir === "desc") return null;
      return "asc";
    });
    setCurrentPage(1);
  };

  const getSortIcon = (field: SortField) => {
    if (sortField === field) {
      return sortDirection === "asc" ? (
        <ChevronUp className="ml-2 h-4 w-4" />
      ) : (
        <ChevronDown className="ml-2 h-4 w-4" />
      );
    }
    return <ChevronUp className="ml-2 h-4 w-4" />; // 非当前排序字段显示淡色下箭头
  };

  // 数据请求
  const fetchDevelopers = useCallback(
    async (page = 1) => {
      try {
        const params: {
          page: number;
          pageSize: number;
          sortBy?: string;
          sortOrder?: string;
          projectStatus?: string;
        } = { page, pageSize: 10 };
        if (sortField && sortDirection) {
          params.sortBy = sortField;
          params.sortOrder = sortDirection;
        }
        if (statusFilter !== "all") params.projectStatus = statusFilter;
        const data = await getDevelopers(params);
        setDeveloperList(data.data ?? []);
        setTotalPages(data.pagination?.totalPages ?? 1);
        setCurrentPage(page);
      } catch {
        setDeveloperList([]);
        setTotalPages(1);
      }
    },
    [sortField, sortDirection, statusFilter]
  );

  // 只需监听主要参数
  useEffect(() => {
    fetchDevelopers(1);
  }, [fetchDevelopers]);

  // 分页
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage)
      fetchDevelopers(page);
  };

  return (
    <>
      <div className="overflow-hidden rounded-lg border border-border/50">
        {/* 表格容器 - 桌面版 */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50 hover:bg-transparent">
                <TableHead className="text-muted-foreground font-medium">
                  No.
                </TableHead>
                <TableHead className="text-muted-foreground font-medium">
                  Developers
                </TableHead>
                <TableHead className="text-muted-foreground font-medium">
                  Social Links
                </TableHead>
                <TableHead className="text-muted-foreground font-medium">
                  Project
                </TableHead>
                {SortField.map(({ type, label, info }) => (
                  <TableHead
                    key={type}
                    className="text-muted-foreground font-medium text-center cursor-pointer"
                    onClick={() => handleSort(type as SortField)}
                  >
                    <div className="flex items-center justify-center">
                      {label}
                      {getSortIcon(type as SortField)}
                      {info && (
                        <HoverCard>
                          <HoverCardTrigger>
                            <Info className="w-4 h-4" />
                          </HoverCardTrigger>
                          <HoverCardContent className="bg-white border-border/50 text-gray-900 shadow-lg">
                            {info}
                          </HoverCardContent>
                        </HoverCard>
                      )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {developerList.map((item, index) => (
                <TableRow
                  key={index}
                  className="border-border/50 hover:bg-muted/20"
                >
                  {/* 排名 */}
                  <TableCell>
                    {getRankDisplay((currentPage - 1) * 10 + index + 1)}
                  </TableCell>
                  {/* 开发者 */}
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {item.avatarUrl ? (
                        <Avatar className="h-10 w-10 rounded-full ">
                          <AvatarImage src={item.avatarUrl} />
                        </Avatar>
                      ) : (
                        <div className="h-10 w-10 bg-gradient-to-br from-orange-400 to-pink-500 text-white font-bold text-xs flex items-center justify-center rounded-full">
                          {item.username?.charAt(0)?.toUpperCase() || "U"}
                        </div>
                      )}
                      <div className="w-[calc(100%-60px)] overflow-hidden">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-foreground">
                            {!isAddress(item.username)
                              ? item.username.slice(0, 6) + "..."
                              : item.username.slice(0, 6) +
                                "..." +
                                item.username.slice(-4)}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <span>{item.title}</span>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      {item.socials.github && (
                        <a href={item.socials.github} target="_blank">
                          <GithubIcon className="w-4 h-4 hover:text-white" />
                        </a>
                      )}
                      {item.socials.telegram && (
                        <a href={item.socials.telegram} target="_blank">
                          <Send className="w-4 h-4 hover:text-white" />
                        </a>
                      )}
                      {item.socials.twitter && (
                        <a href={item.socials.twitter} target="_blank">
                          <TwitterIcon className="w-4 h-4 hover:text-white" />
                        </a>
                      )}
                    </div>
                  </TableCell>
                  {/* 项目 */}
                  <TableCell>
                    <div
                      className="flex items-center space-x-3 cursor-pointer"
                      onClick={() => window.open(item.project.url, "_blank")}
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={item.project.image} />
                        <AvatarFallback className="bg-gradient-to-br from-orange-400 to-pink-500 text-white font-bold text-xs">
                          {item.project.name?.charAt(0)?.toUpperCase() || "P"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <div className="font-medium text-foreground">
                          {item.project.name}
                        </div>
                        <div className="mt-1">
                          {getStatusDisplay(item.project.status)}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  {/* 数据列 */}
                  <TableCell className="text-center text-foreground font-medium">
                    {item.githubAnalysis?.followers ?? "No Verified Github"}
                  </TableCell>
                  <TableCell className="text-center font-medium text-foreground">
                    {item.githubAnalysis?.stars ?? "No Verified Github"}
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="text-[#17E1A4] font-bold">
                      {item.githubAnalysis?.rating ?? "No Verified Github"}
                    </span>
                  </TableCell>
                  <TableCell className="text-center py-4">
                    <span
                      style={{ background: "rgba(126,143,255,0.24)" }}
                      className="bg-primary/20 text-primary border-primary/30 px-[20px] py-2 rounded-[16px] font-bold"
                    >
                      {item.githubAnalysis?.activity ?? "No Verified Github"}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      {/* 翻页器 */}
      <div className="mt-6 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) handlePageChange(currentPage - 1);
                }}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>

            {/* Page numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              // Show first page, last page, current page, and pages around current page
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(page);
                      }}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              }

              // Show ellipsis for gaps
              if (page === currentPage - 2 || page === currentPage + 2) {
                return (
                  <PaginationItem key={page}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }

              return null;
            })}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages)
                    handlePageChange(currentPage + 1);
                }}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}
