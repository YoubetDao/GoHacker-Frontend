// 定义项目类型
interface Project {
  createdAt: string;
  image: string;
  name: string;
  status: string;
  symbol: string;
  url: string;
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

  const res = await fetch(
    `/api/leaderboard/builders?${params.toString()}`,
    // `http://43.130.247.176:50061/leaderboard/builders?${params.toString()}`,
    // `https://api.hunknownz.xyz:2096/leaderboard/builders?${params.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

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
