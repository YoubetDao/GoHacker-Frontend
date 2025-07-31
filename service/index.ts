// 实时项目数据接口定义
export interface LiveProject {
  virtualId: string;
  projectName: string;
  tokenSymbol: string;
  tokenLogoUrl: string;
  endTime: string; // ISO 8601 日期字符串
  participantCount: number;
  pointsPledged: number;
  virtualCommitted: number;
}

// 分页信息接口定义
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// 实时项目API响应接口定义
export interface LiveProjectsResponse {
  data: LiveProject[];
  pagination: Pagination;
}

// 已启动项目数据接口定义
export interface LaunchedProject {
  virtualId: string;
  projectName: string;
  tokenSymbol: string;
  tokenLogoUrl: string;
  launchDate: string; // ISO 8601 日期字符串
  daysFromFirstUnlock: number;
  participantCount: number; // 参与者数量
  pointsPledged: number; // 承诺积分
  virtualCommitted: number; // 承诺的$VIRTUAL
  priceUSD: number;
  finalMarketCap: number;
  change24h: string; // 24小时变化百分比（字符串格式，如："-75.58"）
  holderCount: number; // 持有者数量
  totalStakers: number; // 总质押者数量
  totalStakedAmount: string; // 总质押金额（字符串格式）
  developers: number; // 开发者数量
}

// 已启动项目API响应接口定义
export interface LaunchedProjectsResponse {
  data: LaunchedProject[];
  pagination: Pagination;
}

// 涨跌幅代币数据接口
export interface TokenData {
  name: string;
  symbol: string;
  virtualId: string;
  volume24hUSD: number;
  currentPriceUSD: number;
  priceChangePercent24h: number;
  image: {
    url: string;
  };
}

// 生态系统信息接口定义
export interface EcosystemInfo {
  id: number;
  name: string;
  displayName: string;
  totalGenesesProjects: number; // 创世项目总数
  totalSentientProjects: number; // 智能项目总数
  totalGenesesMarketCapUSD: string; // 创世项目总市值（USD）
  totalSentientMarketCapUSD: string; // 智能项目总市值（USD）
  totalUsers: number; // 总用户数
  totalDevelopers: number; // 总开发者数
  topGainers?: TokenData[]; // 涨幅榜
  topLosers?: TokenData[]; // 跌幅榜
  createdAt?: string; // 创建时间 (ISO 8601格式)
  updatedAt?: string; // 更新时间 (ISO 8601格式)
}

// 定义项目类型
interface Project {
  createdAt: string;
  image: string;
  name: string;
  status: string;
  symbol: string;
  url: string;
}

// 定义项目社交媒体类型
interface ProjectSocials {
  VERIFIED_LINKS?: {
    TWITTER?: string;
    GITHUB?: string;
    TELEGRAM?: string;
    DISCORD?: string;
    WEBSITE?: string;
  };
}

// 定义创世信息类型
interface Genesis {
  id: number;
  endsAt: string;
  result: unknown;
  status: string;
  startsAt: string;
  stepData: unknown;
  createdAt: string;
  genesisId: string;
  genesisTx: string;
  updatedAt: string;
  genesisAddress: string;
  processedParticipants: string;
}

// 定义代币释放信息
interface TokenRelease {
  id: number;
  bips: number;
  type: string;
  duration: number | null;
  startsAt: string;
  createdAt: string;
  updatedAt: string;
  durationUnit: string | null;
}

// 定义代币接收者
interface TokenRecipient {
  id: number;
  amount: string;
  actualId: unknown;
  createdAt: string;
  updatedAt: string;
  recipientAddress: string;
}

// 定义代币经济学
interface Tokenomics {
  id: number;
  bips: number;
  name: string;
  project: unknown;
  isLocked: boolean;
  releases: TokenRelease[];
  startsAt: string;
  linearBips: number[];
  recipients: TokenRecipient[];
  description: string;
  numOfUnlocksForEachLinear: number[];
  linearEndTimestampRelative: number;
  linearStartTimestampRelative: number[];
}

// 定义项目成员
interface ProjectMember {
  id: number;
  bio: string;
  title: string;
  userId: number;
  socials: {
    github: string | null;
    twitter: string | null;
    telegram: string | null;
  };
  username: string;
  avatarUrl: string;
  createdAt: string;
  hasGithub: boolean;
  updatedAt: string;
  virtualId: number;
  isAccepted: boolean;
  walletAddress: string;
  githubAnalysis: unknown;
}

// 定义GitHub分析
interface ProjectGitHubAnalysis {
  devs: number;
  overallRating: number;
  overallActivity: number;
}

// 定义完整项目详情
export interface ProjectDetail {
  id: number;
  virtualId: number;
  virtualIdString: string;
  role: string;
  status: string;
  name: string;
  overview: string;
  description: string;
  isVerified: boolean;
  category: string;
  chain: string;
  agentFramework: string;
  socials: ProjectSocials;
  url: string;
  symbol: string;
  image: string;
  genesis: Genesis;
  tokenomics: Tokenomics[];
  tags: string[];
  projectMembers: ProjectMember[];
  metrics: Record<string, unknown>;
  addresses: Record<string, unknown>;
  githubAnalysis: ProjectGitHubAnalysis;
  createdAt: string;
  updatedAt: string;
}

// 定义社交媒体类型
interface Socials {
  github: string | null;
  telegram: string | null;
  twitter: string | null;
}

// 定义开发者类型
export interface Developer {
  avatarUrl: string | null;
  bio: string | null;
  createdAt: string;
  githubAnalysis: {
    forks: number;
    stars: number;
    rating: number;
    activity: number;
    followers: number;
  } | null; // 根据实际情况可以进一步细化
  hasGithub: boolean;
  id: number;
  isAccepted: boolean;
  project: Project;
  socials: Socials;
  title: string;
  updatedAt: string;
  userId: number;
  username: string;
  virtualId: number;
  walletAddress: string;
}

// 定义 API 响应类型
export interface DevelopersResponse {
  data: Developer[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasNext: boolean;
  };
}

// 定义项目 API 响应类型
export interface ProjectsResponse {
  data: ProjectDetail[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export const getDevelopers = async ({
  page = 1,
  pageSize = 10,
  sortBy,
  sortOrder,
  projectStatus,
}: {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: string;
  projectStatus?: string;
}): Promise<DevelopersResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
  });

  if (sortBy && sortOrder) {
    params.append("sortBy", sortBy);
    params.append("sortOrder", sortOrder);
  }

  if (projectStatus && projectStatus !== "all") {
    params.append("projectStatus", projectStatus);
  }

  const res = await fetch(`/api/leaderboard/builders?${params.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data = await res.json();
  console.log("Raw API Response:", data); // 调试日志

  // 如果API响应格式不同，进行适配
  return {
    data: data.data || data || [],
    pagination: data.pagination || {
      page: page,
      limit: pageSize,
      total: data.total || 0,
      totalPages: Math.ceil((data.total || 0) / pageSize),
      hasNextPage: false,
      hasNext: false,
    },
  };
};

export const getProjects = async ({
  page = 1,
  pageSize = 10,
  sortBy,
  sortOrder,
  projectStatus,
  genesisStartsTo,
}: {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: string;
  projectStatus?: string;
  genesisStartsTo?: string;
}): Promise<ProjectsResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: pageSize.toString(), // 注意这里使用 limit 而不是 pageSize，根据你的 JSON 数据
  });

  if (sortBy && sortOrder) {
    params.append("sortBy", sortBy);
    params.append("sortOrder", sortOrder);
  }

  if (projectStatus && projectStatus !== "all") {
    params.append("projectStatus", projectStatus);
  }

  if (genesisStartsTo && genesisStartsTo !== "all") {
    params.append("genesisStartsTo", genesisStartsTo);
  }

  const res = await fetch(`/api/leaderboard/projects?${params.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data = await res.json();
  console.log("Raw Projects API Response:", data); // 调试日志

  // 适配 API 响应格式
  return {
    data: data.data || data || [],
    pagination: data.pagination || {
      page: page,
      limit: pageSize,
      total: data.total || 0,
      totalPages: Math.ceil((data.total || 0) / pageSize),
      hasNext: false,
      hasPrev: false,
    },
  };
};

// 定义 Yapper 用户类型
export interface YapperUser {
  id: number;
  twitterHandle: string;
  twitterUserId: string | null;
  displayName: string;
  avatarUrl: string | null;
  bio: string | null;
  followersCount: number;
  followingCount: number;
  tweetCount: number;
  score: string | null;
  statistics: {
    totalLikes: number;
    totalTweets: number;
    totalReplies: number;
    weeklyTweets: number;
    monthlyTweets: number;
    totalRetweets: number;
    lastActivityDate: string;
    avgEngagementRate: number;
  } | null;
  rank: number | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// 定义 Yapper API 响应类型
export interface YapperResponse {
  data?: YapperUser[];
  // 如果API返回的是数组，则直接是 YapperUser[]
}

export const getYappers = async (): Promise<YapperUser[]> => {
  const res = await fetch("/api/yapper/leaderboard", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data = await res.json();
  console.log("Raw Yapper API Response:", data); // 调试日志

  // 根据API响应格式进行适配
  // 如果返回的是 { data: YapperUser[] } 格式
  if (Array.isArray(data.data)) {
    return data.data;
  }
  // 如果直接返回 YapperUser[] 数组
  if (Array.isArray(data)) {
    return data;
  }

  // 兜底返回空数组
  return [];
};

export const getLiveProjects =
  async (): Promise<LiveProjectsResponse | null> => {
    try {
      const res = await fetch("/api/geneses/pledging", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data: LiveProjectsResponse = await res.json();
      return data;
    } catch (error) {
      console.error("获取实时项目数据失败:", error);
      return null;
    }
  };

export const getLaunchedProjects = async (
  page: number = 1,
  limit: number = 10,
  sortBy?: string,
  sortOrder: "asc" | "desc" = "desc"
): Promise<LaunchedProjectsResponse | null> => {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (sortBy) {
      params.append("sortBy", sortBy);
      params.append("sortOrder", sortOrder);
    }

    const res = await fetch(`/api/geneses/succeeded?${params.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data: LaunchedProjectsResponse = await res.json();
    return data;
  } catch (error) {
    console.error("获取已启动项目数据失败:", error);
    return null;
  }
};

export const getEcosystemInfo = async (): Promise<EcosystemInfo | null> => {
  try {
    const res = await fetch("/api/ecosystem/virtuals-protocol", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data: EcosystemInfo = await res.json();
    return data;
  } catch (error) {
    console.error("获取生态系统信息失败:", error);
    return null;
  }
};
