import React from "react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="px-6 py-8 lg:px-12 border-t border-sky-500/20 text-[0.7rem] text-slate-400/80">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-3">
        <div>© {new Date().getFullYear()} USERNAME DAO × DJZS Protocol.</div>
        <div className="flex flex-wrap gap-4">
          <Link href="/profile" className="hover:text-sky-300 transition">Profile</Link>
          <Link href="/explorer" className="hover:text-sky-300 transition">Explorer</Link>
          <Link href="/api-test" className="hover:text-sky-300 transition">API Test</Link>
          <span>ECOSYSTEM: Username DAO · DJZS · Anytype</span>
        </div>
      </div>
    </footer>
  );
}
