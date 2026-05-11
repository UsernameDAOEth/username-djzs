import type { Express } from "express";
import { createServer, type Server } from "http";
import { authorizeRequest, sendUnauthorized } from "./dst/auth.js";
import { callLLMJson } from "./dst/llm.js";
import { buildReceipt } from "./dst/receipt.js";
import { DST_FULL_RESEARCH, DST_LAWS } from "./dst/prompt.js";

// ─── OpenAPI spec ─────────────────────────────────────────────────────────────

const OPENAPI_SPEC = {
  openapi: "3.1.0",
  info: {
    title: "DJZS.io — DST Research API",
    version: "0.2.0",
    description:
      "DJZS.io exposes the Deterministic Simulation Thesis as a structured API. One key. Four research endpoints. LLM-grounded answers. Receipts for every generated response.",
  },
  servers: [{ url: "https://djzs.io" }],
  security: [{ ApiKeyAuth: [] }],
  components: {
    securitySchemes: {
      ApiKeyAuth: { type: "apiKey", in: "header", name: "x-api-key" },
    },
  },
  paths: {
    "/api/research/dst-v01/full": {
      get: {
        summary: "Full DST v0.1 research object",
        operationId: "getDSTFull",
        responses: {
          "200": { description: "Canonical DST thesis data" },
          "401": { description: "Unauthorized" },
        },
      },
    },
    "/api/dst/ask": {
      post: {
        summary: "Ask a DST question",
        operationId: "dstAsk",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["question"],
                properties: { question: { type: "string" } },
              },
            },
          },
        },
        responses: {
          "200": { description: "LLM answer with laws_used, confidence, and receipt" },
          "400": { description: "Missing question" },
          "401": { description: "Unauthorized" },
        },
      },
    },
    "/api/dst/check-claim": {
      post: {
        summary: "Check a claim against the five DST laws",
        operationId: "dstCheckClaim",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["claim"],
                properties: { claim: { type: "string" } },
              },
            },
          },
        },
        responses: {
          "200": { description: "Verdict, analysis, strongest law, and weakness" },
          "400": { description: "Missing claim" },
          "401": { description: "Unauthorized" },
        },
      },
    },
    "/api/journal/reflect": {
      post: {
        summary: "Reflect on a journal entry through the DST lens",
        operationId: "journalReflect",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["entry"],
                properties: { entry: { type: "string" } },
              },
            },
          },
        },
        responses: {
          "200": { description: "Summary, DST insight, and reflection question" },
          "400": { description: "Missing entry" },
          "401": { description: "Unauthorized" },
        },
      },
    },
    "/api/mpp/resources": {
      get: {
        summary: "API // STRUCTURED RESEARCH index (legacy path)",
        operationId: "getResources",
        responses: {
          "200": { description: "Endpoint index and research summary" },
          "401": { description: "Unauthorized" },
        },
      },
    },
  },
};

// ─── llms.txt ─────────────────────────────────────────────────────────────────

const LLMS_TXT = `# DJZS.io — DST Research API
# Machine-readable index for LLM agents

## Identity

DJZS.io exposes the Deterministic Simulation Thesis (DST) as a structured API.
One key. Four research endpoints. LLM-grounded answers. Receipts for every generated response.

## The Five DST Laws

${DST_LAWS.map((l, i) => `${i + 1}. ${l.replace(/^Law \d+ — /, "")}`).join("\n")}

## API Endpoints

All endpoints require: x-api-key header with a valid DJZS_API_KEY.

GET  /api/research/dst-v01/full
  Returns the canonical DST v0.1 research object.
  Use for: /dst, /philosophy, /research, external AI readers, structured thesis pages.

POST /api/dst/ask
  Body: { "question": string }
  Returns: { answer, laws_used, confidence } + receipt

POST /api/dst/check-claim
  Body: { "claim": string }
  Returns: { verdict, analysis, strongest_law, weakness } + receipt

POST /api/journal/reflect
  Body: { "entry": string }
  Returns: { summary, dst_insight, reflection_question } + receipt

GET  /api/mpp/resources
  Returns: endpoint index and research summary (legacy path, rebranded API // STRUCTURED RESEARCH)

GET  /openapi.json
  Returns the full OpenAPI 3.1 specification.

GET  /llms.txt
  Returns this file.

## Models Used

Primary: claude-sonnet-4-5 (Anthropic)
Fallback: gpt-4o-mini (OpenAI)

## Receipts

Every generated response includes a receipt:
  sys_id: "djzs-io-dst-api-v02"
  input_hash: SHA-256 of the input
  model: model that generated the response
  generated_at: ISO 8601 timestamp
`;

// ─── Route registration ───────────────────────────────────────────────────────

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/health", (_req, res) => {
    res.json({ ok: true, service: "djzs-agent-backend", status: "UP" });
  });

  // 1. GET /api/research/dst-v01/full
  app.get("/api/research/dst-v01/full", (req, res) => {
    if (!authorizeRequest(req)) return void sendUnauthorized(res);
    res.json({ ok: true, research: DST_FULL_RESEARCH });
  });

  // 2. POST /api/dst/ask
  app.post("/api/dst/ask", async (req, res) => {
    if (!authorizeRequest(req)) return void sendUnauthorized(res);

    const question: string = req.body?.question;
    if (!question?.trim()) {
      return void res.status(400).json({ ok: false, error: "question is required" });
    }

    type AskResult = { answer: string; laws_used: string[]; confidence: "high" | "medium" | "low" };
    const prompt = `The user asks: "${question}"

Respond with JSON matching exactly this shape:
{
  "answer": "<clear explanation grounded in DST>",
  "laws_used": ["Law 01", "Law 04"],
  "confidence": "high" | "medium" | "low"
}

Available law labels: ${DST_LAWS.map((_, i) => `"Law 0${i + 1}"`).join(", ")}`;

    try {
      const { parsed, model } = await callLLMJson<AskResult>(prompt);
      res.json({ ok: true, resource: { id: "dst-ask" }, result: parsed, receipt: buildReceipt(question, model) });
    } catch (err: any) {
      res.status(500).json({ ok: false, error: err.message });
    }
  });

  // 3. POST /api/dst/check-claim
  app.post("/api/dst/check-claim", async (req, res) => {
    if (!authorizeRequest(req)) return void sendUnauthorized(res);

    const claim: string = req.body?.claim;
    if (!claim?.trim()) {
      return void res.status(400).json({ ok: false, error: "claim is required" });
    }

    type ClaimResult = { verdict: string; analysis: string; strongest_law: string; weakness: string };
    const prompt = `Evaluate this claim against the five DST laws: "${claim}"

Respond with JSON matching exactly this shape:
{
  "verdict": "supported" | "partially_supported" | "unsupported" | "contradicts_dst",
  "analysis": "<detailed analysis referencing specific DST laws>",
  "strongest_law": "Law 01",
  "weakness": "<the weakest point of the claim relative to DST, or empty string if fully supported>"
}`;

    try {
      const { parsed, model } = await callLLMJson<ClaimResult>(prompt);
      res.json({ ok: true, result: parsed, receipt: buildReceipt(claim, model) });
    } catch (err: any) {
      res.status(500).json({ ok: false, error: err.message });
    }
  });

  // 4. POST /api/journal/reflect
  app.post("/api/journal/reflect", async (req, res) => {
    if (!authorizeRequest(req)) return void sendUnauthorized(res);

    const entry: string = req.body?.entry;
    if (!entry?.trim()) {
      return void res.status(400).json({ ok: false, error: "entry is required" });
    }

    type ReflectResult = { summary: string; dst_insight: string; reflection_question: string };
    const prompt = `This is a personal journal entry: "${entry}"

Reframe this entry through the DST lens — determinism, epistemic humility, constraint, and verification before action.

Respond with JSON matching exactly this shape:
{
  "summary": "<one sentence capturing the core emotional/cognitive theme>",
  "dst_insight": "<how DST illuminates or reframes this experience>",
  "reflection_question": "<a question to deepen the writer's thinking through a DST lens>"
}`;

    try {
      const { parsed, model } = await callLLMJson<ReflectResult>(prompt);
      res.json({ ok: true, result: parsed, receipt: buildReceipt(entry, model) });
    } catch (err: any) {
      res.status(500).json({ ok: false, error: err.message });
    }
  });

  // 5. GET /api/mpp/resources — legacy path, rebranded API // STRUCTURED RESEARCH
  app.get("/api/mpp/resources", (req, res) => {
    if (!authorizeRequest(req)) return void sendUnauthorized(res);
    res.json({
      ok: true,
      label: "API // STRUCTURED RESEARCH",
      version: "v02",
      endpoints: DST_FULL_RESEARCH.api.endpoints,
      research: {
        id: DST_FULL_RESEARCH.id,
        title: DST_FULL_RESEARCH.title,
        version: DST_FULL_RESEARCH.version,
        laws: DST_FULL_RESEARCH.laws,
      },
    });
  });

  // 6. GET /openapi.json
  app.get("/openapi.json", (req, res) => {
    if (!authorizeRequest(req)) return void sendUnauthorized(res);
    res.json(OPENAPI_SPEC);
  });

  // 7. GET /llms.txt
  app.get("/llms.txt", (req, res) => {
    if (!authorizeRequest(req)) return void sendUnauthorized(res);
    res.type("text/plain").send(LLMS_TXT);
  });

  const httpServer = createServer(app);
  return httpServer;
}
