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
  ChevronsUpDown,
  GithubIcon,
  TwitterIcon,
  Send,
  ChevronLeft,
  ChevronRight,
  Info,
} from "lucide-react";

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
      className={`font-bold text-lg bg-gradient-to-b ${
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
  onStatusFilterChange: (value: string) => void;
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
    if (sortField !== field) return <ChevronsUpDown className="ml-2 h-4 w-4" />;
    if (sortDirection === "asc") return <ChevronUp className="ml-2 h-4 w-4" />;
    if (sortDirection === "desc")
      return <ChevronDown className="ml-2 h-4 w-4" />;
    return <ChevronsUpDown className="ml-2 h-4 w-4" />;
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
    <div className={` ${developerList.length === 0 ? "mb-[940px]" : ""}`}>
      {/* 表格 */}
      <div className="relative bg-[rgba(34,39,63,0.5)] border-[2px] border-[rgba(151,151,151,0.54)] rounded-[20px] overflow-hidden">
        {/* 表格容器 - 桌面版 */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow className="bg-[rgba(34,39,63,0.5)] hover:bg-[rgba(34,39,63,0.5)] border-b border-[rgba(153,150,198,0.36)]">
                <TableHead className="text-[#999999] text-base py-6 text-center">
                  No.
                </TableHead>
                <TableHead className="text-[#999999] text-base">
                  Developers
                </TableHead>
                <TableHead className="text-[#999999] text-base">
                  Social Links
                </TableHead>
                <TableHead className="text-[#999999] text-base">
                  Project
                </TableHead>
                {SortField.map(({ type, label, info }) => (
                  <TableHead
                    key={type}
                    className="text-[#999999] text-base text-center cursor-pointer"
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
                          <HoverCardContent className="bg-[#222] border-[#222] text-white">
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
                  className="border-b border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.02)] h-[84px]"
                >
                  {/* 排名 */}
                  <TableCell className="font-bold text-lg text-center py-4">
                    {getRankDisplay((currentPage - 1) * 10 + index + 1)}
                  </TableCell>
                  {/* 开发者 */}
                  <TableCell className="py-4 w-[200px] overflow-hidden">
                    <div className="flex items-center w-[200px] gap-2">
                      {item.avatarUrl ? (
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={item.avatarUrl} />
                        </Avatar>
                      ) : (
                        <div className="h-12 w-12 bg-gradient-to-br from-orange-400 to-pink-500 text-white font-bold text-xs flex items-center justify-center rounded-full">
                          {item.username?.charAt(0)?.toUpperCase() || "U"}
                        </div>
                      )}
                      <div className="w-[calc(100%-60px)] overflow-hidden">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-lg text-white">
                            {!isAddress(item.username)
                              ? item.username.slice(0, 6) + "..."
                              : item.username.slice(0, 6) +
                                "..." +
                                item.username.slice(-4)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-[12px] text-[#999999]">
                          <span>{item.title}</span>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div>
                      <div className="flex items-center gap-1 text-[12px] text-[#999999]">
                        {item.socials.github && (
                          <a href={item.socials.github} target="_blank">
                            <GithubIcon className="w-4 h-4" />
                          </a>
                        )}
                        {item.socials.telegram && (
                          <a href={item.socials.telegram} target="_blank">
                            <Send className="w-4 h-4" />
                          </a>
                        )}
                        {item.socials.twitter && (
                          <a href={item.socials.twitter} target="_blank">
                            <TwitterIcon className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  {/* 项目 */}
                  <TableCell className="py-4">
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
                        <div className="text-[12px] text-[#fff] text-base">
                          {item.project.name}
                        </div>
                        <div className="mt-1">
                          {getStatusDisplay(item.project.status)}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  {/* 数据列 */}
                  <TableCell className="text-center font-bold py-4 text-white">
                    {item.githubAnalysis?.followers ?? "No Verified Github"}
                  </TableCell>
                  <TableCell className="text-center font-bold py-4 text-white">
                    {item.githubAnalysis?.stars ?? "No Verified Github"}
                  </TableCell>
                  <TableCell className="text-center py-4">
                    <span className="text-[#17E1A4] font-bold">
                      {item.githubAnalysis?.rating ?? "No Verified Github"}
                    </span>
                  </TableCell>
                  <TableCell className="text-center py-4">
                    <span
                      style={{ background: "rgba(126,143,255,0.24)" }}
                      className="text-[#7EB8FF] px-[20px] py-2 rounded-[16px] font-bold"
                    >
                      {item.githubAnalysis?.activity ?? "No Verified Github"}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* 移动端固定列表格 */}
        <div className="block md:hidden">
          <div className="flex">
            {/* 固定的No.列 */}
            <div className="flex-shrink-0 bg-[rgba(34,39,63,0.7)]">
              <div className="border-b border-[rgba(153,150,198,0.36)] bg-[rgba(34,39,63,0.5)] py-6 px-4 text-center">
                <div className="text-[#999999] text-base font-medium">No.</div>
              </div>
              {developerList.map((_, index) => (
                <div
                  key={index}
                  className="border-b border-[rgba(255,255,255,0.05)] h-[84px] flex items-center justify-center px-4"
                >
                  <div className="font-bold text-lg text-center">
                    {getRankDisplay((currentPage - 1) * 10 + index + 1)}
                  </div>
                </div>
              ))}
            </div>

            {/* 可滚动的其他列 */}
            <div className="flex-1 overflow-x-auto">
              <div className="min-w-[800px]">
                {/* 表头 */}
                <div className="flex border-b border-[rgba(153,150,198,0.36)] bg-[rgba(34,39,63,0.5)]">
                  <div className="flex-shrink-0 w-[200px] py-6 px-4">
                    <div className="text-[#999999] text-base">Developers</div>
                  </div>
                  <div className="flex-shrink-0 w-[120px] py-6 px-4">
                    <div className="text-[#999999] text-base">Social Links</div>
                  </div>
                  <div className="flex-shrink-0 w-[180px] py-6 px-4">
                    <div className="text-[#999999] text-base">Project</div>
                  </div>
                  {SortField.map(({ type, label, info }) => (
                    <div
                      key={type}
                      className="flex-shrink-0 w-[120px] py-6 px-4 text-center cursor-pointer"
                      onClick={() => handleSort(type as SortField)}
                    >
                      <div className="flex items-center justify-center text-[#999999] text-base">
                        {label}
                        {getSortIcon(type as SortField)}
                        {info && (
                          <HoverCard>
                            <HoverCardTrigger>
                              <Info className="w-4 h-4 ml-1" />
                            </HoverCardTrigger>
                            <HoverCardContent className="bg-[#222] border-[#222] text-white">
                              {info}
                            </HoverCardContent>
                          </HoverCard>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* 数据行 */}
                {developerList.map((item, index) => (
                  <div
                    key={index}
                    className="flex border-b border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.02)] h-[84px]"
                  >
                    {/* 开发者 */}
                    <div className="flex-shrink-0 w-[200px] py-4 px-4">
                      <div className="flex items-center gap-2">
                        {item.avatarUrl ? (
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={item.avatarUrl} />
                          </Avatar>
                        ) : (
                          <div className="h-12 w-12 bg-gradient-to-br from-orange-400 to-pink-500 text-white font-bold text-xs flex items-center justify-center rounded-full">
                            {item.username?.charAt(0)?.toUpperCase() || "U"}
                          </div>
                        )}
                        <div className="overflow-hidden">
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-lg text-white truncate">
                              {!isAddress(item.username)
                                ? item.username.slice(0, 6) + "..."
                                : item.username.slice(0, 6) +
                                  "..." +
                                  item.username.slice(-4)}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-[12px] text-[#999999]">
                            <span className="truncate">{item.title}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* 社交链接 */}
                    <div className="flex-shrink-0 w-[120px] py-4 px-4 flex items-center">
                      <div className="flex items-center gap-1 text-[12px] text-[#999999]">
                        {item.socials.github && (
                          <a href={item.socials.github} target="_blank">
                            <GithubIcon className="w-4 h-4" />
                          </a>
                        )}
                        {item.socials.telegram && (
                          <a href={item.socials.telegram} target="_blank">
                            <Send className="w-4 h-4" />
                          </a>
                        )}
                        {item.socials.twitter && (
                          <a href={item.socials.twitter} target="_blank">
                            <TwitterIcon className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                    
                    {/* 项目 */}
                    <div className="flex-shrink-0 w-[180px] py-4 px-4 flex items-center">
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
                        <div className="flex flex-col overflow-hidden">
                          <div className="text-[12px] text-[#fff] text-base truncate">
                            {item.project.name}
                          </div>
                          <div className="mt-1">
                            {getStatusDisplay(item.project.status)}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* 数据列 */}
                    <div className="flex-shrink-0 w-[120px] py-4 px-4 flex items-center justify-center">
                      <span className="text-center font-bold text-white">
                        {item.githubAnalysis?.followers ?? "No Verified Github"}
                      </span>
                    </div>
                    <div className="flex-shrink-0 w-[120px] py-4 px-4 flex items-center justify-center">
                      <span className="text-center font-bold text-white">
                        {item.githubAnalysis?.stars ?? "No Verified Github"}
                      </span>
                    </div>
                    <div className="flex-shrink-0 w-[120px] py-4 px-4 flex items-center justify-center">
                      <span className="text-[#17E1A4] font-bold">
                        {item.githubAnalysis?.rating ?? "No Verified Github"}
                      </span>
                    </div>
                    <div className="flex-shrink-0 w-[120px] py-4 px-4 flex items-center justify-center">
                      <span
                        style={{ background: "rgba(126,143,255,0.24)" }}
                        className="text-[#7EB8FF] px-[12px] py-1 rounded-[16px] font-bold text-sm"
                      >
                        {item.githubAnalysis?.activity ?? "No Verified Github"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 翻页器 */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center py-8 gap-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex cursor-pointer items-center px-3 py-2 text-sm bg-[rgba(34,39,63,0.5)] text-white rounded-md hover:bg-[rgba(34,39,63,0.8)] disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Prev
          </button>
          <div className="text-white text-sm">
            Page {currentPage} of {totalPages}
          </div>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex cursor-pointer items-center px-3 py-2 text-sm bg-[rgba(34,39,63,0.5)] text-white rounded-md hover:bg-[rgba(34,39,63,0.8)] disabled:opacity-50"
          >
            Next <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      )}
    </div>
  );
}
