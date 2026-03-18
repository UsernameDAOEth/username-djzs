import React, { useEffect, useRef, useState } from 'react';

// ============================================================================
// DJZS PROTOCOL — Philosophy Section
// Drop into your landing page between <Architecture /> and <KYADemo />
// Font: JetBrains Mono (already imported in parent)
// ============================================================================

const PILLARS = [
  {
    code: 'AXIOM-01',
    label: 'Ground State Baseline',
    body: 'Every agent begins from zero. Not empty — calibrated. The ground state is the reference point against which all logic is measured. Deviation from ground state is not error. It is signal.',
  },
  {
    code: 'AXIOM-02',
    label: 'Toroidal Fold',
    body: 'Logic does not travel in a line. It folds back on itself before it executes. The audit layer is the fold — the interior pass where intent and action are forced into contact. What survives the fold is verified. What collapses was never coherent.',
  },
  {
    code: 'AXIOM-03',
    label: 'Resonance Audit',
    body: 'An agent\'s declared intent and its actual execution generate separate frequencies. When they are in phase: execution proceeds. When they are out of phase: the protocol detects the dissonance before the action manifests. Adversarial logic is pattern-matching on frequency drift.',
  },
  {
    code: 'AXIOM-04',
    label: 'Scale Invariance',
    body: 'The same failure modes that corrupt a single agent corrupt a swarm. The same audit that clears a transaction clears a protocol. Logic failures do not change shape at scale — they amplify. The taxonomy holds at every layer.',
  },
];

export default function Philosophy() {
  const [active, setActive] = useState(null);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      style={{
        padding: '96px 24px',
        maxWidth: '760px',
        margin: '0 auto',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '56px' }}>
        <div style={{
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          fontSize: '11px',
          color: '#4ade80',
          letterSpacing: '0.15em',
          marginBottom: '16px',
        }}>
          // PROTOCOL_AXIOMS
        </div>
        <h2 style={{
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          fontSize: 'clamp(22px, 4vw, 32px)',
          fontWeight: '700',
          color: '#ffffff',
          letterSpacing: '-0.02em',
          lineHeight: '1.2',
          marginBottom: '20px',
        }}>
          The Mechanics of Verification
        </h2>
        <p style={{
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          fontSize: '13px',
          color: '#71717a',
          lineHeight: '1.8',
          maxWidth: '560px',
        }}>
          DJZS is not a monitor. It is a fold in the pipeline — a mandatory interior pass that logic must survive before it reaches execution. These are the four axioms that define the fold.
        </p>
      </div>

      {/* Axiom Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {PILLARS.map((pillar, i) => {
          const isActive = active === i;
          return (
            <div
              key={pillar.code}
              onClick={() => setActive(isActive ? null : i)}
              style={{
                border: `1px solid ${isActive ? '#4ade80' : '#1c1c1c'}`,
                backgroundColor: isActive ? 'rgba(74,222,128,0.04)' : '#0a0a0a',
                padding: '24px 28px',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateX(0)' : 'translateX(-12px)',
                transitionDelay: `${0.1 + i * 0.08}s`,
              }}
            >
              {/* Row header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{
                    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                    fontSize: '10px',
                    color: isActive ? '#4ade80' : '#3f3f46',
                    letterSpacing: '0.12em',
                    minWidth: '80px',
                    transition: 'color 0.2s',
                  }}>
                    {pillar.code}
                  </span>
                  <span style={{
                    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                    fontSize: '13px',
                    fontWeight: '600',
                    color: isActive ? '#ffffff' : '#a1a1aa',
                    transition: 'color 0.2s',
                  }}>
                    {pillar.label}
                  </span>
                </div>
                <span style={{
                  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                  fontSize: '16px',
                  color: isActive ? '#4ade80' : '#27272a',
                  transition: 'color 0.2s, transform 0.2s',
                  transform: isActive ? 'rotate(45deg)' : 'rotate(0deg)',
                  display: 'inline-block',
                }}>
                  +
                </span>
              </div>

              {/* Expanded body */}
              <div style={{
                maxHeight: isActive ? '200px' : '0px',
                overflow: 'hidden',
                transition: 'max-height 0.35s ease',
              }}>
                <p style={{
                  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                  fontSize: '12px',
                  color: '#71717a',
                  lineHeight: '1.9',
                  marginTop: '20px',
                  paddingLeft: '96px',
                  borderLeft: '1px solid #1c1c1c',
                  paddingRight: '8px',
                }}>
                  {pillar.body}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer line */}
      <div style={{
        marginTop: '48px',
        paddingTop: '24px',
        borderTop: '1px solid #1c1c1c',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}>
        <div style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: '#4ade80',
          boxShadow: '0 0 8px rgba(74,222,128,0.6)',
          animation: 'pulse 2s infinite',
        }} />
        <span style={{
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          fontSize: '11px',
          color: '#3f3f46',
          letterSpacing: '0.1em',
        }}>
          AUDIT_BEFORE_ACT // DJZS_PROTOCOL_v1.0 // BASE_MAINNET
        </span>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  );
}
