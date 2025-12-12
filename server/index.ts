import express from "express";
import { getAnytypeMcpClient } from "./anytypeMcpClient.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    name: "DJZS Agent Server",
    status: "running",
    version: "0.1.0"
  });
});

app.get("/api/mcp/health", async (_req, res) => {
  try {
    const mcp = await getAnytypeMcpClient();
    const tools = await mcp.listTools();

    res.json({ ok: true, tools: tools?.tools ?? [] });
  } catch (err: any) {
    res.json({
      ok: false,
      error: err?.message || String(err),
      note: "Expected if Anytype MCP is not reachable yet"
    });
  }
});

app.listen(PORT, () => {
  console.log(`🧠 DJZS Agent running on port ${PORT}`);
});
