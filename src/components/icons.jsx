// Lightweight inline SVG icons (no icon library needed).
const Svg = ({ children, size = 24, className = "", ...p }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...p}
  >
    {children}
  </svg>
);

export const Search = (p) => (<Svg {...p}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></Svg>);
export const MapPin = (p) => (<Svg {...p}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></Svg>);
export const Mail = (p) => (<Svg {...p}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></Svg>);
export const Phone = (p) => (<Svg {...p}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6 6l1.1-1.1a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2Z" /></Svg>);
export const Globe = (p) => (<Svg {...p}><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20Z" /></Svg>);
export const Star = ({ fill = "currentColor", ...p }) => (<Svg fill={fill} {...p}><path d="m12 2 3 6.3 6.9 1-5 4.9 1.2 6.8-6.1-3.2L6 21.8 7.1 15l-5-4.9 6.9-1L12 2Z" /></Svg>);
export const Zap = (p) => (<Svg {...p}><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" /></Svg>);
export const Download = (p) => (<Svg {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" /></Svg>);
export const Shield = (p) => (<Svg {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></Svg>);
export const Filter = (p) => (<Svg {...p}><path d="M22 3H2l8 9.5V19l4 2v-8.5L22 3Z" /></Svg>);
export const Users = (p) => (<Svg {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" /></Svg>);
export const Target = (p) => (<Svg {...p}><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></Svg>);
export const Sparkles = (p) => (<Svg {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2 2M16 16l2 2M18 6l-2 2M8 16l-2 2" /></Svg>);
export const Check = (p) => (<Svg {...p}><path d="M20 6 9 17l-5-5" /></Svg>);
export const ArrowRight = (p) => (<Svg {...p}><path d="M5 12h14M13 6l6 6-6 6" /></Svg>);
export const Menu = (p) => (<Svg {...p}><path d="M4 6h16M4 12h16M4 18h16" /></Svg>);
export const X = (p) => (<Svg {...p}><path d="M18 6 6 18M6 6l12 12" /></Svg>);
export const Building = (p) => (<Svg {...p}><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M9 22v-4h6v4M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M16 14h.01" /></Svg>);
export const Clock = (p) => (<Svg {...p}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></Svg>);
export const Database = (p) => (<Svg {...p}><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5M3 12c0 1.7 4 3 9 3s9-1.3 9-3" /></Svg>);
export const Rocket = (p) => (<Svg {...p}><path d="M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2 0-2.8a2 2 0 0 0-3 0ZM12 15l-3-3a22 22 0 0 1 8-10c1.5 1 3 2.5 4 4a22 22 0 0 1-10 8M9 12H4s.5-2.8 2-4 5 0 5 0M12 15v5s2.8-.5 4-2 0-5 0-5" /></Svg>);
export const Heart = (p) => (<Svg {...p}><path d="M19 14c1.5-1.5 3-3.4 3-5.5A4.5 4.5 0 0 0 12 5 4.5 4.5 0 0 0 2 8.5c0 2.1 1.5 4 3 5.5l7 7 7-7Z" /></Svg>);
export const Code = (p) => (<Svg {...p}><path d="m16 18 6-6-6-6M8 6l-6 6 6 6" /></Svg>);
export const Linkedin = (p) => (<Svg {...p}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-12h4v1.5A6 6 0 0 1 16 8ZM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z" /></Svg>);
export const Twitter = (p) => (<Svg {...p}><path d="M22 4c-1 .5-2 .8-3 1a4.7 4.7 0 0 0-8 3v1A11 11 0 0 1 3 5s-4 9 5 13a11.6 11.6 0 0 1-7 2c9 5 20 0 20-11.5 0-.3 0-.6-.1-.8A8 8 0 0 0 22 4Z" /></Svg>);
export const Github = (p) => (<Svg {...p}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6.2-1.5 6.2-6.7A5.2 5.2 0 0 0 20 4.8a4.8 4.8 0 0 0-.1-3.6s-1.1-.3-3.7 1.4a12.6 12.6 0 0 0-6.6 0C7 1 5.9 1.2 5.9 1.2A4.8 4.8 0 0 0 5.8 4.8 5.2 5.2 0 0 0 4.4 8.5c0 5.1 3.1 6.4 6.1 6.7a3.4 3.4 0 0 0-.9 2.5V22" /></Svg>);
export const Play = (p) => (<Svg {...p}><polygon points="5 3 19 12 5 21 5 3" /></Svg>);

export default {
  Search, MapPin, Mail, Phone, Globe, Star, Zap, Download, Shield, Filter,
  Users, Target, Sparkles, Check, ArrowRight, Menu, X, Building, Clock,
  Database, Rocket, Heart, Code, Linkedin, Twitter, Github, Play,
};
