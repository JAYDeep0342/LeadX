import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

/* ── Icons ─────────────────────────────────────────────── */
const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);
const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "solution", label: "Solutions" },
  { id: "service", label: "Service" },
  { id: "contact", label: "Contact" },
];

/* ── Main Navbar ─────────────────────────────────────────── */
export default function Navbar({ current, onNavigate }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthed, logout } = useAuth();

  /* scroll shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => { onNavigate(id); setMobileOpen(false); };

  return (
    <>
      <header className={`leadx-header${scrolled || current !== "home" ? " scrolled" : ""}`}>
        <div className="leadx-inner">

          {/* ── Brand / Logo ── */}
          <button className="leadx-brand" onClick={() => go("home")} aria-label="Go home">
            <div className="leadx-logo-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00BFFF" />
                    <stop offset="100%" stopColor="#8B00FF" />
                  </linearGradient>
                </defs>
                <path d="M12 2L3 7l9 5 9-5-9-5z" stroke="url(#logoGrad)" strokeWidth="2.5" strokeLinejoin="round" />
                <path d="M3 17l9 5 9-5M3 12l9 5 9-5" stroke="url(#logoGrad)" strokeWidth="2.5" strokeLinejoin="round" opacity="0.6" />
              </svg>
            </div>
            <span className="leadx-wordmark">
              <span className="leadx-name">LeadX</span>
            </span>
          </button>

          {/* ── Desktop Nav ── */}
          <nav className="leadx-nav" aria-label="Primary navigation">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                className={`nav-link${current === link.id ? " active" : ""}`}
                onClick={() => go(link.id)}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* ── Desktop CTA ── */}
          <div className="leadx-cta">
            {isAuthed ? (
              <>
                <button className="cta-ghost" onClick={() => go("dashboard")}>Dashboard</button>
                <button className="cta-outline" onClick={() => { logout(); go("home"); }}>Log out</button>
              </>
            ) : (
              <>
                <button className="cta-ghost" onClick={() => go("login")}>Sign in</button>
                <button className="cta-primary" onClick={() => go("signup")}>Get started</button>
              </>
            )}
          </div>

          {/* ── Mobile toggle ── */}
          <button
            className="mobile-toggle"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* ── Mobile menu ── */}
        <div className={`mobile-menu${mobileOpen ? " open" : ""}`}>
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              className={`mobile-link${current === link.id ? " active" : ""}`}
              onClick={() => go(link.id)}
            >
              {link.label}
            </button>
          ))}
          <div className="mobile-divider" />
          {isAuthed ? (
            <>
              <button className="mobile-link" onClick={() => go("dashboard")}>Dashboard</button>
              <button className="mobile-cta" onClick={() => { logout(); go("home"); }}>Log out</button>
            </>
          ) : (
            <>
              <button className="mobile-link" onClick={() => go("login")}>Sign in</button>
              <button className="mobile-cta" onClick={() => go("signup")}>Get started →</button>
            </>
          )}
        </div>
      </header>

    </>
  );
}
