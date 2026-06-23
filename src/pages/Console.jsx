import { useMemo, useState, useRef, useEffect } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { Spinner } from "../components/ui";
import {
  MapPin, Search, Download, Check, Mail, Play
} from "../components/icons";

/* ── UniverseCanvas ─────────────────────────────────────── */
function UniverseCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId, W, H;
    let particles = [];
    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      initParticles();
    };
    window.addEventListener("resize", resize);
    const initParticles = () => {
      particles = [];
      const count = Math.floor((W * H) / 12000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * W, y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
          r: 1 + Math.random() * 1.5, alpha: 0.2 + Math.random() * 0.5
        });
      }
    };
    resize();
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#04050e";
      ctx.fillRect(0, 0, W, H);
      const g1 = ctx.createRadialGradient(W * 0.2, H * 0.2, 0, W * 0.2, H * 0.2, W * 0.5);
      g1.addColorStop(0, "rgba(45, 30, 150, 0.08)"); g1.addColorStop(1, "transparent");
      ctx.fillStyle = g1; ctx.fillRect(0, 0, W, H);
      const g2 = ctx.createRadialGradient(W * 0.8, H * 0.8, 0, W * 0.8, H * 0.8, W * 0.5);
      g2.addColorStop(0, "rgba(20, 150, 220, 0.06)"); g2.addColorStop(1, "transparent");
      ctx.fillStyle = g2; ctx.fillRect(0, 0, W, H);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y, dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(167, 139, 250, ${(1 - dist / 140) * 0.15})`; ctx.lineWidth = 1; ctx.stroke();
          }
        }
      }
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`; ctx.fill();
        ctx.shadowBlur = 8; ctx.shadowColor = "rgba(167, 139, 250, 0.4)";
      });
      ctx.shadowBlur = 0;
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }} />;
}

/* ---------- helpers ---------- */
function parseAddr(address) {
  if (!address) return { street: null, city: null, state: null, country: null };
  const parts = address.split(",").map((s) => s.trim()).filter(Boolean);
  const stateZip = parts[2] || "";
  return {
    street: parts[0] || null,
    city: parts[1] || null,
    state: stateZip ? stateZip.split(" ")[0] : null,
    country: parts.length > 3 ? parts[parts.length - 1] : null,
  };
}

const isEmpty = (v) => v === null || v === undefined || v === "";

const COLUMNS = {
  index: { h: "#", get: (r) => r._i },
  name: { h: "Place name", get: (r) => r.name },
  phone: { h: "Phone", get: (r) => r.phone },
  website: { h: "Website", link: true, get: (r) => r.website },
  emails: { h: "Emails", get: (r) => Array.isArray(r.emails) ? r.emails.join(", ") : r.emails },
  address: { h: "Address", get: (r) => r.address },
  rating: { h: "Rating", get: (r) => r.rating },
  reviews: { h: "Reviews", get: (r) => r.reviews },
  category: { h: "Categories", get: (r) => r.category },
  social_links: { h: "Social Links", get: (r) => Array.isArray(r.social_links) ? r.social_links.join(", ") : r.social_links },
  latitude: { h: "Latitude", get: (r) => r.latitude },
  longitude: { h: "Longitude", get: (r) => r.longitude },
  maps_url: { h: "Maps URL", link: true, get: (r) => r.maps_url },
  plus_code: { h: "Plus Code", get: (r) => r.plus_code },
};

const CSV_COLS = ["name", "category", "rating", "reviews", "address", "phone", "website", "emails", "social_links", "latitude", "longitude", "maps_url", "plus_code"];

function downloadCsv(leads, query) {
  const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const rows = [CSV_COLS.map(esc).join(","), ...leads.map((l) => CSV_COLS.map((k) => esc(l[k])).join(","))];
  const blob = new Blob([rows.join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${(query || "google-maps-leads").replace(/\s+/g, "-").toLowerCase()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

function downloadExcel(leads, query) {
  let table = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="UTF-8"></head><body><table><tr>';
  CSV_COLS.forEach(col => table += `<th>${col}</th>`);
  table += '</tr>';
  leads.forEach(l => {
    table += '<tr>';
    CSV_COLS.forEach(col => table += `<td>${l[col] || ''}</td>`);
    table += '</tr>';
  });
  table += '</table></body></html>';
  const blob = new Blob([table], { type: 'application/vnd.ms-excel' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${(query || "google-maps-leads").replace(/\s+/g, "-").toLowerCase()}.xls`;
  a.click();
  URL.revokeObjectURL(url);
}

function downloadJson(leads, query) {
  const jsonString = JSON.stringify(leads, null, 2);
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${(query || "google-maps-leads").replace(/\s+/g, "-").toLowerCase()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

/* ── Mini Live Scrape Demo ───────────────────────────────── */
const DEMOS = [
  {
    q: "dentists in austin",
    leads: [
      { name: "Sunrise Dental", cat: "Dental clinic", rating: "4.8" },
      { name: "Lakeline Family", cat: "Dentist", rating: "4.7" },
      { name: "Brightsmile Studio", cat: "Cosmetic dentist", rating: "4.9" },
    ],
  },
  {
    q: "gyms in mumbai",
    leads: [
      { name: "Apex Fitness Studio", cat: "Gym", rating: "4.9" },
      { name: "IronCore Strength", cat: "Fitness center", rating: "4.7" },
      { name: "FlexZone Andheri", cat: "Gym", rating: "4.5" },
    ],
  },
  {
    q: "coffee shops nyc",
    leads: [
      { name: "BrewHaus Coffee", cat: "Coffee shop", rating: "4.6" },
      { name: "Bedford Beans", cat: "Cafe", rating: "4.8" },
      { name: "The Daily Grind", cat: "Espresso bar", rating: "4.7" },
    ],
  }
];

/* ── Live Scrape Demo (Natively in Left Pane) ───────────────────────────────── */

function FullPaneLiveDemo() {
  const [qi, setQi] = useState(0);
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState("typing");
  const [rows, setRows] = useState(0);

  const demo = DEMOS[qi];

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
    }, 70);
    return () => clearInterval(id);
  }, [phase, qi, demo.q]);

  useEffect(() => {
    if (phase !== "scanning") return;
    setRows(0);
    const id = setTimeout(() => setPhase("results"), 800);
    return () => clearTimeout(id);
  }, [phase]);

  useEffect(() => {
    if (phase !== "results") return;
    let r = 0;
    const rowId = setInterval(() => {
      r += 1;
      setRows(r);
      if (r >= demo.leads.length) clearInterval(rowId);
    }, 350);

    const nextId = setTimeout(() => {
      setQi((p) => (p + 1) % DEMOS.length);
      setPhase("typing");
    }, 3000);

    return () => {
      clearInterval(rowId);
      clearTimeout(nextId);
    };
  }, [phase, qi, demo.leads.length]);

  return (
    <div className="w-full h-full flex flex-col font-sans z-30 pt-10 px-8">

      {/* Typed Query Display */}
      <div className="flex items-center gap-3 border-b border-white/20 pb-4">
        <Search size={22} className="text-brand-400" />
        <span className="text-white text-xl font-bold tracking-tight">{typed}</span>
        {phase === "typing" && <span className="h-6 w-[2px] bg-brand-400 animate-pulse" />}
      </div>

      {/* Results Area */}
      <div className="flex-1 mt-6">
        {phase === "results" ? (
          <div className="space-y-3">
            {demo.leads.slice(0, rows).map((l, i) => (
              <div key={i} className="animate-rise rounded-xl bg-white/[0.04] p-4 border border-white/10 shadow-lg">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[15px] font-bold text-white">{l.name}</span>
                  <span className="text-[13px] font-bold text-amber-400 flex items-center gap-1">★ {l.rating}</span>
                </div>
                <div className="text-[13px] font-medium text-white/50">{l.cat}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-4 text-white/50 pb-20">
            <div className="h-8 w-8 rounded-full border-[3px] border-white/20 border-t-brand-400 animate-spin" />
            <span className="text-[14px] font-semibold tracking-wide">{phase === "scanning" ? "Scanning Google Maps..." : "Ready"}</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- component ---------- */
export default function Console() {
  const { token } = useAuth();
  const [form, setForm] = useState({ keyword: "", location: "", limit: 10, find_emails: true });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const abortControllerRef = useRef(null);
  const [result, setResult] = useState(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(50);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const rows = useMemo(
    () => (result?.leads || []).map((l, i) => ({ ...l, _i: i + 1, _a: parseAddr(l.address) })),
    [result]
  );

  const run = async () => {
    setError("");
    setLoading(true);
    setResult(null);
    if (abortControllerRef.current) abortControllerRef.current.abort();
    abortControllerRef.current = new AbortController();
    try {
      const res = await api.scrape(
        { keyword: form.keyword, location: form.location, limit: Number(form.limit) || 10, find_emails: form.find_emails },
        token,
        abortControllerRef.current.signal
      );
      setResult(res);
      setPage(1);
    } catch (err) {
      setError(err.message || "Failed to extract leads. Please check your network and try again.");
    } finally {
      setLoading(false);
    }
  };

  const total = rows.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const pageRows = rows.slice((page - 1) * perPage, page * perPage);
  const activeCols = ["index", "name", "rating", "reviews", "address", "phone", "category", "social_links", "latitude", "longitude", "maps_url", "plus_code", "website", "emails"];
  const cols = activeCols.map((k) => ({ key: k, ...COLUMNS[k] }));

  const hasStarted = loading || result !== null;

  return (
    <section className={`hero-universe relative flex flex-col items-center justify-start w-full scroll-smooth ${!hasStarted ? "min-h-[100dvh] pt-[120px] pb-[60px] overflow-y-auto" : "h-[calc(100dvh-70px)] !pt-0 !pb-0 !px-0 !rounded-none !shadow-none overflow-hidden !bg-slate-50"}`}>
      {!hasStarted && <UniverseCanvas />}
      {!hasStarted && (
        <>
          <div className="hero-overlay-top" />
          <div className="hero-overlay-bottom" />
          <div className="absolute top-0 left-0 w-full h-full bg-grid [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-20 z-[1]" />
        </>
      )}

      <div className={`relative mx-auto w-full z-10 flex flex-col flex-1 ${!hasStarted ? "px-6 items-center gap-8" : "px-0 h-full overflow-hidden"}`}>

        {!hasStarted ? (
          /* ---------- START SCREEN: The SINGLE Large Glassy Frame ---------- */
          <div className="w-full max-w-[950px] rounded-[2.5rem] border border-white/30 bg-[#0a0e1f]/60 backdrop-blur-3xl shadow-[0_0_60px_rgba(109,94,252,0.25),0_30px_80px_-15px_rgba(0,0,0,0.9)] relative overflow-hidden flex flex-col lg:flex-row ring-1 ring-white/10 animate-[rise_0.8s_ease_out_both]">

            {/* Left Side: Fullscreen Live Demo Animation */}
            <div className="flex-1 w-full hidden lg:flex flex-col relative overflow-hidden bg-black/40 border-r border-white/10 items-center justify-start">
              {/* Glowing Orange Middle Line */}
              <div className="absolute right-0 top-[5%] h-[90%] w-[1px] bg-gradient-to-b from-transparent via-brand-500 to-transparent shadow-[0_0_15px_rgba(109,94,252,0.9)] opacity-80 z-20"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-brand-900/20 to-transparent z-10 pointer-events-none"></div>

              <FullPaneLiveDemo />

              <div className="relative mt-auto text-left w-full z-20 p-8 pb-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <h3 className="text-[20px] font-extrabold text-white tracking-tight drop-shadow-lg leading-tight">Watch a scrape happen in real time</h3>
                <p className="mt-2.5 text-[14px] text-white/70 font-medium leading-relaxed max-w-sm">Type a query and LeadX pulls enriched, export-ready leads in seconds — no setup.</p>
              </div>
            </div>

            {/* Right Side: Form Area */}
            <div className="w-full lg:w-[450px] flex flex-col p-8 lg:p-10 z-10 shrink-0 bg-transparent">

              <h1 className="text-[28px] font-extrabold text-white mb-1.5 tracking-tight drop-shadow-sm text-left">
                Start Extracting
              </h1>
              <p className="text-white/50 text-[14px] font-medium mb-10 text-left">
                Configure parameters to find local businesses.
              </p>

              {error && (
                <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-[13px] font-medium text-red-400 text-left">
                  {error}
                </div>
              )}

              <form onSubmit={(e) => { e.preventDefault(); run(); }} className="flex flex-col gap-6 text-left">

                <div className="relative">
                  <label className="block mb-2 text-[13px] font-semibold tracking-wide text-white/60 uppercase">Search Term</label>
                  <div className="relative">
                    <input required value={form.keyword} onChange={set("keyword")} placeholder="e.g. Dentists, Real Estate"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-[15px] font-medium text-white placeholder-white/30 outline-none focus:border-brand-500 focus:bg-white/[0.06] transition-all shadow-inner" />
                    <Search size={18} className="absolute left-4 top-3.5 text-white/40" />
                  </div>
                </div>

                <div className="relative">
                  <label className="block mb-2 text-[13px] font-semibold tracking-wide text-white/60 uppercase">Location</label>
                  <div className="relative">
                    <input required value={form.location} onChange={set("location")} placeholder="e.g. New York, London"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-[15px] font-medium text-white placeholder-white/30 outline-none focus:border-brand-500 focus:bg-white/[0.06] transition-all shadow-inner" />
                    <MapPin size={18} className="absolute left-4 top-3.5 text-white/40" />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mt-2">
                  <div className="relative w-full sm:w-auto">
                    <label className="block mb-2 text-[13px] font-semibold tracking-wide text-white/60 uppercase">Max Results</label>
                    <input type="number" min="1" max="500" value={form.limit} onChange={set("limit")}
                      className="w-full sm:w-28 bg-white/[0.03] border border-white/10 rounded-xl py-3 px-4 text-[15px] font-medium text-center text-white outline-none focus:border-brand-500 focus:bg-white/[0.06] transition-all shadow-inner" />
                  </div>

                  <div className="relative w-full sm:w-auto sm:mt-6">
                    <label className="flex cursor-pointer select-none items-center gap-3 group">
                      <span className="relative inline-flex">
                        <input type="checkbox" checked={form.find_emails} onChange={(e) => setForm((f) => ({ ...f, find_emails: e.target.checked }))} className="peer sr-only" />
                        <span className="h-6 w-11 rounded-full bg-white/10 transition-colors peer-checked:bg-brand-500 border border-white/10 peer-checked:border-brand-400" />
                        <span className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
                      </span>
                      <span className="flex items-center gap-2 text-[14px] font-medium text-white/70 group-hover:text-white transition-colors">
                        <Mail size={16} className="text-brand-400" /> Extract Emails
                      </span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-6 w-full rounded-full bg-gradient-to-r from-brand-500 to-brand-600 px-4 py-4 text-[15px] font-bold text-white shadow-[0_0_20px_rgba(109,94,252,0.4)] transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(109,94,252,0.6)] hover:from-brand-400 hover:to-brand-500 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  <Play size={16} fill="currentColor" /> Generate Leads
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* ---------- DASHBOARD VIEW: Full-Width Table + Top Toolbar ---------- */
          <div className="w-full flex-1 flex flex-col h-full bg-slate-50 text-slate-800 animate-[rise_0.8s_ease_out_both] overflow-hidden">

            {/* Top Toolbar: Inline Form */}
            <div className="border-b border-slate-200 bg-white p-4 lg:px-6 z-20 shadow-sm relative">
              <form onSubmit={(e) => { e.preventDefault(); run(); }} className="flex flex-col lg:flex-row items-center gap-4 w-full">
                {/* Search Term */}
                <div className="relative flex-1 w-full">
                  <input required value={form.keyword} onChange={set("keyword")} placeholder="Search Term (e.g. Dentists)"
                    className="w-full bg-white border border-slate-300 rounded-lg py-2.5 pl-10 pr-4 text-[14px] font-medium text-slate-900 placeholder-slate-400 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all shadow-sm" />
                  <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
                </div>
                {/* Location */}
                <div className="relative flex-1 w-full">
                  <input required value={form.location} onChange={set("location")} placeholder="Location (e.g. New York)"
                    className="w-full bg-white border border-slate-300 rounded-lg py-2.5 pl-10 pr-4 text-[14px] font-medium text-slate-900 placeholder-slate-400 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all shadow-sm" />
                  <MapPin size={16} className="absolute left-3.5 top-3 text-slate-400" />
                </div>
                {/* Max Results */}
                <div className="relative w-full lg:w-32 shrink-0">
                  <input type="number" min="1" max="500" value={form.limit} onChange={set("limit")} placeholder="Max Results"
                    className="w-full bg-white border border-slate-300 rounded-lg py-2.5 px-4 text-[14px] font-medium text-center text-slate-900 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all shadow-sm" />
                </div>
                {/* Find Emails */}
                <div className="flex items-center gap-2 shrink-0">
                  <label className="flex cursor-pointer select-none items-center gap-2 group">
                    <span className="relative inline-flex">
                      <input type="checkbox" checked={form.find_emails} onChange={(e) => setForm((f) => ({ ...f, find_emails: e.target.checked }))} className="peer sr-only" />
                      <span className="h-5 w-9 rounded-full bg-slate-200 transition-colors peer-checked:bg-brand-500 border border-slate-300 peer-checked:border-brand-400" />
                      <span className="absolute left-1 top-[2px] h-4 w-4 rounded-full bg-white shadow transition-transform peer-checked:translate-x-4" />
                    </span>
                    <span className="text-[13px] font-medium text-slate-600 group-hover:text-slate-900 hidden sm:block">Emails</span>
                  </label>
                </div>

                {/* Stop Button */}
                {loading && (
                  <button
                    type="button"
                    onClick={() => abortControllerRef.current?.abort()}
                    className="shrink-0 rounded-lg bg-red-50 px-5 py-2.5 text-[14px] font-bold text-red-600 border border-red-200 shadow-sm transition-all hover:bg-red-100 flex items-center justify-center gap-2 w-full lg:w-auto"
                  >
                    Stop
                  </button>
                )}

                {/* Submit Button */}
                {!loading && (
                  <button
                    type="submit"
                    className="shrink-0 rounded-lg bg-gradient-to-r from-brand-500 to-brand-600 px-5 py-2.5 text-[14px] font-bold text-white shadow-md transition-all hover:scale-[1.02] hover:from-brand-400 hover:to-brand-500 flex items-center justify-center gap-2 w-full lg:w-auto"
                  >
                    <Play size={14} fill="currentColor" /> Update
                  </button>
                )}

                {/* Export Button inside Toolbar */}
                {result && total > 0 && (
                  <ExportMenu leads={result.leads} query={form.keyword} disabled={false} />
                )}
              </form>
            </div>

            {/* Error Area */}
            {error && error !== "The user aborted a request." && (
              <div className="px-6 py-4 bg-red-50 border-b border-red-100 text-red-600 text-[13px] font-medium">
                {error}
              </div>
            )}

            {/* Main Content Area */}
            {loading && !result ? (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-500 bg-slate-50">
                <Spinner size={40} className="text-brand-500 mb-6" />
                <h3 className="text-xl font-bold text-slate-800">Scanning Google Maps...</h3>
                <p className="mt-2 text-sm">This might take a minute depending on your requested limit.</p>
              </div>
            ) : result ? (
              <div className="flex flex-col w-full h-full relative z-10 bg-slate-50">
                {/* Data Table */}
                {total > 0 ? (
                  <>
                    <div className="overflow-x-auto overflow-y-auto w-full flex-1">
                      <table className="w-full text-left text-[13px] relative bg-white">
                        <thead className="sticky top-0 z-10 bg-slate-100 shadow-sm border-b border-slate-200">
                          <tr>
                            {cols.map((c) => (
                              <th key={c.key} className="whitespace-nowrap px-6 py-3.5 font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                                {c.h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {pageRows.map((r) => (
                            <tr key={r._i} className="even:bg-slate-50/70 hover:bg-brand-50/50 transition-colors group">
                              {cols.map((c) => (
                                <td key={c.key} className="max-w-[220px] truncate px-6 py-4 text-slate-600 group-hover:text-slate-900">
                                  <Cell col={c} row={r} />
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex shrink-0 items-center justify-between border-t border-slate-200 bg-white px-6 py-4 text-sm text-slate-500 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                      <span className="font-medium text-[13px]">Showing {((page - 1) * perPage) + 1} to {Math.min(page * perPage, total)} of {total}</span>
                      <div className="flex items-center gap-2">
                        <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="px-4 py-2 rounded-lg font-bold text-slate-600 bg-white border border-slate-300 hover:bg-slate-50 transition-colors disabled:opacity-30 disabled:hover:bg-white">Prev</button>
                        <span className="px-3 font-bold text-slate-700">{page} / {totalPages}</span>
                        <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)} className="px-4 py-2 rounded-lg font-bold text-slate-600 bg-white border border-slate-300 hover:bg-slate-50 transition-colors disabled:opacity-30 disabled:hover:bg-white">Next</button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="p-16 text-center text-slate-500 font-medium bg-slate-50 flex-1 flex items-center justify-center">
                    No results found. Try changing your search terms or location.
                  </div>
                )}
              </div>
            ) : null}

          </div>
        )}

      </div>
    </section>
  );
}

/* ---------- sub components ---------- */
function ExportMenu({ leads, query, disabled }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => !disabled && setOpen(!open)}
        disabled={disabled}
        className="inline-flex items-center gap-2 rounded-lg bg-white border border-slate-300 px-5 py-2.5 text-[14px] font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition-all disabled:opacity-50"
      >
        <Download size={16} /> Download Data
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)}></div>
          <div className="absolute right-0 top-full mt-3 flex w-56 flex-col rounded-xl border border-slate-200 bg-white p-2 shadow-xl z-50">
            <button type="button" onClick={() => { setOpen(false); downloadCsv(leads, query); }} className="px-4 py-2.5 text-left text-[13px] font-bold text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">Google Sheets (CSV)</button>
            <button type="button" onClick={() => { setOpen(false); downloadExcel(leads, query); }} className="px-4 py-2.5 text-left text-[13px] font-bold text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">Excel File (.xls)</button>
            <button type="button" onClick={() => { setOpen(false); downloadJson(leads, query); }} className="px-4 py-2.5 text-left text-[13px] font-bold text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">JSON Data (.json)</button>
          </div>
        </>
      )}
    </div>
  );
}

function Cell({ col, row }) {
  const v = col.get(row);
  if (isEmpty(v)) return <span className="text-slate-300">—</span>;
  if (col.link && typeof v === "string" && /^https?:|^www\./.test(v)) {
    return <a href={v.startsWith("http") ? v : `https://${v}`} target="_blank" rel="noreferrer" className="font-semibold text-brand-600 hover:text-brand-700 hover:underline">{v}</a>;
  }
  return <span className="font-medium text-slate-700">{String(v)}</span>;
}
