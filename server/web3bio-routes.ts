import { Router } from "express";

const router = Router();

const API_BASE = "https://api.web3.bio";

// Proxy route for Web3.bio Universal Profile API
router.get("/api/web3bio/profile/:identity", async (req, res) => {
  try {
    const { identity } = req.params;
    
    if (!identity) {
      return res.status(400).json({ 
        success: false, 
        error: "Identity parameter is required" 
      });
    }

    const response = await fetch(`${API_BASE}/profile/${encodeURIComponent(identity)}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        return res.status(404).json({ 
          success: false, 
          error: "Profile not found",
          identity 
        });
      }
      throw new Error(`Web3.bio API error: ${response.status}`);
    }

    const profiles = await response.json();
    
    res.json({
      success: true,
      identity,
      profiles,
      count: Array.isArray(profiles) ? profiles.length : 1,
      source: "web3.bio"
    });
  } catch (error: any) {
    console.error("[Web3.bio] Profile fetch error:", error);
    res.status(500).json({ 
      success: false, 
      error: error.message,
      hint: "Check Web3.bio API status"
    });
  }
});

// Name service resolution (lighter response)
router.get("/api/web3bio/ns/:identity", async (req, res) => {
  try {
    const { identity } = req.params;
    
    if (!identity) {
      return res.status(400).json({ 
        success: false, 
        error: "Identity parameter is required" 
      });
    }

    const response = await fetch(`${API_BASE}/ns/${encodeURIComponent(identity)}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        return res.status(404).json({ 
          success: false, 
          error: "Identity not found",
          identity 
        });
      }
      throw new Error(`Web3.bio NS API error: ${response.status}`);
    }

    const profiles = await response.json();
    
    res.json({
      success: true,
      identity,
      profiles,
      count: Array.isArray(profiles) ? profiles.length : 1,
      source: "web3.bio/ns"
    });
  } catch (error: any) {
    console.error("[Web3.bio] NS fetch error:", error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Platform-specific profile lookup
router.get("/api/web3bio/:platform/:identity", async (req, res) => {
  try {
    const { platform, identity } = req.params;
    
    const validPlatforms = ["ens", "basenames", "farcaster", "lens", "linea", "unstoppabledomains", "solana"];
    
    if (!validPlatforms.includes(platform)) {
      return res.status(400).json({ 
        success: false, 
        error: `Invalid platform. Valid options: ${validPlatforms.join(", ")}` 
      });
    }

    const response = await fetch(`${API_BASE}/profile/${platform}/${encodeURIComponent(identity)}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        return res.status(404).json({ 
          success: false, 
          error: `${platform} profile not found`,
          identity 
        });
      }
      throw new Error(`Web3.bio ${platform} API error: ${response.status}`);
    }

    const profile = await response.json();
    
    res.json({
      success: true,
      platform,
      identity,
      profile,
      source: `web3.bio/${platform}`
    });
  } catch (error: any) {
    console.error(`[Web3.bio] ${req.params.platform} fetch error:`, error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

export default router;
