import { site } from "@/data/site";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-white/10 bg-slate-950"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-sky-500/20 blur-3xl" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 py-24 text-center sm:px-6 sm:py-32 lg:px-8">
        <span className="rounded-full border border-sky-400/30 bg-sky-500/10 px-4 py-1.5 text-xs font-medium tracking-wide text-sky-300">
          تصنيع دقيق • تحكم رقمي • جودة عالية
        </span>

        <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
          نصمّم وننتج قطعك بدقة{" "}
          <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
            لا حدود لها
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
          {site.name} — شريكك في التصنيع بالتحكم الرقمي. من التصميم إلى التسليم،
          نجمع الخبرة والآلات الحديثة لنحوّل أفكارك إلى منتجات ملموسة بجودة فائقة.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="#services"
            className="rounded-lg bg-sky-500 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-400"
          >
            اكتشف خدماتنا
          </a>
          <a
            href="#contact"
            className="rounded-lg border border-white/20 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/5"
          >
            تواصل معنا
          </a>
        </div>

        <dl className="mt-16 grid w-full max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            { value: "+10", label: "سنوات خبرة" },
            { value: "+500", label: "مشروع منجز" },
            { value: "±0.01", label: "دقة التصنيع (ملم)" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-6 py-5"
            >
              <dt className="text-sm text-slate-400">{stat.label}</dt>
              <dd className="mt-1 text-3xl font-bold text-white" dir="ltr">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}