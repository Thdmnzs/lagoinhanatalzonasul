import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { LeaderCard } from "./LeaderCard";
import type { Leader } from "./leaders";

export function LeadersCarousel({ leaders }: { leaders: Leader[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [leaders]);

  if (leaders.length === 0) {
    return (
      <div className="glass rounded-md p-12 text-center text-foreground/60">
        Em breve compartilharemos os líderes deste ministério.
      </div>
    );
  }

  const prev = () => setIndex((i) => (i - 1 + leaders.length) % leaders.length);
  const next = () => setIndex((i) => (i + 1) % leaders.length);

  const prevLeader = leaders[(index - 1 + leaders.length) % leaders.length];
  const nextLeader = leaders[(index + 1) % leaders.length];
  const current = leaders[index];

  return (
    <div className="relative">
      <div className="relative flex items-stretch justify-center gap-4 md:gap-6">
        {/* Desktop side previews */}
        {leaders.length > 1 && (
          <div className="hidden md:block w-[22%] shrink-0 pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={`prev-${prevLeader.name}`}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.3 }}
              >
                <LeaderCard leader={prevLeader} />
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        <div className="w-full md:w-[46%] shrink-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.name + current.ministry}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <LeaderCard leader={current} active />
            </motion.div>
          </AnimatePresence>
        </div>

        {leaders.length > 1 && (
          <div className="hidden md:block w-[22%] shrink-0 pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={`next-${nextLeader.name}`}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
              >
                <LeaderCard leader={nextLeader} />
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>

      {leaders.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Anterior"
            className="absolute left-0 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full border border-gold/40 text-gold flex items-center justify-center hover:bg-gold hover:text-gold-foreground transition-colors bg-background/60 backdrop-blur"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            aria-label="Próximo"
            className="absolute right-0 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full border border-gold/40 text-gold flex items-center justify-center hover:bg-gold hover:text-gold-foreground transition-colors bg-background/60 backdrop-blur"
          >
            <ChevronRight size={18} />
          </button>

          <div className="mt-8 flex items-center justify-center gap-2">
            {leaders.map((l, i) => (
              <button
                key={l.name}
                onClick={() => setIndex(i)}
                aria-label={`Ir para ${l.name}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-8 bg-gold" : "w-1.5 bg-foreground/25 hover:bg-foreground/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
