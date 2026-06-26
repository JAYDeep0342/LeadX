import { lazy, Suspense } from "react";
import { useAuth } from "../context/AuthContext";

const Home     = lazy(() => import("../pages/Home"));
const Service  = lazy(() => import("../pages/Service"));
const Company  = lazy(() => import("../pages/Company"));
const Contact  = lazy(() => import("../pages/Contact"));
const Demo     = lazy(() => import("../pages/Demo"));
const Login    = lazy(() => import("../pages/Login"));
const Actors   = lazy(() => import("../pages/Actors"));
const Console  = lazy(() => import("../pages/Console"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Solution     = lazy(() => import("../pages/Solution"));
const OAuthCallback = lazy(() => import("../pages/OAuthCallback"));

const MARKETING = { home: Home, service: Service, company: Company, contact: Contact, demo: Demo, solution: Solution };


// Focused app screens — no marketing footer.
export const APP_PAGES = ["login", "signup", "dashboard", "console", "demo", "oauth2/callback"];

export const isValidRoute = (page) => {
  return APP_PAGES.includes(page) || !!MARKETING[page] || page.startsWith("oauth2");
};

function PageContent({ page, setPage, isAuthed }) {
  if (page === "oauth2/callback") {
    return <OAuthCallback onNavigate={setPage} />;
  } else if (page === "login" || page === "signup") {
    return <Login key={page} onNavigate={setPage} initialMode={page} />;
  } else if (page === "dashboard") {
    return isAuthed ? <Actors onNavigate={setPage} /> : <Login onNavigate={setPage} initialMode="login" />;
  } else if (page === "console") {
    return isAuthed ? <Console onNavigate={setPage} /> : <Login onNavigate={setPage} initialMode="login" />;
  } else if (MARKETING[page]) {
    const Page = MARKETING[page];
    return <Page onNavigate={setPage} />;
  } else {
    return <NotFound onNavigate={setPage} />;
  }
}

export default function AppRoutes({ page, setPage }) {
  const { isAuthed } = useAuth();
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#04050e]" />}>
      <PageContent page={page} setPage={setPage} isAuthed={isAuthed} />
    </Suspense>
  );
}
