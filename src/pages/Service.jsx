import { Button, Eyebrow, SectionHead } from "../components/ui";
import {
  Search, Mail, Database, Download, Filter, Code, Clock,
  Check, ArrowRight, Zap, Target,
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

const PLANS = [
  {
    name: "Starter", price: "₹0", per: "/mo", blurb: "Perfect for trying things out",
    features: ["500 leads / month", "Up to 5 fields per lead", "CSV export", "Community support"],
    cta: "Start free", featured: false,
  },
  {
    name: "Growth", price: "₹2,499", per: "/mo", blurb: "For growing sales teams",
    features: ["25,000 leads / month", "All 13 data points", "Email & social discovery", "Saved job history", "Priority support"],
    cta: "Get started", featured: true,
  },
  {
    name: "Scale", price: "Custom", per: "", blurb: "For high-volume teams",
    features: ["Unlimited leads", "Full REST API access", "CRM integrations", "Dedicated account manager", "SLA & onboarding"],
    cta: "Talk to sales", featured: false,
  },
];

const FAQS = [
  { q: "Where does the data come from?", a: "LeadScout searches public Google Maps listings for your keyword and location, then visits each business website to enrich the record with emails and social links." },
  { q: "Which fields do I get for each lead?", a: "Name, category, rating, reviews, address, phone, website, emails, social links, plus code, latitude, longitude and the Google Maps URL — 13 fields in total." },
  { q: "Can I use the API directly?", a: "Yes. The Growth and Scale plans expose a REST endpoint secured with JWT, so you can trigger scrapes and pull results programmatically from your own apps." },
  { q: "Is there a free plan?", a: "Absolutely — the Starter plan lets you scrape up to 500 leads a month at no cost, with no credit card required." },
];

export default function Service({ onNavigate }) {
  return (
    <>
      {/* Page header */}
      <section className="relative overflow-hidden bg-dark py-24 text-center text-white">
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(600px_360px_at_50%_0%,#000,transparent_75%)]" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[600px] -translate-x-1/2 rounded-full bg-brand-500/30 blur-[120px]" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Eyebrow dark><Zap size={14} /> Services</Eyebrow>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Everything from search to <span className="text-gradient">sales-ready</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-300">
            One platform to find, enrich and export local business leads — built on a robust Spring Boot backend by BDM Infotech.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-24">
        <div className="mx-auto max-w-[1180px] px-6">
          <SectionHead eyebrow="What we offer" title="A complete lead-generation toolkit" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <div key={s.title} className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-200 hover:-translate-y-1.5 hover:border-brand-500/40 hover:shadow-xl">
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-gradient-to-br group-hover:from-brand-500 group-hover:to-cyan-500 group-hover:text-white">
                  <s.icon size={22} />
                </div>
                <h3 className="text-xl font-bold text-ink">{s.title}</h3>
                <p className="mt-2 text-[15px] text-slate-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Split: what's included */}
      <section className="bg-white py-24">
        <div className="mx-auto grid max-w-[1180px] items-center gap-14 px-6 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-500 via-violet-500 to-cyan-500 p-10 text-white shadow-2xl shadow-brand-500/40">
            <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-white/20 blur-3xl" />
            <Clock size={34} className="relative mb-4" />
            <div className="relative text-5xl font-extrabold">8 sec</div>
            <p className="relative mt-2 text-white/90">average time to a fully enriched lead table</p>
            <div className="relative mt-8 grid grid-cols-2 gap-4">
              {[
                { n: "13", l: "fields / lead" },
                { n: "100%", l: "de-duplicated" },
                { n: "CSV", l: "instant export" },
                { n: "JWT", l: "secure access" },
              ].map((x) => (
                <div key={x.l} className="rounded-xl bg-white/10 p-4">
                  <div className="text-2xl font-extrabold">{x.n}</div>
                  <div className="text-xs text-white/80">{x.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Eyebrow>Included in every plan</Eyebrow>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Clean data, zero busywork
            </h2>
            <p className="mt-4 text-lg text-slate-500">
              Every scrape returns structured, deduplicated records you can trust — so your team spends time selling, not cleaning spreadsheets.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {INCLUDED.map((t) => (
                <li key={t} className="flex items-start gap-3 text-[15px] text-ink-soft">
                  <span className="mt-0.5 grid h-6 w-6 place-items-center rounded-md bg-accent-500/15 text-accent-600">
                    <Check size={15} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24">
        <div className="mx-auto max-w-[1180px] px-6">
          <SectionHead eyebrow="Pricing" title="Simple plans that scale with you" subtitle="Start free, upgrade when your pipeline does. No hidden fees." />
          <div className="grid items-stretch gap-6 lg:grid-cols-3">
            {PLANS.map((p) => (
              <div
                key={p.name}
                className={`relative flex flex-col rounded-2xl p-8 shadow-sm transition-all duration-200 hover:-translate-y-1.5 ${
                  p.featured ? "bg-dark text-white shadow-2xl shadow-brand-700/40" : "border border-slate-200 bg-white"
                }`}
              >
                {p.featured && (
                  <span className="absolute right-5 top-5 rounded-full bg-gradient-to-br from-brand-500 to-cyan-500 px-3 py-1 text-xs font-bold">
                    Most popular
                  </span>
                )}
                <span className={`text-xs font-bold uppercase tracking-wider ${p.featured ? "text-brand-300" : "text-brand-600"}`}>
                  {p.name}
                </span>
                <div className="mt-3 flex items-end gap-1">
                  <span className="text-4xl font-extrabold tracking-tight">{p.price}</span>
                  <span className={`pb-1 text-base font-semibold ${p.featured ? "text-slate-400" : "text-slate-500"}`}>{p.per}</span>
                </div>
                <div className={`mt-1 text-sm font-semibold ${p.featured ? "text-slate-300" : "text-slate-500"}`}>{p.blurb}</div>
                <ul className="mt-6 grid flex-1 gap-3">
                  {p.features.map((f) => (
                    <li key={f} className={`flex items-start gap-2.5 text-[14.5px] ${p.featured ? "text-slate-300" : "text-ink-soft"}`}>
                      <Check size={17} className="mt-0.5 shrink-0 text-accent-500" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={p.featured ? "light" : "ghost"}
                  className="mt-7 w-full"
                  onClick={() => onNavigate(p.name === "Scale" ? "contact" : "signup")}
                >
                  {p.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-[1180px] px-6">
          <SectionHead eyebrow="FAQ" title="Questions, answered" />
          <div className="mx-auto grid max-w-3xl gap-3.5">
            {FAQS.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-slate-200 bg-slate-50 px-6 shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[16.5px] font-semibold text-ink marker:hidden">
                  {f.q}
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white text-xl font-light text-brand-600 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="pb-5 text-[15px] text-slate-500">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="mx-auto max-w-[1180px] px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-500 via-violet-500 to-cyan-500 px-8 py-16 text-center text-white">
            <div className="absolute left-1/2 top-0 h-64 w-[600px] -translate-x-1/2 rounded-full bg-white/20 blur-3xl" />
            <div className="relative">
              <Target size={36} className="mx-auto mb-4 opacity-90" />
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Put the toolkit to work</h2>
              <p className="mx-auto mt-3 max-w-xl text-lg text-white/90">
                Spin up your first scrape in minutes and see how fast a clean pipeline comes together.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button variant="light" size="lg" onClick={() => onNavigate("signup")}>
                  Start free <ArrowRight size={18} />
                </Button>
                <Button variant="outlineLight" size="lg" onClick={() => onNavigate("company")}>
                  Meet the team
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
