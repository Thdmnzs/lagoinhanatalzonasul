import { motion } from "motion/react";
import {
  Users, Compass, Sparkles, Rocket, Baby, HandHeart,
  Flame, Radio, DoorOpen, Music, ArrowRight,
} from "lucide-react";
import { FadeIn, SectionLabel } from "./Section";

const MINS = [
  { icon: Users, name: "GC", desc: "Grupos de Crescimento nas casas." },
  { icon: Compass, name: "Follow", desc: "Discipulado intencional para novos." },
  { icon: Sparkles, name: "Gerações", desc: "Adolescentes vivendo o Reino." },
  { icon: Rocket, name: "Rocket", desc: "Jovens com propósito e missão." },
  { icon: Baby, name: "Lagoinha Kids", desc: "Crianças encontrando Jesus." },
  { icon: HandHeart, name: "Voluntariado", desc: "Servir é nossa cultura." },
  { icon: Flame, name: "Intercessão", desc: "Oração que move o invisível." },
  { icon: Radio, name: "Comunicação", desc: "Levando a mensagem adiante." },
  { icon: DoorOpen, name: "Recepção", desc: "Cada pessoa é bem-vinda." },
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
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

        <FadeIn delay={0.2} className="mt-24 text-center">
          <a
            href="#contato"
            className="group inline-flex items-center gap-4 rounded-full border border-gold/40 bg-gold/5 px-10 py-5 hover:bg-gold transition-all"
          >
            <span className="font-display text-2xl lg:text-3xl font-bold text-gold group-hover:text-gold-foreground">
              Quero Fazer Parte
            </span>
            <ArrowRight className="text-gold group-hover:text-gold-foreground group-hover:translate-x-1 transition-all" />
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
