import { nanoid } from "nanoid";

// Vana Contract Addresses (Mainnet & Moksha Testnet)
export const VANA_CONTRACTS = {
  mainnet: {
    dataRefinerRegistry: "0x93c3EF89369fDcf08Be159D9DeF0F18AB6Be008c",
    queryEngine: "0xd25Eb66EA2452cf3238A2eC6C1FD1B7F5B320490",
    computeInstructionRegistry: "0x5786B12b4c6Ba2bFAF0e77Ed30Bf6d32805563A5",
    computeEngine: "0xb2BFe33FA420c45F1Cf1287542ad81ae935447bd",
    defaultComputeInstructionId: 3,
  },
  moksha: {
    dataRefinerRegistry: "0x93c3EF89369fDcf08Be159D9DeF0F18AB6Be008c",
    queryEngine: "0xd25Eb66EA2452cf3238A2eC6C1FD1B7F5B320490",
    computeInstructionRegistry: "0x5786B12b4c6Ba2bFAF0e77Ed30Bf6d32805563A5",
    computeEngine: "0xb2BFe33FA420c45F1Cf1287542ad81ae935447bd",
    defaultComputeInstructionId: 40,
  }
};

// DataDAO Types
export interface DataDAO {
  id: string;
  name: string;
  description: string;
  category: string;
  contributors: number;
  totalData: string;
  vrc20Symbol: string;
  rewardsDistributed: string;
}

export interface ContributionResult {
  success: boolean;
  contributionId: string;
  vrc20Earned: string;
  dataHash: string;
  timestamp: string;
}

export interface QueryResult {
  success: boolean;
  jobId: string;
  query: string;
  results: any[];
  recordCount: number;
  computeCost: string;
}

export interface AgentInsight {
  id: string;
  agentId: string;
  zone: string;
  content: string;
  tags: string[];
  createdAt: string;
  contributed: boolean;
  vrc20Earned?: string;
}

const STORAGE_KEY = "vana_contributions_v1";
const INSIGHTS_KEY = "vana_insights_v1";

// Helper to read stored contributions from localStorage
const readStoredContributions = (): ContributionResult[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    return [];
  }
};

// Helper to save contributions to localStorage
const writeStoredContributions = (contributions: ContributionResult[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contributions));
};

// Helper to read stored insights from localStorage
const readStoredInsights = (): AgentInsight[] => {
  try {
    const stored = localStorage.getItem(INSIGHTS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    return [];
  }
};

// Helper to save insights to localStorage
const writeStoredInsights = (insights: AgentInsight[]) => {
  localStorage.setItem(INSIGHTS_KEY, JSON.stringify(insights));
};

// Mock DataDAOs available on the network
const mockDataDAOs: DataDAO[] = [
  {
    id: "djzs-insights",
    name: "DJZS Agent Insights",
    description: "Collective intelligence from DJZS protocol agents",
    category: "AI/Research",
    contributors: 1247,
    totalData: "4.2 GB",
    vrc20Symbol: "DJZS",
    rewardsDistributed: "12,450 VANA"
  },
  {
    id: "crypto-alpha",
    name: "Crypto Alpha Collective",
    description: "Aggregated crypto research and alpha insights",
    category: "Finance",
    contributors: 892,
    totalData: "2.8 GB",
    vrc20Symbol: "ALPHA",
    rewardsDistributed: "8,200 VANA"
  },
  {
    id: "defi-strategies",
    name: "DeFi Strategies DAO",
    description: "Yield farming and DeFi strategy data",
    category: "DeFi",
    contributors: 634,
    totalData: "1.5 GB",
    vrc20Symbol: "STRAT",
    rewardsDistributed: "5,100 VANA"
  }
];

export const vanaService = {
  // Get available DataDAOs
  async getDataDAOs(): Promise<DataDAO[]> {
    await new Promise(r => setTimeout(r, 500));
    return mockDataDAOs;
  },

  // Get a specific DataDAO
  async getDataDAO(id: string): Promise<DataDAO | null> {
    await new Promise(r => setTimeout(r, 300));
    return mockDataDAOs.find(d => d.id === id) || null;
  },

  // Contribute agent insight to DataDAO
  async contributeInsight(
    dataDAOId: string,
    insight: {
      agentId: string;
      zone: string;
      content: string;
      tags: string[];
    }
  ): Promise<ContributionResult> {
    await new Promise(r => setTimeout(r, 1500));

    const contributionId = nanoid(16);
    const dataHash = `0x${nanoid(64)}`;
    const vrc20Earned = (Math.random() * 5 + 1).toFixed(2);

    const result: ContributionResult = {
      success: true,
      contributionId,
      vrc20Earned,
      dataHash,
      timestamp: new Date().toISOString()
    };

    // Store contribution
    const contributions = readStoredContributions();
    contributions.push(result);
    writeStoredContributions(contributions);

    // Store insight as contributed
    const insights = readStoredInsights();
    insights.push({
      id: nanoid(12),
      agentId: insight.agentId,
      zone: insight.zone,
      content: insight.content,
      tags: insight.tags,
      createdAt: new Date().toISOString(),
      contributed: true,
      vrc20Earned
    });
    writeStoredInsights(insights);

    return result;
  },

  // Get user's contributions
  async getContributions(): Promise<ContributionResult[]> {
    await new Promise(r => setTimeout(r, 300));
    return readStoredContributions();
  },

  // Get user's total earnings
  async getTotalEarnings(): Promise<{ vana: string; vrc20: Record<string, string> }> {
    await new Promise(r => setTimeout(r, 300));
    const contributions = readStoredContributions();
    const totalVRC20 = contributions.reduce((sum, c) => sum + parseFloat(c.vrc20Earned), 0);
    return {
      vana: (totalVRC20 * 0.1).toFixed(4),
      vrc20: {
        DJZS: totalVRC20.toFixed(2)
      }
    };
  },

  // Query collective intelligence from DataDAO
  async queryCollectiveIntelligence(
    dataDAOId: string,
    query: string,
    params?: any[]
  ): Promise<QueryResult> {
    await new Promise(r => setTimeout(r, 2000));

    const jobId = nanoid(12);
    
    // Simulate query results based on query content
    let results: any[] = [];
    
    if (query.toLowerCase().includes("alpha") || query.toLowerCase().includes("signal")) {
      results = [
        { id: 1, signal: "Layer 2 scaling narratives gaining momentum", confidence: 0.85, zone: "Zone 01 – DYOR" },
        { id: 2, signal: "Identity protocols underpriced relative to DeFi", confidence: 0.78, zone: "Zone 02 – Decentralized iD" },
        { id: 3, signal: "AI agent infrastructure breakout imminent", confidence: 0.92, zone: "Zone 03 – Blockchain Testnet" }
      ];
    } else if (query.toLowerCase().includes("trend") || query.toLowerCase().includes("narrative")) {
      results = [
        { id: 1, narrative: "Modular blockchain thesis", mentions: 342, sentiment: "bullish" },
        { id: 2, narrative: "Data ownership revolution", mentions: 287, sentiment: "bullish" },
        { id: 3, narrative: "Agent-to-agent commerce", mentions: 156, sentiment: "neutral" }
      ];
    } else {
      results = [
        { id: 1, insight: "DJZS protocol shows strong adoption metrics", source: "djzs-insights" },
        { id: 2, insight: "Local-first architecture preferred by privacy-focused users", source: "djzs-insights" },
        { id: 3, insight: "Micropayment models gaining traction in AI", source: "crypto-alpha" }
      ];
    }

    return {
      success: true,
      jobId,
      query,
      results,
      recordCount: results.length,
      computeCost: "0.002 VANA"
    };
  },

  // Get available query templates
  getQueryTemplates(): { name: string; query: string; description: string }[] {
    return [
      {
        name: "Top Alpha Signals",
        query: "SELECT signal, confidence FROM insights WHERE confidence > 0.7 ORDER BY confidence DESC LIMIT 10",
        description: "Get highest confidence alpha signals from the collective"
      },
      {
        name: "Trending Narratives",
        query: "SELECT narrative, mentions, sentiment FROM trends ORDER BY mentions DESC LIMIT 5",
        description: "Discover what narratives agents are tracking"
      },
      {
        name: "Zone Insights",
        query: "SELECT insight, zone, timestamp FROM zone_data WHERE zone = ? LIMIT 20",
        description: "Get insights from a specific DJZS zone"
      },
      {
        name: "Recent Activity",
        query: "SELECT * FROM contributions ORDER BY timestamp DESC LIMIT 50",
        description: "See the latest data contributions"
      }
    ];
  },

  // Check DataDAO access permissions (simulated)
  async checkPermissions(dataDAOId: string, wallet: string): Promise<{ hasDataAccess: boolean; hasComputeAccess: boolean }> {
    await new Promise(r => setTimeout(r, 500));
    return {
      hasDataAccess: true,
      hasComputeAccess: true
    };
  },

  // Get network stats
  async getNetworkStats(): Promise<{
    totalDataDAOs: number;
    totalContributors: number;
    totalDataSize: string;
    totalRewardsDistributed: string;
    averageEarningsPerContributor: string;
  }> {
    await new Promise(r => setTimeout(r, 400));
    return {
      totalDataDAOs: 24,
      totalContributors: 3891,
      totalDataSize: "18.7 GB",
      totalRewardsDistributed: "45,200 VANA",
      averageEarningsPerContributor: "11.62 VANA"
    };
  },

  // Clear all local data (for testing)
  clearData() {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(INSIGHTS_KEY);
  }
};
