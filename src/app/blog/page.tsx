import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { BLOG_POSTS, BUSINESS_INFO } from "@/data/siteContent";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: `Blog | ${BUSINESS_INFO.name}`,
  description: BLOG_POSTS[0].metaDescription,
  alternates: {
    canonical: "https://www.chimneysweepmidlothian.site/blog/",
  },
};

export default function BlogIndexPage() {
  return (
    <div className="bg-[#111111] text-white min-h-screen py-14 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Header */}
        <Reveal className="max-w-3xl mb-14 space-y-5">
          <div className="inline-flex items-center gap-2 text-[#F04E23] text-xs font-bold uppercase tracking-[0.2em]">
            <span className="w-2 h-2 rounded-full bg-[#F04E23]" />
            <span>{BUSINESS_INFO.name}</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase text-white leading-tight">
            { BLOG_POSTS[0].pageType }
          </h1>
          <div className="pt-1">
            <a
              href={BUSINESS_INFO.phoneHref}
              className="inline-flex items-center gap-3 px-6 py-3.5 bg-[#F04E23] hover:bg-[#FF6238] text-white text-xs font-bold uppercase tracking-[0.15em] transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Call {BUSINESS_INFO.phone}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </Reveal>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {BLOG_POSTS.map((post, idx) => (
            <Reveal key={post.urlSlug} delayMs={(idx % 3) * 100}>
              <article className="bg-[#181818] border border-[#282828] hover:border-[#F04E23]/70 transition-all h-full flex flex-col justify-between group">
                <div>
                  <Link href={post.urlSlug} className="block aspect-[16/10] overflow-hidden bg-[#111111] border-b border-[#262626]">
                    <img
                      src={post.heroImage}
                      alt={post.pageTitle}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </Link>
                  <div className="p-6 space-y-3">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F04E23] block">
                      0{idx + 1} / {post.pageType}
                    </span>
                    <h2 className="font-display text-xl font-bold uppercase text-white group-hover:text-[#F04E23] transition-colors leading-snug">
                      <Link href={post.urlSlug}>{post.pageTitle}</Link>
                    </h2>
                    <p className="text-xs sm:text-sm text-[#A8A8A8] leading-relaxed">
                      {post.metaDescription}
                    </p>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-2">
                  <Link
                    href={post.urlSlug}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white group-hover:text-[#F04E23] transition-colors"
                  >
                    <span>{post.seoTitle}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#F04E23]" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
