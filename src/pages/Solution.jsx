import { useState, useEffect } from "react";
import {
  MapPin, Users, Search, ShoppingCart,
  Mail, Shield, Download, Check,
  ArrowRight, Star, Building2, Briefcase, Tag, TrendingUp, X,
  Code, Phone
} from "lucide-react";
import dashboardScreenshot from "../assets/Screenshot 2026-06-19 150042.png";
import mapImg from "../assets/googl_ED.jpg";

/* ---- Brand logo marks (real platform logos) ---- */
const GoogleMapsMark = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7z" fill="#EA4335" />
    <circle cx="12" cy="9" r="2.4" fill="#fff" />
  </svg>
);
const InstagramMark = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <defs>
      <linearGradient id="igGrad" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0%" stopColor="#feda75" />
        <stop offset="45%" stopColor="#d62976" />
        <stop offset="100%" stopColor="#962fbf" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#igGrad)" />
    <circle cx="12" cy="12" r="4" fill="none" stroke="#fff" strokeWidth="1.8" />
    <circle cx="17" cy="7" r="1.1" fill="#fff" />
  </svg>
);
const TikTokMark = (props) => (
  <svg viewBox="0 0 24 24" {...props}>
    <rect width="24" height="24" rx="6" fill="#010101" />
    <path d="M16.6 6.3c-.9-.6-1.4-1.5-1.6-2.6h-2v9.8c0 1.1-.9 1.9-1.9 1.9a1.95 1.95 0 0 1-.5-3.8V9.4a4.05 4.05 0 1 0 4.5 4V8.7c.8.5 1.7.8 2.7.8V7.4c-.5 0-1-.1-1.4-.3z" fill="#fff" />
  </svg>
);
const FacebookMark = (props) => (
  <svg viewBox="0 0 24 24" {...props}>
    <rect width="24" height="24" rx="6" fill="#1877F2" />
    <path d="M14.4 12.6h1.8l.3-2.3h-2.1V8.9c0-.7.2-1.1 1.2-1.1h1V5.7c-.2 0-.9-.1-1.6-.1-1.6 0-2.7 1-2.7 2.8v1.6H9.5v2.3h1.9V19h2.9v-6.4z" fill="#fff" />
  </svg>
);
const LinkedinMark = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M6.94 5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0zM3.5 8.5h3v12h-3v-12zm5 0h2.87v1.64h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.6v7.32h-3v-6.49c0-1.55-.03-3.54-2.16-3.54-2.16 0-2.49 1.69-2.49 3.43v6.6h-3v-12z" />
  </svg>
);

// Minimal Premium Button Component (inlining for perfect control)
const PremiumButton = ({ children, primary, onClick, icon }) => (
  <button
    onClick={onClick}
    className={`group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[14px] font-medium transition-all duration-300 active:scale-95 ${primary
      ? "bg-slate-900 text-white shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] hover:bg-slate-800 hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)]"
      : "bg-white text-slate-700 border border-slate-200 shadow-sm hover:bg-slate-50 hover:border-slate-300"
      }`}
  >
    {primary && <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />}
    <span className="relative z-10 flex items-center gap-2">
      {children}
      {icon && <span className="transition-transform duration-200 group-hover:translate-x-0.5">{icon}</span>}
    </span>
  </button>
);

// ---- Live bento mini-widgets ----
function Ticker({ from, step = 100 }) {
  const [n, setN] = useState(from);
  useEffect(() => {
    const id = setInterval(() => setN((v) => v + 1 + Math.floor(Math.random() * step)), 700);
    return () => clearInterval(id);
  }, [step]);
  return <span className="tabular-nums">{n.toLocaleString()}</span>;
}

const PRICES = [
  { val: "$129.00", dir: "down", pct: "-7%" },
  { val: "$99.00", dir: "down", pct: "-23%" },
  { val: "$119.00", dir: "up", pct: "+20%" },
  { val: "$104.00", dir: "down", pct: "-13%" },
];
function PriceFlip() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % PRICES.length), 1600);
    return () => clearInterval(id);
  }, []);
  const p = PRICES[i];
  const up = p.dir === "up";
  return (
    <div key={i} className="animate-rise flex items-baseline gap-2">
      <span className="text-[26px] font-extrabold text-slate-900 tabular-nums">{p.val}</span>
      <span className={`text-[13px] font-bold ${up ? "text-red-500" : "text-emerald-500"}`}>
        {up ? "▲" : "▼"} {p.pct}
      </span>
    </div>
  );
}

// Creative "bento grid" — every workflow gets its own live micro-animation.
function WorkflowBento() {
  const card = "relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.18)] hover:-translate-y-0.5";
  return (
    <section className="py-24 bg-slate-50">
      <style>{`
        @keyframes growBar { from { height: 0; } }
        @keyframes scan { 0% { top: -25%; } 100% { top: 120%; } }
      `}</style>

      <div className="mx-auto max-w-[1180px] px-6 lg:px-8">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-[12px] font-semibold text-blue-600 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600" />
            </span>
            Live across every source
          </div>
          <h2 className="text-[32px] sm:text-[40px] font-bold tracking-tight text-slate-900">A solution for every workflow</h2>
          <p className="mt-3 text-[16px] text-slate-500 font-medium max-w-xl mx-auto">One platform, six data sources — each tuned to pull exactly what you need.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[210px] gap-4">

          {/* 1 — Local lead gen : live map with pulsing pins */}
          <div className={`${card} md:col-span-2 md:row-span-2 flex flex-col`}>
            {/* static Google Map background */}
            <img src={mapImg} alt="Map view" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/55 to-transparent" />
            {/* real-time scanning line sweeping across the map */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute left-0 right-0 h-24 bg-gradient-to-b from-cyan-300/50 via-blue-400/20 to-transparent" style={{ animation: "scan 3.2s linear infinite" }} />
              <div className="absolute left-0 right-0 h-px bg-cyan-400/70 shadow-[0_0_12px_2px_rgba(34,211,238,0.6)]" style={{ animation: "scan 3.2s linear infinite" }} />
            </div>
            {[
              { t: "24%", l: "30%", d: "0ms" },
              { t: "44%", l: "62%", d: "300ms" },
              { t: "60%", l: "38%", d: "600ms" },
              { t: "32%", l: "78%", d: "900ms" },
              { t: "66%", l: "70%", d: "1200ms" },
            ].map((p, i) => (
              <span key={i} className="absolute" style={{ top: p.t, left: p.l }}>
                <span className="absolute -inset-2 rounded-full bg-blue-500/30 animate-ping" style={{ animationDelay: p.d }} />
                <span className="relative grid h-6 w-6 place-items-center rounded-full bg-blue-600 text-white shadow-lg">
                  <MapPin className="h-3.5 w-3.5" />
                </span>
              </span>
            ))}
            <div className="relative mt-auto">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/85 backdrop-blur px-2.5 py-1 text-[11px] font-bold text-slate-700 border border-slate-200 mb-2"><GoogleMapsMark className="h-3.5 w-3.5" /> Google Maps</span>
              <h3 className="text-[20px] font-bold text-slate-900">Local lead generation</h3>
              <p className="text-[13px] text-slate-500 mt-1"><span className="font-bold text-slate-700"><Ticker from={1204} step={2} /></span> places found near you</p>
            </div>
          </div>

          {/* 2 — Influencer : real logos + follower ticker */}
          <div className={`${card} md:col-span-2 flex flex-col justify-between`}>
            <div className="flex items-center justify-between">
              <div className="flex -space-x-2">
                <InstagramMark className="h-9 w-9 rounded-xl ring-2 ring-white" />
                <TikTokMark className="h-9 w-9 rounded-xl ring-2 ring-white" />
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-500"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> live</span>
            </div>
            <div>
              <div className="text-[28px] font-extrabold text-slate-900"><Ticker from={182430} step={80} /></div>
              <div className="text-[12px] text-slate-400 -mt-1">followers tracked</div>
            </div>
            <h3 className="text-[15px] font-bold text-slate-900">Influencer &amp; creator discovery <span className="font-normal text-slate-400">· Instagram + TikTok</span></h3>
          </div>

          {/* 3 — Price monitoring : price flip */}
          <div className={`${card} md:col-span-1 flex flex-col justify-between`}>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-500"><ShoppingCart className="h-5 w-5" /></div>
            <PriceFlip />
            <h3 className="text-[13px] font-bold text-slate-900 leading-snug">Price &amp; competitor monitoring</h3>
          </div>

          {/* 4 — Social research : real engagement bar chart */}
          <div className={`${card} md:col-span-1 flex flex-col justify-between`}>
            <div className="flex items-center justify-between">
              <FacebookMark className="h-9 w-9" />
              <span className="text-[11px] font-bold text-emerald-500">▲ 12%</span>
            </div>
            <div className="flex items-end justify-between gap-1.5 h-16">
              {[60, 38, 82, 50, 70].map((h, i) => (
                <div key={i} className="flex-1 flex items-end h-full">
                  <div className="w-full rounded-t bg-gradient-to-t from-blue-500 to-cyan-400" style={{ height: `${h}%`, animation: `growBar 900ms ease-out ${i * 120}ms both` }} />
                </div>
              ))}
            </div>
            <h3 className="text-[13px] font-bold text-slate-900 leading-snug">Social audience research</h3>
          </div>

          {/* 5 — AI / RAG : live extracted JSON */}
          <div className={`${card} md:col-span-2 flex flex-col justify-between`}>
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-500"><Code className="h-5 w-5" /></div>
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-violet-500">extracting<span className="h-3 w-px bg-violet-500 animate-pulse" /></span>
            </div>
            <div className="rounded-lg bg-slate-50 border border-slate-200 px-3 py-2.5 font-mono text-[11px] leading-relaxed">
              <div className="text-slate-400">{`{`}</div>
              <div className="animate-rise pl-3"><span className="text-blue-600">"title"</span>: <span className="text-emerald-600">"About — Acme Inc."</span>,</div>
              <div className="animate-rise pl-3" style={{ animationDelay: "150ms" }}><span className="text-blue-600">"email"</span>: <span className="text-emerald-600">"hi@acme.com"</span>,</div>
              <div className="animate-rise pl-3" style={{ animationDelay: "300ms" }}><span className="text-blue-600">"links"</span>: <span className="text-amber-600">42</span></div>
              <div className="text-slate-400">{`}`}<span className="ml-1 inline-block h-3 w-1.5 bg-violet-500 align-middle animate-pulse" /></div>
            </div>
            <h3 className="text-[15px] font-bold text-slate-900">AI / RAG training data <span className="font-normal text-slate-400">· Any website</span></h3>
          </div>

          {/* 6 — CRM enrichment : live contact card */}
          <div className={`${card} md:col-span-2 flex flex-col justify-between`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white text-[12px] font-bold">JC</div>
                <div>
                  <div className="text-[13px] font-bold text-slate-900 leading-tight">Jane Cooper</div>
                  <div className="text-[11px] text-slate-400">VP Sales · Acme Inc.</div>
                </div>
              </div>
              <span className="text-[11px] font-bold text-cyan-600">enriching…</span>
            </div>
            <div className="space-y-1.5">
              {[
                { Icon: Mail, label: "jane@acme.com" },
                { Icon: Phone, label: "+1 (415) 555-0132" },
                { Icon: LinkedinMark, label: "linkedin.com/in/janecooper" },
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-2 rounded-md bg-slate-50 px-2.5 py-1.5 animate-rise" style={{ animationDelay: `${i * 250}ms` }}>
                  <f.Icon className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span className="text-[12px] font-medium text-slate-600 truncate">{f.label}</span>
                  <Check className="h-3.5 w-3.5 text-emerald-500 ml-auto shrink-0" />
                </div>
              ))}
            </div>
            <h3 className="text-[15px] font-bold text-slate-900">CRM enrichment <span className="font-normal text-slate-400">· Your records</span></h3>
          </div>

        </div>
      </div>
    </section>
  );
}

const INDUSTRIES = [
  { icon: TrendingUp, title: "Sales & SDR teams", desc: "Fill the top of your funnel every morning." },
  { icon: Briefcase, title: "Marketing agencies", desc: "Targeted lists for every client, on demand." },
  { icon: Building2, title: "Real estate", desc: "Reach property managers and local agents first." },
  { icon: Users, title: "Recruiting & staffing", desc: "Source companies and candidates at scale." },
  { icon: Tag, title: "E-commerce & retail", desc: "Watch competitor catalogs and pricing." },
  { icon: MapPin, title: "Local services", desc: "Win clinics, gyms and salons in your area." }
];

const COMPARISON = [
  { label: "Time per 100 leads", manual: "~5 hours", leadx: "8 seconds" },
  { label: "Data accuracy", manual: "Copy-paste errors", leadx: "Structured & validated" },
  { label: "Emails & socials", manual: "Hunt site by site", leadx: "Auto-discovered" },
  { label: "Duplicates", manual: "Clean by hand", leadx: "Removed automatically" },
  { label: "Export", manual: "Manual spreadsheet", leadx: "CSV / Excel / JSON / Sheets — 1 click" },
  { label: "Scale", manual: "A few a day", leadx: "Thousands per run" }
];

const DEMOS = [
  {
    q: "dentists in austin",
    total: 128,
    leads: [
      { name: "Sunrise Dental Care",    cat: "Dental clinic",    rating: "4.8", phone: "(512) 555-0143", email: "hi@sunrisedental.com" },
      { name: "Lakeline Family Dental", cat: "Dentist",          rating: "4.7", phone: "(512) 555-0188", email: "care@lakelinedental.com" },
      { name: "Brightsmile Studio",     cat: "Cosmetic dentist", rating: "4.9", phone: "(512) 555-0121", email: "hello@brightsmile.io" },
      { name: "Capital Orthodontics",   cat: "Orthodontist",     rating: "4.6", phone: "(512) 555-0164", email: "team@capitalortho.com" },
    ],
  },
  {
    q: "gyms in mumbai",
    total: 214,
    leads: [
      { name: "Apex Fitness Studio", cat: "Gym",            rating: "4.9", phone: "+91 98200 11234", email: "join@apexfit.in" },
      { name: "IronCore Strength",   cat: "Fitness center", rating: "4.7", phone: "+91 98200 55678", email: "hi@ironcore.in" },
      { name: "FlexZone Andheri",    cat: "Gym",            rating: "4.5", phone: "+91 98200 99021", email: "front@flexzone.in" },
      { name: "Pulse CrossFit",      cat: "CrossFit box",   rating: "4.8", phone: "+91 98200 33145", email: "wod@pulsecf.in" },
    ],
  },
  {
    q: "coffee shops in brooklyn",
    total: 173,
    leads: [
      { name: "BrewHaus Coffee Co.", cat: "Coffee shop",    rating: "4.6", phone: "(718) 555-0199", email: "team@brewhaus.co" },
      { name: "Bedford Beans",       cat: "Cafe",           rating: "4.8", phone: "(718) 555-0142", email: "hello@bedfordbeans.com" },
      { name: "The Daily Grind",     cat: "Espresso bar",   rating: "4.7", phone: "(718) 555-0177", email: "hi@dailygrind.nyc" },
      { name: "Roast & Co.",         cat: "Coffee roaster", rating: "4.9", phone: "(718) 555-0110", email: "orders@roastandco.com" },
    ],
  },
];

function downloadDemoCsv(demo) {
  const cols = ["name", "cat", "rating", "phone", "email"];
  const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const lines = [["Name", "Category", "Rating", "Phone", "Email"].join(",")];
  demo.leads.forEach((l) => lines.push(cols.map((c) => esc(l[c])).join(",")));
  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${demo.q.replace(/\s+/g, "-")}-leads.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// Real-time "watch a scrape happen" demo: types a query, then streams enriched leads in.
function LiveScrapeDemo() {
  const [qi, setQi] = useState(0);
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState("typing"); // typing | scanning | results
  const [rows, setRows] = useState(0);
  const [found, setFound] = useState(0);

  const demo = DEMOS[qi];

  // Phase 1 — type the query out
  useEffect(() => {
    if (phase !== "typing") return;
    setTyped("");
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(demo.q.slice(0, i));
      if (i >= demo.q.length) {
        clearInterval(id);
        setTimeout(() => setPhase("scanning"), 400);
      }
    }, 60);
    return () => clearInterval(id);
  }, [phase, qi, demo.q]);

  // Phase 2 — short "scanning" pause
  useEffect(() => {
    if (phase !== "scanning") return;
    setRows(0);
    setFound(0);
    const id = setTimeout(() => setPhase("results"), 950);
    return () => clearTimeout(id);
  }, [phase]);

  // Phase 3 — stream rows + count up, then move to the next query
  useEffect(() => {
    if (phase !== "results") return;
    let r = 0;
    const rowId = setInterval(() => {
      r += 1;
      setRows(r);
      if (r >= demo.leads.length) clearInterval(rowId);
    }, 380);

    let f = 0;
    const step = Math.ceil(demo.total / 30);
    const countId = setInterval(() => {
      f = Math.min(demo.total, f + step);
      setFound(f);
      if (f >= demo.total) clearInterval(countId);
    }, 45);

    const nextId = setTimeout(() => {
      setQi((p) => (p + 1) % DEMOS.length);
      setPhase("typing");
    }, 4800);

    return () => {
      clearInterval(rowId);
      clearInterval(countId);
      clearTimeout(nextId);
    };
  }, [phase, qi, demo.total, demo.leads.length]);

  const pick = (i) => { setQi(i); setPhase("typing"); };

  return (
    <section className="py-24 bg-white border-y border-slate-200">
      <div className="mx-auto max-w-[1180px] px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-[12px] font-semibold text-blue-600 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600" />
            </span>
            Live demo
          </div>
          <h2 className="text-[32px] font-bold tracking-tight text-slate-900">Watch a scrape happen in real time</h2>
          <p className="mt-3 text-[16px] text-slate-500 font-medium max-w-xl mx-auto">Type a query and LeadX pulls enriched, export-ready leads in seconds — no setup.</p>
        </div>

        <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)] overflow-hidden">
          {/* window header with live search bar */}
          <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3">
            <div className="flex gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-red-300" />
              <div className="h-2.5 w-2.5 rounded-full bg-amber-300" />
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
            </div>
            <div className="mx-auto flex h-8 w-full max-w-md items-center gap-2 rounded-lg bg-white border border-slate-200 px-3 shadow-sm">
              <Search className="h-3.5 w-3.5 text-blue-500 shrink-0" />
              <span className="text-[13px] font-medium text-slate-700">{typed}</span>
              {phase === "typing" && <span className="h-4 w-px bg-blue-500 animate-pulse" />}
              {phase === "scanning" && <span className="ml-auto text-[11px] font-semibold text-blue-500 animate-pulse">scanning…</span>}
            </div>
            <div className="w-8" />
          </div>

          {/* body */}
          <div className="min-h-[268px]">
            {phase === "results" ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left whitespace-nowrap">
                  <thead>
                    <tr className="border-b border-slate-100">
                      {["Name", "Category", "Rating", "Phone", "Email"].map((h) => (
                        <th key={h} className="px-6 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {demo.leads.slice(0, rows).map((lead, i) => (
                      <tr key={i} className="animate-rise hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 text-[13px] font-semibold text-slate-800">{lead.name}</td>
                        <td className="px-6 py-4 text-[13px] text-slate-500">{lead.cat}</td>
                        <td className="px-6 py-4 text-[13px] font-medium text-slate-700">
                          <span className="inline-flex items-center gap-1.5"><Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> {lead.rating}</span>
                        </td>
                        <td className="px-6 py-4 text-[13px] text-slate-500 font-mono">{lead.phone}</td>
                        <td className="px-6 py-4 text-[13px] text-blue-600 font-medium">{lead.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 py-24 text-slate-400">
                <div className="h-6 w-6 rounded-full border-2 border-slate-200 border-t-blue-500 animate-spin" />
                <span className="text-[13px] font-medium">
                  {phase === "scanning" ? `Scanning Google Maps for “${demo.q}”…` : "Preparing query…"}
                </span>
              </div>
            )}
          </div>

          {/* footer */}
          <div className="border-t border-slate-100 bg-slate-50 px-6 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-[12px] font-medium text-slate-500">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="tabular-nums font-semibold text-slate-700">{found}</span> leads found · 13 fields each
            </div>
            <button
              onClick={() => downloadDemoCsv(demo)}
              disabled={phase !== "results"}
              className="flex items-center justify-center gap-1.5 rounded-md bg-white border border-slate-200 px-3 py-1.5 text-[12px] font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Download className="h-3.5 w-3.5 text-blue-500" /> Export CSV
            </button>
          </div>
        </div>

        {/* try-it query pills */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="text-[12px] font-medium text-slate-400">Try:</span>
          {DEMOS.map((d, i) => (
            <button
              key={d.q}
              onClick={() => pick(i)}
              className={`rounded-full px-3 py-1 text-[12px] font-medium transition-colors ${i === qi ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
            >
              {d.q}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Solution({ onNavigate }) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans antialiased selection:bg-blue-100 selection:text-blue-900">

      <style>{`
        @keyframes floatMedium {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
          100% { transform: translateY(0px); }
        }
        .animate-float-medium {
          animation: floatMedium 5s ease-in-out infinite;
        }
        @keyframes pulseRedShadow {
          0% { box-shadow: 0 20px 50px -10px rgba(239,68,68,0.15); }
          50% { box-shadow: 0 25px 60px -5px rgba(239,68,68,0.25); }
          100% { box-shadow: 0 20px 50px -10px rgba(239,68,68,0.15); }
        }
        .animate-hero-box {
          animation: floatMedium 6s ease-in-out infinite, pulseRedShadow 4s ease-in-out infinite;
        }
      `}</style>

      {/* 1) NEW HERO SECTION */}
      <section className="pt-12 lg:pt-16 pb-16 bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-[1180px] px-6 lg:px-8">

          {/* Main Rounded Box with Reddish Shadow */}
          <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 lg:p-16 border border-slate-200 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.15)]">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

              {/* Left Side: Animated Image Card */}
              <div className="w-full lg:w-[55%] flex justify-center lg:justify-start">
                <div className="relative group w-full max-w-[650px] animate-float-medium">
                  <div className="relative rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 flex items-center justify-center">
                    <img
                      src={dashboardScreenshot}
                      alt="Platform Dashboard"
                      className="w-full h-auto block object-contain transition-transform duration-1000 group-hover:scale-[1.03]"
                    />
                  </div>
                </div>
              </div>

              {/* Right Side: Text Area */}
              <div className="w-full lg:w-[45%] flex flex-col justify-center items-start text-left lg:pl-4">
                <h1 className="mb-6 text-[34px] font-bold tracking-tight text-slate-900 leading-[1.2] sm:text-[40px] lg:text-[42px] flex flex-wrap gap-x-2 gap-y-1">
                  <span className="whitespace-nowrap">Solutions built around</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">how you sell</span>
                </h1>

                <p className="mb-10 text-[16px] sm:text-[18px] leading-relaxed text-slate-500 font-medium max-w-md">
                  Whatever your market, LeadX turns public business data into a clean, contact-rich pipeline — in seconds, not spreadsheets.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <PremiumButton primary onClick={() => onNavigate("signup")} icon={<ArrowRight className="h-4 w-4" />}>
                    Start scraping free
                  </PremiumButton>
                  <PremiumButton onClick={() => onNavigate("contact")}>
                    Talk to sales
                  </PremiumButton>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 2) BY USE CASE — CREATIVE LIVE BENTO GRID */}
      <WorkflowBento />

      {/* 3) BY INDUSTRY */}
      <section className="py-24 bg-white border-y border-slate-200">
        <div className="mx-auto max-w-[1180px] px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-[32px] font-bold tracking-tight text-slate-900 mb-4">Trusted across industries</h2>
            <p className="text-[16px] text-slate-500 font-medium mx-auto max-w-xl">From local agencies to global sales teams, LeadX powers growth across every sector imaginable.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((ind, i) => (
              <div key={i} className="flex items-start gap-4 rounded-xl border border-slate-100 bg-slate-50 p-6 transition-colors hover:bg-slate-100/50">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white border border-slate-200 text-slate-500 shadow-sm">
                  <ind.icon className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 text-[14px] mb-1">{ind.title}</h4>
                  <p className="text-[13px] text-slate-500 leading-relaxed">{ind.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4) COMPARISON TABLE */}
      <section className="py-24 bg-slate-50">
        <div className="mx-auto max-w-[900px] px-6">
          <div className="mb-12 text-center">
            <h2 className="text-[32px] font-bold tracking-tight text-slate-900 mb-4">Manual research vs LeadX</h2>
            <p className="text-[16px] text-slate-500 font-medium">Stop wasting hours building lists by hand.</p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="border-b border-slate-200 bg-white px-6 py-4 text-[12px] font-semibold uppercase tracking-wider text-slate-400 w-1/3">Feature</th>
                  <th className="border-b border-slate-200 bg-white px-6 py-4 text-[12px] font-semibold uppercase tracking-wider text-slate-400 w-1/3">Manual</th>
                  <th className="border-b border-slate-200 bg-slate-900 px-6 py-4 text-[12px] font-semibold uppercase tracking-wider text-white w-1/3">LeadX</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {COMPARISON.map((row, i) => (
                  <tr key={i} className="group transition-colors hover:bg-slate-50">
                    <td className="px-6 py-4 text-[13px] font-semibold text-slate-700">{row.label}</td>
                    <td className="px-6 py-4 text-[13px] text-slate-500 flex items-center gap-2">
                      <X className="h-3.5 w-3.5 text-slate-300" />
                      {row.manual}
                    </td>
                    <td className="px-6 py-4 text-[13px] font-medium text-slate-900 bg-slate-50/50 group-hover:bg-slate-100/50 transition-colors border-l border-slate-100">
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                        {row.leadx}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5) LIVE REAL-TIME SCRAPE DEMO */}
      <LiveScrapeDemo />

      {/* 6) TRUST BAND */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-[1180px] px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-3 md:gap-8 lg:gap-12 divide-y md:divide-y-0 md:divide-x divide-slate-200">
            <div className="flex flex-col pt-10 md:pt-0 md:px-6 first:pt-0">
              <div className="mb-4 flex items-center gap-6">
                <div><div className="text-2xl font-bold text-slate-900">2.5M+</div><div className="text-[12px] font-medium text-slate-500 uppercase tracking-wide mt-1">Leads scraped</div></div>
                <div className="h-10 w-px bg-slate-200" />
                <div><div className="text-2xl font-bold text-slate-900">8s</div><div className="text-[12px] font-medium text-slate-500 uppercase tracking-wide mt-1">Avg response</div></div>
              </div>
              <p className="text-[13px] leading-relaxed text-slate-500">Delivering reliable data at scale, with 99.9% uptime and 13 rich data points per lead.</p>
            </div>
            <div className="flex flex-col pt-10 md:pt-0 md:px-6">
              <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white border border-slate-200 shadow-sm">
                <Shield className="h-4 w-4 text-slate-600" />
              </div>
              <h4 className="font-semibold text-slate-900 text-[14px] mb-2">Secure by design</h4>
              <p className="text-[13px] leading-relaxed text-slate-500">JWT-protected accounts, encrypted access, and your data stays yours. Built on a hardened Spring Boot backend.</p>
            </div>
            <div className="flex flex-col pt-10 md:pt-0 md:px-6">
              <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white border border-slate-200 shadow-sm">
                <Download className="h-4 w-4 text-slate-600" />
              </div>
              <h4 className="font-semibold text-slate-900 text-[14px] mb-2">Export anywhere</h4>
              <p className="text-[13px] leading-relaxed text-slate-500">CSV, Excel, JSON and Google Sheets today; HubSpot, Salesforce & Zapier coming soon.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
