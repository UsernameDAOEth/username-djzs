import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/health", (_req, res) => {
    res.json({ ok: true, service: "djzs-agent-backend", status: "UP" });
  });

  const httpServer = createServer(app);
  return httpServer;
}
