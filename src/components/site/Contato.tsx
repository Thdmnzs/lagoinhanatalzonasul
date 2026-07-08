import { motion } from "motion/react";
import { MapPin, Phone, Instagram, Clock, Send } from "lucide-react";
import { FadeIn, SectionLabel } from "./Section";

export function Contato() {

  return (
    <section id="contato" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <FadeIn className="text-center max-w-3xl mx-auto mb-20">
          <div className="flex justify-center"><SectionLabel>Localização & Contato</SectionLabel></div>
          <h2 className="mt-6 font-display text-5xl lg:text-7xl font-bold leading-[0.95]">
            Venha nos <span className="text-gradient-gold font-medium">visitar</span>.
          </h2>
          <p className="mt-6 text-foreground/70">
            Estamos te esperando. Bem-vindo para casa.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map + info */}
          <FadeIn>
            <div className="rounded-md overflow-hidden border border-border h-[360px] relative grayscale-[40%] contrast-110 hover:grayscale-0 transition-all duration-700">
              <iframe
                title="Mapa Lagoinha Natal Zona Sul"
                src="https://www.google.com/maps?q=Rua%20Delmiro%20Gouveia%2017%2C%20Neopolis%2C%20Natal%20RN&output=embed"
                width="100%"
                height="100%"
                loading="lazy"
                style={{ border: 0, filter: "invert(0.92) hue-rotate(180deg) saturate(0.6)" }}
              />
            </div>

            <div className="mt-6 grid sm:grid-cols-2 gap-3">
              {[
                { Icon: MapPin, label: "Endereço", value: "Rua Delmiro Gouveia, 17 — Neópolis, Natal/RN" },
                { Icon: Clock, label: "Cultos", value: "Qui 20h · Dom 10h e 17h" },
                { Icon: Phone, label: "WhatsApp", value: "(84) 99455-1786", href: "https://wa.me/5584994551786" },
                { Icon: Instagram, label: "Instagram", value: "@lagoinhanatalzonasul", href: "https://www.instagram.com/lagoinhanatalzonasul/" },
              ].map(({ Icon, label, value, href }) => {
                const Comp: any = href ? "a" : "div";
                return (
                  <Comp
                    key={label}
                    {...(href ? { href, target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="glass rounded-md p-5 flex items-start gap-4 hover:border-gold/40 transition-colors group"
                  >
                    <div className="h-10 w-10 rounded-sm border border-gold/40 flex items-center justify-center text-gold shrink-0 group-hover:bg-gold group-hover:text-gold-foreground transition-colors">
                      <Icon size={16} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] uppercase tracking-[0.25em] text-gold">{label}</div>
                      <div className="mt-1 text-sm text-foreground/85 truncate">{value}</div>
                    </div>
                  </Comp>
                );
              })}
            </div>
          </FadeIn>

          {/* CTA */}
          <FadeIn delay={0.15}>
            <div className="glass rounded-md p-10 lg:p-12 h-full flex flex-col justify-center text-center">
              <div className="text-[10px] uppercase tracking-[0.3em] text-gold">Faça parte</div>
              <h3 className="mt-4 font-display text-3xl lg:text-4xl font-bold leading-tight">
                Dê o próximo passo e <span className="text-gradient-gold">torne-se membro</span>.
              </h3>
              <p className="mt-4 text-sm text-foreground/70">
                Preencha o formulário e conecte-se à nossa comunidade.
              </p>
              <motion.a
                whileTap={{ scale: 0.98 }}
                href="https://forms.gle/1cAiqTd9fM18UPgHA"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-gold py-4 px-8 text-xs font-semibold uppercase tracking-[0.3em] text-gold-foreground shadow-glow hover:shadow-[0_0_80px_-5px_var(--gold-glow)] transition-all"
              >
                Seja Membro
                <Send size={14} />
              </motion.a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

