import { motion } from "motion/react";
import {
  Rocket, Crown, HandHeart, Baby, Plug, Compass, Music, Sparkles, Shield, Home,
} from "lucide-react";
import { FadeIn, SectionLabel } from "./Section";



const MINS = [
  { icon: Rocket, name: "Rocket Link", desc: "Adolescentes vivendo o propósito de Deus." },
  { icon: Crown, name: "Legacy", desc: "Jovens deixando um legado para o Reino." },
  { icon: HandHeart, name: "Voluntariado", desc: "Servir com alegria é a marca dessa família." },
  { icon: Baby, name: "Kids", desc: "Crianças encontrando Jesus." },
  { icon: Plug, name: "Plug", desc: "Conectando novos membros à igreja." },
  { icon: Compass, name: "Follow", desc: "Time de comunicação da igreja" },
  { icon: Music, name: "Music", desc: "Adoração que enche o templo." },
  { icon: Sparkles, name: "Shine", desc: "Mulheres que brilham para Cristo." },
  { icon: Shield, name: "Hero", desc: "Homens corajosos servindo a Deus e à família." },
  { icon: Home, name: "Gerações", desc: "Famílias edificadas na fé, unindo todas as gerações." },
];

export function Ministerios() {


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

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {MINS.map((m, i) => {
            const isActive = selected === m.name;
            return (
              <FadeIn key={m.name} delay={(i % 5) * 0.06}>
                <motion.button
                  type="button"
                  onClick={() => handleSelect(m.name)}
                  whileHover={{ y: -4 }}
                  animate={{ scale: isActive ? 1.03 : 1 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className={`group glass rounded-md p-6 h-full w-full text-left flex flex-col items-start gap-4 cursor-pointer transition-colors ${
                    isActive
                      ? "border-gold/60 shadow-glow"
                      : "hover:border-gold/40"
                  }`}
                >
                  <div className="relative">
                    <div
                      className={`h-11 w-11 rounded-sm border border-gold/40 flex items-center justify-center transition-colors ${
                        isActive
                          ? "bg-gold text-gold-foreground"
                          : "text-gold group-hover:bg-gold group-hover:text-gold-foreground"
                      }`}
                    >
                      <m.icon size={18} />
                    </div>
                  </div>
                  <div>
                    <div className="font-display font-bold text-lg">{m.name}</div>
                    <div className="mt-1 text-xs text-muted-foreground leading-relaxed">{m.desc}</div>
                  </div>
                </motion.button>
              </FadeIn>
            );
          })}

        </div>
      </div>
    </section>
  );
}
