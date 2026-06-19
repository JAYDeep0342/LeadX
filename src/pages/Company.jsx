import { Button, Eyebrow, SectionHead } from "../components/ui";
import { Target, Heart, Shield, Zap, Rocket, ArrowRight, Building } from "../components/icons";

const VALUES = [
  { icon: Target, title: "Customer obsession", desc: "Every feature starts with a real sales problem. If it doesn't help you close, it doesn't ship." },
  { icon: Shield, title: "Data you can trust", desc: "Clean, deduplicated, accurate records. We'd rather return fewer leads than wrong ones." },
  { icon: Zap, title: "Speed as a feature", desc: "Seconds, not hours. A fast tool is a tool people actually use every day." },
  { icon: Heart, title: "Built with care", desc: "Thoughtful engineering and honest support — the way good software should be made." },
];

const MILESTONES = [
  { yr: "2023", title: "BDM Infotech founded", desc: "A small team set out to build practical data tools for growing businesses." },
  { yr: "2024", title: "LeadScout takes shape", desc: "The Google Maps scraping engine moves from internal tool to full product." },
  { yr: "2025", title: "Spring Boot platform", desc: "A hardened, JWT-secured backend powers reliable scraping at scale." },
  { yr: "2026", title: "2.5M+ leads delivered", desc: "Teams across industries now run their pipelines on LeadScout." },
];

const TEAM = [
  { name: "Jaydip Parmar", role: "Founder & Engineering", init: "JP" },
  { name: "Ananya Rao", role: "Product Lead", init: "AR" },
  { name: "Karan Shah", role: "Backend Engineer", init: "KS" },
  { name: "Neha Verma", role: "Customer Success", init: "NV" },
];

const STATS = [
  { num: "2.5M+", lbl: "Leads delivered" },
  { num: "1,200+", lbl: "Active teams" },
  { num: "40+", lbl: "Countries" },
  { num: "4.9/5", lbl: "Avg. rating" },
];

export default function Company({ onNavigate }) {
  return (
    <>
      {/* Page header */}
      <section className="relative overflow-hidden bg-dark py-24 text-center text-white">
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(600px_360px_at_50%_0%,#000,transparent_75%)]" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[600px] -translate-x-1/2 rounded-full bg-brand-500/30 blur-[120px]" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Eyebrow dark><Building size={14} /> Company</Eyebrow>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl">
            We help teams find their <span className="text-gradient">next customer</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-300">
            LeadScout is built by BDM Infotech — a team obsessed with turning messy public data into clean, actionable sales pipelines.
          </p>
        </div>
      </section>

      {/* Story + milestones */}
      <section className="py-24">
        <div className="mx-auto grid max-w-[1180px] items-center gap-14 px-6 lg:grid-cols-2">
          <div>
            <Eyebrow>Our story</Eyebrow>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              From a side tool to a sales platform
            </h2>
            <p className="mt-4 text-[16.5px] text-slate-500">
              We kept watching sales teams burn hours copy-pasting business details off Google Maps,
              one listing at a time. So we built a tool to do it instantly — and do it cleanly.
            </p>
            <p className="mt-4 text-[16.5px] text-slate-500">
              Today LeadScout turns a single search into a fully enriched, export-ready lead list. Our
              mission is simple: give every team a fair shot at reaching their market.
            </p>
            <div className="mt-7">
              <Button onClick={() => onNavigate("contact")}>
                Work with us <ArrowRight size={18} />
              </Button>
            </div>
          </div>

          <div className="grid gap-5">
            {MILESTONES.map((m) => (
              <div key={m.yr} className="flex gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="text-lg font-extrabold text-brand-600">{m.yr}</div>
                <div>
                  <h4 className="font-bold text-ink">{m.title}</h4>
                  <p className="mt-1 text-[14.5px] text-slate-500">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-[1180px] px-6">
          <SectionHead eyebrow="What we value" title="The principles behind the product" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div key={v.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-7 shadow-sm">
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <v.icon size={22} />
                </div>
                <h3 className="text-lg font-bold text-ink">{v.title}</h3>
                <p className="mt-2 text-[14.5px] text-slate-500">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stat band */}
      <section className="py-24">
        <div className="mx-auto max-w-[1180px] px-6">
          <div className="rounded-3xl bg-dark px-8 py-14 text-white sm:px-14">
            <div className="grid grid-cols-2 gap-10 text-center lg:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.lbl}>
                  <div className="text-gradient text-4xl font-extrabold sm:text-5xl">{s.num}</div>
                  <div className="mt-1 text-sm text-slate-400">{s.lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-white pb-24">
        <div className="mx-auto max-w-[1180px] px-6">
          <SectionHead eyebrow="Our team" title="The people building LeadScout" />
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((t) => (
              <div key={t.name} className="text-center">
                <div className="mx-auto grid aspect-square w-full place-items-center rounded-2xl bg-gradient-to-br from-brand-500 via-violet-500 to-cyan-500 text-3xl font-extrabold text-white shadow-lg shadow-brand-500/30">
                  {t.init}
                </div>
                <h4 className="mt-4 text-[17px] font-bold text-ink">{t.name}</h4>
                <span className="text-sm text-slate-500">{t.role}</span>
              </div>
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
              <Rocket size={36} className="mx-auto mb-4 opacity-90" />
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Let's build your pipeline together</h2>
              <p className="mx-auto mt-3 max-w-xl text-lg text-white/90">
                Whether you're scaling a sales team or just getting started, we'd love to help.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button variant="light" size="lg" onClick={() => onNavigate("contact")}>
                  Get in touch
                </Button>
                <Button variant="outlineLight" size="lg" onClick={() => onNavigate("service")}>
                  Explore services
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
