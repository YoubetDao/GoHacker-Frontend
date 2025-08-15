// Project detail interface response type
export interface ProjectDetail {
  virtualId: string;
  projectName: string;
  tokenSymbol: string;
  tokenLogoUrl: string;
  launchDate: string;
  daysFromFirstUnlock: number;
  participantCount: number;
  pointsPledged: number;
  virtualCommitted: number;
  priceUSD: number;
  finalMarketCap: number;
  change24h: string;
  holderCount: number;
  totalStakers: number;
  totalStakedAmount: string;
  developers: number;
  dexscreenerUrl: string;
}

// Token information in trading records
export interface TradeToken {
  amount: string;
  tokenSymbol: string;
}

// Trading record details
export interface TradeRecord {
  time: string;
  type: "buy" | "sell";
  volumeUSD: string;
  priceUSD: string;
  userAddress: string;
  tokens: TradeToken[];
  txHashUrl: string;
}

// Pagination information
export interface Pagination {
  page: string;
  limit: string;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Trading records response
export interface TradesResponse {
  data: TradeRecord[];
  pagination: Pagination;
}

// Pledge participant information
export interface PledgeParticipant {
  walletAddress: string;
  totalPoints: number;
  totalVirtuals: number;
}

// Cluster node information
export interface ClusterNode {
  address: string;
  points: number;
  virtuals: number;
}

// Cluster information
export interface Cluster {
  clusterId: number;
  size: number;
  totalPoints: number;
  totalVirtuals: number;
  nodes: ClusterNode[];
}

// Pledge holders and cluster information response
export interface PledgeHoldersClusterResponse {
  id: number;
  virtualId: string;
  genesisId: string;
  projectId: number;
  participants: PledgeParticipant[];
  clusters: Cluster[];
  totalParticipants: number;
  totalClusters: number;
  totalPoints: string;
  totalVirtuals: string;
  createdAt: string;
  updatedAt: string;
  pagination?: Pagination;
}

/**
 * Get project details
 * @param virtualId Project ID
 * @returns Project detail data
 */
export async function getProjectDetail(
  virtualId: string
): Promise<ProjectDetail> {
  try {
    const response = await fetch(
      `https://api.hunknownz.xyz:2096/agent/virtual/${virtualId}`
    );

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    return (await response.json()) as ProjectDetail;
  } catch (error) {
    console.error("Failed to fetch project details:", error);
    throw error;
  }
}

/**
 * Get project trading records
 * @param virtualId Project ID
 * @param page Page number
 * @param limit Items per page
 * @returns Trading records data
 */
export async function getProjectTrades(
  virtualId: string,
  page: number = 1,
  limit: number = 10
): Promise<TradesResponse> {
  try {
    const response = await fetch(
      `https://api.hunknownz.xyz:2096/agent/virtual/${virtualId}/trades?page=${page}&limit=${limit}`
    );

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    return (await response.json()) as TradesResponse;
  } catch (error) {
    console.error("Failed to fetch trading records:", error);
    throw error;
  }
}

/**
 * Get project pledge holders and cluster information
 * @param virtualId Project ID
 * @param page Page number (optional, for pagination)
 * @param limit Items per page (optional, for pagination)
 * @returns Pledge holders and cluster information data
 */
export async function getProjectPledgeHoldersCluster(
  virtualId: string,
  page?: number,
  limit?: number
): Promise<PledgeHoldersClusterResponse> {
  try {
    let url = `https://api.hunknownz.xyz:2096/agent/virtual/${virtualId}/pledge-holders-cluster`;
    
    // Add pagination parameters if provided
    if (page !== undefined && limit !== undefined) {
      url += `?page=${page}&limit=${limit}`;
    }
    
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    return (await response.json()) as PledgeHoldersClusterResponse;
  } catch (error) {
    console.error("Failed to fetch pledge holders and cluster information:", error);
    throw error;
  }
}

// Staker information
export interface Staker {
  address: string;
  amount: number;
  totalStaked: number;
  totalWithdrawn: number;
  positionCount: number;
  lastTransactionAt: string;
}

// Stakers response
export interface StakersResponse {
  data: Staker[];
  pagination: Pagination;
}

/**
 * Get project stakers information
 * @param virtualId Project ID
 * @param page Page number
 * @param limit Items per page
 * @returns Stakers data
 */
export async function getProjectStakers(
  virtualId: string,
  page: number = 1,
  limit: number = 10
): Promise<StakersResponse> {
  try {
    const response = await fetch(
      `https://api.hunknownz.xyz:2096/agent/virtual/${virtualId}/stakers?page=${page}&limit=${limit}`
    );

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    return (await response.json()) as StakersResponse;
  } catch (error) {
    console.error("Failed to fetch stakers information:", error);
    throw error;
  }
}

// Holder information
export interface Holder {
  address: string;
  balance: number;
  balanceUSD: number;
  costUSD: number;
  avgCostPerToken: number;
  realizedPnl: number;
  unrealizedPnl: number;
  lastTransactionTime: string | null;
  totalBought: number;
  totalSold: number;
  transactionCount: number;
}

// Holders response
export interface HoldersResponse {
  data: Holder[];
  pagination: Pagination;
}

/**
 * Get project holders information
 * @param virtualId Project ID
 * @param page Page number
 * @param limit Items per page
 * @returns Holders data
 */
export async function getProjectHolders(
  virtualId: string,
  page: number = 1,
  limit: number = 10
): Promise<HoldersResponse> {
  try {
    const response = await fetch(
      `https://api.hunknownz.xyz:2096/agent/virtual/${virtualId}/holders?page=${page}&limit=${limit}`
    );

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    return (await response.json()) as HoldersResponse;
  } catch (error) {
    console.error("Failed to fetch holders information:", error);
    throw error;
  }
}

// 代币认领记录信息
export interface TokenClaim {
  id: number;
  contractAddress: string;
  claimIndex: number;
  account: string;
  amount: number;
  transactionHash: string;
  blockNumber: number;
  claimedAt: string;
  chain: string;
  createdAt: string;
  updatedAt: string;
}

// 代币认领记录响应
export interface TokenClaimsResponse {
  data: TokenClaim[];
  pagination: Pagination;
}

/**
 * Get project token claims information
 * @param virtualId Project ID
 * @param page Page number
 * @param limit Items per page
 * @returns Token claims data
 */
export async function getProjectTokenClaims(
  virtualId: string,
  page: number = 1,
  limit: number = 10
): Promise<TokenClaimsResponse> {
  try {
    const response = await fetch(
      `https://api.hunknownz.xyz:2096/agent/virtual/${virtualId}/claims?page=${page}&limit=${limit}`
    );

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    return (await response.json()) as TokenClaimsResponse;
  } catch (error) {
    console.error("Failed to fetch token claims information:", error);
    throw error;
  }
}
