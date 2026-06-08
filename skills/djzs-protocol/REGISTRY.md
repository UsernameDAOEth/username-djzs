---
name: djzs-protocol-skills
description: Skill registry for the DJZS multi-agent team.
version: 1.0.0
---

# DJZS Protocol — Skill Registry

## Architecture

```
Identity  → SOUL.md    (who the agent is)
Context   → AGENTS.md  (shared team knowledge)
Procedure → SKILL.md   (how to execute specific workflows)
```

## Skill Matrix

| Skill | Agent | Directory | Purpose |
|-------|-------|-----------|---------|
| x402-node-security | Turing | `x402-node-security/` | Express.js endpoint hardening, x402 payment validation, OWASP compliance |
| adversarial-auditing | Alan | `adversarial-auditing/` | DJZS-LF v1.0 taxonomy enforcement, epistemic cross-checking, verdict generation |
| tee-deployment | Hermes | `tee-deployment/` | Multi-agent routing, TEE threat modeling, pipeline orchestration |
| irys-certification | Mira | `irys-certification/` | ProofOfLogic certificate formatting, Irys upload, documentation |

## Agent Role Boundaries

- **Turing (Debugger/Engineer):** Node.js backend hardening, Rust/WASM compilation, OWASP API security. Does NOT evaluate logic — only sanitizes and secures.
- **Alan (Research/Evaluator):** Adversarial LLM benchmarking, DJZS-LF taxonomy enforcement, Polymarket epistemic cross-checking. Does NOT write production code — only audits.
- **Hermes (Orchestrator):** TEE threat modeling, multi-agent routing, pipeline coordination. Does NOT execute audits or write code — only routes and coordinates.
- **Mira (Writer):** Irys certificate formatting, protocol documentation. Does NOT evaluate logic or modify infrastructure — only formats and stores.

## Full Audit Pipeline

```
1. Inbound Request (x402 payment attached)
2. Hermes validates payment, classifies task, assigns tier
3. Turing sanitizes input, validates x402 proof against Base RPC
4. Alan executes adversarial audit against DJZS-LF taxonomy
5. Mira formats verdict into ProofOfLogic certificate
6. Hermes uploads certificate to Irys, returns response
```

## Skill Loading

Skills are loaded on-demand via natural language or the `/skills` command:

```
hermes -p turing
> Apply the x402-node-security skill to review server/routes.ts

hermes -p alan
> Use adversarial-auditing to evaluate this trading thesis: [memo]

hermes -p hermes
> Route this TREASURY-tier audit request through the full pipeline
```

## Self-Improvement

Agents can update their own skills when they discover better procedures:

```
> Update the x402-node-security skill: add nonce-based deduplication for payment proofs
```

The agent will modify its SKILL.md with the new procedure for future sessions.
