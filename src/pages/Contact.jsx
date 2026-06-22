import { useState, useEffect, useRef } from "react";
import { Button, Eyebrow } from "../components/ui";
import { Mail, Phone, MapPin, Clock, Check, ArrowRight } from "../components/icons";

/* ── Premium SaaS Constellation Canvas ────────────────────── */
function UniverseCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let W, H;
    let particles = [];

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      initParticles();
    };
    window.addEventListener("resize", resize);

    const initParticles = () => {
      particles = [];
      const count = Math.floor((W * H) / 12000); 
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.3, 
          vy: (Math.random() - 0.5) * 0.3,
          r: 1 + Math.random() * 1.5,
          alpha: 0.2 + Math.random() * 0.5
        });
      }
    };

    resize();

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      ctx.fillStyle = "#04050e";
      ctx.fillRect(0, 0, W, H);

      const g1 = ctx.createRadialGradient(W*0.2, H*0.2, 0, W*0.2, H*0.2, W*0.5);
      g1.addColorStop(0, "rgba(45, 30, 150, 0.08)");
      g1.addColorStop(1, "transparent");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, W, H);

      const g2 = ctx.createRadialGradient(W*0.8, H*0.8, 0, W*0.8, H*0.8, W*0.5);
      g2.addColorStop(0, "rgba(20, 150, 220, 0.06)");
      g2.addColorStop(1, "transparent");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, W, H);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const alpha = (1 - dist / 140) * 0.15;
            ctx.strokeStyle = `rgba(167, 139, 250, ${alpha})`; 
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.fill();
        
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(167, 139, 250, 0.4)";
      });
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute", inset: 0, width: "100%", height: "100%",
        display: "block",
      }}
    />
  );
}


export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", company: "", topic: "Sales enquiry", message: "" });
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js";
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await fetch("https://formsubmit.co/ajax/jaydeep0342@gmail.com", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: form.name,
            email: form.email,
            company: form.company,
            topic: form.topic,
            message: form.message,
            _subject: `New LeadX Contact: ${form.topic} from ${form.name}`,
            _template: "table"
        })
      });
      setSent(true);
      setForm({ name: "", email: "", company: "", topic: "Sales enquiry", message: "" });
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Contact Layout */}
      <section className="hero-universe relative min-h-screen flex items-center justify-center overflow-hidden w-full">
        
        {/* Animated Background from Home */}
        <UniverseCanvas />
        
        {/* Gradient overlays from Home */}
        <div className="hero-overlay-top" />
        <div className="hero-overlay-bottom" />
        
        <div className="absolute top-0 left-0 w-full h-full bg-grid [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-20 z-[1]" />
        
        <div className="relative mx-auto max-w-[850px] px-6 lg:px-8 w-full z-10 hero-content">
          
          {/* Main Unified Card - Transparent & Smaller */}
          <div className="rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_30px_80px_-15px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col lg:flex-row w-full text-left">
            
            {/* Left Side: Title & 3D Animation */}
            <div className="flex-1 p-6 sm:p-8 pb-0 lg:pb-8 flex flex-col relative z-10 lg:border-r border-white/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-500/20 text-brand-400 border border-brand-500/30 shadow-[0_0_15px_rgba(109,94,252,0.3)]">
                  <Mail size={20} />
                </div>
                <h2 className="text-[28px] font-extrabold tracking-tight text-white">Contact Us</h2>
              </div>
              
              <div className="flex-1 w-full flex items-center justify-center min-h-[250px] lg:min-h-[300px]">
                <model-viewer 
                  class="w-full h-full min-h-[250px]"
                  alt="laptop" 
                  src="https://raw.githubusercontent.com/Smit-Prajapati/prajapatismit/b5f434ae4d45d10fe1664d5606ad28e4d9c739af/images/laptop.glb" 
                  shadow-intensity="1"  
                  camera-controls 
                  touch-action="pan-y"  
                  environment-image="https://raw.githubusercontent.com/Smit-Prajapati/prajapatismit/b5f434ae4d45d10fe1664d5606ad28e4d9c739af/images/dancing_hall_2k.hdr" 
                  exposure="1.5"   
                  disable-zoom 
                  disable-tap  
                  camera-orbit="-45deg 60deg 9m" 
                  autoplay
                  auto-rotate
                  rotation-per-second="30deg"
                ></model-viewer>
              </div>
            </div>

            {/* Right Side: Form fields */}
            <div className="flex-1 p-6 sm:p-8 relative z-10 bg-[#06080f]/50">
              <p className="text-[14px] text-slate-400 font-medium mb-5">Fill in the form and we'll get back to you shortly.</p>

              {sent && (
                <div className="mb-5 flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-[14px] font-bold text-emerald-400 shadow-sm">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                    <Check size={14} strokeWidth={3} />
                  </div>
                  Message received! We'll reply within 24 hours.
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Full name">
                      <input required value={form.name} onChange={set("name")} placeholder="Jane Cooper" className={inputCls} />
                    </Field>
                    <Field label="Work email">
                      <input required type="email" value={form.email} onChange={set("email")} placeholder="jane@company.com" className={inputCls} />
                    </Field>
                  </div>

                  <Field label="Topic">
                    <select value={form.topic} onChange={set("topic")} className={inputCls}>
                      <option className="bg-[#0a0e1f] text-white">Sales enquiry</option>
                      <option className="bg-[#0a0e1f] text-white">Technical / API</option>
                      <option className="bg-[#0a0e1f] text-white">Partnership</option>
                      <option className="bg-[#0a0e1f] text-white">Other</option>
                    </select>
                  </Field>

                  <Field label="Message">
                    <textarea required rows={3} value={form.message} onChange={set("message")} placeholder="Tell us what you're trying to build…" className={`${inputCls} min-h-[80px] resize-y`} />
                  </Field>
                </div>

                <div className="mt-6 flex gap-3">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="flex-[2] rounded-full bg-white px-4 py-2.5 text-[14px] font-bold text-[#04050e] shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isSubmitting ? "Sending..." : "Send message"}
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setForm({ name: "", email: "", company: "", topic: "Sales enquiry", message: "" })}
                    className="flex-1 rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-[14px] font-bold text-white shadow-sm transition-all hover:bg-white/10 hover:border-white/40"
                  >
                    Reset
                  </button>
                </div>
                
                <p className="mt-4 text-center text-[12px] font-medium text-slate-500">
                  By submitting, you agree to be contacted by LeadX.
                </p>
              </form>
            </div>
            
          </div>
        </div>
      </section>
    </>
  );
}

const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-[15px] font-medium text-white outline-none transition-all focus:border-brand-500 focus:bg-white/10 focus:ring-4 focus:ring-brand-500/20 placeholder:text-slate-500";

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[14px] font-bold text-slate-300">{label}</span>
      {children}
    </label>
  );
}
