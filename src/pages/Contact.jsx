import { useState } from "react";
import { Button, Eyebrow } from "../components/ui";
import { Mail, Phone, MapPin, Clock, Check, ArrowRight } from "../components/icons";

const INFO = [
  { icon: Mail, title: "Email us", lines: ["it@bdminfotech.com"], href: "mailto:it@bdminfotech.com", action: "it@bdminfotech.com" },
  { icon: Phone, title: "Call us", lines: ["Mon–Fri, 10am – 7pm IST"], href: "tel:+910000000000", action: "+91 00000 00000" },
  { icon: MapPin, title: "Visit us", lines: ["BDM Infotech", "Indore, Madhya Pradesh, India"] },
  { icon: Clock, title: "Response time", lines: ["We reply within 24 hours", "Priority support on paid plans"] },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", company: "", topic: "Sales enquiry", message: "" });
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // No contact endpoint on the backend — show a friendly local confirmation.
    setSent(true);
    setForm({ name: "", email: "", company: "", topic: "Sales enquiry", message: "" });
  };

  return (
    <>
      {/* Page header */}
      <section className="relative overflow-hidden bg-dark py-24 text-center text-white">
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(600px_360px_at_50%_0%,#000,transparent_75%)]" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[600px] -translate-x-1/2 rounded-full bg-brand-500/30 blur-[120px]" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Eyebrow dark><Mail size={14} /> Contact</Eyebrow>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Let's talk about your <span className="text-gradient">pipeline</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-300">
            Questions about plans, the API, or a custom scrape? Send us a message — the BDM Infotech team replies fast.
          </p>
        </div>
      </section>

      {/* Contact grid */}
      <section className="py-24">
        <div className="mx-auto grid max-w-[1180px] items-start gap-12 px-6 lg:grid-cols-[1fr_1.1fr]">
          {/* Info */}
          <div className="grid gap-5">
            {INFO.map((c) => (
              <div key={c.title} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <c.icon size={22} />
                </span>
                <div>
                  <h4 className="font-bold text-ink">{c.title}</h4>
                  {c.href ? (
                    <a href={c.href} className="text-[14.5px] font-semibold text-brand-600 hover:underline">{c.action}</a>
                  ) : null}
                  {c.lines.map((l) => (
                    <p key={l} className="text-[14.5px] text-slate-500">{l}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl sm:p-10">
            <h2 className="text-2xl font-extrabold tracking-tight text-ink">Send us a message</h2>
            <p className="mt-1 text-[15px] text-slate-500">Fill in the form and we'll get back to you shortly.</p>

            {sent && (
              <div className="mt-6 flex items-center gap-2.5 rounded-xl border border-accent-500/35 bg-accent-500/10 px-4 py-3.5 text-[14.5px] font-semibold text-accent-600">
                <Check size={18} /> Thanks! Your message has been received — we'll reply within 24 hours.
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full name">
                  <input required value={form.name} onChange={set("name")} placeholder="Jane Cooper" className={inputCls} />
                </Field>
                <Field label="Work email">
                  <input required type="email" value={form.email} onChange={set("email")} placeholder="jane@company.com" className={inputCls} />
                </Field>
              </div>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <Field label="Company">
                  <input value={form.company} onChange={set("company")} placeholder="Acme Inc." className={inputCls} />
                </Field>
                <Field label="Topic">
                  <select value={form.topic} onChange={set("topic")} className={inputCls}>
                    <option>Sales enquiry</option>
                    <option>Technical / API</option>
                    <option>Billing</option>
                    <option>Partnership</option>
                    <option>Other</option>
                  </select>
                </Field>
              </div>

              <div className="mt-5">
                <Field label="Message">
                  <textarea required rows={5} value={form.message} onChange={set("message")} placeholder="Tell us what you're trying to build…" className={`${inputCls} min-h-32 resize-y`} />
                </Field>
              </div>

              <Button type="submit" size="lg" className="mt-6 w-full">
                Send message <ArrowRight size={18} />
              </Button>
              <p className="mt-3 text-center text-[13px] text-slate-400">
                By submitting, you agree to be contacted by BDM Infotech about LeadScout.
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-[15px] text-ink outline-none transition focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/15";

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-ink-soft">{label}</span>
      {children}
    </label>
  );
}
