import { useState, useEffect, useRef } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { Mail } from "../components/icons";
import { Spinner } from "../components/ui";

/* ── Inline SVG ─────────────────────────────────────────────── */
const Lock = ({ size = 24, className = "", ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...p}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

/* ── UniverseCanvas ─────────────────────────────────────── */
function UniverseCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId, W, H, lastTime = 0;
    let particles = [];
    let cachedG1, cachedG2;

    const buildGradients = () => {
      cachedG1 = ctx.createRadialGradient(W*0.2, H*0.2, 0, W*0.2, H*0.2, W*0.5);
      cachedG1.addColorStop(0, "rgba(45, 30, 150, 0.08)"); cachedG1.addColorStop(1, "transparent");
      cachedG2 = ctx.createRadialGradient(W*0.8, H*0.8, 0, W*0.8, H*0.8, W*0.5);
      cachedG2.addColorStop(0, "rgba(20, 150, 220, 0.06)"); cachedG2.addColorStop(1, "transparent");
    };
    const resize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      buildGradients();
      initParticles();
    };
    window.addEventListener("resize", resize);
    const initParticles = () => {
      particles = [];
      const count = Math.floor((W * H) / 14000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * W, y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
          r: 1 + Math.random() * 1.5, alpha: 0.2 + Math.random() * 0.5
        });
      }
    };
    resize();
    const MAX_DIST_SQ = 140 * 140;
    const draw = (timestamp) => {
      animId = requestAnimationFrame(draw);
      if (timestamp - lastTime < 32) return; // ~30fps cap
      lastTime = timestamp;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#04050e"; ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = cachedG1; ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = cachedG2; ctx.fillRect(0, 0, W, H);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
          const distSq = dx * dx + dy * dy;
          if (distSq < MAX_DIST_SQ) {
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(167, 139, 250, ${(1 - Math.sqrt(distSq) / 140) * 0.15})`; ctx.lineWidth = 1; ctx.stroke();
          }
        }
      }
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`; ctx.fill();
      });
    };
    animId = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }} />;
}


/* ── Login Component ─────────────────────────────────────── */
export default function Login({ onNavigate, initialMode = "login" }) {
  const { login } = useAuth();
  const [mode, setMode] = useState(initialMode);
  const [form, setForm] = useState({ name: "", email: "", username: "", password: "", remember: true });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isSignup = mode === "signup";
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

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
    <section className="hero-universe relative min-h-[100dvh] flex items-center justify-center overflow-hidden w-full !pt-[100px] !pb-[40px]">
      <UniverseCanvas />
      <div className="hero-overlay-top" />
      <div className="hero-overlay-bottom" />
      <div className="absolute top-0 left-0 w-full h-full bg-grid [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-20 z-[1]" />

      <div className="relative mx-auto w-full max-w-[950px] px-6 z-10 flex items-center justify-center">
        
        {/* The SINGLE Large Glassy Frame */}
        <div className="w-full rounded-[2.5rem] border border-white/30 bg-[#0a0e1f]/60 backdrop-blur-3xl shadow-[0_0_60px_rgba(109,94,252,0.25),0_30px_80px_-15px_rgba(0,0,0,0.9)] relative overflow-hidden flex flex-col lg:flex-row ring-1 ring-white/10 animate-[rise_0.8s_ease_out_both]">
          
          {/* Left Side: Custom Generated Illustration */}
          <div className="flex-1 w-full hidden lg:flex flex-col items-center justify-center p-6 lg:p-8 relative z-10 bg-black/20">
            {/* Glowing Orange Middle Line */}
            <div className="absolute right-0 top-[5%] h-[90%] w-[1px] bg-gradient-to-b from-transparent via-orange-500 to-transparent shadow-[0_0_15px_rgba(249,115,22,0.9)] opacity-80"></div>
            
            <img src="/login-illustration.png" alt="Relaxing with laptop" loading="lazy" width="340" height="340" className="w-full max-w-[340px] drop-shadow-[0_0_40px_rgba(255,100,50,0.2)] animate-[float_6s_ease-in-out_infinite]" />
          </div>

          {/* Right Side: Form Area */}
          <div className="w-full lg:w-[450px] flex flex-col p-6 sm:p-8 z-10 shrink-0 bg-white/[0.02]">
          
          <h1 className="text-[32px] font-extrabold text-white text-center mb-6 tracking-tight drop-shadow-md">
            {isSignup ? "Register" : "Login"}
          </h1>

          {error && (
            <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-[14px] font-medium text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            
            {isSignup && (
              <div className="relative">
                <input required value={form.name} onChange={set("name")} placeholder="Full Name" className="w-full bg-transparent border-b-2 border-white/30 py-2.5 pr-10 text-[15px] text-white placeholder-white outline-none focus:border-white transition-colors" />
              </div>
            )}

            {isSignup && (
              <div className="relative">
                <input required type="email" value={form.email} onChange={set("email")} placeholder="Email" className="w-full bg-transparent border-b-2 border-white/30 py-2.5 pr-10 text-[15px] text-white placeholder-white outline-none focus:border-white transition-colors" />
                <Mail size={18} className="absolute right-2 top-3 text-white" />
              </div>
            )}

            <div className="relative">
              <input required value={form.username} onChange={set("username")} placeholder={isSignup ? "Username" : "Email"} autoComplete="username" className="w-full bg-transparent border-b-2 border-white/30 py-2.5 pr-10 text-[15px] text-white placeholder-white outline-none focus:border-white transition-colors" />
              <Mail size={18} className="absolute right-2 top-3 text-white" />
            </div>

            <div className="relative">
              <input required type="password" value={form.password} onChange={set("password")} placeholder="Password" autoComplete={isSignup ? "new-password" : "current-password"} className="w-full bg-transparent border-b-2 border-white/30 py-2.5 pr-10 text-[15px] text-white placeholder-white outline-none focus:border-white transition-colors" />
              <Lock size={18} className="absolute right-2 top-3 text-white" />
            </div>

            {!isSignup && (
              <div className="flex items-center justify-between text-[13px] font-medium mt-1">
                <label className="flex items-center gap-2 cursor-pointer text-white">
                  <input type="checkbox" checked={form.remember} onChange={set("remember")} className="accent-brand-500 w-3.5 h-3.5 rounded cursor-pointer" />
                  Remember Me
                </label>
                <button type="button" className="text-white hover:underline transition-colors">
                  Forget Password
                </button>
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="mt-2 w-full rounded-full bg-white px-4 py-3 text-[16px] font-extrabold text-[#04050e] shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {loading ? (
                <><Spinner /> {isSignup ? "Registering…" : "Logging in…"}</>
              ) : (
                <>{isSignup ? "Register" : "Login"}</>
              )}
            </button>
          </form>

          {/* ── OR Divider ───────────────────────────────── */}
          <div className="my-5 flex items-center gap-3">
            <div className="flex-1 h-[1px] bg-white/20" />
            <span className="text-[12px] font-semibold text-white/50 tracking-widest uppercase">or</span>
            <div className="flex-1 h-[1px] bg-white/20" />
          </div>

          {/* ── Google OAuth2 Button ──────────────────────── */}
          <a
            href="http://localhost:8080/oauth2/authorization/google"
            className="flex items-center justify-center gap-3 w-full rounded-full border border-white/20 bg-white/5 px-4 py-3 text-[15px] font-bold text-white shadow-[0_0_0px_rgba(255,255,255,0)] transition-all duration-300 hover:scale-[1.02] hover:bg-white/10 hover:border-white/40 hover:shadow-[0_0_25px_rgba(255,255,255,0.12)] no-underline"
          >
            {/* Google Colorful SVG Logo */}
            <svg width="20" height="20" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              <path fill="none" d="M0 0h48v48H0z"/>
            </svg>
            Continue with Google
          </a>

          {/* ── GitHub OAuth2 Button ──────────────────────── */}
          <a
            href="http://localhost:8080/oauth2/authorization/github"
            className="mt-3 flex items-center justify-center gap-3 w-full rounded-full border border-white/20 bg-white/5 px-4 py-3 text-[15px] font-bold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-white/10 hover:border-white/40 hover:shadow-[0_0_25px_rgba(255,255,255,0.12)] no-underline"
          >
            {/* GitHub White SVG Logo */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            Continue with GitHub
          </a>

          <div className="mt-6 text-center text-[14px] font-medium text-white">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <button onClick={() => switchMode(isSignup ? "login" : "signup")} className="font-extrabold hover:underline ml-1">
              {isSignup ? "Login" : "Register"}
            </button>
          </div>
          
        </div>
        </div>
      </div>
    </section>
  );
}
