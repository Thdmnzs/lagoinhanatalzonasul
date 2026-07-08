import { useMemo } from "react";
import { FadeIn, SectionLabel } from "./Section";
import { LeadersCarousel } from "./LeadersCarousel";
import { LEADERS_BY_MINISTRY, OTHER_LEADERS, type Leader } from "@/data/leaders";

export function LeadersSection() {
  const leaders = useMemo<Leader[]>(() => {
    const fromMinistries = Object.values(LEADERS_BY_MINISTRY).flat();
    return [...OTHER_LEADERS, ...fromMinistries];
  }, []);

  return (
    <section id="lideres" className="relative py-32 px-6">
      <div className="absolute top-1/3 left-0 h-[400px] w-[400px] rounded-full bg-gold/10 blur-[140px]" />
      <div className="relative mx-auto max-w-6xl">
        <FadeIn>
          <SectionLabel>Liderança</SectionLabel>
        </FadeIn>

        <div className="mt-6 mb-14">
          <h2 className="font-display text-4xl lg:text-6xl font-bold leading-[0.95]">
            Líderes do{" "}
            <span className="text-gradient-gold italic font-medium">Ministério</span>
          </h2>
          <p className="mt-4 text-foreground/70 leading-relaxed max-w-xl">
            Conheça quem lidera cada ministério. Deslize para o lado para ver todos.
          </p>
        </div>

        <LeadersCarousel leaders={leaders} />
      </div>
    </section>
  );
}
