"use client";

import { useEffect } from "react";
import { useLanguage } from "@/lib/language-context";

export default function DirectionApplier() {
  const { lang } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return null;
}