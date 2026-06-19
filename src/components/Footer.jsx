import { MapPin, Linkedin, Twitter, Github, Mail } from "./icons";

const COLS = [
  {
    title: "Product",
    links: [
      { label: "Features", page: "service" },
      { label: "How it works", page: "home" },
      { label: "Pricing", page: "service" },
      { label: "Get started", page: "contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", page: "company" },
      { label: "Our team", page: "company" },
      { label: "Careers", page: "company" },
      { label: "Contact", page: "contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", page: "service" },
      { label: "API reference", page: "service" },
      { label: "Support", page: "contact" },
      { label: "Status", page: "home" },
    ],
  },
];

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-dark pt-16 pb-7 text-slate-300">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <button onClick={() => onNavigate("home")} className="mb-4 flex items-center gap-3">
              <div className="leadx-logo-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="logoGradFooter" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00BFFF" />
                      <stop offset="100%" stopColor="#8B00FF" />
                    </linearGradient>
                  </defs>
                  <path d="M12 2L3 7l9 5 9-5-9-5z" stroke="url(#logoGradFooter)" strokeWidth="2.5" strokeLinejoin="round"/>
                  <path d="M3 17l9 5 9-5M3 12l9 5 9-5" stroke="url(#logoGradFooter)" strokeWidth="2.5" strokeLinejoin="round" opacity="0.6"/>
                </svg>
              </div>
              <span className="text-xl font-extrabold text-white">LeadX</span>
            </button>
            <p className="max-w-xs text-[14.5px] text-slate-400">
              Turn Google Maps into a clean, export-ready B2B lead pipeline. Built for
              sales teams that move fast.
            </p>
            <div className="mt-5 flex gap-2.5">
              {[Linkedin, Twitter, Github, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 text-slate-300 transition-colors hover:bg-gradient-to-br hover:from-brand-500 hover:to-cyan-500 hover:text-white"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <h5 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">{col.title}</h5>
              <ul className="grid gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <button
                      onClick={() => onNavigate(l.page)}
                      className="text-left text-[14.5px] text-slate-400 transition-colors hover:text-white"
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-11 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-[13.5px] text-slate-500">
          <span>© {new Date().getFullYear()} BDM Infotech. All rights reserved.</span>
          <div className="flex gap-5">
            <button onClick={() => onNavigate("company")} className="hover:text-white">Privacy</button>
            <button onClick={() => onNavigate("company")} className="hover:text-white">Terms</button>
            <a href="mailto:it@bdminfotech.com" className="hover:text-white">it@bdminfotech.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
