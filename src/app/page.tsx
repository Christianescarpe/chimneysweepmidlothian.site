import type { Metadata } from "next";
import { HOMEPAGE_DATA } from "@/data/siteContent";
import DesignTemplatePage from "@/components/DesignTemplatePage";

export const metadata: Metadata = {
  title: HOMEPAGE_DATA.seoTitle,
  description: HOMEPAGE_DATA.metaDescription,
  alternates: {
    canonical: "https://www.chimneysweepmidlothian.site/",
  },
};

export default function HomePage() {
  return <DesignTemplatePage page={HOMEPAGE_DATA} />;
}
