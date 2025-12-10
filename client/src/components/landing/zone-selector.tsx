import React from "react";
import { motion } from "framer-motion";
import { Zone, ZONES } from "./config";

interface ZoneSelectorProps {
  selectedCode: string;
  onSelect: (zone: Zone) => void;
}

export function ZoneSelector({ selectedCode, onSelect }: ZoneSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono tracking-[0.25em] text-slate-300 uppercase">
          TARGET ZONE
        </span>
        <span className="text-[0.65rem] text-slate-400">
          DJZS Zone Map · 10 modes
        </span>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {ZONES.map((zone, index) => {
          const isActive = zone.code === selectedCode;
          return (
            <motion.button
              key={zone.code}
              data-testid={`button-zone-${zone.code}`}
              onClick={() => onSelect(zone)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                boxShadow: "0 10px 30px rgba(56,189,248,0.2)"
              }}
              whileTap={{ scale: 0.98 }}
              className={`flex-shrink-0 rounded-lg border px-3 py-2 text-left transition min-w-[9rem] ${
                isActive
                  ? "border-sky-400 bg-sky-950/60 shadow-[0_0_0_1px_rgba(56,189,248,0.6)]"
                  : "border-sky-500/30 bg-slate-950/60 hover:border-sky-300/60"
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-mono">
                <span>{zone.code}</span>
                <span>{zone.emoji}</span>
              </div>
              <div className="mt-1 text-[0.7rem] font-semibold">
                {zone.name}
              </div>
              <p className="mt-1 text-[0.65rem] text-slate-300/80">
                {zone.shortDescription}
              </p>
            </motion.button>
          );
        })}
      </div>
      <p className="text-[0.65rem] text-slate-400">
        Zone Selected: <span className="font-semibold">{selectedCode}</span>{" "}
        — Persona loaded from DJZS Protocol.
      </p>
    </div>
  );
}
