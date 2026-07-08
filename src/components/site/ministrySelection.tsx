import { createContext, useContext, useState, type ReactNode } from "react";

type Ctx = {
  selected: string | null;
  setSelected: (name: string | null) => void;
};

const MinistrySelectionContext = createContext<Ctx | null>(null);

export function MinistrySelectionProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <MinistrySelectionContext.Provider value={{ selected, setSelected }}>
      {children}
    </MinistrySelectionContext.Provider>
  );
}

export function useMinistrySelection() {
  const ctx = useContext(MinistrySelectionContext);
  if (!ctx) throw new Error("useMinistrySelection must be used inside MinistrySelectionProvider");
  return ctx;
}
