import { Archivo, Source_Serif_4 } from "next/font/google";
import type { ReactNode } from "react";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});

export default function DossierLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${archivo.variable} ${sourceSerif.variable}`}>
      {children}
    </div>
  );
}
