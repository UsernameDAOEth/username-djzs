import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";
import { DST_SYSTEM_PROMPT } from "./prompt.js";

const CLAUDE_MODEL = "claude-sonnet-4-5";
const OPENAI_MODEL = "gpt-4o-mini";

export type LLMResult = { text: string; model: string };

export async function callLLM(userPrompt: string): Promise<LLMResult> {
  if (process.env.ANTHROPIC_API_KEY) {
    try {
      const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
      const msg = await client.messages.create({
        model: CLAUDE_MODEL,
        max_tokens: 1024,
        system: DST_SYSTEM_PROMPT,
        messages: [{ role: "user", content: userPrompt }],
      });
      const text = msg.content
        .filter((b) => b.type === "text")
        .map((b) => (b as { type: "text"; text: string }).text)
        .join("");
      return { text, model: CLAUDE_MODEL };
    } catch {
      // fall through to OpenAI
    }
  }

  if (process.env.OPENAI_API_KEY) {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const resp = await client.chat.completions.create({
      model: OPENAI_MODEL,
      messages: [
        { role: "system", content: DST_SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      max_tokens: 1024,
    });
    const text = resp.choices[0]?.message?.content ?? "";
    return { text, model: OPENAI_MODEL };
  }

  throw new Error("No LLM API key configured (ANTHROPIC_API_KEY or OPENAI_API_KEY required)");
}

export async function callLLMJson<T>(userPrompt: string): Promise<{ parsed: T; model: string }> {
  const { text, model } = await callLLM(userPrompt + "\n\nRespond with valid JSON only. No markdown fences.");
  let parsed: T;
  try {
    parsed = JSON.parse(text) as T;
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("LLM did not return valid JSON");
    parsed = JSON.parse(match[0]) as T;
  }
  return { parsed, model };
}
