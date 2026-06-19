import { useMemo, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { Spinner } from "../components/ui";
import {
  MapPin, Search, Download, ArrowRight, Check, Code, Database, Filter, Mail,
} from "../components/icons";

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

/* column registry: header label + apify-style field name */
const COLUMNS = {
  index:    { h: "#",            sub: "",             plain: true, get: (r) => r._i },
  name:     { h: "Place name",   sub: "title",        get: (r) => r.name },
  rating:   { h: "Total Score",  sub: "totalScore",   get: (r) => r.rating },
  reviews:  { h: "Reviews Count",sub: "reviewsCount", get: (r) => r.reviews },
  street:   { h: "Street",       sub: "street",       get: (r) => r._a.street },
  city:     { h: "City",         sub: "city",         get: (r) => r._a.city },
  state:    { h: "State",        sub: "state",        get: (r) => r._a.state },
  country:  { h: "Country Code", sub: "countryCode",  get: (r) => r._a.country },
  website:  { h: "Website",      sub: "website",      link: true, get: (r) => r.website },
  phone:    { h: "Phone",        sub: "phone",        get: (r) => r.phone },
  category: { h: "Categories",   sub: "categories",   get: (r) => r.category },
  url:      { h: "URL",          sub: "url",          link: true, get: (r) => r.maps_url },
  emails:   { h: "Emails",       sub: "emails",       get: (r) => r.emails },
  social:   { h: "Social",       sub: "socialLinks",  link: true, get: (r) => r.social_links },
  address:  { h: "Address",      sub: "address",      get: (r) => r.address },
  plus:     { h: "Plus code",    sub: "plusCode",     get: (r) => r.plus_code },
  lat:      { h: "Latitude",     sub: "location.lat", get: (r) => r.latitude },
  lng:      { h: "Longitude",    sub: "location.lng", get: (r) => r.longitude },
};

const RESULT_TABS = {
  overview:   { label: "Overview", cols: ["index", "name", "rating", "reviews", "street", "city", "state", "country", "website", "phone", "category", "url"] },
  contact:    { label: "Contact info", cols: ["index", "name", "phone", "website", "emails", "address"] },
  social:     { label: "Social media", cols: ["index", "name", "social", "website"] },
  rating:     { label: "Rating", cols: ["index", "name", "rating", "reviews"] },
  reviews:    { label: "Reviews (if any)", cols: ["index", "name", "reviews", "rating"] },
  enrichment: { label: "Lead Enrichment", cols: ["index", "name", "emails", "phone", "website", "social"] },
  profiles:   { label: "Social profiles", cols: ["index", "name", "social"] },
  all:        { label: "All fields", cols: ["index", "name", "rating", "reviews", "address", "street", "city", "state", "country", "phone", "website", "emails", "category", "social", "plus", "lat", "lng", "url"] },
  preview:    { label: "Preview", cols: [] },
};

const CSV_COLS = ["name", "category", "rating", "reviews", "address", "phone", "website", "emails", "social_links", "plus_code", "latitude", "longitude", "maps_url"];

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

function downloadJson(leads, query) {
  const blob = new Blob([JSON.stringify(leads, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${(query || "google-maps-leads").replace(/\s+/g, "-").toLowerCase()}.json`;
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

function copyForSheets(leads) {
  const headers = CSV_COLS.join('\t');
  const rows = leads.map(l => CSV_COLS.map(k => String(l[k] || "").replace(/\t/g, ' ')).join('\t')).join('\n');
  navigator.clipboard.writeText(`${headers}\n${rows}`).then(() => {
    alert("Copied to clipboard! Open Google Sheets and press Ctrl+V / Cmd+V to paste the leads.");
  });
}

function fmtDuration(sec) {
  if (sec == null) return "—";
  const s = Math.round(sec);
  if (s < 60) return `${s}s`;
  return `${Math.floor(s / 60)}m ${s % 60}s`;
}

/* ---------- component ---------- */
export default function Console({ onNavigate }) {
  const { token, logout } = useAuth();
  const [tab, setTab] = useState("input");                 // top tab
  const [rtab, setRtab] = useState("overview");            // results sub-tab
  const [form, setForm] = useState({ keyword: "", location: "", limit: 50, find_emails: true });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(50);
  const [ranAt, setRanAt] = useState(null);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const rows = useMemo(
    () => (result?.leads || []).map((l, i) => ({ ...l, _i: i + 1, _a: parseAddr(l.address) })),
    [result]
  );

  const run = async () => {
    setError("");
    setLoading(true);
    setResult(null);
    try {
      const res = await api.scrape(
        { keyword: form.keyword, location: form.location, limit: Number(form.limit) || 50, find_emails: form.find_emails },
        token
      );
      setResult(res);
      setRanAt(new Date());
      setPage(1);
      setTab("output");
    } catch (err) {
      setError(err.message || "Run failed. Ensure backend (8080) and the scraper engine (8000) are running.");
      setTab("output");
    } finally {
      setLoading(false);
    }
  };

  const total = rows.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const pageRows = rows.slice((page - 1) * perPage, page * perPage);
  const cols = RESULT_TABS[rtab].cols.map((k) => ({ key: k, ...COLUMNS[k] }));

  const fillPct = (col) => {
    if (!total || col.plain) return null;
    const filled = rows.filter((r) => !isEmpty(col.get(r))).length;
    return Math.round((filled / total) * 100);
  };

  return (
    <div className="min-h-screen bg-[#0c0e14] text-slate-200">
      {/* ===== Run header ===== */}
      <header className="border-b border-white/10 bg-[#11141c]">
        <div className="flex flex-wrap items-center gap-3 px-5 py-3">
          <button onClick={() => onNavigate("dashboard")} className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-white/5 hover:text-white" title="Back to Actors">
            <span className="rotate-180"><ArrowRight size={18} /></span>
          </button>
          <span className="text-sm font-semibold text-slate-400">Run</span>
          <span className="text-slate-600">·</span>
          <span className="grid h-6 w-6 place-items-center rounded bg-gradient-to-br from-emerald-400 to-cyan-500 text-white"><MapPin size={14} /></span>
          <span className="font-semibold text-white">Google Maps Scraper</span>
          <span className="rounded bg-white/10 px-2 py-0.5 text-xs font-semibold text-slate-300">Actor</span>

          <div className="ml-auto flex items-center gap-2">
            <HeaderBtn onClick={() => setTab("input")}>Actions</HeaderBtn>
            <HeaderBtn onClick={() => setTab("input")}>API</HeaderBtn>
            <ExportMenu leads={result?.leads} query={result?.query} disabled={!total} />
            <button onClick={logout} className="rounded-lg bg-gradient-to-br from-brand-500 to-cyan-500 px-3.5 py-1.5 text-sm font-semibold text-white hover:opacity-90">
              Log out
            </button>
          </div>
        </div>
      </header>

      {/* ===== Status banner ===== */}
      <div className="px-5 pt-4">
        {loading ? (
          <Banner tone="run"><Spinner size={15} /> <b>Running</b> · Scraping Google Maps for “{form.keyword || "…"}”…</Banner>
        ) : error ? (
          <Banner tone="fail"><b>Failed</b> · {error}</Banner>
        ) : result ? (
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2 rounded-md border border-emerald-700/40 bg-emerald-950/40 px-4 py-2.5 text-sm">
            <span className="font-semibold text-emerald-300">
              <span className="mr-1.5 inline-grid h-4 w-4 -translate-y-px place-items-center rounded-full bg-emerald-500 text-[#0c0e14]"><Check size={11} /></span>
              Succeeded
              <span className="ml-2 font-normal text-emerald-200/80">Scraping finished. {total} places ready.</span>
            </span>
            <span className="ml-auto flex flex-wrap items-center gap-x-7 gap-y-1 text-slate-400">
              <span className="text-slate-300">${(total * 0.004).toFixed(3)}</span>
              <span>{ranAt ? ranAt.toLocaleString() : ""}</span>
              <span>{fmtDuration(result.time_seconds)}</span>
            </span>
          </div>
        ) : (
          <Banner tone="idle">Configure the <b>Input</b> and press <b>Start</b> to run the scraper.</Banner>
        )}
      </div>

      {/* ===== Top tabs ===== */}
      <div className="mt-4 border-b border-white/10 px-5">
        <div className="flex flex-wrap gap-1">
          <TopTab id="output" tab={tab} setTab={setTab} icon={Database} badge={total || null}>Output</TopTab>
          <TopTab id="log" tab={tab} setTab={setTab} icon={Code}>Log</TopTab>
          <TopTab id="input" tab={tab} setTab={setTab} icon={Filter}>Input</TopTab>
          <TopTab id="storage" tab={tab} setTab={setTab} icon={Database}>Storage</TopTab>
          <TopTab id="integrations" tab={tab} setTab={setTab} badge={0}>Triggered integrations</TopTab>
        </div>
      </div>

      {/* ===== Body ===== */}
      <div className="px-5 py-5">
        {tab === "input" && (
          <InputPanel form={form} set={set} setForm={setForm} loading={loading} run={run} />
        )}

        {tab === "output" && (
          <OutputPanel
            total={total} rtab={rtab} setRtab={setRtab} cols={cols} pageRows={pageRows}
            fillPct={fillPct} perPage={perPage} setPerPage={setPerPage} page={page}
            setPage={setPage} totalPages={totalPages} loading={loading} error={error}
          />
        )}

        {tab === "log" && <Placeholder title="Log" body={result ? `[INFO] Run finished — ${total} items pushed to dataset.` : "Run the actor to see logs."} mono />}
        {tab === "storage" && <Placeholder title="Storage" body={result ? `Dataset contains ${total} records.` : "No dataset yet."} />}
        {tab === "integrations" && <Placeholder title="Triggered integrations" body="No integrations triggered for this run." />}
      </div>
    </div>
  );
}

/* ---------- sub components ---------- */
function HeaderBtn({ children, disabled, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-slate-200 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  );
}

function ExportMenu({ leads, query, disabled }) {
  const [open, setOpen] = useState(false);
  
  if (disabled) {
    return (
      <HeaderBtn disabled>
        <Download size={15} /> Export
      </HeaderBtn>
    );
  }
  return (
    <div className="relative">
      <HeaderBtn onClick={() => setOpen(!open)}>
        <Download size={15} /> Export
      </HeaderBtn>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)}></div>
          <div className="absolute right-0 top-full mt-1 flex w-48 flex-col rounded-xl border border-white/10 bg-[#161a23] p-1 shadow-xl z-50">
            <button onClick={() => { setOpen(false); downloadCsv(leads, query); }} className="px-3 py-2 text-left text-sm text-slate-300 hover:bg-white/5 hover:text-white rounded-lg">CSV (.csv)</button>
            <button onClick={() => { setOpen(false); downloadExcel(leads, query); }} className="px-3 py-2 text-left text-sm text-slate-300 hover:bg-white/5 hover:text-white rounded-lg">Excel (.xls)</button>
            <button onClick={() => { setOpen(false); downloadJson(leads, query); }} className="px-3 py-2 text-left text-sm text-slate-300 hover:bg-white/5 hover:text-white rounded-lg">JSON (.json)</button>
            <button onClick={() => { setOpen(false); copyForSheets(leads); }} className="px-3 py-2 text-left text-sm text-slate-300 hover:bg-white/5 hover:text-white rounded-lg">Google Sheets</button>
          </div>
        </>
      )}
    </div>
  );
}

function TopTab({ id, tab, setTab, icon: Icon, badge, children }) {
  const active = tab === id;
  return (
    <button
      onClick={() => setTab(id)}
      className={`-mb-px flex items-center gap-2 border-b-2 px-3.5 py-2.5 text-sm font-medium transition ${
        active ? "border-cyan-400 text-white" : "border-transparent text-slate-400 hover:text-slate-200"
      }`}
    >
      {Icon && <Icon size={15} />}
      {children}
      {badge != null && (
        <span className={`rounded px-1.5 py-0.5 text-xs font-bold ${active ? "bg-cyan-400/20 text-cyan-300" : "bg-white/10 text-slate-300"}`}>{badge}</span>
      )}
    </button>
  );
}

function Banner({ tone, children }) {
  const map = {
    run: "border-amber-600/40 bg-amber-950/30 text-amber-200",
    fail: "border-red-700/50 bg-red-950/40 text-red-200",
    idle: "border-white/10 bg-white/5 text-slate-300",
  };
  return <div className={`flex items-center gap-2 rounded-md border px-4 py-2.5 text-sm ${map[tone]}`}>{children}</div>;
}

function InputPanel({ form, set, setForm, loading, run }) {
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); run(); }}
      className="mx-auto max-w-2xl rounded-xl border border-white/10 bg-[#11141c] p-6"
    >
      <h2 className="text-base font-semibold text-white">Input</h2>
      <p className="mt-1 text-sm text-slate-400">Set what to scrape, then press Start.</p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <DarkField label="Search term" icon={Search}>
          <input required value={form.keyword} onChange={set("keyword")} placeholder="dentists, gyms, coffee shops" className={darkInput} />
        </DarkField>
        <DarkField label="Location" icon={MapPin}>
          <input required value={form.location} onChange={set("location")} placeholder="Indore, Brooklyn, Mumbai" className={darkInput} />
        </DarkField>
      </div>

      <div className="mt-4 flex flex-wrap items-end gap-5">
        <DarkField label="Max results" icon={Filter} className="w-32">
          <input type="number" min="1" max="200" value={form.limit} onChange={set("limit")} className={`${darkInput} no-spin`} />
        </DarkField>

        <label className="flex cursor-pointer select-none items-center gap-3 pb-2.5">
          <span className="relative inline-flex">
            <input type="checkbox" checked={form.find_emails} onChange={(e) => setForm((f) => ({ ...f, find_emails: e.target.checked }))} className="peer sr-only" />
            <span className="h-6 w-11 rounded-full bg-white/15 transition-colors peer-checked:bg-cyan-500" />
            <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
          </span>
          <span className="flex items-center gap-1.5 text-sm font-medium text-slate-200"><Mail size={15} className="text-cyan-400" /> Scrape emails</span>
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 px-6 py-3 font-semibold text-[#06231f] transition hover:opacity-90 disabled:opacity-50"
      >
        {loading ? (<><Spinner size={16} /> Starting…</>) : (<>Start <ArrowRight size={16} /></>)}
      </button>
    </form>
  );
}

function OutputPanel({ total, rtab, setRtab, cols, pageRows, fillPct, perPage, setPerPage, page, setPage, totalPages, loading, error }) {
  if (loading) return <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#11141c] p-10 text-slate-400"><Spinner /> Fetching results…</div>;
  if (error) return <div className="rounded-xl border border-red-700/40 bg-red-950/30 p-8 text-red-200">{error}</div>;
  if (!total) return <div className="rounded-xl border border-white/10 bg-[#11141c] p-12 text-center text-slate-400">No results yet. Go to the <b className="text-slate-200">Input</b> tab and press Start.</div>;

  return (
    <div>
      {/* results sub-tabs */}
      <div className="mb-3 flex flex-wrap items-center gap-1 border-b border-white/10 pb-3">
        <span className="mr-2 inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-slate-200">Results</span>
        {Object.entries(RESULT_TABS).map(([id, t]) => (
          <button
            key={id}
            onClick={() => setRtab(id)}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${rtab === id ? "bg-cyan-400/15 text-cyan-300" : "text-slate-400 hover:bg-white/5 hover:text-slate-200"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {rtab === "preview" ? (
        <pre className="max-h-[60vh] overflow-auto rounded-xl border border-white/10 bg-[#0a0c12] p-4 text-xs leading-relaxed text-emerald-200">
          {JSON.stringify(pageRows.map(({ _i, _a, ...r }) => r), null, 2)}
        </pre>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-[#161a23]">
                {cols.map((c) => {
                  const pct = fillPct(c);
                  return (
                    <th key={c.key} className="whitespace-nowrap border-b border-white/10 px-4 py-3 align-top font-semibold text-slate-200">
                      <div className="flex items-center gap-2">
                        {c.plain ? <span className="text-slate-500">{c.h}</span> : <span>{c.h}</span>}
                        {pct != null && (
                          <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${pct >= 100 ? "bg-emerald-500/15 text-emerald-300" : pct >= 85 ? "bg-green-500/15 text-green-300" : pct > 0 ? "bg-amber-500/15 text-amber-300" : "bg-white/10 text-slate-400"}`}>{pct}%</span>
                        )}
                      </div>
                      {c.sub && <div className="mt-0.5 text-xs font-normal text-slate-500">{c.sub}</div>}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {pageRows.map((r) => (
                <tr key={r._i} className="bg-[#11141c] transition-colors hover:bg-[#161b26]">
                  {cols.map((c) => (
                    <td key={c.key} className="max-w-[260px] truncate border-b border-white/5 px-4 py-3 align-top">
                      <Cell col={c} row={r} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* pagination */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-400">
        <div className="flex items-center gap-2">
          <span>Items per page</span>
          <select
            value={perPage}
            onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }}
            className="rounded-md border border-white/10 bg-[#11141c] px-2 py-1 text-slate-200 outline-none"
          >
            {[10, 25, 50, 100].map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-1">
          <PagerBtn disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>‹</PagerBtn>
          {Array.from({ length: totalPages }).slice(0, 6).map((_, i) => (
            <button key={i} onClick={() => setPage(i + 1)} className={`h-8 min-w-8 rounded-md px-2 text-sm ${page === i + 1 ? "bg-cyan-400/20 font-semibold text-cyan-200" : "text-slate-300 hover:bg-white/5"}`}>{i + 1}</button>
          ))}
          <PagerBtn disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>›</PagerBtn>
        </div>
      </div>
    </div>
  );
}

function Cell({ col, row }) {
  const v = col.get(row);
  if (isEmpty(v)) return <span className="text-slate-600">null</span>;
  if (col.plain) return <span className="text-slate-500">{v}</span>;
  if (col.link && typeof v === "string" && /^https?:|^www\./.test(v)) {
    return <a href={v.startsWith("http") ? v : `https://${v}`} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">{v}</a>;
  }
  return <span className="text-slate-200">{String(v)}</span>;
}

function PagerBtn({ children, disabled, onClick }) {
  return (
    <button onClick={onClick} disabled={disabled} className="grid h-8 w-8 place-items-center rounded-md text-slate-300 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-30">
      {children}
    </button>
  );
}

function Placeholder({ title, body, mono }) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#11141c] p-6">
      <h2 className="mb-2 text-base font-semibold text-white">{title}</h2>
      <p className={`text-sm text-slate-400 ${mono ? "font-mono" : ""}`}>{body}</p>
    </div>
  );
}

const darkInput =
  "w-full rounded-lg border border-white/10 bg-[#0c0e14] px-3.5 py-2.5 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20";

function DarkField({ label, icon: Icon, children, className = "" }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-300">
        {Icon && <Icon size={14} className="text-cyan-400" />} {label}
      </span>
      {children}
    </label>
  );
}
