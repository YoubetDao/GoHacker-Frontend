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
  ChevronLeft,
  ChevronRight,
  Info,
  ExternalLink,
} from "lucide-react";

import { ProjectDetail, getProjects } from "@/service";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

// 倒计时组件
const CountdownTimer = ({ endTime }: { endTime: string }) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isExpired: boolean;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: false });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const end = new Date(endTime);
      const difference = end.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  if (timeLeft.isExpired) {
    return <span className="text-red-400 font-bold">00:00:00</span>;
  }

  return (
    <div className="text-center">
      <div className="text-white font-bold text-sm">
        {timeLeft.days > 0 && `${String(timeLeft.days).padStart(2, "0")}d `}
        {String(timeLeft.hours).padStart(2, "0")}h{" "}
        {String(timeLeft.minutes).padStart(2, "0")}m{" "}
        {String(timeLeft.seconds).padStart(2, "0")}s
      </div>
    </div>
  );
};

const SortField = [
  {
    type: "github_analysis.overallRating",
    label: "GitHub Rating",
    info: "Overall GitHub rating based on development activity and code quality.",
    sort: true,
  },
  {
    type: "github_analysis.overallActivity",
    label: "Activity",
    info: "Current development activity level of the project.",
    sort: true,
  },
  {
    type: "github_analysis.devs",
    label: "Developers",
  },
  {
    type: "startsAt",
    label: "Start Date",
  },
];

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

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

type SortField =
  | "github_analysis.overallRating"
  | "github_analysis.overallActivity"
  | "genesis.endsAt";

type SortDirection = "asc" | "desc" | null;

interface ProjectTableProps {
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
}

export default function ProjectTable({ statusFilter }: ProjectTableProps) {
  const [sortField, setSortField] = useState<SortField | null>(
    "github_analysis.overallRating"
  );
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [projectList, setProjectList] = useState<ProjectDetail[]>([]);
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
  const fetchProjects = useCallback(
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
        const data = await getProjects(params);
        setProjectList(data.data ?? []);
        setTotalPages(data.pagination?.totalPages ?? 1);
        setCurrentPage(page);
      } catch {
        setProjectList([]);
        setTotalPages(1);
      }
    },
    [sortField, sortDirection, statusFilter]
  );

  // 只需监听主要参数
  useEffect(() => {
    fetchProjects(1);
  }, [fetchProjects]);

  // 分页
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage)
      fetchProjects(page);
  };

  return (
    <div className={` ${projectList.length === 0 ? "mb-[940px]" : ""}`}>
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
                  Project
                </TableHead>

                {SortField.map(({ type, label, info, sort }) => (
                  <TableHead
                    key={type}
                    className="text-[#999999] text-base text-center cursor-pointer"
                    onClick={() => handleSort(type as SortField)}
                  >
                    <div className="flex items-center justify-center">
                      {label}
                      {sort && getSortIcon(type as SortField)}
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
                <TableHead 
                  className="text-[#999999] text-base text-center cursor-pointer hover:text-white transition-colors"
                  onClick={() => handleSort("genesis.endsAt")}
                >
                  <div className="flex items-center justify-center">
                    Countdown
                    {getSortIcon("genesis.endsAt")}
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projectList.map((item, index) => (
                <TableRow
                  key={index}
                  className="border-b border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.02)] h-[84px]"
                >
                  {/* 排名 */}
                  <TableCell className="font-bold text-lg text-center py-4">
                    {getRankDisplay((currentPage - 1) * 10 + index + 1)}
                  </TableCell>
                  {/* 项目 */}
                  <TableCell className="py-4 w-[200px] overflow-hidden">
                    <div className="flex items-center w-[200px] gap-2">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={item.image} />
                        <AvatarFallback className="bg-gradient-to-br from-orange-400 to-pink-500 text-white font-bold text-xs">
                          {item.name?.charAt(0)?.toUpperCase() || "P"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="w-[calc(100%-60px)] overflow-hidden">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-lg text-white truncate">
                            {item.name}
                          </span>
                          {item.isVerified && (
                            <span className="text-blue-400 text-xs">✓</span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-[12px] text-[#999999]">
                          <span>{item.symbol}</span>

                          {item.socials.VERIFIED_LINKS?.TWITTER && (
                            <a
                              href={item.socials.VERIFIED_LINKS.TWITTER}
                              target="_blank"
                              className="text-gray-400 hover:text-blue-300"
                            >
                              <TwitterIcon className="w-4 h-4" />
                            </a>
                          )}
                          {item.socials.VERIFIED_LINKS?.GITHUB && (
                            <a
                              href={item.socials.VERIFIED_LINKS.GITHUB}
                              target="_blank"
                              className="text-gray-400 hover:text-gray-300"
                            >
                              <GithubIcon className="w-4 h-4" />
                            </a>
                          )}
                          {item.url && (
                            <a
                              href={item.url}
                              target="_blank"
                              className="text-gray-400 hover:text-gray-300"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}

                          {/* <span>{getStatusDisplay(item.status)}</span> */}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  {/* GitHub 评分 */}
                  <TableCell className="text-center py-4">
                    <span className="text-[#17E1A4] font-bold">
                      {item.githubAnalysis?.overallRating ?? "N/A"}
                    </span>
                  </TableCell>
                  {/* 活跃度 */}
                  <TableCell className="text-center py-4">
                    <span
                      style={{ background: "rgba(126,143,255,0.24)" }}
                      className="text-[#7EB8FF] px-[20px] py-2 rounded-[16px] font-bold"
                    >
                      {item.githubAnalysis?.overallActivity ?? "N/A"}
                    </span>
                  </TableCell>
                  {/* 开发者数量 */}
                  <TableCell className="text-center font-bold py-4 text-white">
                    {item.githubAnalysis?.devs ?? "N/A"}
                  </TableCell>
                  {/* 创建时间 */}
                  <TableCell className="text-center py-4 text-gray-300">
                    {formatDate(item.genesis.startsAt)}
                  </TableCell>
                  {/* 结束时间 */}
                  <TableCell className="text-center py-4 text-gray-300">
                    <div className="flex flex-col items-center gap-1">
                      {getStatusDisplay(item.genesis.status)}
                      <CountdownTimer endTime={item.genesis.endsAt} />
                    </div>
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
              {projectList.map((_, index) => (
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
              <div className="min-w-[1000px]">
                {/* 表头 */}
                <div className="flex border-b border-[rgba(153,150,198,0.36)] bg-[rgba(34,39,63,0.5)]">
                  <div className="flex-shrink-0 w-[200px] py-6 px-4">
                    <div className="text-[#999999] text-base">Project</div>
                  </div>
                  {SortField.map(({ type, label, info, sort }) => (
                    <div
                      key={type}
                      className="flex-shrink-0 w-[120px] py-6 px-4 text-center cursor-pointer"
                      onClick={() => handleSort(type as SortField)}
                    >
                      <div className="flex items-center justify-center text-[#999999] text-base">
                        {label}
                        {sort && getSortIcon(type as SortField)}
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
                  <div 
                    className="flex-shrink-0 w-[180px] py-6 px-4 text-center cursor-pointer"
                    onClick={() => handleSort("genesis.endsAt")}
                  >
                    <div className="flex items-center justify-center text-[#999999] text-base">
                      Countdown
                      {getSortIcon("genesis.endsAt")}
                    </div>
                  </div>
                </div>
                
                {/* 数据行 */}
                {projectList.map((item, index) => (
                  <div
                    key={index}
                    className="flex border-b border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.02)] h-[84px]"
                  >
                    {/* 项目 */}
                    <div className="flex-shrink-0 w-[200px] py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={item.image} />
                          <AvatarFallback className="bg-gradient-to-br from-orange-400 to-pink-500 text-white font-bold text-xs">
                            {item.name?.charAt(0)?.toUpperCase() || "P"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="overflow-hidden">
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-lg text-white truncate">
                              {item.name}
                            </span>
                            {item.isVerified && (
                              <span className="text-blue-400 text-xs">✓</span>
                            )}
                          </div>
                          <div className="flex items-center gap-1 text-[12px] text-[#999999]">
                            <span className="truncate">{item.symbol}</span>

                            {item.socials.VERIFIED_LINKS?.TWITTER && (
                              <a
                                href={item.socials.VERIFIED_LINKS.TWITTER}
                                target="_blank"
                                className="text-gray-400 hover:text-blue-300"
                              >
                                <TwitterIcon className="w-4 h-4" />
                              </a>
                            )}
                            {item.socials.VERIFIED_LINKS?.GITHUB && (
                              <a
                                href={item.socials.VERIFIED_LINKS.GITHUB}
                                target="_blank"
                                className="text-gray-400 hover:text-gray-300"
                              >
                                <GithubIcon className="w-4 h-4" />
                              </a>
                            )}
                            {item.url && (
                              <a
                                href={item.url}
                                target="_blank"
                                className="text-gray-400 hover:text-gray-300"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* GitHub 评分 */}
                    <div className="flex-shrink-0 w-[120px] py-4 px-4 flex items-center justify-center">
                      <span className="text-[#17E1A4] font-bold">
                        {item.githubAnalysis?.overallRating ?? "N/A"}
                      </span>
                    </div>
                    
                    {/* 活跃度 */}
                    <div className="flex-shrink-0 w-[120px] py-4 px-4 flex items-center justify-center">
                      <span
                        style={{ background: "rgba(126,143,255,0.24)" }}
                        className="text-[#7EB8FF] px-[12px] py-1 rounded-[16px] font-bold text-sm"
                      >
                        {item.githubAnalysis?.overallActivity ?? "N/A"}
                      </span>
                    </div>
                    
                    {/* 开发者数量 */}
                    <div className="flex-shrink-0 w-[120px] py-4 px-4 flex items-center justify-center">
                      <span className="text-center font-bold text-white">
                        {item.githubAnalysis?.devs ?? "N/A"}
                      </span>
                    </div>
                    
                    {/* 创建时间 */}
                    <div className="flex-shrink-0 w-[120px] py-4 px-4 flex items-center justify-center">
                      <span className="text-center text-gray-300">
                        {formatDate(item.genesis.startsAt)}
                      </span>
                    </div>
                    
                    {/* 结束时间 */}
                    <div className="flex-shrink-0 w-[180px] py-4 px-4 flex items-center justify-center">
                      <div className="flex flex-col items-center gap-1">
                        {getStatusDisplay(item.genesis.status)}
                        <CountdownTimer endTime={item.genesis.endsAt} />
                      </div>
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
