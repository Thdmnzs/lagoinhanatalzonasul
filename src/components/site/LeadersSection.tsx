import { useEffect, useState } from "react";
import { FadeIn, SectionLabel } from "./Section";
import { LeadersCarousel } from "./LeadersCarousel";
import { getLeadersByMinistry } from "./leaders";

export const MINISTRY_SELECT_EVENT = "ministry:select";

export function selectMinistry(name: string) {
  window.dispatchEvent(new CustomEvent(MINISTRY_SELECT_EVENT, { detail: name }));
}

export function LeadersSection() {
  const [ministry, setMinistry] = useState<string>("Pastor Sênior");

  useEffect(() => {
    const handler = (e: Event) => {
      const name = (e as CustomEvent<string>).detail;
      if (!name) return;
      setMinistry(name);
      requestAnimationFrame(() => {
        document
          .getElementById("lideres")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    };
    window.addEventListener(MINISTRY_SELECT_EVENT, handler);
    return () => window.removeEventListener(MINISTRY_SELECT_EVENT, handler);
  }, []);

  const leaders = getLeadersByMinistry(ministry);

  return (
    <section id="lideres" className="relative py-32 px-6">
      <div className="absolute top-1/3 left-0 h-[500px] w-[500px] rounded-full bg-gold/10 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <FadeIn>
            <SectionLabel>Líderes do Ministério</SectionLabel>
            <h2 className="mt-6 font-display text-4xl lg:text-6xl font-bold leading-[0.95]">
              Líderes do{" "}
              <span className="text-gradient-gold italic font-medium">{ministry}</span>
            </h2>
            <p className="mt-6 text-foreground/70 leading-relaxed max-w-xl mx-auto">
              Conheça quem lidera este ministério.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.1}>
          <div className="px-4 md:px-12">
            <LeadersCarousel leaders={leaders} />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
