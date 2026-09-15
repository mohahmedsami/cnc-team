export default function WhyUs() {
  const points = [
    {
      title: "تفكير واضح",
      description: "نحوّل المشكلة إلى قرارات بسيطة ونبني حلًا يخدم الهدف الحقيقي للمشروع.",
    },
    {
      title: "هندسة موثوقة",
      description: "كود منظم، بنية قابلة للصيانة، واختبارات تمنح المنتج أساسًا ثابتًا.",
    },
    {
      title: "تواصل مباشر",
      description: "تعمل مع فريقك الهندسي مباشرة دون طبقات تعقّد القرارات أو تؤخر التنفيذ.",
    },
    {
      title: "نمو مستمر",
      description: "نبقى معك بعد الإطلاق لتحسين الأداء وإضافة الميزات التي يحتاجها المستخدمون.",
    },
  ];

  return (
    <section
      id="why-us"
      className="border-y border-white/10 bg-[#0d0d0f] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-sky-400" />
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              لماذا تختار CNC TEAM؟
            </h2>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-x-12 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((point) => (
            <article
              key={point.title}
              className="border-t border-white/10 pt-6"
            >
              <span aria-hidden="true" className="inline-block h-2.5 w-2.5 bg-sky-400" />
              <h3 className="mt-4 text-lg font-semibold text-white">{point.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{point.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
