import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-sky-400 to-blue-600 font-mono text-sm font-bold text-white">
                CNC
              </span>
              <span className="font-mono text-base font-semibold text-white">{site.name}</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
              شريككم في التصنيع الدقيق. حلول CNC مخصصة للصناعة بجودة موثوقة وتسليم في الموعد.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 text-sm sm:grid-cols-2">
            <div>
              <h3 className="mb-3 font-semibold text-white">روابط سريعة</h3>
              <ul className="space-y-2 text-slate-400">
                <li>الرئيسية</li>
                <li>خدماتنا</li>
                <li>لماذا نحن</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 font-semibold text-white">تواصل معنا</h3>
              <ul className="space-y-2 text-slate-400">
                <li dir="ltr">{site.phone}</li>
                <li dir="ltr">{site.email}</li>
                <li>{site.address}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} {site.name}. جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  );
}