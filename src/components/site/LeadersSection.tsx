import { useMemo } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FadeIn, SectionLabel } from "./Section";
import { LeadersCarousel } from "./LeadersCarousel";
import { useMinistrySelection } from "./ministrySelection";
import { LEADERS_BY_MINISTRY } from "@/data/leaders";

export function LeadersSection() {
  const { selected } = useMinistrySelection();

  const leaders = useMemo(() => {
    if (!selected) return [];
    return LEADERS_BY_MINISTRY[selected] ?? [];
  }, [selected]);

  const title = selected ? `Líderes do ${selected}` : "Líderes do Ministério";
  const subtitle = selected
    ? "Conheça quem lidera este ministério."
    : "Selecione um ministério acima para conhecer seus líderes.";

  return (
    <section id="lideres" className="relative py-32 px-6">
      <div className="absolute top-1/3 left-0 h-[400px] w-[400px] rounded-full bg-gold/10 blur-[140px]" />
      <div className="relative mx-auto max-w-6xl">
        <FadeIn>
          <SectionLabel>Liderança</SectionLabel>
        </FadeIn>

        <div className="mt-6 mb-14 min-h-[120px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected ?? "default"}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="font-display text-4xl lg:text-6xl font-bold leading-[0.95]">
                {selected ? "Líderes do " : "Líderes do "}
                <span className="text-gradient-gold italic font-medium">
                  {selected ?? "Ministério"}
                </span>
              </h2>
              <p className="mt-4 text-foreground/70 leading-relaxed max-w-xl">
                {subtitle}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selected ?? "empty"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {selected ? (
              <LeadersCarousel leaders={leaders} />
            ) : (
              <div className="mx-auto max-w-md glass rounded-md p-10 text-center">
                <p className="text-muted-foreground">
                  Clique em um ministério acima para ver seus líderes aqui.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// Título fixo prefixo para SEO/screen readers (opcional)
export const LEADERS_SECTION_ID = "lideres";
