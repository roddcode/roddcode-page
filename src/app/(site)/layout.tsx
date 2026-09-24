import { NavTop } from "@/components/nav-top";
import { SmoothScroll } from "@/components/smooth-scroll";
import type { ReactNode } from "react";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <NavTop />
      {children}
    </>
  );
}
