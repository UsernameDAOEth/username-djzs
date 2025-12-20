const PARAGRAPH_API_BASE = "https://api.paragraph.com/v1";

export function hasApiKey(): boolean {
  return !!process.env.PARAGRAPH_API_KEY;
}

function getApiKey(): string {
  const apiKey = process.env.PARAGRAPH_API_KEY;
  if (!apiKey) {
    throw new Error("PARAGRAPH_API_KEY not configured");
  }
  return apiKey;
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
    const res = await fetch(`${PARAGRAPH_API_BASE}/publications/${slug}`);
    if (!res.ok) return null;
    const data = await res.json();
    return {
      id: data.id,
      name: data.name || slug,
      slug: data.slug || slug,
      description: data.description,
      avatar: data.avatar,
    };
  } catch (error) {
    console.error("Error fetching publication:", error);
    return null;
  }
}

export async function getPublicationPosts(publicationId: string, limit = 10): Promise<PostInfo[]> {
  try {
    const res = await fetch(`${PARAGRAPH_API_BASE}/publications/${publicationId}/posts?limit=${limit}`);
    if (!res.ok) return [];
    const data = await res.json();
    const items = data.items || [];
    return items.map((post: any) => ({
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
    const res = await fetch(`${PARAGRAPH_API_BASE}/publications/${publicationId}/posts/${slug}`);
    if (!res.ok) return null;
    const data = await res.json();
    return {
      id: data.id,
      title: data.title || "Untitled",
      subtitle: data.subtitle,
      slug: data.slug,
      markdown: data.markdown,
      publishedAt: data.publishedAt,
      updatedAt: data.updatedAt,
      coinId: data.coinId,
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export async function getUserByWallet(walletAddress: string): Promise<any | null> {
  try {
    const res = await fetch(`${PARAGRAPH_API_BASE}/users?wallet=${walletAddress}`);
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

export interface CreatePostInput {
  title: string;
  markdown: string;
  subtitle?: string;
  slug?: string;
  categories?: string[];
  sendNewsletter?: boolean;
}

export interface CreatePostResult {
  id: string;
}

export async function createPost(input: CreatePostInput): Promise<CreatePostResult> {
  const apiKey = getApiKey();
  
  const res = await fetch(`${PARAGRAPH_API_BASE}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      title: input.title,
      markdown: input.markdown,
      subtitle: input.subtitle,
      slug: input.slug,
      categories: input.categories,
      sendNewsletter: input.sendNewsletter ?? false,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Paragraph API error: ${res.status} - ${errorText}`);
  }

  const data = await res.json();
  return { id: data.id };
}
