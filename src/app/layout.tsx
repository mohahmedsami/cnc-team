import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Taklonjia CNC | التصنيع بالتحكم الرقمي",
  description:
    "موقع شركة Taklonjia CNC — تصنيع دقيق بالتحكم الرقمي، تصميم هندسي، وإنتاج بالكميات.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ar" dir="rtl" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-slate-950 font-sans text-slate-50">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}