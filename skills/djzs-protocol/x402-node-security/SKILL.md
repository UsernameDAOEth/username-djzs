---
name: x402-node-security
description: Secures DJZS Express.js endpoints handling Base x402 micropayments.
version: 1.0.0
agent: turing
metadata:
  hermes:
    tags: [security, nodejs, x402, backend]
    category: djzs-protocol
---

# DJZS x402 Node.js Security Protocol

## When to Use

Use this skill when Turing is asked to build, refactor, or debug any Express.js endpoint handling financial routing, x402 headers, or Polymarket CLOB integrations.

## Procedure

1. **Input Sanitization:** Enforce strict TypeScript types and Zod schemas for all inbound `strategy_memo` payloads. Never pass raw strings directly to the Claude API.
2. **x402 Header Validation:** Always verify the `x-payment-proof` transaction hash against the Base RPC before processing the logic audit. Parse the header as `x402-payment: {txHash}:{chainId}:{amount}:{token}` and validate each field independently.
3. **Rate Limiting:** Implement strict IP and wallet-level rate limits to prevent DDoS attacks from draining the Oracle's internal compute budget. Default: 10 requests/minute per wallet, 30 requests/minute per IP.
4. **Error Handling:** Never leak stack traces. Always return standardized JSON error codes following the format:
   ```json
   {
     "error": true,
     "code": "X402_INVALID_PROOF",
     "message": "Payment proof verification failed",
     "tier": "MICRO | FOUNDER | TREASURY | ESCROW"
   }
   ```
5. **Tier Enforcement:** Validate the payment amount matches the requested tier before processing:
   - MICRO: $2.50 — 1,000 char limit
   - FOUNDER: $5.00 — 5,000 char limit
   - TREASURY: $50.00 — unlimited
   - ESCROW: escrow-funded — per tier

## Pitfalls

- Common failure: Trusting client-provided payment states. Fix: Always query the Base network RPC independently.
- Watch out for: Reentrancy-style async race conditions if an agent submits multiple audit requests simultaneously. Use a nonce-based deduplication cache keyed by `txHash`.
- Never store private keys or RPC secrets in client-accessible code. Use server-side environment variables only.

## Verification

- Ensure `npm run test:security` passes with zero critical OWASP vulnerabilities before deploying.
- Verify all x402 endpoints reject requests with missing, malformed, or already-consumed payment proofs.
- Confirm rate limit headers (`X-RateLimit-Remaining`, `X-RateLimit-Reset`) are present on all responses.
