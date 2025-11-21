import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BrutalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
}

export const BrutalButton = React.forwardRef<HTMLButtonElement, BrutalButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    const variants = {
      primary: "bg-primary text-primary-foreground hover:translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_var(--color-foreground)] active:translate-x-0 active:translate-y-0 active:shadow-none border-2 border-primary-foreground",
      outline: "bg-transparent text-foreground border-2 border-foreground hover:bg-foreground hover:text-background",
      ghost: "bg-transparent text-foreground hover:bg-muted",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "px-6 py-3 font-mono text-lg font-bold uppercase transition-all duration-100 border-2",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);
BrutalButton.displayName = "BrutalButton";

export const BrutalCard = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "bg-card text-card-foreground border-2 border-border p-6 relative",
        "after:content-[''] after:absolute after:inset-0 after:border-2 after:border-border after:translate-x-2 after:translate-y-2 after:-z-10",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const Marquee = ({ text, repeat = 4 }: { text: string; repeat?: number }) => {
  return (
    <div className="overflow-hidden whitespace-nowrap border-y-2 border-primary bg-primary text-primary-foreground py-2 font-mono text-xl font-bold uppercase tracking-widest">
      <motion.div
        className="inline-block"
        animate={{ x: "-100%" }}
        transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
      >
        {Array(repeat).fill(text).map((t, i) => (
          <span key={i} className="mx-8">
            {t}
          </span>
        ))}
      </motion.div>
      <motion.div
        className="inline-block"
        animate={{ x: "-100%" }}
        transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
      >
        {Array(repeat).fill(text).map((t, i) => (
          <span key={i} className="mx-8">
            {t}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export const GlitchText = ({ text, className }: { text: string; className?: string }) => {
  return (
    <div className={cn("relative inline-block font-black uppercase", className)}>
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-primary opacity-70 animate-pulse translate-x-[2px] translate-y-[2px]">
        {text}
      </span>
      <span className="absolute top-0 left-0 -z-20 w-full h-full text-destructive opacity-70 animate-pulse -translate-x-[2px] -translate-y-[2px]">
        {text}
      </span>
    </div>
  );
};
