export default function WhyUs() {
  const points = [
    {
      title: "معدات حديثة",
      description: "ماكينات CNC متعددة المحاور بأحدث التقنيات، لتنفيذ الأشكال الأكثر تعقيدًا.",
    },
    {
      title: "مراقبة جودة صارمة",
      description: "فحص كل قطعة قبل الشحن والتوثيق الكامل للمطابقة والمقاسات.",
    },
    {
      title: "التزام بالمواعيد",
      description: "نحترم الجدول الزمني ونضمن تسليم مشاريعك في الوقت المتفق عليه.",
    },
    {
      title: "دعم فني مستمر",
      description: "فريق هندسي يواكبك من الاستشارة الأولى حتى ما بعد التسليم.",
    },
  ];

  return (
    <section
      id="why-us"
      className="border-y border-white/10 bg-gradient-to-b from-slate-900 to-slate-950 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-wider text-sky-400">
            لماذا تختارنا
          </span>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            معايير عمل تميزنا عن غيرنا
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((point, index) => (
            <article
              key={point.title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <span className="font-mono text-sm text-sky-400" dir="ltr">
                0{index + 1}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-white">{point.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{point.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}