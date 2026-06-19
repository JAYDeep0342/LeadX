import { Star, Users, Search } from "../components/icons";
import { Reveal } from "../components/ui";
import { useAuth } from "../context/AuthContext";

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
    <section className="min-h-[calc(100vh-72px)] bg-slate-50">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1180px] px-6 py-8">
          <p className="text-sm font-semibold text-brand-600">Welcome{username ? `, ${username}` : ""}</p>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-ink">Actors store</h1>
          <p className="mt-2 max-w-xl text-slate-500">
            Ready-made scrapers. Open <span className="font-semibold text-ink">Google Maps Scraper</span> to run it — the rest are coming soon.
          </p>

          <div className="mt-5 flex max-w-md items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-400">
            <Search size={18} />
            <span className="text-sm">Search 1,000+ actors…</span>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-[1180px] px-6 py-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ACTORS.map((a, i) => (
            <Reveal key={a.id} delay={i * 60}>
              <ActorCard actor={a} onOpen={() => a.active && onNavigate("console")} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ActorCard({ actor, onOpen }) {
  const base =
    "group flex h-full flex-col rounded-2xl border bg-white p-6 transition-all duration-200";
  const active =
    "border-slate-200 shadow-sm hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl cursor-pointer ring-1 ring-transparent hover:ring-brand-200";
  const disabled = "border-slate-200 opacity-70";

  const Wrapper = actor.active ? "button" : "a";
  const wrapperProps = actor.active
    ? { onClick: onOpen, type: "button" }
    : { href: "#", onClick: (e) => e.preventDefault() };

  return (
    <Wrapper {...wrapperProps} className={`${base} ${actor.active ? active : disabled} text-left`}>
      <div className="flex items-start justify-between">
        <span className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${actor.color} text-lg font-extrabold text-white shadow`}>
          {actor.letter}
        </span>
        {actor.active ? (
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-600">Available</span>
        ) : (
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-400">Soon</span>
        )}
      </div>

      <h3 className="mt-4 text-lg font-bold text-ink">{actor.name}</h3>
      <p className="text-xs font-medium text-slate-400">{actor.slug}</p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-500">{actor.desc}</p>

      <div className="mt-5 flex items-center gap-4 border-t border-slate-100 pt-4 text-sm text-slate-500">
        <span className="font-semibold text-ink">{actor.author}</span>
        <span className="ml-auto inline-flex items-center gap-1 text-amber-500">
          <Star size={14} fill="currentColor" /> <span className="font-semibold">{actor.rating}</span>
          <span className="text-slate-400">({actor.reviews})</span>
        </span>
        <span className="inline-flex items-center gap-1 text-slate-400">
          <Users size={14} /> {actor.users}
        </span>
      </div>
    </Wrapper>
  );
}
