---
name: adversarial-auditing
description: Evaluates agent logic using the DJZS-LF v1.0 taxonomy and live epistemic data.
version: 1.0.0
agent: alan
metadata:
  hermes:
    tags: [audit, logic, taxonomy, polymarket, dst]
    category: djzs-protocol
---

# DJZS Adversarial Audit Execution

## When to Use

Use this skill when Alan needs to evaluate a trading thesis, DAO proposal, or any agent-generated plan against the DJZS-LF v1.0 failure taxonomy (11 codes, 5 domains).

## Procedure

1. **Epistemic Baseline:** Before judging the logic, fetch the required real-world data (e.g., query the Zerion API for portfolio balance or the Polymarket CLOB for live odds). Never evaluate a thesis in a vacuum.

2. **Taxonomy Application:** Cross-reference the agent's thesis against all 5 domains:

   **STRUCTURAL** — reasoning architecture flaws
   - [S01] CIRCULAR_LOGIC (CRITICAL, auto-abort)
   - [S02] MISSING_FALSIFIABILITY (CRITICAL, auto-abort)

   **EPISTEMIC** — evidence handling flaws
   - [E01] CONFIRMATION_TUNNEL (HIGH, auto-abort)
   - [E02] AUTHORITY_SUBSTITUTION (HIGH, auto-abort)

   **INCENTIVE** — motivation and narrative flaws
   - [I01] MISALIGNED_INCENTIVE (MEDIUM)
   - [I02] NARRATIVE_DEPENDENCY (MEDIUM)

   **EXECUTION** — risk management flaws
   - [X01] UNHEDGED_EXECUTION (CRITICAL, auto-abort)
   - [X02] LIQUIDITY_RISK (HIGH, auto-abort)
   - [X03] SLIPPAGE_EXPOSURE (MEDIUM)

   **TEMPORAL** — timing and freshness flaws
   - [T01] STALE_DATA_DEPENDENCY (HIGH, auto-abort)
   - [T02] RACE_CONDITION_RISK (MEDIUM)

3. **Slippage & Hallucination Check:** If the agent claims a fact that contradicts the epistemic baseline (e.g., assumes 20¢ ask when live ask is 80¢), immediately trigger the relevant flag with direct evidence.

4. **Risk Scoring:** Assign 0-100 based on severity and count of fired codes:
   - 0 = flawless logic, no flags
   - 1-30 = minor issues, PASS
   - 31-59 = significant concerns, PASS with warnings
   - 60-100 = structurally compromised, FAIL
   - Any CRITICAL or HIGH flag = automatic FAIL regardless of score

5. **DST Alignment:** Verify the thesis respects the Deterministic Simulation Thesis hierarchy:
   - Probabilistic at the observer layer
   - Constraint-bound at the system layer
   - Deterministic at the verification layer

## Pitfalls

- Common failure: Being too polite. Fix: Reject the thesis ruthlessly if it lacks mathematical falsifiability. Do not act like a helpful assistant; act like a firewall.
- Never soften a verdict. If it fails, it fails.
- Only flag codes you can justify with specific evidence from the submission.
- Do not explain the framework or add commentary outside the JSON output.

## Verification

Output must strictly follow this JSON structure:

```json
{
  "verdict": "PASS | FAIL",
  "risk_score": 0-100,
  "primary_bias_detected": "FOMO | Sunk_Cost | Narrative_Reaction | Authority_Bias | Confirmation_Bias | Recency_Bias | None",
  "flags": [
    {
      "code": "DJZS-X01",
      "severity": "CRITICAL | HIGH | MEDIUM",
      "message": "one-sentence evidence from the submission",
      "evidence": "specific quote or reference from the memo",
      "recommendation": "one strict fix"
    }
  ],
  "logic_flaws": [
    {
      "flaw_type": "description of the structural flaw",
      "severity": "critical | high | medium",
      "explanation": "why this weakens the thesis"
    }
  ],
  "structural_recommendations": ["concrete action to fix the most dangerous flaw"],
  "fatal_flaw": "single most dangerous failure point, or null",
  "summary": "2-3 sentence adversarial assessment"
}
```
