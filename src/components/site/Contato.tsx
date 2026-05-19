import { useState } from "react";
import { motion } from "motion/react";
import { z } from "zod";
import { MapPin, Phone, Instagram, Clock, Send } from "lucide-react";
import { FadeIn, SectionLabel } from "./Section";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().trim().min(2, "Informe seu nome").max(100),
  email: z.string().trim().email("Email inválido").max(255),
  phone: z.string().trim().min(8, "Telefone inválido").max(20),
  message: z.string().trim().min(5, "Mensagem muito curta").max(1000),
});

export function Contato() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      toast.error(result.error.issues[0]?.message ?? "Verifique os campos");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      toast.success("Mensagem enviada! Em breve entraremos em contato.");
      setForm({ name: "", email: "", phone: "", message: "" });
      setLoading(false);
    }, 800);
  };

  return (
    <section id="contato" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <FadeIn className="text-center max-w-3xl mx-auto mb-20">
          <div className="flex justify-center"><SectionLabel>Localização & Contato</SectionLabel></div>
          <h2 className="mt-6 font-display text-5xl lg:text-7xl font-bold leading-[0.95]">
            Venha nos <span className="text-gradient-gold italic font-medium">visitar</span>.
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
                { Icon: Phone, label: "WhatsApp", value: "(84) 9455-1786", href: "https://wa.me/message/CTRQ7IYS35TNP1" },
                { Icon: Instagram, label: "Instagram", value: "@lagoinhanatalzonasul", href: "https://www.instagram.com/lagoinhanatalzonasul/" },
              ].map(({ Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href ?? "#"}
                  target={href ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="glass rounded-md p-5 flex items-start gap-4 hover:border-gold/40 transition-colors group"
                >
                  <div className="h-10 w-10 rounded-sm border border-gold/40 flex items-center justify-center text-gold shrink-0 group-hover:bg-gold group-hover:text-gold-foreground transition-colors">
                    <Icon size={16} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-[0.25em] text-gold">{label}</div>
                    <div className="mt-1 text-sm text-foreground/85 truncate">{value}</div>
                  </div>
                </a>
              ))}
            </div>
          </FadeIn>

          {/* Form */}
          <FadeIn delay={0.15}>
            <form onSubmit={onSubmit} className="glass rounded-md p-8 lg:p-10 space-y-5">
              <Field
                label="Nome"
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
              />
              <Field
                label="Email"
                type="email"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
              />
              <Field
                label="Telefone"
                value={form.phone}
                onChange={(v) => setForm({ ...form, phone: v })}
              />
              <Field
                label="Mensagem"
                multiline
                value={form.message}
                onChange={(v) => setForm({ ...form, message: v })}
              />
              <motion.button
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                type="submit"
                className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gold py-4 text-xs font-semibold uppercase tracking-[0.3em] text-gold-foreground shadow-glow hover:shadow-[0_0_80px_-5px_var(--gold-glow)] transition-all disabled:opacity-60"
              >
                {loading ? "Enviando..." : "Enviar Mensagem"}
                <Send size={14} />
              </motion.button>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function Field({
  label, value, onChange, type = "text", multiline = false,
}: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; multiline?: boolean;
}) {
  return (
    <label className="block">
      <span className="block text-[10px] uppercase tracking-[0.3em] text-gold mb-2">{label}</span>
      {multiline ? (
        <textarea
          rows={5}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-foreground placeholder:text-muted-foreground resize-none transition-colors"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-foreground placeholder:text-muted-foreground transition-colors"
        />
      )}
    </label>
  );
}
