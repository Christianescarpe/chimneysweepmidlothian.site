import type { MetadataRoute } from "next";
import { SERVICE_PAGES, LOCATION_PAGES, BLOG_POSTS } from "@/data/siteContent";

const BASE_URL = "https://www.chimneysweepmidlothian.site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/blog/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = SERVICE_PAGES.map((page) => ({
    url: `${BASE_URL}${page.urlSlug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const locationRoutes: MetadataRoute.Sitemap = LOCATION_PAGES.map((page) => ({
    url: `${BASE_URL}${page.urlSlug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${BASE_URL}${post.urlSlug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...locationRoutes,
    ...blogRoutes,
  ];
}
