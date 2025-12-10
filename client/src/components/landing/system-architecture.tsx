import React from "react";
import { motion } from "framer-motion";
import { SYSTEM_STEPS } from "./config";

export function SystemArchitectureSection() {
  return (
    <section className="px-6 py-16 lg:px-12 border-t border-cyan-500/20">
      <div className="max-w-6xl mx-auto space-y-8">
        <motion.h2 
          className="text-sm font-mono tracking-[0.25em] text-cyan-300 uppercase"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          SYSTEM ARCHITECTURE
        </motion.h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {SYSTEM_STEPS.map((step, index) => (
            <motion.div
              key={step.id}
              data-testid={`card-step-${step.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05, 
                y: -8,
                boxShadow: "0 15px 40px rgba(34,211,238,0.15)"
              }}
              className="rounded-xl border border-cyan-500/40 bg-slate-950/70 p-4 shadow-md shadow-cyan-950/70 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-cyan-300">
                  {step.id}
                </span>
                <motion.span 
                  className="h-2 w-2 rounded-full bg-emerald-400/80"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                />
              </div>
              <div className="text-xs font-semibold tracking-[0.18em] uppercase">
                {step.title}
              </div>
              <p className="mt-2 text-[0.75rem] text-slate-200/90">
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
