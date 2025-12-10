import React from "react";
import { motion } from "framer-motion";
import { ProcessingMode, PROCESSING_MODES } from "./config";

interface ModeSelectorProps {
  mode: ProcessingMode;
  onChange: (mode: ProcessingMode) => void;
}

export function ModeSelector({ mode, onChange }: ModeSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono tracking-[0.25em] text-slate-300 uppercase">
          PROCESSING MODE
        </span>
        <span className="text-[0.65rem] text-slate-400">
          x402 micropayment structure
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {PROCESSING_MODES.map((m, index) => {
          const isActive = m.id === mode;
          return (
            <motion.button
              key={m.id}
              data-testid={`button-mode-${m.id}`}
              onClick={() => onChange(m.id)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.03, 
                boxShadow: "0 5px 20px rgba(56,189,248,0.15)"
              }}
              whileTap={{ scale: 0.97 }}
              className={`rounded-md border px-3 py-2 text-left transition ${
                isActive
                  ? "border-sky-400 bg-sky-900/70"
                  : "border-sky-500/40 bg-slate-950/60 hover:border-sky-300/60"
              }`}
            >
              <div className="text-xs font-mono">{m.label}</div>
              <div className="text-[0.7rem] text-slate-300/80">
                {m.subtitle}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
