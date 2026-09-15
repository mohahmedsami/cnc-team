import { services } from "@/data/services";

export default function Services() {
  return (
    <section id="services" className="bg-slate-950 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-wider text-sky-400">
            خدماتنا
          </span>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            حلول تصنيع متكاملة من الفكرة إلى المنتج
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-400">
            نغطي كامل سلسلة الإنتاج بدقة واحترافية، لنضمن لك نتيجة موثوقة في كل مرحلة.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-sky-400/40 hover:bg-white/[0.05]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 text-2xl">
                {service.icon}
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white">{service.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}