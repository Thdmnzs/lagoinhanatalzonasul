import { motion } from "motion/react";
import { useState } from "react";
import { FadeIn, SectionLabel } from "./Section";
import { useMinistries, type Ministry } from "@/hooks/useMinistries";
import { getIcon } from "@/lib/iconMap";
import { LeadersModal } from "./LeadersModal";

export function Ministerios() {
  const { data: ministries, isLoading } = useMinistries({ activeOnly: true });
  const [selected, setSelected] = useState<Ministry | null>(null);

  return (
    <section id="ministerios" className="relative py-32 px-6">
      <div className="absolute top-1/2 right-0 h-[500px] w-[500px] rounded-full bg-gold/10 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-12 mb-20 items-end">
          <FadeIn className="lg:col-span-7">
            <SectionLabel>Ministérios</SectionLabel>
            <h2 className="mt-6 font-display text-5xl lg:text-7xl font-bold leading-[0.95]">
              Faça parte da nossa <span className="text-gradient-gold italic font-medium">família</span>.
            </h2>
          </FadeIn>
          <FadeIn delay={0.15} className="lg:col-span-5">
            <p className="text-foreground/70 leading-relaxed">
              Você não nasceu para caminhar sozinho. Conecte-se a um ministério e venha viver o propósito de Deus conosco.
            </p>
          </FadeIn>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="glass rounded-md p-6 h-32 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {ministries?.map((m, i) => {
              const Icon = getIcon(m.icon);
              return (
                <FadeIn key={m.id} delay={(i % 5) * 0.06}>
                  <motion.button
                    whileHover={{ y: -4 }}
                    onClick={() => setSelected(m)}
                    className="group glass rounded-md p-6 h-full w-full text-left flex flex-col items-start gap-4 cursor-pointer hover:border-gold/40 transition-colors"
                  >
                    <div className="h-11 w-11 rounded-sm border border-gold/40 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-gold-foreground transition-colors">
                      <Icon size={18} />
                    </div>
                    <div>
                      <div className="font-display font-bold text-lg">{m.name}</div>
                      {m.description && <div className="mt-1 text-xs text-muted-foreground leading-relaxed">{m.description}</div>}
                    </div>
                  </motion.button>
                </FadeIn>
              );
            })}
          </div>
        )}
      </div>

      <LeadersModal
        ministryId={selected?.id ?? null}
        ministryName={selected?.name ?? ""}
        open={!!selected}
        onOpenChange={(o) => !o && setSelected(null)}
      />
    </section>
  );
}
