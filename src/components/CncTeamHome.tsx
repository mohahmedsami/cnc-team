"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import LiveCode from "@/components/LiveCode";

const services = [
  {
    eyebrow: "Product",
    title: "SaaS platforms",
    text: "From first hypothesis to a dependable product your customers can use every day.",
  },
  {
    eyebrow: "Web",
    title: "Websites & systems",
    text: "Fast, focused digital experiences with a clear purpose and a solid technical base.",
  },
  {
    eyebrow: "Mobile",
    title: "Apps that feel natural",
    text: "Useful mobile products shaped around real behavior, not unnecessary features.",
  },
  {
    eyebrow: "Engineering",
    title: "APIs & internal tools",
    text: "Reliable systems that connect your teams, data, and operations without friction.",
  },
];

type Locale = "en" | "fr" | "ar";

const upcomingProject: { name: string; blurb: Record<Locale, string>; status: Record<Locale, string> } = {
  name: "Beup",
  blurb: {
    en: "A new-generation social media app. Soon, capture daily moments with the front and back cameras.",
    fr: "Un réseau social nouvelle génération. Bientôt, créez des moments quotidiens avec les caméras avant et arrière.",
    ar: "تطبيق تواصل اجتماعي من الجيل الجديد. قريبًا، أنشئ لحظات يومية بالتصوير الأمامي والخلفي.",
  },
  status: { en: "In design", fr: "En conception", ar: "في التصميم" },
};

const labels = {
  en: {
    approach: "Approach", services: "Services", contact: "Contact", kicker: "Independent software team · Algeria",
    hero: "Build what matters.", lead: "We turn ideas into digital products. We design and engineer products for teams ready to move with intent.",
    see: "See how we work", email: "Email", capabilities: "Capabilities", ourApproach: "Our approach",
    approachTitle: "Thoughtful ideas for people who create, build, and grow.", process: "A clear process",
    processText: "Every project starts with a question. We make the next step obvious, then build it properly.", work: "Work with us ↗",
    what: "What we do", start: "Start a conversation", idea: "Have an idea? Let’s build it.",
    explanation: "We understand the problem first, set clear priorities, then build a focused version that can be tested and improved with confidence.",
    upcoming: "Upcoming", upcomingTitle: "What we’re building next.",
  },
  fr: {
    approach: "Approche", services: "Services", contact: "Contact", kicker: "Équipe logicielle indépendante · Algérie",
    hero: "Construisons l’essentiel.", lead: "Nous transformons les idées en produits numériques. Nous concevons et développons des produits pour les équipes qui veulent avancer avec intention.",
    see: "Voir notre méthode", email: "Email", capabilities: "Expertise", ourApproach: "Notre approche",
    approachTitle: "Des idées justes pour celles et ceux qui créent, construisent et grandissent.", process: "Un processus clair",
    processText: "Chaque projet commence par une question. Nous clarifions la prochaine étape, puis nous la construisons correctement.", work: "Travailler avec nous ↗",
    what: "Nos services", start: "Commencer une conversation", idea: "Une idée ? Construisons-la.",
    explanation: "Nous comprenons d’abord le problème, fixons les priorités, puis construisons une version claire, testable et améliorable.",
    upcoming: "À venir", upcomingTitle: "Ce que nous construisons ensuite.",
  },
  ar: {
    approach: "منهجيتنا", services: "خدماتنا", contact: "تواصل معنا", kicker: "فريق برمجي مستقل · الجزائر",
    hero: "نبني ما يستحق البناء.", lead: "نحوّل الأفكار إلى منتجات رقمية. نصمم ونطوّر منتجات للفرق التي تريد التقدم بوضوح وثقة.",
    see: "اكتشف طريقة عملنا", email: "البريد الإلكتروني", capabilities: "قدراتنا", ourApproach: "منهجيتنا",
    approachTitle: "أفكار مدروسة لمن يصنعون ويبنون وينمّون أعمالهم.", process: "عملية واضحة",
    processText: "كل مشروع يبدأ بسؤال. نحدد الخطوة التالية بوضوح، ثم نبنيها بطريقة صحيحة.", work: "اعمل معنا ↗",
    what: "ماذا نقدم", start: "ابدأ محادثة", idea: "لديك فكرة؟ لنبنها معًا.",
    explanation: "نفهم المشكلة أولًا، نرتب الأولويات، ثم نبني نسخة واضحة يمكن اختبارها وتطويرها بثقة.",
    upcoming: "قادم", upcomingTitle: "ما الذي نبنيه بعد ذلك؟",
  },
} as const;

export default function CncTeamHome() {
  const [locale, setLocale] = useState<Locale>("en");
  const isArabic = locale === "ar";
  const text = labels[locale];
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
  }, [isArabic, locale]);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;
    const handleTime = () => {
      const remaining = video.duration - video.currentTime;
      if (Number.isFinite(remaining) && remaining > 0 && remaining <= 1.6) {
        video.playbackRate = 0.25;
      }
    };
    video.addEventListener("timeupdate", handleTime);
    return () => video.removeEventListener("timeupdate", handleTime);
  }, []);

  return (
    <main id="main-content" dir={isArabic ? "rtl" : "ltr"} className="cnc-home min-h-svh overflow-hidden bg-[#090909] text-white">
      <section className="relative flex min-h-svh flex-col">
        <div className="cnc-orb cnc-orb-one" aria-hidden="true" />
        <div className="cnc-orb cnc-orb-two" aria-hidden="true" />
        <video
          ref={heroVideoRef}
          className="absolute inset-0 h-full w-full object-cover opacity-65 brightness-[1.35] contrast-[1.08] saturate-[1.15] mix-blend-screen"
          src="/cnc-team/videos/cnc-team-hero.mp4"
          muted
          autoPlay
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#090909]/10 via-[#090909]/38 to-[#090909]/85" aria-hidden="true" />

        <header className="relative z-10 px-5 py-5 sm:px-8 sm:py-8">
          <nav className="liquid-glass mx-auto flex max-w-6xl items-center justify-between rounded-full px-5 py-3 sm:px-7">
            <a href="#top" className="flex items-center gap-2.5 text-sm font-semibold tracking-wide">
              <span>CNC TEAM</span>
            </a>
            <div className="hidden items-center gap-8 text-sm text-white/55 md:flex">
              <a href="#approach" className="transition-colors hover:text-white">{text.approach}</a>
              <a href="#services" className="transition-colors hover:text-white">{text.services}</a>
              <a href="#upcoming" className="transition-colors hover:text-white">{text.upcoming}</a>
              <a href="#contact" className="transition-colors hover:text-white">{text.contact}</a>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center rounded-full border border-white/10 p-1 text-[11px] font-medium">
                {(["fr", "ar"] as const).map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setLocale(value)}
                    className={`rounded-full px-3 py-1.5 transition-colors ${locale === value ? "bg-white text-black" : "text-white/50 hover:text-white"}`}
                    aria-pressed={locale === value}
                  >
                    {value === "ar" ? "العربية" : "FR"}
                  </button>
                ))}
              </div>
              <a href="#contact" className="rounded-full bg-white px-5 py-2 text-sm font-medium text-black transition-transform hover:-translate-y-0.5">
                {isArabic ? "ابدأ مشروعًا" : locale === "fr" ? "Démarrer un projet" : "Start a project"}
              </a>
            </div>
          </nav>
        </header>

        <div id="top" className="relative z-10 flex flex-1 -translate-y-[6%] flex-col items-center justify-center px-6 py-16 text-center">
          <p className="mb-7 text-xs uppercase tracking-[0.28em] text-white/40">{text.kicker}</p>
          <h1 className="cnc-display max-w-6xl text-6xl leading-[0.92] tracking-[-0.06em] sm:text-8xl lg:text-[10rem]">
            {text.hero}
          </h1>
          <p className="mt-8 max-w-md text-sm leading-7 text-white/55 sm:text-base">
            {text.lead}
          </p>
          <a href="#approach" className="liquid-glass mt-9 rounded-full px-7 py-3 text-sm text-white/80 transition-colors hover:text-white">
            {text.see} <span className="ms-3" aria-hidden="true">↓</span>
          </a>
        </div>

        <div className="relative z-10 flex justify-center gap-3 pb-8 text-white/35" aria-label="Social links">
          <a href={`mailto:${site.email}`} className="liquid-glass rounded-full px-4 py-2 text-xs transition-colors hover:text-white">{text.email}</a>
          <a href="#services" className="liquid-glass rounded-full px-4 py-2 text-xs transition-colors hover:text-white">{text.capabilities}</a>
        </div>
      </section>

      <section id="approach" className="relative bg-[#090909] px-6 pb-28 pt-32 sm:px-10 md:pb-44 md:pt-48">
        <div className="cnc-glow cnc-glow-top" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl text-center">
          <p className="mb-8 text-xs uppercase tracking-[0.28em] text-white/35">{text.ourApproach}</p>
          <h2 className="cnc-display text-5xl leading-[1.02] tracking-[-0.04em] sm:text-7xl lg:text-8xl">
            {text.approachTitle}
          </h2>
        </div>
      </section>

      <section className="relative bg-[#090909] px-6 pb-32 sm:px-10 md:pb-48">
        <div className="mx-auto max-w-6xl">
          <div className="cnc-code-panel relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 sm:aspect-[16/8]">
            <div className="absolute inset-x-0 top-0 flex items-center justify-between border-b border-white/[0.06] px-5 py-3.5">
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              </div>
              <span dir="ltr" className="font-mono text-[11px] tracking-wide text-white/35">workspace.ts</span>
            </div>
            <div className="cnc-code-panel-glow" aria-hidden="true" />
            <LiveCode />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090909]/95 via-[#090909]/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-5 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-10">
              <div className="max-w-md">
                <p className="mb-3 text-xs uppercase tracking-[0.24em] text-white/40">{text.process}</p>
                <p className="text-sm leading-7 text-white/75 sm:text-base">{text.processText}</p>
              </div>
              <a href="#contact" className="liquid-glass self-start rounded-full px-6 py-3 text-sm text-white/80 transition-colors hover:text-white">{text.work}</a>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="relative bg-[#090909] px-6 py-28 sm:px-10 md:py-40">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 flex items-end justify-between md:mb-20">
            <h2 className="cnc-display text-5xl tracking-[-0.04em] sm:text-7xl">{text.what}</h2>
            <p className="hidden text-xs uppercase tracking-[0.24em] text-white/35 md:block">{text.capabilities}</p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {services.map((service) => (
              <article key={service.title} className="liquid-glass group rounded-[1.75rem] p-7 transition-transform duration-500 hover:-translate-y-1 sm:p-9">
                <div className="mb-14 flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/40">{service.eyebrow}</p>
                  <span className="text-white/40 transition-colors group-hover:text-white" aria-hidden="true">↗</span>
                </div>
                <h3 className="text-2xl tracking-tight text-white sm:text-3xl">{service.title}</h3>
                <p className="mt-4 max-w-sm text-sm leading-7 text-white/45">{service.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="upcoming" className="relative bg-[#090909] px-6 pb-28 pt-16 sm:px-10 md:pb-40">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 md:mb-20">
            <p className="mb-7 text-xs uppercase tracking-[0.28em] text-white/35">{text.upcoming}</p>
          </div>
          <div className="border-t border-white/10 pt-12 md:pt-16">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div>
                <h2 className="cnc-display text-7xl tracking-[-0.05em] sm:text-8xl lg:text-9xl">{upcomingProject.name}</h2>
                <p className="mt-6 max-w-md text-base leading-7 text-white/50">{upcomingProject.blurb[locale]}</p>
              </div>
              <span className="self-start rounded-full border border-white/10 px-5 py-2 text-sm text-white/60 md:self-auto">{upcomingProject.status[locale]}</span>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="relative overflow-hidden border-t border-white/10 bg-[#090909] px-6 pb-24 pt-32 sm:px-10 md:pb-32 md:pt-44">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-35"
          src="/cnc-team/videos/cnc-team-contact.mp4"
          muted
          autoPlay
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#090909]/65 via-[#090909]/55 to-[#090909]/95" aria-hidden="true" />
        <div className="cnc-glow cnc-glow-center" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-12 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="mb-7 text-xs uppercase tracking-[0.28em] text-white/35">{text.start}</p>
              <h2 className="cnc-display cnc-3d-heading text-5xl leading-[0.98] tracking-[-0.04em] sm:text-7xl">{text.idea}</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={`mailto:${site.email}`} className="liquid-glass rounded-full px-7 py-4 text-sm text-white transition-colors hover:bg-white/10">{site.email} ↗</a>
              <a href={`tel:+${site.phone.replace(/\D/g, "")}`} dir="ltr" className="liquid-glass rounded-full px-7 py-4 text-sm text-white transition-colors hover:bg-white/10">{site.phone}</a>
              <a href={`https://wa.me/${site.phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" dir="ltr" className="liquid-glass rounded-full px-7 py-4 text-sm text-white transition-colors hover:bg-white/10">WhatsApp</a>
            </div>
          </div>
          <p className="mt-16 max-w-xs text-sm leading-7 text-white/55">
            {text.explanation}
          </p>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#070707] px-6 pb-10 pt-16 sm:px-10">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-10 sm:flex-row sm:items-end">
          <div>
            <div className="text-sm font-semibold">CNC TEAM</div>
            <p className="mt-4 max-w-xs text-sm leading-6 text-white/40">Digital products, built with clarity and care.</p>
          </div>
          <div className="text-left text-xs text-white/35 sm:text-right">
            <p>Algeria · Working worldwide</p>
            <p className="mt-2">© {new Date().getFullYear()} CNC TEAM</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
