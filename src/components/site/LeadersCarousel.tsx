import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { LeaderCard } from "./LeaderCard";
import type { LeaderCardData } from "@/data/leaders";

export function LeadersCarousel({ cards }: { cards: LeaderCardData[] }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [cards]);

  if (cards.length === 0) {
    return (
      <div className="mx-auto max-w-md glass rounded-md p-10 text-center">
        <p className="text-muted-foreground">Em breve.</p>
      </div>
    );
  }

  const go = (delta: number) => {
    setDirection(delta);
    setIndex((i) => (i + delta + cards.length) % cards.length);
  };

  const prev = (index - 1 + cards.length) % cards.length;
  const next = (index + 1) % cards.length;

  return (
    <div className="relative">
      {/* Desktop: 3 cards visíveis */}
      <div className="hidden md:block relative min-h-[520px]">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={`row-${index}`}
            initial={{ opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * 60 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 grid grid-cols-[1fr_1.4fr_1fr] items-center gap-6 px-8"
          >
            <div className="opacity-70">
              {cards.length > 1 ? <LeaderCard card={cards[prev]} /> : <div />}
            </div>
            <div>
              <LeaderCard card={cards[index]} active />
            </div>
            <div className="opacity-70">
              {cards.length > 1 ? <LeaderCard card={cards[next]} /> : <div />}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile: 1 card por vez */}
      <div className="md:hidden relative min-h-[520px]">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={`m-${index}`}
            initial={{ opacity: 0, x: direction >= 0 ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction >= 0 ? -40 : 40 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) go(1);
              else if (info.offset.x > 60) go(-1);
            }}
            className="px-4"
          >
            <LeaderCard card={cards[index]} active />
          </motion.div>
        </AnimatePresence>
      </div>

      {cards.length > 1 && (
        <>
          <button
            aria-label="Anterior"
            onClick={() => go(-1)}
            className="flex absolute left-2 md:left-0 top-1/2 -translate-y-1/2 h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-background/70 backdrop-blur text-gold hover:bg-gold hover:text-gold-foreground transition-colors z-10"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            aria-label="Próximo"
            onClick={() => go(1)}
            className="flex absolute right-2 md:right-0 top-1/2 -translate-y-1/2 h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-background/70 backdrop-blur text-gold hover:bg-gold hover:text-gold-foreground transition-colors z-10"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {cards.length > 1 && (
        <div className="mt-8 flex justify-center gap-2 flex-wrap">
          {cards.map((_, i) => (
            <button
              key={i}
              aria-label={`Ir para card ${i + 1}`}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-8 bg-gold" : "w-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
