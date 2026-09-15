import { services } from "@/data/services";

export default function Services() {
  return (
    <section id="services" className="bg-[#0d0d0f] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-sky-400" />
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              من الفكرة إلى منتج رقمي واضح
            </h2>
          </div>
          <p className="mt-5 text-base leading-7 text-slate-400">
            نعمل معك في الاستراتيجية والتصميم والهندسة حتى يصبح المنتج جاهزًا للاستخدام والنمو.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-x-14 lg:grid-cols-2">
          {services.map((service) => (
            <article
              key={service.title}
              className="group border-t border-white/10 pt-7 pb-12"
            >
              <div className="flex items-start gap-5">
                <span
                  aria-hidden="true"
                  className="text-3xl leading-none transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110"
                >
                  {service.icon}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-sky-300">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{service.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
