import { getIrysUploader } from "./irys.js";

/**
 * Minimal DJZS Journal payload shape.
 * Extend as needed in your app.
 */
export async function saveJournalToIrys(payload) {
  const required = ["title", "content", "zoneId", "zoneSlug", "timeCode", "createdAt", "version"];
  for (const key of required) {
    if (payload[key] === undefined || payload[key] === null) {
      throw new Error(`Missing required field: ${key}`);
    }
  }

  const irysUploader = await getIrysUploader();
  const dataToUpload = JSON.stringify(payload, null, 2);

  const tags = [
    { name: "protocol", value: "DJZS" },
    { name: "protocol-version", value: "DJZS-0.1" },
    { name: "zone-id", value: String(payload.zoneId) },
    { name: "zone-slug", value: String(payload.zoneSlug) },
    { name: "time-code", value: String(payload.timeCode) },
    { name: "version", value: String(payload.version) }
  ];

  if (payload.previousIrysId) {
    tags.push({ name: "previous-id", value: String(payload.previousIrysId) });
  }
  if (payload.authorAlias) {
    tags.push({ name: "author-alias", value: String(payload.authorAlias) });
  }

  try {
    const receipt = await irysUploader.upload(dataToUpload, { tags });
    const id = receipt.id;
    const url = `https://gateway.irys.xyz/${id}`;

    return { irysId: id, irysUrl: url };
  } catch (e) {
    console.error("[DJZS-IRYS] Error uploading journal to Irys:", e);
    throw e;
  }
}
