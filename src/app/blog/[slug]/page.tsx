import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Phone, ArrowRight, Flame, CheckCircle2 } from "lucide-react";
import { BLOG_POSTS, BUSINESS_INFO, SERVICE_PAGES } from "@/data/siteContent";
import Reveal from "@/components/Reveal";

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.cleanSlug.replace(/^blog\//, ""),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find(
    (p) => p.cleanSlug === `blog/${slug}` || p.cleanSlug === slug
  );
  if (!post) return {};
  return {
    title: post.seoTitle,
    description: post.metaDescription,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS.find(
    (p) => p.cleanSlug === `blog/${slug}` || p.cleanSlug === slug
  );

  if (!post) {
    notFound();
  }

  const otherPosts = BLOG_POSTS.filter((p) => p.urlSlug !== post.urlSlug).slice(0, 4);

  return (
    <div className="bg-[#111111] text-white min-h-screen">
      {/* Article Hero */}
      <section className="py-12 lg:py-20 border-b border-[#222222] bg-[#141414]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <Reveal className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 text-[#F04E23] text-xs font-bold uppercase tracking-[0.2em]">
                <span className="w-2 h-2 rounded-full bg-[#F04E23]" />
                <span>{post.pageType}</span>
              </div>
              <h1
                className="font-display text-3xl sm:text-5xl font-bold uppercase text-white leading-tight"
                dangerouslySetInnerHTML={{ __html: post.parsed.h1 }}
              />
              {post.parsed.heroParagraphs.map((p, idx) => (
                <p
                  key={idx}
                  className="text-sm sm:text-base text-[#B0B0B0] leading-relaxed sheet-rich-text"
                  dangerouslySetInnerHTML={{ __html: p }}
                />
              ))}
              <div className="pt-2">
                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="btn-pulse inline-flex items-center gap-3 px-7 py-3.5 bg-[#F04E23] hover:bg-[#FF6238] text-white text-xs font-bold uppercase tracking-[0.15em] transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {BUSINESS_INFO.phone}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </Reveal>

            <Reveal delayMs={150} className="lg:col-span-5">
              <div className="aspect-[4/3] w-full overflow-hidden border border-[#2A2A2A] bg-[#1A1A1A]">
                <img
                  src={post.heroImage}
                  alt={post.pageTitle}
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Main Article Body + Sidebar */}
      <section className="py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Article Content Column */}
            <div className="lg:col-span-8 space-y-10">
              {post.parsed.sections.map((sec, sIdx) => (
                <Reveal
                  key={sIdx}
                  className="bg-[#181818] border border-[#262626] p-6 sm:p-9 space-y-5"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-[#F04E23] text-white font-display text-sm font-bold flex items-center justify-center shrink-0">
                      0{sIdx + 1}
                    </span>
                    <h2
                      className="font-display text-2xl sm:text-3xl font-bold uppercase text-white"
                      dangerouslySetInnerHTML={{ __html: sec.title }}
                    />
                  </div>

                  {sec.leadParagraphs.map((lp, idx) => (
                    <p
                      key={idx}
                      className="text-sm sm:text-base text-[#B5B5B5] leading-relaxed sheet-rich-text"
                      dangerouslySetInnerHTML={{ __html: lp }}
                    />
                  ))}

                  {sIdx === 1 && (
                    <div className="aspect-[16/8] w-full overflow-hidden border border-[#2A2A2A] my-4">
                      <img
                        src={post.secondaryImages[0]}
                        alt={sec.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}

                  {sec.h3Items.length > 0 && (
                    <div className="grid grid-cols-1 gap-4 pt-2">
                      {sec.h3Items.map((h, idx) => (
                        <div
                          key={idx}
                          className="bg-[#121212] border border-[#262626] p-5 space-y-2"
                        >
                          <h3
                            className="font-display text-lg font-bold uppercase text-[#F04E23]"
                            dangerouslySetInnerHTML={{ __html: h.title }}
                          />
                          <div
                            className="text-sm text-[#B0B0B0] leading-relaxed sheet-rich-text"
                            dangerouslySetInnerHTML={{ __html: h.contentHtml }}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {sec.listItems.length > 0 && (
                    <ul className="space-y-3 pt-1">
                      {sec.listItems.map((li, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 bg-[#131313] border border-[#242424] p-4 text-sm text-gray-300 sheet-rich-text"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#F04E23] shrink-0 mt-1" />
                          <div dangerouslySetInnerHTML={{ __html: li }} />
                        </li>
                      ))}
                    </ul>
                  )}

                  {sec.trailingParagraphs.map((tp, idx) => (
                    <p
                      key={idx}
                      className="text-sm sm:text-base text-[#B5B5B5] leading-relaxed sheet-rich-text"
                      dangerouslySetInnerHTML={{ __html: tp }}
                    />
                  ))}
                </Reveal>
              ))}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-28">
              {/* Phone CTA Card */}
              <div className="bg-[#181818] border border-[#2A2A2A] p-7 space-y-4">
                <div className="w-10 h-10 bg-[#F04E23] text-white flex items-center justify-center">
                  <Flame className="w-5 h-5" />
                </div>
                <h3 className="font-display text-2xl font-bold uppercase text-white">
                  {BUSINESS_INFO.name}
                </h3>
                <p className="text-xs text-[#A8A8A8] leading-relaxed">
                  {BUSINESS_INFO.address}
                </p>
                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 bg-[#F04E23] hover:bg-[#FF6238] text-white text-xs font-bold uppercase tracking-widest transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {BUSINESS_INFO.phone}</span>
                </a>
              </div>

              {/* Services Directory */}
              <div className="bg-[#181818] border border-[#2A2A2A] p-7 space-y-4">
                <h3 className="font-display text-lg font-bold uppercase tracking-wider text-white">
                  Services
                </h3>
                <ul className="divide-y divide-[#242424]">
                  {SERVICE_PAGES.slice(0, 6).map((s) => (
                    <li key={s.urlSlug}>
                      <Link
                        href={s.urlSlug}
                        className="py-2.5 flex items-center justify-between text-xs text-gray-300 hover:text-[#F04E23] transition-colors"
                      >
                        <span>{s.pageTitle}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#F04E23]" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* More Blog Articles */}
              <div className="bg-[#181818] border border-[#2A2A2A] p-7 space-y-4">
                <h3 className="font-display text-lg font-bold uppercase tracking-wider text-white">
                  More Articles
                </h3>
                <div className="space-y-4">
                  {otherPosts.map((op) => (
                    <Link
                      key={op.urlSlug}
                      href={op.urlSlug}
                      className="block group border-b border-[#242424] pb-3 last:border-none last:pb-0"
                    >
                      <div className="font-display text-sm font-bold uppercase text-gray-200 group-hover:text-[#F04E23] transition-colors">
                        {op.pageTitle}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
