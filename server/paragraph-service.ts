import { ParagraphAPI } from "@paragraph-com/sdk";

let paragraphClient: ParagraphAPI | null = null;
let paragraphAuthClient: ParagraphAPI | null = null;

export function getParagraphClient(): ParagraphAPI {
  if (!paragraphClient) {
    paragraphClient = new ParagraphAPI();
  }
  return paragraphClient;
}

export function getParagraphAuthClient(): ParagraphAPI {
  if (!paragraphAuthClient) {
    const apiKey = process.env.PARAGRAPH_API_KEY;
    if (!apiKey) {
      throw new Error("PARAGRAPH_API_KEY not configured");
    }
    paragraphAuthClient = new ParagraphAPI({ apiKey });
  }
  return paragraphAuthClient;
}

export function hasApiKey(): boolean {
  return !!process.env.PARAGRAPH_API_KEY;
}

export interface PublicationInfo {
  id: string;
  name: string;
  slug: string;
  description?: string;
  avatar?: string;
}

export interface PostInfo {
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  markdown?: string;
  publishedAt?: string;
  updatedAt?: string;
  coinId?: string;
}

export async function getPublication(slug: string): Promise<PublicationInfo | null> {
  try {
    const api = getParagraphClient();
    const publication = await api.publications.get({ slug }).single();
    return {
      id: publication.id,
      name: publication.name || slug,
      slug: publication.slug || slug,
      description: (publication as any).description,
      avatar: (publication as any).avatar,
    };
  } catch (error) {
    console.error("Error fetching publication:", error);
    return null;
  }
}

export async function getPublicationPosts(publicationId: string, limit = 10): Promise<PostInfo[]> {
  try {
    const api = getParagraphClient();
    const { items } = await api.posts.get({ publicationId });
    const limitedItems = items.slice(0, limit);
    return limitedItems.map((post: any) => ({
      id: post.id,
      title: post.title || "Untitled",
      subtitle: post.subtitle,
      slug: post.slug,
      markdown: post.markdown,
      publishedAt: post.publishedAt,
      updatedAt: post.updatedAt,
      coinId: post.coinId,
    }));
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function getPostBySlug(publicationId: string, slug: string): Promise<PostInfo | null> {
  try {
    const api = getParagraphClient();
    const post: any = await api.posts.get({ publicationId, slug } as any).single();
    return {
      id: post.id,
      title: post.title || "Untitled",
      subtitle: post.subtitle,
      slug: post.slug,
      markdown: post.markdown,
      publishedAt: post.publishedAt,
      updatedAt: post.updatedAt,
      coinId: post.coinId,
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export async function getUserByWallet(walletAddress: string): Promise<any | null> {
  try {
    const api = getParagraphClient();
    const user = await api.users.get({ wallet: walletAddress }).single();
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}
