import Home from "../pages/Home";
import Service from "../pages/Service";
import Company from "../pages/Company";
import Contact from "../pages/Contact";
import Demo from "../pages/Demo";
import Login from "../pages/Login";
import Actors from "../pages/Actors";
import Console from "../pages/Console";
import NotFound from "../pages/NotFound";
import Solution from "../pages/Solution";
import { useAuth } from "../context/AuthContext";

const MARKETING = { home: Home, service: Service, company: Company, contact: Contact, demo: Demo, solution: Solution };

// Focused app screens — no marketing footer.
export const APP_PAGES = ["login", "signup", "dashboard", "console", "demo"];

export const isValidRoute = (page) => {
  return APP_PAGES.includes(page) || !!MARKETING[page];
};

export default function AppRoutes({ page, setPage }) {
  const { isAuthed } = useAuth();

  if (page === "login" || page === "signup") {
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
