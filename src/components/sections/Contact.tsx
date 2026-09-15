"use client";

import { site } from "@/data/site";

export default function Contact() {
  return (
    <section id="contact" className="bg-[#0d0d0f] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-sky-400" />
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
              لديك فكرة؟ لنبنها معًا
              </h2>
            </div>
            <p className="mt-5 text-base leading-7 text-slate-400">
              أخبرنا عن المنتج أو المشكلة التي تريد حلها. سنعود إليك بخطوة عملية واضحة
              بدل عرض عام لا يناسب مشروعك.
            </p>

            <ul className="mt-8 space-y-4 text-sm text-slate-300">
              <li className="border-b border-white/10 pb-4" dir="ltr">
                <span className="text-right font-mono tabular-nums">{site.phone}</span>
              </li>
              <li className="border-b border-white/10 pb-4" dir="ltr">
                <span className="text-right font-mono tabular-nums">{site.email}</span>
              </li>
              <li className="border-b border-white/10 pb-4">{site.address}</li>
            </ul>
          </div>

          <form
            className="border-t border-white/10 pt-8 lg:pt-0"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-300">الاسم</span>
                <input
                  type="text"
                  required
                  placeholder="اسمك الكامل"
                  className="w-full border-b border-white/15 bg-transparent px-1 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-300">البريد الإلكتروني</span>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full border-b border-white/15 bg-transparent px-1 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
                />
              </label>
            </div>

            <label className="mt-10 block">
              <span className="mb-2 block text-sm font-medium text-slate-300">الموضوع</span>
              <select className="w-full border-b border-white/15 bg-transparent px-1 py-2.5 text-sm text-white focus:border-sky-400 focus:outline-none">
                <option value="" className="bg-[#0d0d0f]">اختر خدمة</option>
                <option value="saas" className="bg-[#0d0d0f]">منتج SaaS</option>
                <option value="web" className="bg-[#0d0d0f]">موقع أو منصة ويب</option>
                <option value="mobile" className="bg-[#0d0d0f]">تطبيق هاتف</option>
                <option value="other" className="bg-[#0d0d0f]">استشارة تقنية</option>
              </select>
            </label>

            <label className="mt-10 block">
              <span className="mb-2 block text-sm font-medium text-slate-300">رسالتك</span>
              <textarea
                required
                rows={5}
                placeholder="ما الذي تريد بناءه؟"
                className="w-full resize-none border-b border-white/15 bg-transparent px-1 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
              />
            </label>

            <button
              type="submit"
              className="mt-10 rounded-lg bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-400"
            >
              إرسال الطلب
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
