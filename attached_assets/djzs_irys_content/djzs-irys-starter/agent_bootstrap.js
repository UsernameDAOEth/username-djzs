// agent_bootstrap.js
import fs from "fs";
import os from "os";
import path from "path";
import process from "process";

// Simple CLI usage:
// node agent_bootstrap.js --username djzs --irysUrl https://gateway.irys.xyz/<id>

function parseArgs() {
  const args = process.argv.slice(2);
  const out = {};
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i];
    const value = args[i + 1];
    if (key && value && key.startsWith("--")) {
      out[key.substring(2)] = value;
    }
  }
  return out;
}

async function main() {
  const { username, irysUrl } = parseArgs();
  if (!username || !irysUrl) {
    console.error("Usage: node agent_bootstrap.js --username djzs --irysUrl https://gateway.irys.xyz/<id>");
    process.exit(1);
  }

  console.log(`[DJZS-AGENT] Fetching Agent Core from ${irysUrl} ...`);
  const res = await fetch(irysUrl);
  if (!res.ok) {
    console.error("Failed to fetch Agent Core:", res.status, await res.text());
    process.exit(1);
  }

  const agentCore = await res.json();

  const baseDir = path.join(os.homedir(), ".djzs", "agents");
  fs.mkdirSync(baseDir, { recursive: true });

  const filePath = path.join(baseDir, `${username}.json`);
  fs.writeFileSync(filePath, JSON.stringify(agentCore, null, 2), "utf8");

  console.log(`[DJZS-AGENT] Agent Core saved to ${filePath}`);
  console.log(`[DJZS-AGENT] You can now point your local agent process at this file.`);
}

main().catch((err) => {
  console.error("Unexpected error:", err);
  process.exit(1);
});
