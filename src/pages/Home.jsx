import { useEffect, useRef, useState } from "react";
import { Button, Eyebrow, SectionHead } from "../components/ui";
import {
  Search, Star, Mail, Filter, Download, Shield, Database,
  ArrowRight, Target, Globe, Phone, Check, MapPin, Video, ShoppingCart, FileText, Camera, Users, Play
} from "lucide-react";

/* ── Data ─────────────────────────────────────────────────── */
const SAMPLE_LEADS = [
  { name: "Sunrise Dental Care",  cat: "Dental clinic",  rating: "4.8", reviews: "212", init: "S" },
  { name: "BrewHaus Coffee Co.",  cat: "Coffee shop",    rating: "4.6", reviews: "548", init: "B" },
  { name: "Apex Fitness Studio",  cat: "Gym",            rating: "4.9", reviews: "96",  init: "A" },
];
const TikTokIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.95-.01 2.53.01 5.06-.02 7.59-.03 1.91-.55 3.82-1.59 5.42-1.18 1.81-2.92 3.19-4.96 3.94-2.13.78-4.51.92-6.73.17-1.97-.66-3.69-1.92-4.9-3.56-1.3-1.8-1.9-4.14-1.52-6.38.32-1.92 1.25-3.69 2.65-5.06 1.48-1.45 3.51-2.31 5.58-2.34v4.06c-1.18.06-2.33.48-3.26 1.22-1.02.83-1.68 2.06-1.81 3.39-.14 1.41.22 2.87 1.05 4.02.77 1.05 1.91 1.78 3.19 2.05 1.51.32 3.13.06 4.39-.77 1.25-.83 2.08-2.22 2.3-3.71.18-1.16.03-2.38.03-3.57V.02z"/>
  </svg>
);
const GoogleMapsIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#EA4335"/>
    <circle cx="12" cy="9" r="2.5" fill="#34A853"/>
    <path d="M12 2c-3.87 0-7 3.13-7 7 0 1.63.42 3.16 1.15 4.5l5.85-5.85V2z" fill="#4285F4"/>
    <path d="M19 9c0-1.63-.42-3.16-1.15-4.5l-5.85 5.85v5.65C16.8 13.9 19 10.74 19 9z" fill="#FBBC05"/>
  </svg>
);
const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
  </svg>
);

const SCRAPERS = [
  {
    logo: TikTokIcon, logoColor: "bg-[#000000] text-[#00f2fe]",
    title: "TikTok Scraper", path: "leadx/tiktok-scraper",
    desc: "Extract data from TikTok videos, hashtags, and users. Use URLs or search queries to scrape TikTok profiles, hashtags...",
    author: "LeadX", authorIcon: "L", authorColor: "bg-gradient-to-tr from-[#00BFFF] to-[#8B00FF]",
    rating: "4.8", reviews: "315", users: "199K"
  },
  {
    logo: GoogleMapsIcon, logoColor: "bg-white border border-slate-200 shadow-[0_2px_8px_rgba(0,0,0,0.08)]",
    title: "Google Maps Scraper", path: "leadx/crawler-google-places",
    desc: "Extract data from thousands of Google Maps locations and businesses, including reviews, reviewer details, images...",
    author: "LeadX", authorIcon: "L", authorColor: "bg-gradient-to-tr from-[#00BFFF] to-[#8B00FF]",
    rating: "4.8", reviews: "1,509", users: "462K"
  },
  {
    logo: InstagramIcon, logoColor: "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white",
    title: "Instagram Scraper", path: "leadx/instagram-scraper",
    desc: "Scrape and download Instagram posts, profiles, places, hashtags, photos, and comments. Get data from Instagram...",
    author: "LeadX", authorIcon: "L", authorColor: "bg-gradient-to-tr from-[#00BFFF] to-[#8B00FF]",
    rating: "4.7", reviews: "454", users: "300K"
  },
  {
    logo: Globe, logoColor: "bg-gradient-to-br from-indigo-500 to-orange-400 text-white",
    title: "Website Content Crawler", path: "leadx/website-content-crawler",
    desc: "Crawl websites and extract text content to feed AI models, LLM applications, vector databases, or RAG pipelines. The...",
    author: "LeadX", authorIcon: "L", authorColor: "bg-gradient-to-tr from-[#00BFFF] to-[#8B00FF]",
    rating: "4.6", reviews: "205", users: "133K"
  },
  {
    logo: ShoppingCart, logoColor: "bg-slate-900 text-orange-400",
    title: "E-commerce Scraping Tool", path: "leadx/e-commerce-scraping-tool",
    desc: "Scrape data from e-commerce websites with E-commerce Scraping Tool. Scrape almost any retail site in minutes...",
    author: "LeadX", authorIcon: "L", authorColor: "bg-gradient-to-tr from-[#00BFFF] to-[#8B00FF]",
    rating: "4.5", reviews: "44", users: "11K"
  },
  {
    logo: FacebookIcon, logoColor: "bg-[#1877F2] text-white",
    title: "Facebook Posts Scraper", path: "leadx/facebook-posts-scraper",
    desc: "Extract posts, videos, and engagement metrics from Facebook pages. Get text captions, reactions, video...",
    author: "LeadX", authorIcon: "L", authorColor: "bg-gradient-to-tr from-[#00BFFF] to-[#8B00FF]",
    rating: "4.6", reviews: "184", users: "80K"
  }
];
const STEPS = [
  { title: "Describe your market", desc: "Enter a keyword, a location and how many leads you want. Toggle email-finding on or off." },
  { title: "We work the map",      desc: "Our engine scans Google Maps, opens each listing and enriches it with contact data in seconds." },
  { title: "Export & sell",        desc: "Get a clean table of qualified leads, download it, and hand it straight to your sales team." },
];
const FIELDS = ["Name","Category","Rating","Reviews","Address","Phone","Website","Emails","Social links","Plus code","Latitude","Longitude","Maps URL"];
const STATS  = [
  { num: "2.5M+", lbl: "Leads scraped" },
  { num: "13",    lbl: "Data points / lead" },
  { num: "8s",    lbl: "Avg. response time" },
  { num: "99.9%", lbl: "Uptime" },
];
const QUOTES = [
  { text: 'We replaced three subscriptions with LeadX. The email discovery alone fills our pipeline every single week.', name: "Priya Nair",  role: "Head of Sales, Growthly",   init: "P" },
  { text: 'Searched "interior designers in Pune", had 400 clean leads with phone numbers in under a minute. Unreal.',  name: "Rohan Mehta", role: "Founder, StudioCast",        init: "R" },
  { text: "The data is genuinely clean — no duplicates, ratings included. Our SDRs finally trust their lists.",        name: "Aisha Khan",  role: "RevOps Lead, Finora",        init: "A" },
];

/* ── Build & Deploy Section ────────────────────────────────── */
const BUILD_TABS = [
  { id: "scraping",    label: "Scraping" },
  { id: "proxy",       label: "Proxies" },
  { id: "unblocking",  label: "Unblocking" },
  { id: "cloud",       label: "Cloud deployment" },
  { id: "monitoring",  label: "Monitoring" },
  { id: "export",      label: "Data processing" },
];

/* Each tab's left text */
const TAB_CONTENT = {
  scraping:   { title: "Scale as you go",              desc: "Deploy scrapers from our dashboard or API and let LeadX handle running and scaling your workloads automatically." },
  proxy:      { title: "Route through 2M+ proxies",    desc: "LeadX rotates residential and datacenter proxies automatically so your scrapers never hit a rate-limit or ban." },
  unblocking: { title: "Never get blocked",            desc: "Combine our proxies, headless browsers, and human-like fingerprints to blend in with normal internet traffic." },
  cloud:      { title: "Always on, always fresh",      desc: "Schedule recurring scrapes on LeadX Cloud. Set a cron, get fresh leads in your CRM every morning — zero infra." },
  monitoring: { title: "Know when it breaks",          desc: "LeadX monitors your scraper health and alerts you instantly via Email or Slack when something goes wrong." },
  export:     { title: "Clean, structured, CRM-ready", desc: "Every result is deduplicated, normalised and structured. Export to CSV, JSON, or push to any CRM via webhook." },
};

/* ── Unique right-panel per tab ─── */
function TerminalWidget({ lines }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-950 overflow-hidden shadow-2xl">
      <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/60 border-b border-white/5">
        <span className="h-3 w-3 rounded-full bg-red-500" />
        <span className="h-3 w-3 rounded-full bg-yellow-500" />
        <span className="h-3 w-3 rounded-full bg-green-500" />
        <span className="ml-3 text-[12px] text-slate-400 font-mono">leadx — terminal</span>
      </div>
      <div className="p-5 font-mono text-[13px] leading-7">
        {lines.map((line, i) => (
          <div key={i} className={
            line.t === "cmd"     ? "text-white" :
            line.t === "info"    ? "text-sky-400" :
            line.t === "success" ? "text-green-400" :
            line.t === "link"    ? "text-purple-400" :
            "text-slate-400"
          }>
            {line.t === "cmd" && <span className="text-green-400 mr-2">{">"}</span>}
            {line.v}
          </div>
        ))}
      </div>
    </div>
  );
}

function CloudDeployWidget() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xl">
      {/* source icons row */}
      <div className="flex items-center gap-4 px-6 pt-6 pb-4 border-b border-slate-100">
        {/* GitHub */}
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 text-slate-900">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
          </svg>
        </div>
        {/* GitLab */}
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none">
            <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 01-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 014.82 2a.43.43 0 01.58 0 .42.42 0 01.11.18l2.44 7.49h8.1l2.44-7.49a.42.42 0 01.11-.18.43.43 0 01.58 0 .42.42 0 01.11.18l2.44 7.51L23 13.45a.84.84 0 01-.35.94z" fill="#FC6D26"/>
          </svg>
        </div>
        {/* Git */}
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
            <path d="M11.998 1a11 11 0 100 22 11 11 0 000-22zm4.243 15.914a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 010-1.06l4.5-4.5a.75.75 0 011.06 1.06L12.31 12l3.93 3.914a.75.75 0 010 1.06z" fill="#F05032"/>
          </svg>
        </div>
      </div>
      {/* terminal */}
      <div className="bg-slate-950 m-4 rounded-xl overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-800/60 border-b border-white/5">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-600" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-600" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-600" />
        </div>
        <div className="p-4 font-mono text-[12.5px] leading-6">
          <div className="text-orange-400">{">"} leadx push</div>
          <div className="text-slate-400">Info: Deploying scraper 'google-maps' to LeadX.</div>
          <div className="text-slate-400">Run: Updated version 1.0 for scraper.</div>
          <div className="text-slate-400">Run: Building scraper image</div>
          <div className="text-slate-400">ACTOR: Pushing Docker image to registry.</div>
          <div className="text-slate-400">ACTOR: Build finished.</div>
          <div className="text-purple-400">Build detail → https://app.leadx.io/actors#/builds</div>
          <div className="text-green-400">Success: Scraper was deployed to LeadX cloud.</div>
        </div>
      </div>
    </div>
  );
}

function CodeEditorWidget() {
  const lines = [
    { n: 1, parts: [{ c: "text-slate-500", v: "{" }] },
    { n: 2, parts: [{ c: "text-slate-400", v: "  useFingerprints: " }, { c: "text-orange-400", v: "true" }, { c: "text-slate-500", v: "," }] },
    { n: 3, parts: [{ c: "text-slate-400", v: "  fingerprintOptions: {" }] },
    { n: 4, parts: [{ c: "text-slate-400", v: "    fingerprintGeneratorOptions: {" }] },
    { n: 5, parts: [{ c: "text-slate-400", v: "      browsers: [" }, { c: "text-green-500", v: "'Chrome', 'Firefox'" }, { c: "text-slate-400", v: "]," }] },
    { n: 6, parts: [{ c: "text-slate-400", v: "      devices: [" }, { c: "text-green-500", v: "'mobile'" }, { c: "text-slate-400", v: "]," }] },
    { n: 7, parts: [{ c: "text-slate-400", v: "      locales: [" }, { c: "text-green-500", v: "'en-US'" }, { c: "text-slate-400", v: "]," }] },
    { n: 8, parts: [{ c: "text-slate-400", v: "    }," }] },
    { n: 9, parts: [{ c: "text-slate-500", v: "  }" }] },
    { n: 10, parts: [{ c: "text-slate-500", v: "}" }] },
  ];
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden shadow-xl">
      <div className="flex items-center gap-2 px-4 py-3 bg-white border-b border-slate-200">
        <span className="h-3 w-3 rounded-full bg-red-400" />
        <span className="h-3 w-3 rounded-full bg-yellow-400" />
        <span className="h-3 w-3 rounded-full bg-green-400" />
        <span className="ml-3 text-[12px] text-slate-400 font-mono">scraper-config.json</span>
      </div>
      <div className="p-4 font-mono text-[13px] leading-7">
        {lines.map((line) => (
          <div key={line.n} className="flex gap-4">
            <span className="w-5 shrink-0 text-right text-slate-400 select-none">{line.n}</span>
            <span>
              {line.parts.map((p, i) => <span key={i} className={p.c}>{p.v}</span>)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MonitoringWidget() {
  const pts = [38, 55, 42, 70, 48, 75, 55, 68, 45, 80];
  const max = 80, min = 38, H = 80, W = 200;
  const path = pts.map((p, i) => {
    const x = (i / (pts.length - 1)) * W;
    const y = H - ((p - min) / (max - min)) * H;
    return `${i === 0 ? "M" : "L"}${x},${y}`;
  }).join(" ");
  return (
    <div className="flex gap-4 items-start">
      {/* chart card */}
      <div className="flex-1 rounded-2xl border border-slate-200 bg-white p-5 shadow-lg">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-20 overflow-visible">
          <path d={path} fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d={`${path} L${W},${H} L0,${H}Z`} fill="rgba(34,197,94,0.08)"/>
        </svg>
        <div className="mt-3 flex items-center gap-2 text-[13px] font-semibold text-green-500">
          <span className="h-2 w-2 rounded-full bg-green-500 inline-block"/>
          All systems operational
        </div>
      </div>
      {/* alert panel */}
      <div className="w-52 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg text-[13px]">
        <p className="font-bold text-slate-800 mb-3">Create alert</p>
        <p className="text-slate-500 text-[11px] mb-1">Selected actors</p>
        <div className="flex flex-wrap gap-1 mb-3">
          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">Google Maps Scraper</span>
          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">Instagram Scraper</span>
        </div>
        <p className="text-slate-500 text-[11px] mb-1">Trigger · Run status</p>
        <div className="flex gap-1 mb-3">
          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-red-500">Failed ×</span>
          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-orange-500">Aborted ×</span>
        </div>
        <p className="text-slate-500 text-[11px] mb-1">Notification</p>
        <div className="flex items-center justify-between mb-1">
          <span className="text-slate-600 text-[12px]">Email</span>
          <div className="h-4 w-8 rounded-full bg-slate-200"/>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600 text-[12px]">Slack</span>
          <div className="h-4 w-8 rounded-full bg-green-500"/>
        </div>
      </div>
    </div>
  );
}

function DataProcessingWidget() {
  const fields = ["Name","Category","Rating","Reviews","Phone","Website","Emails","Address","Lat","Lng"];
  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xl">
      <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 bg-slate-50">
        <span className="text-[13px] font-semibold text-slate-700">leads_export.csv</span>
        <span className="rounded-full bg-green-100 px-3 py-0.5 text-[11px] font-bold text-green-600">488 records</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-[12px]">
          <thead>
            <tr className="border-b border-slate-100">
              {fields.slice(0,5).map(f => <th key={f} className="px-3 py-2 text-left text-slate-400 font-semibold">{f}</th>)}
            </tr>
          </thead>
          <tbody>
            {[
              ["Sunrise Dental","Dental clinic","4.8","212","+1-512-555-0123"],
              ["BrewHaus Coffee","Coffee shop","4.6","548","+1-512-555-0199"],
              ["Apex Fitness","Gym","4.9","96","+1-512-555-0187"],
            ].map((row,i) => (
              <tr key={i} className={i%2===0?"bg-white":"bg-slate-50/50"}>
                {row.map((cell,j) => <td key={j} className="px-3 py-2 text-slate-600">{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-5 py-3 border-t border-slate-100 flex items-center gap-3">
        <span className="rounded-md bg-brand-500/10 px-3 py-1 text-[12px] font-bold text-brand-600">✓ Deduplicated</span>
        <span className="rounded-md bg-green-50 px-3 py-1 text-[12px] font-bold text-green-600">✓ Normalised</span>
        <span className="rounded-md bg-purple-50 px-3 py-1 text-[12px] font-bold text-purple-600">✓ CRM Ready</span>
      </div>
    </div>
  );
}

function TabVisual({ tabId }) {
  if (tabId === "scraping" || tabId === "proxy") return (
    <TerminalWidget lines={tabId === "scraping" ? [
      { t: "cmd",     v: 'leadx scrape --query "dentists in Austin" --limit 500' },
      { t: "info",    v: "Info: Starting scrape job #a1b2c3" },
      { t: "neutral", v: "Run:  Scanning Google Maps listings..." },
      { t: "neutral", v: "Run:  Extracting contact data from 500 results" },
      { t: "neutral", v: "Run:  Email discovery running in background" },
      { t: "success", v: "Done: 500 leads ready. Emails found: 312" },
      { t: "link",    v: "Export → https://app.leadx.io/jobs/a1b2c3/export" },
    ] : [
      { t: "cmd",     v: "leadx config set --proxy auto-rotate" },
      { t: "info",    v: "Info: Proxy pool — 2.1M IPs across 195 countries" },
      { t: "neutral", v: "Run:  Rotating session for target domain" },
      { t: "neutral", v: "Run:  Residential proxy selected: IN→Mumbai" },
      { t: "success", v: "Success: Request completed with 200 OK" },
      { t: "success", v: "Success: Zero blocks in last 10K requests" },
    ]} />
  );
  if (tabId === "unblocking") return <CodeEditorWidget />;
  if (tabId === "cloud")      return <CloudDeployWidget />;
  if (tabId === "monitoring") return <MonitoringWidget />;
  if (tabId === "export")     return <DataProcessingWidget />;
  return null;
}

function BuildDeploySection({ onNavigate }) {
  const [activeTab, setActiveTab] = useState(BUILD_TABS[0].id);
  const content = TAB_CONTENT[activeTab];
  return (
    <section className="bg-white py-24 border-t border-slate-100">
      <div className="mx-auto max-w-[1180px] px-6">
        <h2 className="text-center text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl mb-10">
          Build and deploy reliable scrapers
        </h2>

        {/* tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {BUILD_TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`rounded-full border px-5 py-2 text-[13.5px] font-semibold transition-all duration-200 ${
                activeTab === t.id
                  ? "border-brand-500 bg-brand-500/10 text-brand-600"
                  : "border-slate-200 text-slate-500 hover:border-slate-400 hover:text-slate-700"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* content grid — left text, right unique widget */}
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <h3 className="text-3xl font-extrabold text-slate-900">{content.title}</h3>
            <p className="mt-4 text-[16px] leading-relaxed text-slate-500 max-w-md">{content.desc}</p>
            <button
              onClick={() => onNavigate("service")}
              className="mt-8 inline-flex items-center gap-2 rounded-lg border-2 border-slate-800 px-6 py-3 text-[15px] font-bold text-slate-800 transition-all hover:bg-slate-800 hover:text-white"
            >
              Learn more
            </button>
          </div>
          <div className="transition-all duration-300">
            <TabVisual tabId={activeTab} />
          </div>
        </div>
      </div>
    </section>
  );
}


/* ── Premium SaaS Constellation Canvas ────────────────────── */
function UniverseCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let W, H;
    let particles = [];

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      initParticles();
    };
    window.addEventListener("resize", resize);

    const initParticles = () => {
      particles = [];
      // Fewer particles for a cleaner, professional look
      const count = Math.floor((W * H) / 12000); 
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.3, // Very slow drift
          vy: (Math.random() - 0.5) * 0.3,
          r: 1 + Math.random() * 1.5,
          alpha: 0.2 + Math.random() * 0.5
        });
      }
    };

    resize();

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Deep premium background
      ctx.fillStyle = "#04050e";
      ctx.fillRect(0, 0, W, H);

      // Subtle aurora/gradient glows in the corners
      const g1 = ctx.createRadialGradient(W*0.2, H*0.2, 0, W*0.2, H*0.2, W*0.5);
      g1.addColorStop(0, "rgba(45, 30, 150, 0.08)");
      g1.addColorStop(1, "transparent");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, W, H);

      const g2 = ctx.createRadialGradient(W*0.8, H*0.8, 0, W*0.8, H*0.8, W*0.5);
      g2.addColorStop(0, "rgba(20, 150, 220, 0.06)");
      g2.addColorStop(1, "transparent");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, W, H);

      // Draw constellation lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            // Opacity based on distance
            const alpha = (1 - dist / 140) * 0.15;
            ctx.strokeStyle = `rgba(167, 139, 250, ${alpha})`; // Subtle violet tint
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges gently
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.fill();
        
        // Slight glow on nodes
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(167, 139, 250, 0.4)";
      });
      ctx.shadowBlur = 0; // reset

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute", inset: 0, width: "100%", height: "100%",
        display: "block",
      }}
    />
  );
}

/* ── Animated typewriter for subtitle ───────────────────── */
const SUBTITLE = "Welcome to the Future of Lead Discovery";

function TypewriterText() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let i = 0;
    el.textContent = "";
    const timer = setInterval(() => {
      el.textContent += SUBTITLE[i];
      i++;
      if (i >= SUBTITLE.length) clearInterval(timer);
    }, 42);
    return () => clearInterval(timer);
  }, []);
  return <span ref={ref} />;
}

/* ── Main Home component ─────────────────────────────────── */
export default function Home({ onNavigate }) {
  return (
    <>
      {/* ══════════════════════ HERO ══════════════════════════ */}
      <section className="hero-universe">
        {/* Particle Canvas Background */}
        <UniverseCanvas />

        {/* Gradient overlays */}
        <div className="hero-overlay-top" />
        <div className="hero-overlay-bottom" />

        {/* Centered hero content — full width, no mock card */}
        <div className="hero-content">


          {/* Hello Universe */}
          <h1 className="hero-hello">Hello Universe</h1>

          {/* Typewriter subtitle */}
          <p className="hero-subtitle">
            <TypewriterText />
            <span className="cursor-blink">|</span>
          </p>



          {/* CTA buttons */}
          <div className="hero-btns">
            <button className="hero-btn-primary" onClick={() => onNavigate("signup")}>
              Start scraping free <ArrowRight size={17} />
            </button>
            <button className="hero-btn-outline" onClick={() => onNavigate("demo")}>
              Request for demo
            </button>
          </div>

          {/* Quick stats */}
          <div className="hero-stats">
            {STATS.slice(0, 3).map((s) => (
              <div key={s.lbl} className="hero-stat">
                <div className="hero-stat-num">{s.num}</div>
                <div className="hero-stat-lbl">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* ════════ SCRAPER MARKETPLACE ════════ */}
      <section className="bg-slate-50/50 py-24 relative overflow-hidden" style={{ backgroundImage: "radial-gradient(#e2e8f0 1px, transparent 1px)", backgroundSize: "20px 20px" }}>
        <div className="mx-auto max-w-[1180px] px-6 relative z-10">
          
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-ink sm:text-4xl mb-8">Find your perfect service</h2>
            <div className="max-w-[500px] mx-auto relative">
              <input 
                type="text" 
                placeholder="Search services..." 
                className="w-full pl-12 pr-4 py-3.5 rounded-full border border-slate-300 bg-white shadow-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all text-[15px]"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SCRAPERS.map((s) => (
              <div
                key={s.title}
                onClick={() => onNavigate("login")}
                className="relative z-1 hover:z-50 group flex flex-col rounded-[14px] border border-slate-200/80 bg-white p-5 shadow-[0_6px_24px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out hover:scale-[1.15] hover:-translate-y-4 hover:border-brand-500 hover:shadow-[0_40px_80px_rgba(0,0,0,0.3)] cursor-pointer"
              >
                <div className="flex items-start gap-4 mb-3">
                  <div className={`grid h-[42px] w-[42px] shrink-0 place-items-center rounded-[10px] ${s.logoColor}`}>
                    <s.logo size={22} strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-[16px] font-bold text-slate-800 leading-tight">{s.title}</h3>
                    <p className="mt-0.5 text-[13px] text-slate-400 font-medium">{s.path}</p>
                  </div>
                </div>
                
                <p className="text-[14px] leading-relaxed text-slate-500 mb-5 flex-grow">
                  {s.desc}
                </p>
                
                <div className="flex items-center justify-between border-t border-slate-100 pt-3 mt-auto">
                  <div className="flex items-center gap-2">
                    <div className={`grid h-[18px] w-[18px] place-items-center rounded-full text-[10px] font-bold text-white ${s.authorColor}`}>
                      {s.authorIcon}
                    </div>
                    <span className="text-[13px] font-semibold text-slate-600">{s.author}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[13px] font-medium text-slate-500">
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-slate-400" />
                      <span className="text-slate-600">{s.rating}</span>
                      <span className="text-slate-400 font-normal">({s.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={14} className="text-slate-400" />
                      <span className="text-slate-600">{s.users}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ BUILD & DEPLOY SECTION ════════ */}
      <BuildDeploySection onNavigate={onNavigate} />
    </>
  );
}
