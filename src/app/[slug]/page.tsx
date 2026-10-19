import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICE_PAGES, LOCATION_PAGES } from "@/data/siteContent";
import DesignTemplatePage from "@/components/DesignTemplatePage";

const ALL_ROOT_PAGES = [...SERVICE_PAGES, ...LOCATION_PAGES];

export async function generateStaticParams() {
  return ALL_ROOT_PAGES.map((p) => ({
    slug: p.cleanSlug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = ALL_ROOT_PAGES.find((p) => p.cleanSlug === slug);
  if (!page) return {};
  return {
    title: page.seoTitle,
    description: page.metaDescription,
  };
}

export default async function DynamicServiceOrLocationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = ALL_ROOT_PAGES.find((p) => p.cleanSlug === slug);

  if (!page) {
    notFound();
  }

  return <DesignTemplatePage page={page} />;
}
