import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes, { APP_PAGES, isValidRoute } from "./routes/AppRoutes";

export default function App() {
  const [page, setPage] = useState(() => {
    const path = window.location.pathname.replace(/^\/|\/$/g, "");
    return path || "home";
  });

  // Handle URL changes and scrolling
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (window.location.pathname !== `/${page === "home" ? "" : page}`) {
      window.history.pushState(null, "", `/${page === "home" ? "" : page}`);
    }
  }, [page]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/^\/|\/$/g, "");
      setPage(path || "home");
    };
    
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // The console is a full-screen, immersive run view (no top navbar / footer).
  const is404 = !isValidRoute(page);
  const showNavbar = !is404;
  const showFooter = !APP_PAGES.includes(page) && !is404;

  return (
    <div className="flex min-h-screen flex-col bg-white text-ink">
      {showNavbar && <Navbar current={page} onNavigate={setPage} />}
      <main className={`flex-1 ${page !== "home" && page !== "contact" && showNavbar ? "pt-[70px]" : ""}`}>
        <AppRoutes page={page} setPage={setPage} />
      </main>
      {showFooter && <Footer onNavigate={setPage} />}
    </div>
  );
}
