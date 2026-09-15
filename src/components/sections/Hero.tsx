import { site } from "@/data/site";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-white/10 bg-[#0d0d0f]"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-sky-500/15 blur-3xl" />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-4 py-28 text-center sm:px-6 sm:py-36 lg:px-8">
        <span aria-hidden="true" className="h-3 w-3 rotate-45 bg-sky-400 shadow-[0_0_18px_0_rgba(56,189,248,0.6)]" />

        <h1 className="mt-8 text-5xl font-bold leading-[1.15] tracking-tight text-white sm:text-6xl lg:text-7xl">
          نبني المنتجات الرقمية التي تنمّي أعمالك
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-400">
          {site.name} — فريق هندسي يحوّل الأفكار المعقدة إلى مواقع ومنصات SaaS
          وتطبيقات سريعة، واضحة، وقابلة للنمو.
        </p>

        <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href="#services"
            className="rounded-lg bg-sky-500 px-8 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgba(14,165,233,0.6)] transition-all hover:-translate-y-0.5 hover:bg-sky-400"
          >
            ابدأ مشروعك
          </a>
          <a
            href="#contact"
            className="rounded-lg border border-white/20 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/5"
          >
            تعرّف على خدماتنا
          </a>
        </div>

        <dl className="mx-auto mt-20 grid w-full max-w-3xl grid-cols-1 gap-y-10 border-t border-white/10 pt-12 text-center sm:grid-cols-3 sm:gap-y-0" dir="ltr">
          {[
            { value: "01", label: "فريق هندسي" },
            { value: "06", label: "مجالات رقمية" },
            { value: "24/7", label: "منتجات تعمل" },
          ].map((stat) => (
            <div key={stat.label} className="px-4 sm:border-l sm:border-white/10 sm:first:border-l-0 sm:first:pl-0">
              <dd className="font-mono text-3xl font-bold text-sky-300 tabular-nums sm:text-4xl">{stat.value}</dd>
              <dt className="mt-2 text-sm text-slate-400">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
