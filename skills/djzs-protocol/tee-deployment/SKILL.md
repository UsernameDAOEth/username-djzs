---
name: tee-deployment
description: Orchestrates multi-agent routing and TEE threat modeling for the DJZS protocol.
version: 1.0.0
agent: hermes
metadata:
  hermes:
    tags: [orchestration, tee, phala, ironclaw, routing]
    category: djzs-protocol
---

# DJZS Orchestration & TEE Deployment

## When to Use

Use this skill when Hermes needs to:
- Route an inbound audit request to the correct agent
- Model threats against the TEE execution environment (Phala/IronClaw)
- Coordinate multi-agent workflows where Turing, Alan, and Mira must collaborate

## Agent Routing Procedure

1. **Classify the Inbound Task:**
   - If the task involves code, infrastructure, security, or WASM compilation → route to **Turing**
   - If the task involves logic evaluation, thesis review, or taxonomy application → route to **Alan**
   - If the task involves certificate formatting, documentation, or Irys uploads → route to **Mira**
   - If the task requires multiple agents → decompose into subtasks and route in parallel

2. **Context Handoff Protocol:**
   - Extract the minimal context each agent needs from the request
   - Never forward the full conversation history — strip to the action-relevant payload
   - Include the originating tier (MICRO/FOUNDER/TREASURY/ESCROW) so agents respect scope limits
   - Attach the `x-request-id` for audit trail continuity

3. **Pipeline Orchestration (Full Audit Flow):**
   ```
   Inbound Request
     → Hermes: validate x402 payment, classify task
     → Turing: sanitize input, verify endpoint security
     → Alan: execute adversarial audit against DJZS-LF taxonomy
     → Mira: format verdict into ProofOfLogic certificate
     → Hermes: upload certificate to Irys, return response
   ```

4. **Conflict Resolution:**
   - If Turing and Alan disagree on input validity, Hermes breaks the tie by checking the raw data against the epistemic baseline
   - If any agent times out (>30s for MICRO, >60s for FOUNDER, >120s for TREASURY), Hermes returns a partial result with a `TIMEOUT` flag rather than silently hanging

## TEE Threat Modeling Procedure

1. **Attestation Verification:** Before routing any audit to the TEE runtime, verify the Phala attestation report. Reject if the enclave measurement does not match the expected MRENCLAVE value.

2. **Threat Surface Checklist:**
   - Side-channel attacks on the enclave (timing, cache)
   - Key extraction via memory dump outside TEE boundary
   - Man-in-the-middle between agent and TEE endpoint
   - Replay attacks using stale attestation reports

3. **IronClaw Integration:**
   - Compile audit logic to WASM before deploying to the TEE
   - Verify the WASM binary hash matches the deployed enclave code
   - Ensure secrets (API keys, RPC endpoints) are sealed within the TEE and never exposed to the host

4. **Isolation Guarantees:**
   - Each audit request runs in an isolated enclave instance
   - No shared state between concurrent audits
   - Memory is zeroed after each request completes

## Pitfalls

- Never route a TREASURY-tier request to a non-TEE endpoint. High-value audits must execute inside the confidential VM.
- Do not parallelize agents that have data dependencies — Alan cannot audit until Turing has sanitized the input.
- If the TEE attestation fails, do not fall back to plaintext execution. Return an error immediately.

## Verification

- Confirm all agent responses are received before assembling the final output.
- Verify the Irys upload transaction ID is valid and the certificate is retrievable.
- Log the full routing trace for post-mortem debugging: `{request_id, agents_invoked, timestamps, verdict}`.
