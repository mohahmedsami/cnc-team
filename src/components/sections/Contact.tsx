import { site } from "@/data/site";

export default function Contact() {
  return (
    <section id="contact" className="bg-slate-950 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-sky-400">
              اتصل بنا
            </span>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              أخبرنا عن مشروعك القادم
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-400">
              أرسل لنا مواصفاتك أو ملفات CAD الخاصة بك وسيتولى فريقنا الرد خلال 24 ساعة
              بعرض فني وتسعيرة مناسبة.
            </p>

            <ul className="mt-8 space-y-4 text-sm text-slate-300">
              <li dir="ltr" className="text-left">{site.phone}</li>
              <li dir="ltr" className="text-left">{site.email}</li>
              <li>{site.address}</li>
            </ul>
          </div>

          <form
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-300">الاسم</span>
                <input
                  type="text"
                  required
                  placeholder="اسمك الكامل"
                  className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-300">البريد الإلكتروني</span>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
                />
              </label>
            </div>

            <label className="mt-5 block">
              <span className="mb-2 block text-sm font-medium text-slate-300">الموضوع</span>
              <select className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-sky-400 focus:outline-none">
                <option value="">اختر خدمة</option>
                <option value="cnc">تصنيع CNC</option>
                <option value="design">تصميم هندسي</option>
                <option value="prototype">نماذج أولية</option>
                <option value="other">أخرى</option>
              </select>
            </label>

            <label className="mt-5 block">
              <span className="mb-2 block text-sm font-medium text-slate-300">رسالتك</span>
              <textarea
                required
                rows={5}
                placeholder="صف مشروعك أو أرفق المواصفات المطلوبة..."
                className="w-full resize-none rounded-lg border border-white/10 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
              />
            </label>

            <button
              type="submit"
              className="mt-6 w-full rounded-lg bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-400"
            >
              إرسال الطلب
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}