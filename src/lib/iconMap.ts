import {
  Rocket, Crown, HandHeart, Baby, Plug, Compass, Music, Sparkles, Shield, Home,
  Users, Heart, Star, Flame, Cross, BookOpen, Mic, Camera, Globe, Church,
  type LucideIcon,
} from "lucide-react";

export const ICONS: Record<string, LucideIcon> = {
  Rocket, Crown, HandHeart, Baby, Plug, Compass, Music, Sparkles, Shield, Home,
  Users, Heart, Star, Flame, Cross, BookOpen, Mic, Camera, Globe, Church,
};

export const ICON_NAMES = Object.keys(ICONS);

export function getIcon(name?: string | null): LucideIcon {
  if (!name) return Church;
  return ICONS[name] ?? Church;
}
