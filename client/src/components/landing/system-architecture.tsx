import React from "react";
import { SYSTEM_STEPS } from "./config";

export function SystemArchitectureSection() {
  return (
    <section className="px-6 py-16 lg:px-12 border-t border-sky-500/20">
      <div className="max-w-6xl mx-auto space-y-8">
        <h2 className="text-sm font-mono tracking-[0.25em] text-sky-300 uppercase">
          SYSTEM ARCHITECTURE
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {SYSTEM_STEPS.map((step) => (
            <div
              key={step.id}
              data-testid={`card-step-${step.id}`}
              className="rounded-xl border border-sky-500/40 bg-slate-950/70 p-4 shadow-md shadow-sky-950/70"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-sky-300">
                  {step.id}
                </span>
                <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
              </div>
              <div className="text-xs font-semibold tracking-[0.18em] uppercase">
                {step.title}
              </div>
              <p className="mt-2 text-[0.75rem] text-slate-200/90">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
