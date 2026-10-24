import {
  ChromeFooter,
  ChromeHeader,
  ChromeNoise,
} from "@/components/site-chrome";
import { LazyMotion, domAnimation } from "framer-motion";
import type { ReactNode } from "react";

export default function LegacyLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ChromeNoise />
      <LazyMotion features={domAnimation} strict>
        <ChromeHeader />
        <main id="main-content">{children}</main>
        <ChromeFooter />
      </LazyMotion>
    </>
  );
}
