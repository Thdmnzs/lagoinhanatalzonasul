import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo-lagoinha.png";

const NAV = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Cultos", href: "#cultos" },
  { label: "Pastor", href: "#pastor" },
  { label: "Ministérios", href: "#ministerios" },
  { label: "Contato", href: "#contato" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-strong py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <a href="#inicio" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="h-9 w-9 rounded-sm border border-gold/60 overflow-hidden flex items-center justify-center">
              <img src={logo} alt="Lagoinha Natal Zona Sul" className="h-full w-full object-cover" />
            </div>
            <div className="absolute inset-0 rounded-sm bg-radial-gold opacity-0 group-hover:opacity-100 transition" />
          </div>
          <div className="leading-tight">
            <div className="font-display font-bold tracking-wide text-sm uppercase">Lagoinha</div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Natal · Zona Sul</div>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative px-4 py-2 text-sm text-foreground/80 hover:text-foreground transition-colors group"
            >
              {item.label}
              <span className="absolute left-4 right-4 -bottom-0.5 h-px bg-gold scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            </a>
          ))}
        </nav>

        <a
          href="https://www.google.com/maps/place/R.+Delmiro+Gouveia,+17+-+Ne%C3%B3polis,+Natal+-+RN,+59086-010/@-5.8623741,-35.205896,17z/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/5 px-5 py-2 text-xs uppercase tracking-[0.2em] text-gold hover:bg-gold hover:text-gold-foreground transition-all"
        >
          Visite-nos
        </a>

        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden text-foreground p-2"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden glass-strong mt-3 mx-4 rounded-lg p-4 flex flex-col"
          >
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="px-3 py-3 text-sm border-b border-border last:border-0 hover:text-gold transition-colors"
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
