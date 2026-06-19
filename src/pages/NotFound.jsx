import { Button } from "../components/ui";
import { ArrowRight } from "../components/icons";

export default function NotFound({ onNavigate }) {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-slate-50 px-6 text-center">
      <div className="text-brand-500 font-extrabold text-9xl">404</div>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-4 text-lg text-slate-500 max-w-md">
        Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
      </p>
      <div className="mt-8">
        <Button size="lg" onClick={() => onNavigate("home")}>
          Back to Home <ArrowRight size={18} />
        </Button>
      </div>
    </section>
  );
}
