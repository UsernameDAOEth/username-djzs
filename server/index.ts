import express from "express";
import { getAnytypeMcpClient } from "./anytypeMcpClient";

const app = express();
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "djzs-server", status: "UP" });
});

app.get("/api/mcp/health", async (_req, res) => {
  try {
    const mcp = await getAnytypeMcpClient();
    const tools = await mcp.listTools();
    res.json({ ok: true, toolCount: tools?.tools?.length ?? 0, tools });
  } catch (err: any) {
    res.status(500).json({ ok: false, error: err?.message ?? String(err) });
  }
});

app.get("/api/mcp/tools", async (_req, res) => {
  try {
    const mcp = await getAnytypeMcpClient();
    const tools = await mcp.listTools();
    res.json({ ok: true, tools: tools?.tools ?? [] });
  } catch (err: any) {
    res.status(500).json({ ok: false, error: err?.message ?? String(err) });
  }
});

app.post("/api/mcp/call", async (req, res) => {
  try {
    const { tool, args } = req.body;
    
    if (!tool) {
      return res.status(400).json({ ok: false, error: "Missing 'tool' in request body" });
    }
    
    const mcp = await getAnytypeMcpClient();
    const result = await mcp.callTool(tool, args || {});
    res.json({ ok: true, result });
  } catch (err: any) {
    res.status(500).json({ ok: false, error: err?.message ?? String(err) });
  }
});

const port = parseInt(process.env.PORT || "5000", 10);
app.listen(port, "0.0.0.0", () => {
  console.log(`djzs-server running on http://0.0.0.0:${port}`);
});
