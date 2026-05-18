import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";

export function WhatsappButton() {
  return (
    <motion.a
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: "spring", stiffness: 200 }}
      href="https://wa.me/5584999990000"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco no WhatsApp"
      className="fixed bottom-6 right-6 z-40 group"
    >
      <span className="absolute inset-0 rounded-full bg-gold/50 blur-xl group-hover:bg-gold/80 transition-all animate-pulse" />
      <span className="relative flex items-center justify-center h-14 w-14 rounded-full bg-gold text-gold-foreground shadow-glow hover:scale-110 transition-transform">
        <MessageCircle size={22} fill="currentColor" />
      </span>
    </motion.a>
  );
}
