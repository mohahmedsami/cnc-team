"use client";

import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export type Language = "ar" | "en" | "fr";

const LANGUAGE_DIRECTION: Record<Language, "rtl" | "ltr"> = {
  ar: "rtl",
  en: "ltr",
  fr: "ltr",
};

type LanguageContextValue = {
  lang: Language;
  setLang: (lang: Language) => void;
  direction: "rtl" | "ltr";
};

const LanguageContext = createContext<LanguageContextValue>({
  lang: "ar",
  setLang: () => {},
  direction: "rtl",
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("ar");

  return (
    <LanguageContext.Provider
      value={{ lang, setLang, direction: LANGUAGE_DIRECTION[lang] }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}