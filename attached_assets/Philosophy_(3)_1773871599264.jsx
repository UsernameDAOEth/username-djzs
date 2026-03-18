import { useState, useEffect, useRef } from "react";

/*
 * Philosophy.jsx — SIFR-0 Protocol Philosophy Section
 * Drop-in: src/components/Philosophy.jsx
 * Zero external deps. Inline styles. Matches dark/mono stack.
 *
 * Usage:
 *   import Philosophy from './components/Philosophy';
 *   <Philosophy />
 */

// ─── AXIOM DATA ─────────────────────────────────────────────
const AXIOMS = [
  {
    id: "ground-state",
    code: "AX-00",
    title: "Ground State",
    subtitle: "The audit begins at zero.",
    mechanic:
      "Every agent request enters the pipeline with no inherited trust. No cached reputation. No shortcut. SIFR-0 resets the evaluation frame on every call — the same principle that makes zero the foundation of computation makes it the foundation of verification.",
    glyph: "∅",
  },
  {
    id: "toroidal-fold",
    code: "AX-01",
    title: "Toroidal Fold",
    subtitle: "Output feeds back through input.",
    mechanic:
      "The audit pipeline is not linear — it's a closed loop. ProofOfLogic certificates emitted at Output feed the LogicTrustScore at Input. Agent reputation is never static; it decays, regenerates, and re-earns through continuous verification. The torus is the topology of sustained trust.",
    glyph: "◎",
  },
  {
    id: "resonance-audit",
    code: "AX-02",
    title: "Resonance Audit",
    subtitle: "Intent must survive the constriction point.",
    mechanic:
      "At the center of the torus is the narrowest passage — the SIFR-0 constriction point. Venice AI applies the 11-code DJZS-LF taxonomy here. If the agent's intent resonates (scores below threshold), it passes. If it doesn't, it's blocked. No appeals. No overrides. The geometry enforces the gate.",
    glyph: "⦿",
  },
  {
    id: "scale-invariance",
    code: "AX-03",
    title: "Scale Invariance",
    subtitle: "Same logic at every layer.",
    mechanic:
      "The audit architecture is fractal. A single agent call, a multi-agent orchestration, or a cross-protocol pipeline — the verification primitive is identical. SIFR-0 doesn't care about scale. The same LF-code taxonomy, the same deterministic scoring, the same immutable certificate. One pattern. Every scale.",
    glyph: "∞",
  },
];

// ─── TRIADIC LAYERS ─────────────────────────────────────────
const TRIAD = [
  {
    zone: "INPUT",
    label: "Breath",
    function: "Agent Intent Injection",
    detail:
      "Raw agent request enters. Prompt injection defense (20+ pattern categories) + credential leak scan. The breath before the word.",
    code: "// LAYER_0: INTAKE",
  },
  {
    zone: "LOGIC",
    label: "Spirit",
    function: "DJZS-LF Taxonomy",
    detail:
      "Venice AI (llama-3.3-70b, temp 0) returns detected_codes only. All severity weights, risk scoring, and verdict computation are deterministic TypeScript. The spirit is the law.",
    code: "// LAYER_1: ADJUDICATE",
  },
  {
    zone: "OUTPUT",
    label: "Water",
    function: "ProofOfLogic Certificate",
    detail:
      "Immutable certificate written to Irys Datachain. Includes LF codes, risk score, timestamp, agent ID. Irys failure is non-fatal — agent always returns AgentOutput. The water carries the proof.",
    code: "// LAYER_2: CERTIFY",
  },
];

// ─── INTERSECTION OBSERVER HOOK ─────────────────────────────
function useInView(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.15, ...options });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
}

// ─── AXIOM CARD ─────────────────────────────────────────────
function AxiomCard({ axiom, index, isVisible }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      style={{
        ...styles.axiomCard,
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? "translateY(0)"
          : "translateY(24px)",
        transitionDelay: `${index * 120}ms`,
        cursor: "pointer",
        borderColor: expanded ? "rgba(0, 255, 136, 0.3)" : "rgba(255,255,255,0.06)",
      }}
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
      onKeyDown={(e) => e.key === "Enter" && setExpanded(!expanded)}
    >
      {/* Header row */}
      <div style={styles.axiomHeader}>
        <span style={styles.axiomGlyph}>{axiom.glyph}</span>
        <div style={{ flex: 1 }}>
          <div style={styles.axiomCode}>{axiom.code}</div>
          <div style={styles.axiomTitle}>{axiom.title}</div>
        </div>
        <span
          style={{
            ...styles.expandIcon,
            transform: expanded ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          +
        </span>
      </div>

      {/* Subtitle — always visible */}
      <div style={styles.axiomSubtitle}>{axiom.subtitle}</div>

      {/* Mechanic — expanded */}
      <div
        style={{
          ...styles.axiomMechanic,
          maxHeight: expanded ? "300px" : "0px",
          opacity: expanded ? 1 : 0,
          marginTop: expanded ? "16px" : "0px",
          paddingTop: expanded ? "16px" : "0px",
          borderTop: expanded
            ? "1px solid rgba(255,255,255,0.06)"
            : "1px solid transparent",
        }}
      >
        {axiom.mechanic}
      </div>
    </div>
  );
}

// ─── TRIAD CARD ─────────────────────────────────────────────
function TriadCard({ layer, index, isVisible }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...styles.triadCard,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transitionDelay: `${index * 150}ms`,
        borderColor: hovered ? "rgba(0, 255, 136, 0.25)" : "rgba(255,255,255,0.06)",
      }}
    >
      <div style={styles.triadCode}>{layer.code}</div>
      <div style={styles.triadZone}>{layer.zone}</div>
      <div style={styles.triadLabel}>{layer.label}</div>
      <div style={styles.triadFunction}>{layer.function}</div>

      {/* Detail reveal on hover */}
      <div
        style={{
          ...styles.triadDetail,
          maxHeight: hovered ? "200px" : "0px",
          opacity: hovered ? 1 : 0,
          marginTop: hovered ? "12px" : "0px",
        }}
      >
        {layer.detail}
      </div>
    </div>
  );
}

// ─── FLOW DIAGRAM ───────────────────────────────────────────
function FlowDiagram({ isVisible }) {
  return (
    <div
      style={{
        ...styles.flowContainer,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(16px)",
        transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div style={styles.flowRow}>
        <span style={styles.flowNode}>INTENT</span>
        <span style={styles.flowArrow}>→</span>
        <span style={styles.flowNodeActive}>[SIFR-0 AUDIT]</span>
        <span style={styles.flowArrow}>→</span>
        <span style={styles.flowNode}>MANIFESTATION</span>
      </div>
      <div style={styles.flowComment}>// AUDIT_BEFORE_ACT</div>
      <div style={styles.flowSubComment}>
        Every agent action gets a ProofOfLogic certificate before it touches the
        network.
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ─────────────────────────────────────────
export default function Philosophy() {
  const [headerRef, headerVisible] = useInView();
  const [axiomRef, axiomVisible] = useInView();
  const [flowRef, flowVisible] = useInView();
  const [triadRef, triadVisible] = useInView();

  return (
    <section style={styles.section} id="philosophy">
      {/* ── HEADER ── */}
      <div ref={headerRef} style={{
        ...styles.headerBlock,
        opacity: headerVisible ? 1 : 0,
        transform: headerVisible ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
      }}>
        <div style={styles.sectionLabel}>// SIFR-0 FRAMEWORK</div>
        <h2 style={styles.heading}>The Verification Primitive</h2>
        <p style={styles.headingSub}>
          <span style={styles.sifr}>SIFR</span> (صفر) — the Arabic root of both{" "}
          <em>zero</em> and <em>cipher</em>. The void before computation. The
          gate before execution. Every autonomous agent action passes through the
          SIFR-0 constriction point — where intent is audited before
          manifestation is permitted.
        </p>
      </div>

      {/* ── FLOW DIAGRAM ── */}
      <div ref={flowRef}>
        <FlowDiagram isVisible={flowVisible} />
      </div>

      {/* ── AXIOMS ── */}
      <div ref={axiomRef} style={styles.axiomSection}>
        <div style={styles.axiomSectionLabel}>AXIOMS</div>
        <div style={styles.axiomGrid}>
          {AXIOMS.map((axiom, i) => (
            <AxiomCard
              key={axiom.id}
              axiom={axiom}
              index={i}
              isVisible={axiomVisible}
            />
          ))}
        </div>
      </div>

      {/* ── TRIADIC ARCHITECTURE ── */}
      <div ref={triadRef} style={styles.triadSection}>
        <div style={styles.triadSectionLabel}>TRIADIC PIPELINE</div>
        <div style={styles.triadGrid}>
          {TRIAD.map((layer, i) => (
            <TriadCard
              key={layer.zone}
              layer={layer}
              index={i}
              isVisible={triadVisible}
            />
          ))}
        </div>
        {/* Connecting arrows between cards — CSS only */}
        <div style={styles.triadArrowRow}>
          <span style={styles.triadArrowSpacer} />
          <span style={styles.triadArrowGlyph}>→</span>
          <span style={styles.triadArrowSpacer} />
          <span style={styles.triadArrowGlyph}>→</span>
          <span style={styles.triadArrowSpacer} />
        </div>
      </div>
    </section>
  );
}

// ─── STYLES ─────────────────────────────────────────────────
const mono = "'JetBrains Mono', 'Fira Code', 'SF Mono', 'Cascadia Code', monospace";
const sans = "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif";
const green = "#00ff88";
const greenDim = "rgba(0, 255, 136, 0.15)";
const border = "rgba(255, 255, 255, 0.06)";
const textPrimary = "rgba(255, 255, 255, 0.92)";
const textSecondary = "rgba(255, 255, 255, 0.55)";
const textTertiary = "rgba(255, 255, 255, 0.3)";
const bg = "#0a0e14";
const cardBg = "rgba(255, 255, 255, 0.02)";

const styles = {
  section: {
    width: "100%",
    maxWidth: "960px",
    margin: "0 auto",
    padding: "120px 24px",
    fontFamily: sans,
    color: textPrimary,
    background: "transparent",
  },

  // ── Header
  headerBlock: {
    marginBottom: "64px",
  },
  sectionLabel: {
    fontFamily: mono,
    fontSize: "11px",
    letterSpacing: "2px",
    color: green,
    marginBottom: "20px",
    textTransform: "uppercase",
  },
  heading: {
    fontFamily: mono,
    fontSize: "clamp(28px, 4vw, 42px)",
    fontWeight: 600,
    color: textPrimary,
    margin: "0 0 24px 0",
    lineHeight: 1.15,
    letterSpacing: "-0.5px",
  },
  headingSub: {
    fontFamily: sans,
    fontSize: "16px",
    lineHeight: 1.7,
    color: textSecondary,
    maxWidth: "640px",
    margin: 0,
  },
  sifr: {
    fontFamily: mono,
    fontWeight: 700,
    color: textPrimary,
    letterSpacing: "1px",
  },

  // ── Flow diagram
  flowContainer: {
    background: cardBg,
    border: `1px solid ${border}`,
    borderRadius: "2px",
    padding: "32px",
    marginBottom: "80px",
    textAlign: "center",
  },
  flowRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
    flexWrap: "wrap",
    marginBottom: "12px",
  },
  flowNode: {
    fontFamily: mono,
    fontSize: "14px",
    letterSpacing: "2px",
    color: textSecondary,
    padding: "8px 16px",
    border: `1px solid ${border}`,
    borderRadius: "2px",
  },
  flowNodeActive: {
    fontFamily: mono,
    fontSize: "14px",
    letterSpacing: "2px",
    color: green,
    padding: "8px 16px",
    border: `1px solid rgba(0, 255, 136, 0.3)`,
    borderRadius: "2px",
    background: greenDim,
  },
  flowArrow: {
    fontFamily: mono,
    fontSize: "18px",
    color: textTertiary,
  },
  flowComment: {
    fontFamily: mono,
    fontSize: "11px",
    color: textTertiary,
    letterSpacing: "1.5px",
    marginBottom: "8px",
  },
  flowSubComment: {
    fontFamily: sans,
    fontSize: "13px",
    color: textSecondary,
    fontStyle: "italic",
  },

  // ── Axioms
  axiomSection: {
    marginBottom: "80px",
  },
  axiomSectionLabel: {
    fontFamily: mono,
    fontSize: "11px",
    letterSpacing: "3px",
    color: textTertiary,
    marginBottom: "24px",
  },
  axiomGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "16px",
  },
  axiomCard: {
    background: cardBg,
    border: `1px solid ${border}`,
    borderRadius: "2px",
    padding: "24px",
    transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
    userSelect: "none",
  },
  axiomHeader: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    marginBottom: "8px",
  },
  axiomGlyph: {
    fontFamily: mono,
    fontSize: "20px",
    color: green,
    opacity: 0.7,
    lineHeight: 1,
    marginTop: "2px",
    flexShrink: 0,
    width: "24px",
    textAlign: "center",
  },
  axiomCode: {
    fontFamily: mono,
    fontSize: "10px",
    letterSpacing: "2px",
    color: textTertiary,
    marginBottom: "4px",
  },
  axiomTitle: {
    fontFamily: mono,
    fontSize: "15px",
    fontWeight: 600,
    color: textPrimary,
    letterSpacing: "0.5px",
  },
  expandIcon: {
    fontFamily: mono,
    fontSize: "18px",
    color: textTertiary,
    transition: "transform 0.3s ease",
    flexShrink: 0,
    lineHeight: 1,
  },
  axiomSubtitle: {
    fontFamily: sans,
    fontSize: "13px",
    color: textSecondary,
    marginLeft: "36px",
    lineHeight: 1.5,
  },
  axiomMechanic: {
    fontFamily: sans,
    fontSize: "13px",
    color: textSecondary,
    lineHeight: 1.7,
    overflow: "hidden",
    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
    marginLeft: "36px",
  },

  // ── Triadic pipeline
  triadSection: {
    position: "relative",
  },
  triadSectionLabel: {
    fontFamily: mono,
    fontSize: "11px",
    letterSpacing: "3px",
    color: textTertiary,
    marginBottom: "24px",
  },
  triadGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "2px",
  },
  triadCard: {
    background: cardBg,
    border: `1px solid ${border}`,
    borderRadius: "2px",
    padding: "28px 20px",
    textAlign: "center",
    transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
  },
  triadCode: {
    fontFamily: mono,
    fontSize: "10px",
    letterSpacing: "1.5px",
    color: textTertiary,
    marginBottom: "12px",
  },
  triadZone: {
    fontFamily: mono,
    fontSize: "11px",
    letterSpacing: "3px",
    color: green,
    marginBottom: "4px",
    textTransform: "uppercase",
  },
  triadLabel: {
    fontFamily: mono,
    fontSize: "18px",
    fontWeight: 600,
    color: textPrimary,
    marginBottom: "8px",
  },
  triadFunction: {
    fontFamily: sans,
    fontSize: "13px",
    color: textSecondary,
    lineHeight: 1.5,
  },
  triadDetail: {
    fontFamily: sans,
    fontSize: "12px",
    color: textSecondary,
    lineHeight: 1.7,
    overflow: "hidden",
    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
    textAlign: "left",
  },
  triadArrowRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: "-28px",
    left: 0,
    right: 0,
    pointerEvents: "none",
    opacity: 0.3,
  },
  triadArrowSpacer: {
    flex: 1,
  },
  triadArrowGlyph: {
    fontFamily: mono,
    fontSize: "16px",
    color: green,
  },
};
