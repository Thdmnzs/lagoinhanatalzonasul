import { motion } from "motion/react";
import { MessageCircle, Phone } from "lucide-react";
import { getInitials, type LeaderCardData } from "@/data/leaders";

function formatPhone(phone: string): string {
  if (!phone) return "";
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
  card,
  active = false,
}: {
  card: LeaderCardData;
  active?: boolean;
}) {
  const namesLine =
    card.people.length === 2
      ? `${card.people[0].name.split(" ")[0]} e ${card.people[1].name.split(" ")[0]}`
      : card.people[0].name;
  const ministriesLine = card.id === "pastor-senior"
    ? card.ministries[0].toUpperCase()
    : card.id === "crie-adm"
    ? "LÍDER DO CRIE · ADMINISTRADOR OPERACIONAL"
    : card.ministries.length > 1
    ? `Líder de ${card.ministries.join(" · ")}`
    : card.people.length > 1
    ? `Líderes do ${card.ministries[0]}`
    : `Líder do ${card.ministries[0]}`;

  return (
    <motion.div
      animate={{
        scale: active ? 1 : 0.92,
        opacity: active ? 1 : 0.55,
      }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`glass rounded-md p-8 flex flex-col items-center text-center gap-5 h-full transition-colors ${
        active ? "border-gold/50 shadow-glow" : "border-white/5"
      }`}
    >
      {/* Placeholder(s) circular(es) com iniciais */}
      <div className="relative flex items-center justify-center">
        {card.groupPhoto ? (
          <div className="h-28 w-28 rounded-full border border-gold/40 bg-gradient-to-br from-background to-secondary flex items-center justify-center overflow-hidden">
            <img
              src={card.groupPhoto}
              alt={card.people.map((p) => p.name).join(" e ")}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-top"
            />

          </div>
        ) : card.people.length > 1 ? (
          <div className="flex -space-x-4">
            {card.people.map((p) => (
              <div
                key={p.name}
                className="h-20 w-20 rounded-full border border-gold/40 bg-gradient-to-br from-background to-secondary flex items-center justify-center ring-2 ring-background overflow-hidden"
              >
                {p.photo ? (
                  <img loading="lazy" decoding="async"
                    src={p.photo}
                    alt={p.name}
                    className="h-full w-full object-cover object-top"
                  />
                ) : (
                  <span className="font-display text-xl font-bold text-gradient-gold">
                    {getInitials(p.name)}
                  </span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="h-28 w-28 rounded-full border border-gold/40 bg-gradient-to-br from-background to-secondary flex items-center justify-center overflow-hidden">
            {card.people[0].photo ? (
              <img loading="lazy" decoding="async"
                src={card.people[0].photo}
                alt={card.people[0].name}
                className="h-full w-full object-cover object-top"
              />
            ) : (
              <span className="font-display text-3xl font-bold text-gradient-gold">
                {getInitials(card.people[0].name)}
              </span>
            )}
          </div>
        )}
        {active && (
          <div className="absolute inset-0 rounded-full bg-radial-gold blur-xl opacity-40 -z-10" />
        )}
      </div>

      <div className="space-y-1">
        <div className="font-display text-xl font-bold">{namesLine}</div>
        <div className="text-[10px] uppercase tracking-[0.3em] text-gold/80">
          {ministriesLine}
        </div>
      </div>

      {/* Telefones */}
      <div className="flex flex-col gap-1 text-sm text-muted-foreground">
        {card.people.map((p) =>
          p.phone ? (
            <div key={p.name} className="flex items-center justify-center gap-2">
              <Phone size={14} className="text-gold" />
              {card.people.length > 1 && (
                <span className="text-xs text-foreground/70">
                  {p.name.split(" ")[0]}:
                </span>
              )}
              {formatPhone(p.phone)}
            </div>
          ) : null,
        )}
      </div>

      {/* Botões — um por líder */}
      <div className="mt-auto flex flex-col gap-2 w-full">
        {card.people.map((p) => {
          const hasPhone = p.phone.trim().length > 0;
          const nameParts = p.name.split(" ");
          const first = (p.name.startsWith("Pr.") || p.name.startsWith("Pra.")) && nameParts.length > 1
            ? `${nameParts[0]} ${nameParts[1]}`
            : nameParts[0];
          return hasPhone ? (
            <a
              key={p.name}
              href={`https://wa.me/${p.phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-sm border border-gold/40 bg-gold/10 px-5 py-2.5 text-sm font-medium text-gold hover:bg-gold hover:text-gold-foreground transition-colors"
            >
              <MessageCircle size={16} />
              Falar com {first}
            </a>
          ) : (
            <button
              key={p.name}
              disabled
              className="inline-flex items-center justify-center gap-2 rounded-sm border border-white/10 px-5 py-2.5 text-sm font-medium text-muted-foreground/60 cursor-not-allowed"
            >
              <MessageCircle size={16} />
              Em breve
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
