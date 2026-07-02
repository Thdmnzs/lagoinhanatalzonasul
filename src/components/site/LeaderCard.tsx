import { motion } from "motion/react";
import { Phone } from "lucide-react";
import { initials, type Leader } from "./leaders";

export function LeaderCard({ leader, active = false }: { leader: Leader; active?: boolean }) {
  const waHref = leader.phone ? `https://wa.me/${leader.phone}` : undefined;
  const formattedPhone = leader.phone
    ? leader.phone.replace(/^55(\d{2})(\d{4,5})(\d{4})$/, "+55 ($1) $2-$3")
    : "Em breve";

  return (
    <motion.div
      animate={{ scale: active ? 1 : 0.92, opacity: active ? 1 : 0.55 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`glass rounded-md p-8 h-full flex flex-col items-center text-center gap-5 transition-colors ${
        active
          ? "border-gold/60 shadow-[0_0_40px_-10px_hsl(var(--gold)/0.35)]"
          : "border-border/40"
      }`}
    >
      <div
        className={`h-24 w-24 rounded-full border flex items-center justify-center font-display text-2xl font-bold transition-colors ${
          active ? "border-gold text-gold" : "border-gold/40 text-gold/70"
        }`}
      >
        {initials(leader.name)}
      </div>
      <div>
        <div className="font-display font-bold text-xl">{leader.name}</div>
        <div className="mt-1 text-[10px] uppercase tracking-[0.3em] text-gold">
          {leader.ministry}
        </div>
        <div className="mt-3 flex items-center justify-center gap-2 text-sm text-foreground/70">
          <Phone size={13} className="text-gold" />
          {formattedPhone}
        </div>
      </div>
      {waHref ? (
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center justify-center px-5 py-2.5 rounded-sm border border-gold/50 text-gold text-xs uppercase tracking-[0.2em] hover:bg-gold hover:text-gold-foreground transition-colors"
        >
          Falar com {leader.name.split(" ")[0]}
        </a>
      ) : (
        <span className="mt-auto text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Contato em breve
        </span>
      )}
    </motion.div>
  );
}
