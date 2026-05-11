import type { Request, Response } from "express";

export function authorizeRequest(req: Request): boolean {
  const key =
    req.headers["x-api-key"] ??
    req.headers["authorization"]?.replace(/^Bearer\s+/i, "");
  return !!key && key === process.env.DJZS_API_KEY;
}

export function sendUnauthorized(res: Response) {
  res.status(401).json({ ok: false, error: "Unauthorized" });
}
