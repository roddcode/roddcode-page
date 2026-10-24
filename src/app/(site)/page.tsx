import { Home as HomeView } from "@/components/home/home";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": "/feed.xml" },
  },
};

export default function HomePage() {
  return <HomeView />;
}
