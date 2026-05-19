import { motion } from "motion/react";
import {
  Users, Compass, HeartHandshake, Rocket, Baby, Music,
} from "lucide-react";
import { FadeIn, SectionLabel } from "./Section";

const MINS = [
  { icon: Users, name: "GC", desc: "Grupo de Crescimento." },
  { icon: Compass, name: "Follow", desc: "“Ide por todo o mundo e pregai o evangelho a toda criatura.” — Marcos 16:15" },
  { icon: HeartHandshake, name: "Gerações", desc: "O ministério que cuida das famílias da nossa igreja." },
  { icon: Rocket, name: "Rocket", desc: "Jovens com propósito e missão." },
  { icon: Baby, name: "Kids", desc: "Crianças encontrando Jesus." },
  { icon: Music, name: "Louvor", desc: "Adoração que enche o templo." },
];

export function Ministerios() {
  return (
    <section id="ministerios" className="relative py-32 px-6">
      <div className="absolute top-1/2 right-0 h-[500px] w-[500px] rounded-full bg-gold/10 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-12 mb-20 items-end">
          <FadeIn className="lg:col-span-7">
            <SectionLabel>Ministérios & GC</SectionLabel>
            <h2 className="mt-6 font-display text-5xl lg:text-7xl font-bold leading-[0.95]">
              Faça parte da nossa <span className="text-gradient-gold italic font-medium">família</span>.
            </h2>
          </FadeIn>
          <FadeIn delay={0.15} className="lg:col-span-5">
            <p className="text-foreground/70 leading-relaxed">
              Você não nasceu para caminhar sozinho. Conecte-se a um Grupo de Crescimento e a um ministério para viver o propósito de Deus conosco.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {MINS.map((m, i) => (
            <FadeIn key={m.name} delay={(i % 5) * 0.06}>
              <motion.div
                whileHover={{ y: -4 }}
                className="group glass rounded-md p-6 h-full flex flex-col items-start gap-4 cursor-pointer hover:border-gold/40 transition-colors"
              >
                <div className="relative">
                  <div className="h-11 w-11 rounded-sm border border-gold/40 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-gold-foreground transition-colors">
                    <m.icon size={18} />
                  </div>
                </div>
                <div>
                  <div className="font-display font-bold text-lg">{m.name}</div>
                  <div className="mt-1 text-xs text-muted-foreground leading-relaxed">{m.desc}</div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
