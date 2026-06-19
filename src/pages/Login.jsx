import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { Button, Spinner } from "../components/ui";
import { MapPin, Check, Zap, Shield, Database } from "../components/icons";

const PERKS = [
  { icon: Zap, text: "Scrape Google Maps leads in seconds" },
  { icon: Database, text: "13 enriched data points per lead" },
  { icon: Shield, text: "Secure, JWT-protected access" },
];

export default function Login({ onNavigate, initialMode = "login" }) {
  const { login } = useAuth();
  const [mode, setMode] = useState(initialMode);
  const [form, setForm] = useState({ name: "", email: "", username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isSignup = mode === "signup";
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const switchMode = (m) => {
    setMode(m);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isSignup) {
        await api.signup({
          username: form.username,
          password: form.password,
          name: form.name,
          email: form.email,
        });
      }
      // Both signup and login finish by logging the user in to get a JWT.
      const res = await api.login({ username: form.username, password: form.password });
      login(res, form.username);
      onNavigate("dashboard");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="grid min-h-[calc(100vh-72px)] lg:grid-cols-2">
      {/* Left brand panel */}
      <div className="relative hidden overflow-hidden bg-aurora p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="pointer-events-none absolute -right-16 top-10 h-72 w-72 animate-float rounded-full bg-brand-500/30 blur-[90px]" />
        <div className="pointer-events-none absolute bottom-10 -left-10 h-64 w-64 animate-float-slow rounded-full bg-cyan-500/20 blur-[90px]" />

        <button onClick={() => onNavigate("home")} className="relative flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-500 via-violet-500 to-cyan-500 shadow-lg">
            <MapPin size={22} />
          </span>
          <span className="text-xl font-extrabold tracking-tight">LeadScout</span>
        </button>

        <div className="relative">
          <h2 className="text-4xl font-extrabold leading-tight tracking-tight">
            Turn the map into your <span className="text-gradient">pipeline</span>
          </h2>
          <p className="mt-4 max-w-md text-lg text-slate-300">
            Find, enrich and export local business leads — all from a single search.
          </p>
          <ul className="mt-8 grid gap-4">
            {PERKS.map((p) => (
              <li key={p.text} className="flex items-center gap-3 text-slate-200">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 text-cyan-300">
                  <p.icon size={18} />
                </span>
                {p.text}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-sm text-slate-400">© {new Date().getFullYear()} BDM Infotech · LeadScout</p>
      </div>

      {/* Right form */}
      <div className="flex items-center justify-center bg-slate-50 px-6 py-14">
        <div className="w-full max-w-md animate-pop">
          <div className="mb-7 text-center lg:hidden">
            <button onClick={() => onNavigate("home")} className="inline-flex items-center gap-2 text-lg font-extrabold text-ink">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-cyan-500 text-white">
                <MapPin size={18} />
              </span>
              LeadScout
            </button>
          </div>

          {/* Tab switch */}
          <div className="mb-7 grid grid-cols-2 gap-1 rounded-xl bg-slate-200/70 p-1">
            {[
              { id: "login", label: "Sign in" },
              { id: "signup", label: "Create account" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => switchMode(t.id)}
                className={`rounded-lg py-2.5 text-sm font-semibold transition-all ${
                  mode === t.id ? "bg-white text-brand-600 shadow-sm" : "text-slate-500 hover:text-ink"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight text-ink">
            {isSignup ? "Create your account" : "Welcome back"}
          </h1>
          <p className="mt-1 text-[15px] text-slate-500">
            {isSignup ? "Start scraping leads in under a minute." : "Sign in to your LeadScout dashboard."}
          </p>

          {error && (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {isSignup && (
              <>
                <Field label="Full name">
                  <input required value={form.name} onChange={set("name")} placeholder="Jane Cooper" className={inputCls} />
                </Field>
                <Field label="Email">
                  <input required type="email" value={form.email} onChange={set("email")} placeholder="jane@company.com" className={inputCls} />
                </Field>
              </>
            )}
            <Field label="Username">
              <input required value={form.username} onChange={set("username")} placeholder="janecooper" autoComplete="username" className={inputCls} />
            </Field>
            <Field label="Password">
              <input required type="password" value={form.password} onChange={set("password")} placeholder="••••••••" autoComplete={isSignup ? "new-password" : "current-password"} className={inputCls} />
            </Field>

            <Button type="submit" size="lg" className="mt-2 w-full" disabled={loading}>
              {loading ? (
                <>
                  <Spinner /> {isSignup ? "Creating account…" : "Signing in…"}
                </>
              ) : (
                <>
                  {isSignup ? "Create account" : "Sign in"} <Check size={18} />
                </>
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            {isSignup ? "Already have an account?" : "New to LeadScout?"}{" "}
            <button onClick={() => switchMode(isSignup ? "login" : "signup")} className="font-semibold text-brand-600 hover:underline">
              {isSignup ? "Sign in" : "Create one"}
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-ink outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15";

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-ink-soft">{label}</span>
      {children}
    </label>
  );
}
