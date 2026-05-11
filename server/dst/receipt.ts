import { createHash } from "crypto";

export function buildReceipt(input: string, model: string) {
  const input_hash = createHash("sha256").update(input).digest("hex");
  return {
    sys_id: "djzs-io-dst-api-v02",
    input_hash,
    model,
    generated_at: new Date().toISOString(),
  };
}
