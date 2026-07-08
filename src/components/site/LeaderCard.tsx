import { motion } from "motion/react";
import { MessageCircle, Phone } from "lucide-react";
import { getInitials, type Leader } from "@/data/leaders";

function formatPhone(phone: string): string {
  if (!phone) return "";
  // Remove country code 55 for display if present
  const local = phone.startsWith("55") ? phone.slice(2) : phone;
  if (local.length === 11) {
    return `(${local.slice(0, 2)}) ${local.slice(2, 7)}-${local.slice(7)}`;
  }
  if (local.length === 10) {
    return `(${local.slice(0, 2)}) ${local.slice(2, 6)}-${local.slice(6)}`;
  }
  return phone;
}

export function LeaderCard({
  leader,
  active = false,
}: {
  leader: Leader;
  active?: boolean;
}) {
  const initials = getInitials(leader.name);
  const hasPhone = leader.phone.trim().length > 0;
  const waHref = hasPhone ? `https://wa.me/${leader.phone}` : undefined;

  return (
    <motion.div
      animate={{
        scale: active ? 1 : 0.92,
        opacity: active ? 1 : 0.55,
      }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`glass rounded-md p-8 flex flex-col items-center text-center gap-5 h-full transition-colors ${
        active
          ? "border-gold/50 shadow-glow"
          : "border-white/5"
      }`}
    >
      {/* Placeholder avatar circular com iniciais */}
      <div className="relative">
        <div className="h-28 w-28 rounded-full border border-gold/40 bg-gradient-to-br from-background to-secondary flex items-center justify-center">
          <span className="font-display text-3xl font-bold text-gradient-gold">
            {initials}
          </span>
        </div>
        {active && (
          <div className="absolute inset-0 rounded-full bg-radial-gold blur-xl opacity-40 -z-10" />
        )}
      </div>

      <div className="space-y-1">
        <div className="font-display text-xl font-bold">{leader.name}</div>
        <div className="text-[10px] uppercase tracking-[0.3em] text-gold/80">
          {leader.ministry}
        </div>
      </div>

      {hasPhone ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Phone size={14} className="text-gold" />
          {formatPhone(leader.phone)}
        </div>
      ) : (
        <div className="text-xs text-muted-foreground italic">
          Contato em breve
        </div>
      )}

      {hasPhone ? (
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center gap-2 rounded-sm border border-gold/40 bg-gold/10 px-5 py-2.5 text-sm font-medium text-gold hover:bg-gold hover:text-gold-foreground transition-colors"
        >
          <MessageCircle size={16} />
          Falar com {leader.name.split(" ")[0]}
        </a>
      ) : (
        <button
          disabled
          className="mt-auto inline-flex items-center gap-2 rounded-sm border border-white/10 px-5 py-2.5 text-sm font-medium text-muted-foreground/60 cursor-not-allowed"
        >
          <MessageCircle size={16} />
          Em breve
        </button>
      )}
    </motion.div>
  );
}
