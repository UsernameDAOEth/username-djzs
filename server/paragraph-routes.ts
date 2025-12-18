import { Router } from "express";
import { 
  getParagraphClient,
  getParagraphAuthClient,
  hasApiKey,
  getPublication, 
  getPublicationPosts, 
  getPostBySlug,
  getUserByWallet,
} from "./paragraph-service";

const router = Router();

router.get("/api/paragraph/health", async (_req, res) => {
  try {
    const hasKey = hasApiKey();
    res.json({
      ok: true,
      status: "connected",
      authenticated: hasKey,
      note: hasKey 
        ? "Paragraph API key configured - full access available" 
        : "Using public endpoints only (no API key)",
    });
  } catch (error: any) {
    res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
});

router.get("/api/paragraph/publication/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const publication = await getPublication(slug);
    
    if (!publication) {
      return res.status(404).json({
        ok: false,
        error: "Publication not found",
      });
    }

    res.json({
      ok: true,
      publication,
    });
  } catch (error: any) {
    res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
});

router.get("/api/paragraph/publication/:publicationId/posts", async (req, res) => {
  try {
    const { publicationId } = req.params;
    const limit = parseInt(req.query.limit as string) || 10;
    
    const posts = await getPublicationPosts(publicationId, limit);

    res.json({
      ok: true,
      posts,
      count: posts.length,
    });
  } catch (error: any) {
    res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
});

router.get("/api/paragraph/publication/:publicationId/post/:slug", async (req, res) => {
  try {
    const { publicationId, slug } = req.params;
    const post = await getPostBySlug(publicationId, slug);
    
    if (!post) {
      return res.status(404).json({
        ok: false,
        error: "Post not found",
      });
    }

    res.json({
      ok: true,
      post,
    });
  } catch (error: any) {
    res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
});

router.get("/api/paragraph/user/:wallet", async (req, res) => {
  try {
    const { wallet } = req.params;
    const user = await getUserByWallet(wallet);
    
    if (!user) {
      return res.status(404).json({
        ok: false,
        error: "User not found",
      });
    }

    res.json({
      ok: true,
      user,
    });
  } catch (error: any) {
    res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
});

router.post("/api/paragraph/publish", async (req, res) => {
  try {
    const { title, content, publicationId, tags } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        ok: false,
        error: "Title and content are required",
      });
    }

    if (!hasApiKey()) {
      return res.status(401).json({
        ok: false,
        error: "PARAGRAPH_API_KEY required for publishing",
        hint: "Add your Paragraph API key to enable publishing to Paragraph",
        setupUrl: "https://paragraph.com/settings/api",
      });
    }

    try {
      const authClient = getParagraphAuthClient();
      
      res.json({
        ok: true,
        message: "Paragraph API configured and ready for publishing",
        note: "Create a draft or publish directly using Paragraph's write API",
        received: {
          title,
          contentLength: content.length,
          publicationId: publicationId || "default",
          tags: tags || [],
        },
        nextSteps: [
          "1. Configure your publication ID in PARAGRAPH_PUBLICATION_ID",
          "2. Publishing will create drafts that can be reviewed in Paragraph dashboard",
          "3. Visit https://paragraph.com to manage your publications",
        ],
      });
    } catch (authError: any) {
      return res.status(500).json({
        ok: false,
        error: authError.message,
        hint: "Failed to initialize Paragraph authenticated client",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
});

export default router;
