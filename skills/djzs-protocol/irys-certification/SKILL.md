---
name: irys-certification
description: Formats raw audit verdicts into immutable ProofOfLogic certificates for Irys (Arweave).
version: 1.0.0
agent: mira
metadata:
  hermes:
    tags: [irys, arweave, certification, documentation, proofoflogic]
    category: djzs-protocol
---

# DJZS Irys Certification & Documentation

## When to Use

Use this skill when Mira needs to:
- Format a raw audit verdict from Alan into an immutable ProofOfLogic JSON certificate
- Upload the certificate to Irys (Arweave permanent storage)
- Generate protocol documentation from audit data

## Certificate Formatting Procedure

1. **Receive Verdict Payload:** Accept the raw JSON verdict from Alan containing `verdict`, `risk_score`, `flags`, `logic_flaws`, `structural_recommendations`, `fatal_flaw`, and `summary`.

2. **Construct ProofOfLogic Certificate:**
   ```json
   {
     "protocol": "DJZS",
     "version": "4.0",
     "type": "ProofOfLogic",
     "timestamp": "<ISO-8601 UTC>",
     "request_id": "<x-request-id from Hermes>",
     "tier": "MICRO | FOUNDER | TREASURY | ESCROW",
     "submitter": {
       "wallet": "<submitter wallet address>",
       "ens": "<ENS name if resolved, null otherwise>"
     },
     "audit": {
       "verdict": "PASS | FAIL",
       "risk_score": 0-100,
       "taxonomy_version": "DJZS-LF v1.0",
       "domains_checked": ["STRUCTURAL", "EPISTEMIC", "INCENTIVE", "EXECUTION", "TEMPORAL"],
       "flags_fired": [],
       "logic_flaws": [],
       "fatal_flaw": null,
       "summary": ""
     },
     "execution": {
       "environment": "TEE | STANDARD",
       "enclave_attestation": "<attestation hash if TEE, null otherwise>",
       "agent_versions": {
         "oracle": "4.0",
         "auditor": "<alan version>",
         "sanitizer": "<turing version>"
       }
     },
     "storage": {
       "network": "irys",
       "transaction_id": "<to be populated after upload>",
       "permanent_url": "<to be populated after upload>"
     },
     "signature": {
       "method": "ECDSA",
       "signer": "<protocol wallet>",
       "hash": "<SHA-256 of audit object>"
     }
   }
   ```

3. **Validation Before Upload:**
   - Verify all required fields are populated (no null values except where explicitly allowed)
   - Compute SHA-256 hash of the `audit` object and populate `signature.hash`
   - Verify `flags_fired` array matches the codes from the verdict payload exactly
   - Ensure `timestamp` is within 5 minutes of current time (reject stale certificates)

4. **Irys Upload:**
   - Tag the transaction with: `Content-Type: application/json`, `App-Name: DJZS-Protocol`, `Version: 4.0`, `Type: ProofOfLogic`
   - Upload via the Irys SDK using the protocol's funded wallet
   - Retrieve and store the transaction ID and permanent URL
   - Verify the upload by fetching the transaction back from the Irys gateway

## Documentation Generation

When generating protocol documentation from audit data:
- Use structured markdown with clear section headers
- Include the full taxonomy reference table
- Cross-reference DST principles where relevant
- Never include raw wallet private keys, API secrets, or internal RPC endpoints

## Pitfalls

- Never modify the verdict data during formatting. The certificate must faithfully represent Alan's output.
- Do not upload certificates with unresolved `null` values in required fields — this creates invalid permanent records.
- Always verify the Irys upload succeeded before returning the transaction ID to Hermes. A failed upload with a returned ID creates an irrecoverable reference error.

## Verification

- Confirm the uploaded certificate is retrievable at its permanent URL.
- Verify the SHA-256 hash in the certificate matches a fresh computation of the audit object.
- Ensure the certificate passes JSON Schema validation against the ProofOfLogic v4.0 schema.
