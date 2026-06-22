import { useState, useEffect, useRef } from "react";
import { Star, Users, Search } from "../components/icons";
import { Reveal } from "../components/ui";
import { useAuth } from "../context/AuthContext";

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

// Only Google Maps Scraper is active ("chalu"). The rest are # placeholders.
const ACTORS = [
  {
    id: "google-maps",
    name: "Google Maps Scraper",
    slug: "bdm/google-maps-scraper",
    desc: "Extract leads from thousands of Google Maps locations and businesses — names, ratings, reviews, phone, website, emails and social profiles.",
    author: "BDM Infotech",
    rating: "4.8",
    reviews: "1,501",
    users: "460K",
    color: "from-emerald-400 to-cyan-500",
    letter: "G",
    active: true,
  },
  { id: "tiktok", name: "TikTok Scraper", slug: "clockworks/tiktok-scraper", desc: "Extract data from TikTok videos, hashtags, and users. Scrape profiles, hashtags and trends at scale.", author: "Clockworks", rating: "4.8", reviews: "313", users: "198K", color: "from-slate-700 to-slate-900", letter: "T" },
  { id: "instagram", name: "Instagram Scraper", slug: "bdm/instagram-scraper", desc: "Scrape and download Instagram posts, profiles, places, hashtags, photos and comments.", author: "BDM Infotech", rating: "4.7", reviews: "450", users: "299K", color: "from-pink-500 to-orange-400", letter: "I" },
  { id: "website", name: "Website Content Crawler", slug: "bdm/website-content-crawler", desc: "Crawl websites and extract text content to feed AI models, LLM apps, vector databases or RAG pipelines.", author: "BDM Infotech", rating: "4.6", reviews: "205", users: "133K", color: "from-violet-500 to-indigo-500", letter: "W" },
  { id: "ecommerce", name: "E-commerce Scraping Tool", slug: "bdm/e-commerce-scraping-tool", desc: "Scrape data from e-commerce websites. Pull products, prices and stock from almost any retail site in minutes.", author: "BDM Infotech", rating: "4.5", reviews: "44", users: "11K", color: "from-rose-500 to-red-500", letter: "E" },
  { id: "facebook", name: "Facebook Posts Scraper", slug: "bdm/facebook-posts-scraper", desc: "Extract posts, videos and engagement metrics from Facebook pages. Get captions, reactions and more.", author: "BDM Infotech", rating: "4.6", reviews: "184", users: "80K", color: "from-blue-500 to-blue-700", letter: "F" },
];

export default function Actors({ onNavigate }) {
  const { username } = useAuth();

  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden bg-[#04050e] pt-[20px]">
      <UniverseCanvas />
      <div className="absolute top-0 left-0 w-full h-full bg-grid [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-20 z-[1]" />

      <div className="relative z-10 mx-auto max-w-[1250px] px-6 lg:px-8 pb-12">
        {/* Header */}
        <div className="mb-8">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h1 className="text-[46px] sm:text-[54px] font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-100 to-white/50 drop-shadow-xl leading-tight">
                  Data Extraction <br className="hidden lg:block" /> Engines
                </h1>
              </div>

              <div className="flex w-full max-w-sm items-center gap-3 rounded-full border border-white/20 bg-white/[0.03] backdrop-blur-xl px-5 py-3.5 text-white/50 shadow-[0_0_20px_rgba(109,94,252,0.1)] focus-within:border-brand-400 focus-within:shadow-[0_0_30px_rgba(109,94,252,0.3)] transition-all">
                <Search size={20} className="text-white/70" />
                <input
                  type="text"
                  placeholder="Search 1,000+ actors…"
                  className="w-full bg-transparent outline-none text-white placeholder-white/40 font-medium text-[15px]"
                />
              </div>
            </div>
          </Reveal>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ACTORS.map((a, i) => (
            <Reveal key={a.id} delay={i * 80}>
              <ActorCard actor={a} onOpen={() => a.active && onNavigate("console")} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ActorCard({ actor, onOpen }) {
  const base = "group flex h-full flex-col rounded-[24px] border p-7 transition-all duration-300 relative overflow-hidden backdrop-blur-2xl";
  const active = "border-white/20 bg-white/[0.04] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] hover:-translate-y-1.5 hover:border-brand-400 hover:bg-white/[0.06] hover:shadow-[0_15px_50px_-10px_rgba(109,94,252,0.3)] cursor-pointer";
  const disabled = "border-white/10 bg-white/[0.02] opacity-70 grayscale-[30%]";

  const Wrapper = actor.active ? "button" : "a";
  const wrapperProps = actor.active
    ? { onClick: onOpen, type: "button" }
    : { href: "#", onClick: (e) => e.preventDefault() };

  return (
    <Wrapper {...wrapperProps} className={`${base} ${actor.active ? active : disabled} text-left`}>
      {/* Decorative Gradient Blob for active cards */}
      {actor.active && (
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-500/20 rounded-full blur-[40px] pointer-events-none group-hover:bg-brand-500/40 transition-all duration-500"></div>
      )}

      <div className="flex items-start justify-between relative z-10">
        <span className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${actor.color} text-xl font-extrabold text-white shadow-lg shadow-black/20`}>
          {actor.letter}
        </span>
        {actor.active ? (
          <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-3 py-1.5 text-[12px] font-extrabold text-emerald-400 uppercase tracking-wider shadow-[0_0_15px_rgba(16,185,129,0.3)]">Available</span>
        ) : (
          <span className="rounded-full bg-white/10 border border-white/10 px-3 py-1.5 text-[12px] font-bold text-white/50 uppercase tracking-wider">Soon</span>
        )}
      </div>

      <h3 className="mt-6 text-[22px] font-bold text-white relative z-10">{actor.name}</h3>
      <p className="text-[13px] font-medium text-brand-300 mt-1 relative z-10">{actor.slug}</p>
      <p className="mt-4 flex-1 text-[15px] leading-relaxed text-white/60 relative z-10">{actor.desc}</p>

      <div className="mt-6 flex items-center gap-4 border-t border-white/10 pt-5 text-[14px] text-white/50 relative z-10">
        <span className="font-semibold text-white/80">{actor.author}</span>
        <span className="ml-auto inline-flex items-center gap-1.5 text-orange-400 font-bold">
          <Star size={15} fill="currentColor" /> <span>{actor.rating}</span>
          <span className="text-white/40 font-medium">({actor.reviews})</span>
        </span>
        <span className="inline-flex items-center gap-1.5 text-white/50 font-medium">
          <Users size={15} /> {actor.users}
        </span>
      </div>
    </Wrapper>
  );
}
