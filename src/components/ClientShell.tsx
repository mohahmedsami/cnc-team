"use client";

import type { ReactNode } from "react";
import { LanguageProvider } from "@/lib/language-context";
import DirectionApplier from "@/components/DirectionApplier";
import CncTeamHome from "@/components/CncTeamHome";

export default function ClientShell({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <DirectionApplier />
      {children}
      <CncTeamHome />
    </LanguageProvider>
  );
}
