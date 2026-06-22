import { Button } from "../components/ui";
import {
  Search, Mail, Database, Download, Filter, Code, Clock,
  Check, ArrowRight, Zap
} from "../components/icons";

const SERVICES = [
  { icon: Search, title: "Map data scraping", desc: "Pull every business matching a keyword + location straight from Google Maps — name, category, address and coordinates." },
  { icon: Mail, title: "Contact enrichment", desc: "We crawl business websites to surface emails and social profiles so you can reach the right person." },
  { icon: Filter, title: "Lead qualification", desc: "Filter and sort by rating, review count and category to focus only on prospects that fit your ICP." },
  { icon: Download, title: "Export & CRM sync", desc: "Download clean CSVs or push records into your CRM — no manual copy-paste, no broken rows." },
  { icon: Database, title: "Saved jobs & history", desc: "Every scrape is stored against your account, so you can revisit, re-run and track your campaigns." },
  { icon: Code, title: "Developer API", desc: "A simple REST endpoint backed by Spring Boot and JWT auth — automate scraping inside your own stack." },
];

const INCLUDED = [
  "Keyword + location targeting",
  "Email & social-link discovery",
  "Ratings, reviews & categories",
  "Phone, website & full address",
  "Map URL, plus code & geo-coordinates",
  "Automatic de-duplication",
  "CSV export, ready for outreach",
  "Secure JWT-protected accounts",
];

const FAQS = [
  { q: "Where does the data come from?", a: "LeadX searches public Google Maps listings for your keyword and location, then visits each business website to enrich the record with emails and social links." },
  { q: "Which fields do I get for each lead?", a: "Name, category, rating, reviews, address, phone, website, emails, social links, plus code, latitude, longitude and the Google Maps URL — 13 fields in total." },
  { q: "Can I use the API directly?", a: "Yes. Our platform exposes a robust REST endpoint secured with JWT, so you can trigger scrapes and pull results programmatically from your own apps." },
  { q: "How quickly are results generated?", a: "On average, a fully enriched lead table is generated in under 8 seconds, allowing your sales team to start outreach almost immediately." },
];

export default function Service({ onNavigate }) {
  return (
    <div className="bg-white min-h-screen font-sans">
      
      {/* Page header */}
      <section className="relative overflow-hidden bg-slate-50 pt-32 pb-24 text-center">
        {/* Subtle grid pattern for light theme */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-50" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-[800px] -translate-x-1/2 rounded-full bg-blue-200/40 blur-[120px]" />
        
        <div className="relative mx-auto max-w-4xl px-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-white border border-blue-100 px-4 py-1.5 text-[13px] font-bold text-blue-600 mb-8 shadow-sm">
            <Zap size={15} className="text-blue-500" /> Platform Services
          </div>
          <h1 className="text-[40px] font-extrabold tracking-tight text-slate-900 sm:text-[64px] leading-[1.05]">
            Everything from search to <br className="hidden sm:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">sales-ready pipelines</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[18px] leading-relaxed text-slate-500 font-medium">
            One platform to find, enrich and export local business leads — built on a robust enterprise-grade backend by BDM Infotech.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-24 bg-white relative">
        <div className="mx-auto max-w-[1180px] px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">A complete lead-generation toolkit</h2>
            <p className="mt-4 text-[17px] text-slate-500 max-w-2xl mx-auto font-medium">Everything you need to discover, qualify, and connect with local businesses at scale.</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <div key={s.title} className="group relative rounded-3xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.15)]">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-blue-50/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative z-10">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-600 border border-slate-100 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 shadow-sm">
                    <s.icon size={26} />
                  </div>
                  <h3 className="text-[20px] font-bold text-slate-900">{s.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-slate-500 font-medium">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Split: what's included */}
      <section className="bg-slate-50 py-24 relative border-y border-slate-200/60">
        <div className="mx-auto grid max-w-[1180px] items-center gap-16 px-6 lg:px-8 lg:grid-cols-2">
          
          {/* Left: Beautiful UI Card */}
          <div className="relative overflow-hidden rounded-[2rem] bg-white border border-slate-200 p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)]">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-blue-50 blur-3xl" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-64 w-64 rounded-full bg-indigo-50 blur-3xl" />
            
            <div className="relative z-10">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 mb-6 border border-blue-100">
                <Clock size={24} />
              </div>
              <div className="text-[64px] font-extrabold tracking-tight text-slate-900 leading-none mb-2">8 <span className="text-[32px] text-slate-400 font-bold tracking-normal">sec</span></div>
              <p className="text-[16px] font-medium text-slate-500">Average time to a fully enriched lead table.</p>
              
              <div className="mt-10 grid grid-cols-2 gap-4">
                {[
                  { n: "13", l: "Data points / lead", c: "bg-blue-50 text-blue-700 border-blue-100" },
                  { n: "100%", l: "De-duplicated", c: "bg-indigo-50 text-indigo-700 border-indigo-100" },
                  { n: "CSV", l: "Instant export", c: "bg-emerald-50 text-emerald-700 border-emerald-100" },
                  { n: "JWT", l: "Secure access", c: "bg-slate-50 text-slate-700 border-slate-200" },
                ].map((x) => (
                  <div key={x.l} className={`rounded-2xl border p-5 ${x.c}`}>
                    <div className="text-[28px] font-extrabold leading-none">{x.n}</div>
                    <div className="text-[13px] font-bold mt-2 opacity-80 uppercase tracking-wide">{x.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:pl-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 border border-indigo-100 px-3 py-1.5 text-[12px] font-bold text-indigo-600 mb-6 tracking-wide uppercase">
              Included Features
            </div>
            <h2 className="text-[34px] font-extrabold tracking-tight text-slate-900 sm:text-[44px] leading-[1.15]">
              Clean data, <br/><span className="text-blue-600">zero busywork.</span>
            </h2>
            <p className="mt-5 text-[17px] leading-relaxed text-slate-500 font-medium">
              Every scrape returns structured, deduplicated records you can trust — so your team spends time selling, not cleaning spreadsheets.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {INCLUDED.map((t) => (
                <li key={t} className="flex items-start gap-3 text-[15px] font-semibold text-slate-700">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-[900px] px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Frequently asked questions</h2>
            <p className="mt-4 text-[17px] text-slate-500 font-medium">Everything you need to know about how the platform works.</p>
          </div>
          <div className="grid gap-4">
            {FAQS.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-slate-200 bg-white hover:border-blue-200 transition-colors shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 text-[17px] font-bold text-slate-900 marker:hidden">
                  {f.q}
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-500 transition-transform duration-300 group-open:rotate-180 group-open:bg-blue-50 group-open:text-blue-600">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 pt-2 text-[15.5px] leading-relaxed text-slate-600 border-t border-slate-100 mt-1 font-medium">
                  <p className="pt-4">{f.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
