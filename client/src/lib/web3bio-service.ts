// Web3.bio Universal Profile API Service
// Uses backend proxy at /api/web3bio/* to avoid rate limits

export interface Web3BioProfile {
  address: string;
  identity: string;
  platform: "ens" | "farcaster" | "lens" | "basenames" | "linea" | "solana" | "unstoppabledomains";
  displayName: string;
  avatar: string | null;
  description: string | null;
  status?: string | null;
  email?: string | null;
  location?: string | null;
  header?: string | null;
  contenthash?: string | null;
  links?: {
    website?: { link: string; handle: string; sources: string[] };
    github?: { link: string; handle: string; sources: string[] };
    twitter?: { link: string; handle: string; sources: string[] };
    farcaster?: { link: string; handle: string; sources: string[] };
    lens?: { link: string; handle: string; sources: string[] };
    [key: string]: { link: string; handle: string; sources: string[] } | undefined;
  };
  social?: {
    uid?: number | null;
    follower?: number;
    following?: number;
  };
}

export interface UniversalProfile {
  address: string;
  primaryIdentity: string;
  primaryPlatform: string;
  displayName: string;
  avatar: string | null;
  description: string | null;
  profiles: Web3BioProfile[];
  links: {
    website?: string;
    github?: string;
    twitter?: string;
    farcaster?: string;
    lens?: string;
  };
  totalFollowers: number;
  totalFollowing: number;
}

// Fetch universal profiles for an identity (address, ENS, Lens, Farcaster, etc.)
// Uses backend proxy to avoid rate limits and enable API key usage
export async function fetchUniversalProfile(identity: string): Promise<UniversalProfile | null> {
  try {
    const response = await fetch(`/api/web3bio/profile/${encodeURIComponent(identity)}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Web3.bio API error: ${response.status}`);
    }

    const data = await response.json();
    if (!data.success) {
      throw new Error(data.error || "Unknown error");
    }
    
    const profiles: Web3BioProfile[] = data.profiles;
    
    if (!profiles || profiles.length === 0) {
      return null;
    }

    // Get the primary profile (first one returned, usually most authoritative)
    const primary = profiles[0];
    
    // Aggregate links from all profiles
    const links: UniversalProfile["links"] = {};
    let totalFollowers = 0;
    let totalFollowing = 0;

    for (const profile of profiles) {
      if (profile.links) {
        if (profile.links.website && !links.website) {
          links.website = profile.links.website.link;
        }
        if (profile.links.github && !links.github) {
          links.github = profile.links.github.link;
        }
        if (profile.links.twitter && !links.twitter) {
          links.twitter = profile.links.twitter.link;
        }
        if (profile.links.farcaster && !links.farcaster) {
          links.farcaster = profile.links.farcaster.link;
        }
        if (profile.links.lens && !links.lens) {
          links.lens = profile.links.lens.link;
        }
      }
      
      if (profile.social) {
        totalFollowers += profile.social.follower || 0;
        totalFollowing += profile.social.following || 0;
      }
    }

    return {
      address: primary.address,
      primaryIdentity: primary.identity,
      primaryPlatform: primary.platform,
      displayName: primary.displayName,
      avatar: primary.avatar,
      description: primary.description,
      profiles,
      links,
      totalFollowers,
      totalFollowing,
    };
  } catch (error) {
    console.error("[Web3.bio] Error fetching profile:", error);
    throw error;
  }
}

// Fetch a basic name service resolution (lighter response)
export async function fetchNameService(identity: string): Promise<Web3BioProfile[] | null> {
  try {
    const response = await fetch(`/api/web3bio/ns/${encodeURIComponent(identity)}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Web3.bio NS API error: ${response.status}`);
    }

    const data = await response.json();
    if (!data.success) {
      throw new Error(data.error || "Unknown error");
    }
    
    return data.profiles;
  } catch (error) {
    console.error("[Web3.bio] Error fetching name service:", error);
    throw error;
  }
}

// Fetch platform-specific profile
export async function fetchPlatformProfile(
  platform: "ens" | "basenames" | "farcaster" | "lens" | "linea" | "unstoppabledomains" | "solana",
  identity: string
): Promise<Web3BioProfile | null> {
  try {
    const response = await fetch(`/api/web3bio/${platform}/${encodeURIComponent(identity)}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Web3.bio ${platform} API error: ${response.status}`);
    }

    const data = await response.json();
    if (!data.success) {
      throw new Error(data.error || "Unknown error");
    }
    
    return data.profile;
  } catch (error) {
    console.error(`[Web3.bio] Error fetching ${platform} profile:`, error);
    throw error;
  }
}

// Get platform display name
export function getPlatformDisplayName(platform: string): string {
  const names: Record<string, string> = {
    ens: "ENS",
    farcaster: "Farcaster",
    lens: "Lens",
    basenames: "Basenames",
    linea: "Linea",
    solana: "Solana/SNS",
    unstoppabledomains: "Unstoppable Domains",
  };
  return names[platform] || platform.toUpperCase();
}

// Get platform icon/color
export function getPlatformColor(platform: string): string {
  const colors: Record<string, string> = {
    ens: "#5298FF",
    farcaster: "#855DCD",
    lens: "#00501E",
    basenames: "#0052FF",
    linea: "#61DFFF",
    solana: "#9945FF",
    unstoppabledomains: "#0D67FE",
  };
  return colors[platform] || "#b2ff59";
}
