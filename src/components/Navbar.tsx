"use client";

export default function Navbar() {
  return (
    <header
      dir="ltr"
      className="relative sticky top-0 z-50 h-14 bg-[#0d0d0f] sm:h-16"
    >
      <div className="shell-container flex h-full items-center justify-center">
        <span className="flex items-center gap-3">
          <span aria-hidden="true" className="h-2.5 w-2.5 rotate-45 bg-sky-400 shadow-[0_0_12px_0_rgba(56,189,248,0.8)]" />
          <span className="bg-gradient-to-b from-white via-slate-200 to-slate-500 bg-clip-text text-lg font-extrabold tracking-[0.25em] text-transparent sm:text-xl">
            CNC TEAM
          </span>
        </span>
      </div>
      <div className="animate-glow-line" aria-hidden="true" />
    </header>
  );
}
