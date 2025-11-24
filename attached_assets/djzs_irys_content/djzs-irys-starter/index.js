import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { saveJournalToIrys } from "./journal.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/", (req, res) => {
  res.json({
    name: "DJZS + Irys Starter",
    status: "ok",
    message: "Use POST /api/journal/finalize to upload a DJZS journal to Irys"
  });
});

/**
 * Finalize a DJZS journal and upload to Irys.
 * Expects a JSON body matching the DJZSJournalPayload shape.
 */
app.post("/api/journal/finalize", async (req, res) => {
  try {
    const payload = req.body;
    const result = await saveJournalToIrys(payload);

    res.status(200).json({
      ok: true,
      ...result,
      zoneId: payload.zoneId,
      zoneSlug: payload.zoneSlug,
      timeCode: payload.timeCode
    });
  } catch (err) {
    console.error("[DJZS-IRYS] finalize error:", err);
    res.status(400).json({
      ok: false,
      error: err.message || "Failed to finalize journal"
    });
  }
});

app.listen(PORT, () => {
  console.log(`[DJZS-IRYS] Server listening on port ${PORT}`);
});
