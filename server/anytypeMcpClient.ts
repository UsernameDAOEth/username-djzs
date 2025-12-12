import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

type AnytypeMcpClient = {
  client: Client;
  close: () => Promise<void>;
  callTool: (name: string, args?: Record<string, any>) => Promise<any>;
  listTools: () => Promise<any>;
};

let singleton: AnytypeMcpClient | null = null;

/**
 * Connects to Anytype via the official Anytype MCP Server (spawned over stdio).
 * This is perfect for a "local worker" (recommended).
 *
 * Note: Don't console.log in an MCP stdio server process — stdout must remain clean.
 */
export async function getAnytypeMcpClient(): Promise<AnytypeMcpClient> {
  if (singleton) return singleton;

  const ANYTYPE_API_KEY = process.env.ANYTYPE_API_KEY;
  if (!ANYTYPE_API_KEY) {
    throw new Error("Missing ANYTYPE_API_KEY in environment (Replit Secrets).");
  }

  const ANYTYPE_API_URL = process.env.ANYTYPE_API_URL || "http://localhost:31009/v1";

  const transport = new StdioClientTransport({
    command: "npx",
    args: ["-y", "@anyproto/anytype-mcp"],
    env: {
      ...process.env,
      ANYTYPE_API_KEY,
      ANYTYPE_API_URL,
    },
  });

  const client = new Client(
    { name: "djzs-server", version: "0.1.0" },
    { capabilities: {} }
  );

  await client.connect(transport);

  async function close() {
    try {
      await client.close();
    } finally {
      singleton = null;
    }
  }

  async function listTools() {
    return client.listTools();
  }

  async function callTool(name: string, args: Record<string, any> = {}) {
    return client.callTool({ name, arguments: args });
  }

  singleton = { client, close, callTool, listTools };
  return singleton;
}
