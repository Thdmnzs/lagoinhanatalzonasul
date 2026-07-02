export type Leader = {
  name: string;
  ministry: string;
  phone: string;
};

export const LEADERS: Leader[] = [
  { name: "Paulo Barreto", ministry: "Pastor Sênior", phone: "558487470020" },
  { name: "Pra. Auri Barreto", ministry: "Shine", phone: "" },
  { name: "Junior", ministry: "Voluntariado", phone: "5584998795576" },
  { name: "Sol", ministry: "Voluntariado", phone: "558491335775" },
  { name: "Cristiana", ministry: "Intercessão", phone: "5584991903834" },
  { name: "Anderson", ministry: "Gerações", phone: "5584999681650" },
  { name: "Dani", ministry: "Gerações", phone: "558494128396" },
  { name: "Amélia Rodrigues", ministry: "Grupo de Crescimento", phone: "5584988600242" },
  { name: "Lívia", ministry: "Follow", phone: "558499023155" },
  { name: "Gustavo", ministry: "Follow", phone: "558499140330" },
  { name: "Ronaldy", ministry: "Music", phone: "558491926404" },
  { name: "Mizael", ministry: "Legacy", phone: "5569992022235" },
  { name: "Ellen", ministry: "Legacy", phone: "5584992038001" },
  { name: "Kdja Laurentina", ministry: "Link", phone: "5584999296408" },
  { name: "Mylla", ministry: "Kids", phone: "5584999322890" },
  { name: "Erika", ministry: "Kids", phone: "5584994097650" },
  { name: "Gerson Gonçalves", ministry: "Crie", phone: "5511998759720" },
  { name: "Marcio Bueno", ministry: "Hero", phone: "5584981277292" },
  { name: "Gerson Gonçalves", ministry: "Administrador Operacional", phone: "5511998759720" },
];

// Aliases: map ministry card names to leader ministry keys
const ALIASES: Record<string, string[]> = {
  "Rocket & Link": ["Link"],
};

export function getLeadersByMinistry(ministry: string): Leader[] {
  const keys = ALIASES[ministry] ?? [ministry];
  return LEADERS.filter((l) => keys.includes(l.ministry));
}

export function initials(name: string): string {
  const parts = name.replace(/^(Pr\.|Pra\.|Pastor|Pastora)\s+/i, "").trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}
