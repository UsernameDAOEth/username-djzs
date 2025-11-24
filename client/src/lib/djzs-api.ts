import { nanoid } from "nanoid";

// Simulated Database Types
export interface DjzsEntry {
  id: string;
  title: string;
  zone: string;
  mode: string;
  problem: string;
  solution: string;
  useCases: string;
  tags: string[];
  summary: string;
  sessionId: string;
  externalLink: string | null;
  synced: boolean;
  createdAt: string;
}

const STORAGE_KEY = "djzs_entries_v1";

// Helper to get entries
const getEntries = (): DjzsEntry[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    return [];
  }
};

// Helper to save entries
const saveEntries = (entries: DjzsEntry[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
};

export const djzsApi = {
  async assistant(query: string, zone: string, mode: string, sessionId?: string) {
    // Simulate network delay
    await new Promise(r => setTimeout(r, 1200));

    const safeZone = zone || "Zone 01 – DYOR";
    const safeMode = mode || "quick";
    const safeSessionId = sessionId || `session-${nanoid(8)}`;

    // Generate dynamic content based on mode
    let problem = `User is exploring: ${query}`;
    let solution = "Frame this topic through the DJZS lens, focusing on decentralized journaling, local-first storage, and agentic workflows.";
    let useCases = "Use this insight in a DJZS Journal entry, link it to the correct Zone, and sync it into the Anytype Member Vault as structured knowledge.";
    let responseText = "";

    const timestamp = new Date().toISOString();
    const header = `/// DJZS_AGENT // ${safeZone.toUpperCase()} // ${safeMode.toUpperCase()} ///\n/// TIMESTAMP: ${timestamp} ///\n\n`;

    if (safeMode === "quick") {
        responseText = `${header}QUERY: "${query}"\n\n> ANALYSIS: ${safeZone} vector detected.\n\n> ANSWER: \nBased on protocol parameters, this requires immediate verification. The integration of ${safeZone} suggests a bullish outlook on sovereignty.\n\n> ACTION: Verify on-chain data.`;
    } else if (safeMode === "alpha") {
        responseText = `${header}/// ALPHA LEAK /// CONFIDENTIAL ///\n\nNARRATIVE: ${query}\n\nSIGNAL: 88/100\n\nOPPORTUNITY:\nEarly accumulation of identity-layer protocols is underpriced.\n\nSTRATEGY:\nPosition into modular identity stacks.`;
    } else if (safeMode === "research") {
        responseText = `${header}DEEP DIVE ANALYSIS: ${query}\n\n1. THESIS\nThe intersection of ${safeZone} and autonomous agents represents the next major repricing event.\n\n2. TECHNICAL VECTORS\n- Interoperability: High\n- Privacy Preservation: Critical (Zero-Knowledge Stack)\n- Latency: <50ms optimized\n\n3. MARKET IMPACT\nShift from rent-seeking Web2 platforms to protocol-owned liquidity and user-owned data lakes. Expect 10x growth in "Headless Brands" managed by AI agents.\n\n4. RISKS\n- Smart contract contagion\n- Agent hallucinations in financial execution`;
    } else {
        responseText = `${header}Problem:\n${problem}\n\nSolution:\n${solution}\n\nUse Cases:\n${useCases}`;
    }

    const id = nanoid(12);
    const title = `DJZS – ${safeZone} – ${safeMode} – ${id}`;

    const entry: DjzsEntry = {
      id,
      title,
      zone: safeZone,
      mode: safeMode,
      problem,
      solution,
      useCases,
      tags: [],
      summary: solution,
      sessionId: safeSessionId,
      externalLink: null,
      synced: false,
      createdAt: timestamp
    };

    const entries = getEntries();
    entries.push(entry);
    saveEntries(entries);

    return {
      response: responseText,
      sessionId: safeSessionId,
      zone: safeZone,
      mode: safeMode,
      journalEntryId: id
    };
  },

  async getSyncEntries() {
    await new Promise(r => setTimeout(r, 300));
    const entries = getEntries();
    return entries.filter(e => !e.synced);
  },

  async markSynced(id: string) {
    await new Promise(r => setTimeout(r, 300));
    const entries = getEntries();
    const idx = entries.findIndex(e => e.id === id);
    if (idx !== -1) {
      entries[idx].synced = true;
      saveEntries(entries);
      return { ok: true, id };
    }
    throw new Error("Entry not found");
  },
  
  async clearEntries() {
    localStorage.removeItem(STORAGE_KEY);
  },

  // --- Authentication Simulation ---
  
  async requestChallenge(appName: string) {
    await new Promise(r => setTimeout(r, 800));
    // In a real app, this calls POST /v1/auth/challenges
    return {
      challenge_id: nanoid(24),
      status: "pending_user_code"
    };
  },

  async verifyChallenge(challenge_id: string, code: string) {
    await new Promise(r => setTimeout(r, 1000));
    
    // Mock verification - accept any 4 digit code for prototype
    if (code.length === 4 && /^\d+$/.test(code)) {
      const apiKey = `sk_${nanoid(32)}`;
      // Store in local storage for persistence
      localStorage.setItem("djzs_anytype_key", apiKey);
      return {
        api_key: apiKey,
        success: true
      };
    }
    
    throw new Error("Invalid code. Please check Anytype app.");
  },

  isAuthenticated() {
    return !!localStorage.getItem("djzs_anytype_key");
  },

  disconnect() {
    localStorage.removeItem("djzs_anytype_key");
  }
};
