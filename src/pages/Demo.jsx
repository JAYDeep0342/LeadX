import { useState, useEffect } from "react";

// Icons
const ExcelIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill="#107C41" d="M14.5 2L14.5 7.5L20 7.5L14.5 2Z" />
    <path fill="#107C41" d="M14.5 7.5L14.5 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V7.5H14.5Z" />
    <path fill="#FFF" d="M8.5 11.5L10 14L8.5 16.5H9.8L10.75 14.8L11.7 16.5H13L11.5 14L13 11.5H11.7L10.75 13.2L9.8 11.5H8.5Z" />
  </svg>
);

const SheetsIcon = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill="#0F9D58" d="M14.5 2L14.5 7.5L20 7.5L14.5 2Z" />
    <path fill="#0F9D58" d="M14.5 7.5L14.5 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V7.5H14.5Z" />
    <path fill="#FFF" d="M8 11H16V12.5H8V11Z" />
    <path fill="#FFF" d="M8 14.5H16V16H8V14.5Z" />
  </svg>
);

const XmlIcon = () => (
  <svg className="w-5 h-5 shrink-0 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

const JsonIcon = () => (
  <span className="w-5 h-5 shrink-0 flex items-center justify-center font-mono font-bold text-slate-600 text-[16px] leading-none">{"{ }"}</span>
);

/* ══════════════════════════════════════════
   STEP VISUALS — Clean Light Professional Theme
══════════════════════════════════════════ */
function SearchVisual() {
  const [query, setQuery]       = useState("");
  const [location, setLocation] = useState("");
  const fullQuery = "dentists"; const fullLoc = "Austin, TX";
  useEffect(() => {
    let i = 0;
    const tq = setInterval(() => { if (i <= fullQuery.length) { setQuery(fullQuery.slice(0, i)); i++; } else clearInterval(tq); }, 90);
    const h  = setTimeout(() => {
      let j = 0;
      const tl = setInterval(() => { if (j <= fullLoc.length) { setLocation(fullLoc.slice(0, j)); j++; } else clearInterval(tl); }, 75);
    }, 900);
    return () => { clearInterval(tq); clearTimeout(h); };
  }, []);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
      <p className="text-[13px] font-medium text-slate-500 mb-4">LeadX Search</p>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5">
          <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
          </svg>
          <span className="font-mono text-[13px] text-slate-700">{query}<span className="animate-pulse ml-0.5 text-blue-500">|</span></span>
        </div>
        <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5">
          <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
          </svg>
          <span className="font-mono text-[13px] text-slate-700">{location}<span className="animate-pulse ml-0.5 text-blue-500">|</span></span>
        </div>
        <button className="self-start mt-2 rounded-full bg-slate-800 px-6 py-2 text-[13px] font-medium text-white shadow-sm transition hover:bg-slate-700">
          Search leads
        </button>
      </div>
      <div className="mt-5 flex items-center gap-2">
        <span className="h-2 w-2 animate-pulse rounded-full bg-green-500"/>
        <p className="text-[12px] font-medium text-slate-500">Scanning Google Maps in real-time...</p>
      </div>
    </div>
  );
}

function EnrichVisual() {
  const fields = [
    { label: "Phone",   value: "+1-512-555-0123",       color: "text-slate-800" },
    { label: "Email",   value: "info@sunrise.com",       color: "text-blue-600" },
    { label: "Website", value: "sunrisedental.com",      color: "text-blue-600" },
    { label: "Rating",  value: "4.8 ⭐",                color: "text-amber-500" },
    { label: "Reviews", value: "212 reviews",            color: "text-slate-600" },
    { label: "Address", value: "123 Main St, Austin TX", color: "text-slate-600" },
  ];
  const [visible, setVisible] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setVisible(v => (v < fields.length ? v + 1 : v)), 380);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3 flex-1">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 border border-slate-200 font-medium text-slate-700 text-lg">S</div>
          <div>
            <p className="font-medium text-slate-800 text-sm">Sunrise Dental Care</p>
            <p className="text-[12px] text-slate-500">Dental clinic · Austin, TX</p>
          </div>
        </div>
        <span className="self-start sm:self-auto animate-pulse text-[11px] font-medium text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full">Enriching…</span>
      </div>
      <div className="grid gap-2">
        {fields.map((f, i) => (
          <div key={f.label} className={`flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-3 py-2.5 transition-all duration-500 ${i < visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"}`}>
            <span className="text-[12px] text-slate-400 w-20">{f.label}</span>
            <span className={`text-[13px] font-medium ${f.color}`}>{f.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TableVisual() {
  const rows = [
    { name: "Sunrise Dental", rating: "4.8", phone: "+1-512-555-0123", email: "info@sunrise.com" },
    { name: "Austin Smiles",  rating: "4.6", phone: "+1-512-555-0199", email: "hello@austinsmiles.com" },
    { name: "Capital Dental", rating: "4.9", phone: "+1-512-555-0187", email: "care@capital.com" },
  ];
  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between px-5 py-3 border-b border-slate-200 bg-slate-50/50 gap-2">
        <span className="text-[13px] font-medium text-slate-800">Results — 247 leads</span>
        <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[11px] font-medium text-emerald-600 w-fit">✓ No duplicates</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-[13px] min-w-[400px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              {["Name","Rating","Phone","Email"].map(h => <th key={h} className="px-4 py-2.5 text-left text-slate-500 font-medium text-[11px]">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="px-4 py-2.5 font-medium text-slate-800">{r.name}</td>
                <td className="px-4 py-2.5 text-amber-500 font-medium">{r.rating} ⭐</td>
                <td className="px-4 py-2.5 text-slate-600">{r.phone}</td>
                <td className="px-4 py-2.5 text-blue-600">{r.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-5 py-3 flex gap-2 bg-white">
        <span className="rounded-md bg-slate-100 border border-slate-200 px-3 py-1.5 text-[11px] font-medium text-slate-600 cursor-pointer hover:bg-slate-200 transition">Filter</span>
        <span className="rounded-md bg-white border border-slate-200 px-3 py-1.5 text-[11px] font-medium text-slate-500 cursor-pointer hover:bg-slate-50 transition">Sort</span>
      </div>
    </div>
  );
}

function ExportVisual() {
  const [done, setDone] = useState(false);
  useEffect(() => { const t = setTimeout(() => setDone(true), 1200); return () => clearTimeout(t); }, []);
  
  const EXPORT_OPTIONS = [
    { name: "Microsoft Excel", icon: <ExcelIcon />, text: "text-green-700" },
    { name: "Google Sheets",   icon: <SheetsIcon />, text: "text-green-600" },
    { name: "JSON Data",       icon: <JsonIcon />, text: "text-slate-700" },
    { name: "XML File",        icon: <XmlIcon />, text: "text-orange-600" },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
      <p className="text-[13px] font-medium text-slate-500 mb-4">Export Format</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {EXPORT_OPTIONS.map((opt, idx) => {
          const isSelected = idx === 0;
          return (
            <div key={opt.name} className={`flex flex-col gap-2 rounded-xl border p-3 ${isSelected && done ? 'border-emerald-500 bg-emerald-50/30' : 'border-slate-200 bg-slate-50/50'}`}>
              <div className="flex items-center gap-2">
                {opt.icon}
                <span className={`font-medium text-[13px] text-slate-700`}>{opt.name}</span>
              </div>
              {isSelected && done && (
                <span className="inline-flex items-center w-fit rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-medium text-white mt-1 animate-bounce">
                  Exported!
                </span>
              )}
            </div>
          );
        })}
      </div>
      <div className={`mt-5 rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-3 transition-all duration-700 ${done ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
        <p className="text-[12px] font-medium text-emerald-700">✓ 247 leads exported to leads.xlsx</p>
      </div>
    </div>
  );
}

function StepVisual({ stepId }) {
  if (stepId === 1) return <SearchVisual />;
  if (stepId === 2) return <EnrichVisual />;
  if (stepId === 3) return <TableVisual />;
  if (stepId === 4) return <ExportVisual />;
  return null;
}

/* ══════════════════════════════════════════
   STEP DATA
══════════════════════════════════════════ */
const STEPS = [
  { id: 1, title: "Search any niche & location",   desc: "Type a keyword like \"dentists\" and a city like \"Austin\". LeadX searches Google Maps and finds every matching business in that area." },
  { id: 2, title: "We enrich every lead",           desc: "For each result, LeadX visits the business website and extracts emails, phones, social links, ratings, reviews, and GPS coordinates." },
  { id: 3, title: "Review your clean results",      desc: "All leads land in a structured table — deduplicated and normalised. Filter by rating, review count, or any column before exporting." },
  { id: 4, title: "Export to your preferred format",desc: "Export directly to Microsoft Excel, Google Sheets, JSON, or XML. Your leads are perfectly structured and ready for your sales workflow." },
];

/* ══════════════════════════════════════════
   MAIN DEMO PAGE
══════════════════════════════════════════ */
export default function Demo({ onNavigate }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [animating,   setAnimating]   = useState(false);

  const step = STEPS[currentStep];

  const handleUnderstand = () => {
    if (currentStep < STEPS.length - 1) {
      setAnimating(true);
      setTimeout(() => { setCurrentStep(s => s + 1); setAnimating(false); }, 380);
    } else {
      onNavigate("signup");
    }
  };

  const jumpToStep = (index) => {
    if (index !== currentStep) {
      setAnimating(true);
      setTimeout(() => { setCurrentStep(index); setAnimating(false); }, 380);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-slate-800">
      
      {/* ─ Top Progress Stepper ─ */}
      <div className="w-full pt-10 pb-4 px-4 sm:px-8 flex justify-center sticky top-0 bg-slate-50/90 backdrop-blur-md z-50">
        <div className="w-full max-w-2xl flex items-center justify-between relative px-2 sm:px-0">
          {/* Background line */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-slate-200 z-0 mx-4 sm:mx-6" />
          
          {/* Active Progress line */}
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-slate-800 z-0 transition-all duration-700 ease-in-out mx-4 sm:mx-6" 
            style={{ width: `calc(${(currentStep / (STEPS.length - 1)) * 100}% - 2rem)` }}
          />
          
          {/* Step Nodes (Clickable) */}
          {STEPS.map((s, i) => {
            const isActive = i === currentStep;
            const isCompleted = i < currentStep;
            return (
              <div 
                key={s.id} 
                onClick={() => jumpToStep(i)}
                className="relative z-10 flex flex-col items-center cursor-pointer group"
              >
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-medium text-[13px] sm:text-[14px] border-2 transition-all duration-500 bg-white ${
                  isActive ? "border-slate-800 text-slate-800 shadow-sm scale-110" : 
                  isCompleted ? "border-slate-800 bg-slate-800 text-white" : 
                  "border-slate-300 text-slate-400 group-hover:border-slate-400"
                }`}>
                  {isCompleted ? "✓" : i + 1}
                </div>
                {/* Hide text on very small screens, show on sm+ */}
                <div className={`absolute top-10 sm:top-12 whitespace-nowrap text-[11px] sm:text-[12px] font-medium transition-all duration-500 hidden sm:block ${
                  isActive ? "text-slate-700" : 
                  isCompleted ? "text-slate-500" : 
                  "text-slate-400"
                }`}>
                  Step {i + 1}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─ Main content ─ */}
      <div style={{
        flex: 1, display: "flex", alignItems: "flex-start", justifyContent: "center",
        padding: "30px 20px 60px", position: "relative", zIndex: 10,
        opacity: animating ? 0 : 1,
        transform: animating ? "translateY(15px)" : "translateY(0)",
        transition: "opacity 0.35s ease, transform 0.35s ease",
      }}>
        <div className="w-full max-w-5xl mt-6 lg:mt-10">
          <div className="grid gap-10 lg:gap-16 lg:grid-cols-2 items-start">

            {/* ── Left: step info ── */}
            <div className="text-center lg:text-left mt-0 lg:mt-2">
              <h1 className="text-[28px] sm:text-[34px] font-semibold text-slate-800 tracking-normal leading-snug mb-3">
                {step.title}
              </h1>
              <p className="text-slate-500 font-normal text-[15px] sm:text-[16px] leading-relaxed mb-6 max-w-lg mx-auto lg:mx-0">
                {step.desc}
              </p>

              <button
                onClick={handleUnderstand}
                className="group relative inline-flex items-center justify-center w-full sm:w-auto rounded-full bg-slate-800 px-8 py-3 text-[14px] font-medium text-white shadow-[0_8px_20px_rgba(239,68,68,0.15)] border border-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(239,68,68,0.20)] hover:bg-slate-700 active:scale-95 overflow-hidden"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                <span className="relative z-10">I understand</span>
              </button>
            </div>

            {/* ── Right: unique animated visual ── */}
            <div style={{
              opacity: animating ? 0 : 1,
              transform: animating ? "scale(0.98)" : "scale(1)",
              transition: "opacity 0.35s ease, transform 0.35s ease",
            }} className="w-full overflow-hidden sm:overflow-visible">
              <StepVisual stepId={step.id} key={step.id} />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
