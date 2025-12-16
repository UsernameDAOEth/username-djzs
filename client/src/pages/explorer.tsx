import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { CyberGrid } from "@/components/cyber-grid";

type ExplorerItem = {
  id: string;
  title: string;
  summary?: string;
  zoneCode: string;
  zoneName: string;
  contentType: "Journal" | "Article" | "Trade" | "Note" | "Link";
  tags: string[];
  source?: string;
  createdAt: string;
  updatedAt?: string;
  anytypeObjectId?: string;
  irysTxId?: string;
};

const ZONES = [
  { code: "01_DYOR", name: "DYOR" },
  { code: "02_DID", name: "Decentralized iD" },
  { code: "03_TESTNET", name: "Blockchain Testnet" },
  { code: "04_DESO", name: "Decentralized Social" },
  { code: "05_RWA", name: "RWA" },
  { code: "06_DEPIN", name: "DePIN" },
  { code: "07_DEFI", name: "DeFi" },
  { code: "08_DEAI", name: "Decentralized A.I." },
  { code: "09_DESCI", name: "Decentralized Science" },
  { code: "10_TIME", name: "Time" },
];

const CONTENT_TYPES: ExplorerItem["contentType"][] = ["Journal", "Article", "Trade", "Note", "Link"];

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
}

function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs border border-lime-500/30 bg-lime-950/40 ${className}`}
    >
      {children}
    </span>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-lime-500/30 bg-slate-900/80 ${className}`}>
      {children}
    </div>
  );
}

function CardBody({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}

function Divider() {
  return <div className="h-px w-full bg-lime-500/20 my-4" />;
}

export default function Explorer() {
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState<"recent" | "updated" | "zone">("recent");

  const [zoneFilter, setZoneFilter] = useState<string[]>([]);
  const [typeFilter, setTypeFilter] = useState<ExplorerItem["contentType"][]>([]);
  const [tagFilter, setTagFilter] = useState<string[]>([]);

  const [items, setItems] = useState<ExplorerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ExplorerItem | null>(null);
  const [error, setError] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const s = new Set<string>();
    items.forEach((i) => i.tags.forEach((t) => s.add(t)));
    return Array.from(s).sort();
  }, [items]);

  useEffect(() => {
    let alive = true;
    async function run() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/explorer", { cache: "no-store" });
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data = await res.json();

        if (!alive) return;
        setItems(Array.isArray(data.items) ? data.items : []);
      } catch (e: any) {
        if (!alive) return;
        setItems(mockItems());
        setError("Using mock data (API unavailable).");
      } finally {
        if (alive) setLoading(false);
      }
    }
    run();
    return () => {
      alive = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let out = items.slice();

    if (q) {
      out = out.filter((i) => {
        const hay = `${i.title} ${i.summary || ""} ${i.zoneCode} ${i.zoneName} ${i.tags.join(" ")} ${i.source || ""}`.toLowerCase();
        return hay.includes(q);
      });
    }

    if (zoneFilter.length) out = out.filter((i) => zoneFilter.includes(i.zoneCode));
    if (typeFilter.length) out = out.filter((i) => typeFilter.includes(i.contentType));
    if (tagFilter.length) out = out.filter((i) => i.tags.some((t) => tagFilter.includes(t)));

    if (sort === "recent") out.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
    if (sort === "updated") out.sort((a, b) => +new Date(b.updatedAt || b.createdAt) - +new Date(a.updatedAt || a.createdAt));
    if (sort === "zone") out.sort((a, b) => a.zoneCode.localeCompare(b.zoneCode));

    return out;
  }, [items, query, zoneFilter, typeFilter, tagFilter, sort]);

  function toggleInList<T>(val: T, list: T[], setList: (v: T[]) => void) {
    setList(list.includes(val) ? list.filter((x) => x !== val) : [...list, val]);
  }

  function clearAll() {
    setQuery("");
    setZoneFilter([]);
    setTypeFilter([]);
    setTagFilter([]);
    setSelected(null);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-mono relative overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <CyberGrid />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.9)_90%)]" />
      </div>

      <Navigation />

      <div className="relative z-10 sticky top-0 backdrop-blur-xl bg-slate-950/80 border-b border-lime-500/20">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-start md:items-center gap-3">
          <div className="flex items-center gap-2 shrink-0">
            <div className="h-9 w-9 rounded-xl bg-lime-950/60 border border-lime-500/30 grid place-items-center text-lg">
              🌌
            </div>
            <div className="leading-tight">
              <div className="font-semibold text-lime-400">DJZS Explorer</div>
              <div className="text-xs text-slate-400">Search zones, journals, and sources</div>
            </div>
          </div>

          <div className="flex-1 px-2 w-full md:w-auto">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search titles, tags, links, summaries…"
              className="w-full px-3 py-2 rounded-lg border border-lime-500/30 bg-slate-900/80 outline-none focus:border-lime-400/60 text-sm placeholder:text-slate-500"
              data-testid="input-explorer-search"
            />
          </div>

          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => setSort(sort === "recent" ? "updated" : sort === "updated" ? "zone" : "recent")}
              className="px-3 py-2 rounded-lg border border-lime-500/30 bg-slate-900/60 hover:bg-slate-800/80 text-xs transition"
              data-testid="button-sort"
            >
              Sort: {sort === "recent" ? "Newest" : sort === "updated" ? "Updated" : "Zone"}
            </button>
            <button
              onClick={() => setView(view === "grid" ? "list" : "grid")}
              className="px-3 py-2 rounded-lg border border-lime-500/30 bg-slate-900/60 hover:bg-slate-800/80 text-xs transition"
              data-testid="button-view"
            >
              View: {view}
            </button>
            <button
              onClick={clearAll}
              className="px-3 py-2 rounded-lg border border-lime-500/30 bg-slate-900/60 hover:bg-slate-800/80 text-xs text-slate-300 transition"
              data-testid="button-reset"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-[260px_1fr_340px] gap-4">
        <Card className="h-fit">
          <CardBody>
            <div className="flex items-center justify-between">
              <div className="font-semibold text-lime-400">Filters</div>
              <button onClick={clearAll} className="text-xs text-slate-400 hover:text-slate-200">
                Clear
              </button>
            </div>

            <div className="mt-4">
              <div className="text-xs text-slate-500 mb-2">Zones</div>
              <div className="flex flex-wrap gap-2">
                {ZONES.map((z) => (
                  <button
                    key={z.code}
                    onClick={() => toggleInList(z.code, zoneFilter, setZoneFilter)}
                    className={`px-2 py-1 rounded-lg border text-xs transition ${
                      zoneFilter.includes(z.code)
                        ? "border-lime-400/60 bg-lime-950/60 text-lime-300"
                        : "border-lime-500/20 bg-slate-900/60 hover:bg-slate-800/80 text-slate-300"
                    }`}
                    data-testid={`filter-zone-${z.code}`}
                  >
                    {z.name}
                  </button>
                ))}
              </div>
            </div>

            <Divider />

            <div>
              <div className="text-xs text-slate-500 mb-2">Content type</div>
              <div className="flex flex-wrap gap-2">
                {CONTENT_TYPES.map((t) => (
                  <button
                    key={t}
                    onClick={() => toggleInList(t, typeFilter, setTypeFilter)}
                    className={`px-2 py-1 rounded-lg border text-xs transition ${
                      typeFilter.includes(t)
                        ? "border-lime-400/60 bg-lime-950/60 text-lime-300"
                        : "border-lime-500/20 bg-slate-900/60 hover:bg-slate-800/80 text-slate-300"
                    }`}
                    data-testid={`filter-type-${t}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <Divider />

            <div>
              <div className="text-xs text-slate-500 mb-2">Tags</div>
              <div className="max-h-44 overflow-auto pr-1 flex flex-wrap gap-2">
                {allTags.length ? (
                  allTags.map((t) => (
                    <button
                      key={t}
                      onClick={() => toggleInList(t, tagFilter, setTagFilter)}
                      className={`px-2 py-1 rounded-lg border text-xs transition ${
                        tagFilter.includes(t)
                          ? "border-lime-400/60 bg-lime-950/60 text-lime-300"
                          : "border-lime-500/20 bg-slate-900/60 hover:bg-slate-800/80 text-slate-300"
                      }`}
                      data-testid={`filter-tag-${t}`}
                    >
                      #{t}
                    </button>
                  ))
                ) : (
                  <div className="text-xs text-slate-500">Tags will appear once items load.</div>
                )}
              </div>
            </div>
          </CardBody>
        </Card>

        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-slate-400">
              {loading ? "Loading…" : `${filtered.length} result${filtered.length === 1 ? "" : "s"}`}
              {error ? <span className="ml-2 text-xs text-slate-500">({error})</span> : null}
            </div>
            <div className="md:hidden flex gap-2">
              <button
                onClick={() => setSort(sort === "recent" ? "updated" : sort === "updated" ? "zone" : "recent")}
                className="px-2 py-1 rounded-lg border border-lime-500/30 bg-slate-900/60 text-xs"
              >
                Sort
              </button>
              <button
                onClick={() => setView(view === "grid" ? "list" : "grid")}
                className="px-2 py-1 rounded-lg border border-lime-500/30 bg-slate-900/60 text-xs"
              >
                View
              </button>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Array.from({ length: 6 }).map((_, idx) => (
                <Card key={idx} className="animate-pulse">
                  <CardBody>
                    <div className="h-4 w-2/3 bg-slate-700/50 rounded" />
                    <div className="h-3 w-full bg-slate-800/50 rounded mt-3" />
                    <div className="h-3 w-5/6 bg-slate-800/50 rounded mt-2" />
                    <div className="h-6 w-32 bg-slate-700/50 rounded mt-4" />
                  </CardBody>
                </Card>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <Card>
              <CardBody>
                <div className="font-semibold text-lime-400">No results</div>
                <div className="text-sm text-slate-400 mt-1">
                  Try a different search, or clear filters. This Explorer is like "Spotlight for DJZS".
                </div>
                <div className="mt-3">
                  <button
                    onClick={clearAll}
                    className="px-3 py-2 rounded-lg border border-lime-500/40 bg-lime-950/40 text-lime-300 text-xs hover:bg-lime-900/60 transition"
                    data-testid="button-reset-empty"
                  >
                    Reset
                  </button>
                </div>
              </CardBody>
            </Card>
          ) : view === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filtered.map((i) => (
                <motion.div
                  key={i.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <Card className="hover:border-lime-400/50 transition cursor-pointer">
                    <CardBody>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="font-semibold leading-tight text-slate-100">{i.title}</div>
                          <div className="text-xs text-slate-500 mt-1">
                            {i.zoneName} • {i.contentType} • {formatDate(i.createdAt)}
                          </div>
                        </div>
                        <button
                          onClick={() => setSelected(i)}
                          className="shrink-0 px-2 py-1 rounded-lg border border-lime-500/30 bg-slate-900/60 hover:bg-slate-800/80 text-xs transition"
                          data-testid={`button-preview-${i.id}`}
                        >
                          Preview
                        </button>
                      </div>
                      {i.summary ? <div className="text-sm text-slate-400 mt-3 line-clamp-3">{i.summary}</div> : null}
                      <div className="flex flex-wrap gap-2 mt-3">
                        <Badge>{i.zoneCode}</Badge>
                        <Badge>{i.contentType}</Badge>
                        {i.tags.slice(0, 3).map((t) => (
                          <Badge key={t} className="text-slate-300">
                            #{t}
                          </Badge>
                        ))}
                        {i.tags.length > 3 ? <Badge className="text-slate-500">+{i.tags.length - 3}</Badge> : null}
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filtered.map((i) => (
                <motion.div
                  key={i.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Card className="hover:border-lime-400/50 transition">
                    <CardBody className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="font-semibold truncate text-slate-100">{i.title}</div>
                        <div className="text-xs text-slate-500 mt-1 truncate">
                          {i.zoneName} • {i.contentType} • {formatDate(i.createdAt)} • {(i.tags || []).slice(0, 5).map((t) => `#${t}`).join(" ")}
                        </div>
                      </div>
                      <button
                        onClick={() => setSelected(i)}
                        className="shrink-0 px-2 py-1 rounded-lg border border-lime-500/30 bg-slate-900/60 hover:bg-slate-800/80 text-xs transition"
                        data-testid={`button-preview-list-${i.id}`}
                      >
                        Preview
                      </button>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <Card className="h-fit lg:sticky lg:top-[88px]">
          <CardBody>
            <div className="flex items-center justify-between">
              <div className="font-semibold text-lime-400">Preview</div>
              {selected ? (
                <button onClick={() => setSelected(null)} className="text-xs text-slate-400 hover:text-slate-200">
                  Close
                </button>
              ) : null}
            </div>

            {!selected ? (
              <div className="text-sm text-slate-400 mt-3">
                Select any result to preview it here. This is where you'll use "Open in Anytype", "Mint", "Share", and "Summarize".
              </div>
            ) : (
              <div className="mt-3 space-y-3">
                <div>
                  <div className="text-lg font-semibold leading-tight text-slate-100">{selected.title}</div>
                  <div className="text-xs text-slate-500 mt-1">
                    {selected.zoneName} • {selected.contentType} • Created {formatDate(selected.createdAt)}
                    {selected.updatedAt ? ` • Updated ${formatDate(selected.updatedAt)}` : ""}
                  </div>
                </div>

                {selected.summary ? <div className="text-sm text-slate-300">{selected.summary}</div> : null}

                <div className="flex flex-wrap gap-2">
                  <Badge>{selected.zoneCode}</Badge>
                  <Badge>{selected.contentType}</Badge>
                  {selected.tags.map((t) => (
                    <Badge key={t}>#{t}</Badge>
                  ))}
                </div>

                <Divider />

                <div className="space-y-2">
                  <div className="text-xs text-slate-500">Quick actions</div>

                  <div className="grid grid-cols-1 gap-2">
                    <button
                      onClick={() => alert("Hook: Open in Anytype")}
                      className="px-3 py-2 rounded-lg border border-lime-500/30 bg-slate-900/60 hover:bg-slate-800/80 text-xs transition text-left"
                      data-testid="action-open-anytype"
                    >
                      Open in Anytype
                    </button>

                    <button
                      onClick={() => alert("Hook: Mint / Publish")}
                      className="px-3 py-2 rounded-lg border border-lime-500/30 bg-slate-900/60 hover:bg-slate-800/80 text-xs transition text-left"
                      data-testid="action-mint"
                    >
                      Mint / Publish
                    </button>

                    <button
                      onClick={() => alert("Hook: Summarize with Agent")}
                      className="px-3 py-2 rounded-lg border border-lime-500/30 bg-slate-900/60 hover:bg-slate-800/80 text-xs transition text-left"
                      data-testid="action-summarize"
                    >
                      Summarize with Agent
                    </button>

                    <button
                      onClick={() => {
                        if (selected.source?.startsWith("http")) window.open(selected.source, "_blank");
                        else alert("No source URL.");
                      }}
                      className="px-3 py-2 rounded-lg border border-lime-500/30 bg-slate-900/60 hover:bg-slate-800/80 text-xs transition text-left"
                      data-testid="action-open-source"
                    >
                      Open Source
                    </button>
                  </div>
                </div>

                <Divider />

                <div className="text-xs text-slate-500 space-y-1">
                  <div>Anytype: {selected.anytypeObjectId || "—"}</div>
                  <div>Irys: {selected.irysTxId || "—"}</div>
                  <div>Source: {selected.source || "—"}</div>
                </div>
              </div>
            )}
          </CardBody>
        </Card>
      </main>

      <div className="relative z-10 max-w-7xl mx-auto px-4 pb-10 text-xs text-slate-500">
        Tip: keep Explorer fast. Prefetch minimal fields, then load full object content only when Preview opens.
      </div>
    </div>
  );
}

function mockItems(): ExplorerItem[] {
  return [
    {
      id: "1",
      title: "WAL thesis: storage + distribution flywheel",
      summary: "Narrative breakdown, risks, token sinks, and which metrics matter over the next 90 days.",
      zoneCode: "01_DYOR",
      zoneName: "DYOR",
      contentType: "Article",
      tags: ["narratives", "tokenomics", "risk"],
      source: "https://djzsx.xyz/",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
      anytypeObjectId: "anytype_obj_abc",
      irysTxId: "irys_tx_123",
    },
    {
      id: "2",
      title: "Agent spec: Anytype MCP → DJZS Zone objects",
      summary: "Object types, properties, relations, and how a local worker syncs into the vault.",
      zoneCode: "08_DEAI",
      zoneName: "Decentralized A.I.",
      contentType: "Note",
      tags: ["mcp", "anytype", "agents"],
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString(),
    },
    {
      id: "3",
      title: "Trade log: WLD 10x plan (entry → TP ladder)",
      summary: "Risk-defined plan with invalidation level, partials, and journaled reasoning.",
      zoneCode: "07_DEFI",
      zoneName: "DeFi",
      contentType: "Trade",
      tags: ["risk", "tp/sl", "journal"],
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
    },
    {
      id: "4",
      title: "Farcaster integration notes",
      summary: "How to pull cast data, reputation scores, and channel memberships into the vault.",
      zoneCode: "04_DESO",
      zoneName: "Decentralized Social",
      contentType: "Journal",
      tags: ["farcaster", "social", "integration"],
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    },
    {
      id: "5",
      title: "DePIN hardware comparison: Helium vs IoTeX",
      summary: "Coverage, rewards, and long-term sustainability of physical infrastructure networks.",
      zoneCode: "06_DEPIN",
      zoneName: "DePIN",
      contentType: "Article",
      tags: ["depin", "hardware", "comparison"],
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString(),
    },
  ];
}
