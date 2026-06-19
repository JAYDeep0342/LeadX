// Small reusable presentational helpers shared across pages.
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "./icons";

const VARIANTS = {
  primary:
    "text-white bg-gradient-to-br from-brand-500 via-violet-500 to-cyan-500 shadow-lg shadow-brand-500/40 hover:-translate-y-0.5 hover:shadow-brand-500/60",
  ghost:
    "text-ink bg-white border border-slate-200 shadow-sm hover:-translate-y-0.5 hover:border-brand-500 hover:text-brand-600",
  light:
    "text-ink bg-white hover:-translate-y-0.5 hover:shadow-lg",
  outlineLight:
    "text-white border border-white/30 hover:bg-white/10 hover:-translate-y-0.5",
};

const SIZES = {
  md: "px-6 py-3 text-[15px]",
  lg: "px-7 py-4 text-base",
};

export function Button({ variant = "primary", size = "md", className = "", children, disabled, ...props }) {
  return (
    <button
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function Eyebrow({ children, dark = false }) {
  return (
    <span
      className={
        dark
          ? "inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-brand-100"
          : "inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-brand-600"
      }
    >
      {children}
    </span>
  );
}

export function SectionHead({ eyebrow, title, subtitle, className = "" }) {
  return (
    <Reveal className={`mx-auto mb-14 max-w-2xl text-center ${className}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-4 text-lg text-slate-500">{subtitle}</p>}
    </Reveal>
  );
}

export function ArrowLink({ children, onClick }) {
  return (
    <button onClick={onClick} className="group inline-flex items-center gap-2 font-semibold text-brand-600">
      {children}
      <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
    </button>
  );
}

/* Animated loading spinner */
export function Spinner({ size = 18, className = "" }) {
  return (
    <svg className={`animate-spin ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
      <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/* Scroll-triggered reveal — fades + slides children in once they enter the viewport */
export function Reveal({ children, delay = 0, className = "", as: Tag = "div" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"} ${className}`}
    >
      {children}
    </Tag>
  );
}
