"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Phone,
  ArrowRight,
  ShieldCheck,
  Flame,
  Wrench,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  MapPin,
} from "lucide-react";
import {
  PageData,
  ParsedSection,
  BUSINESS_INFO,
  SERVICE_PAGES,
  LOCATION_PAGES,
} from "@/data/siteContent";
import Reveal from "./Reveal";

const BADGE_ICONS = [Flame, ShieldCheck, Wrench, Sparkles, CheckCircle2];

function isPurePhoneButtonParagraph(html: string): boolean {
  const stripped = html.replace(/<a[^>]*href=["']tel:[^"']*["'][^>]*>[\s\S]*?<\/a>/gi, "").trim();
  return stripped === "";
}

/**
 * Helper to ensure any remaining elements of a section (cards, h3Items, listItems, trailingParagraphs)
 * that weren't the primary visual element of a pattern are still rendered cleanly so 0% of content is ever lost.
 */
function ExtraSectionContent({
  section,
  skipCards = false,
  skipH3 = false,
  skipList = false,
  skipTrailing = false,
}: {
  section: ParsedSection;
  skipCards?: boolean;
  skipH3?: boolean;
  skipList?: boolean;
  skipTrailing?: boolean;
}) {
  return (
    <>
      {!skipCards && section.cards.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {section.cards.map((c, idx) => (
            <div
              key={idx}
              className="bg-[#1A1A1A] border border-[#282828] p-6 hover:border-[#F04E23]/60 transition-colors"
            >
              <h3
                className="font-display text-lg font-bold uppercase text-white mb-2"
                dangerouslySetInnerHTML={{ __html: c.title }}
              />
              <div
                className="text-sm text-[#A8A8A8] leading-relaxed sheet-rich-text"
                dangerouslySetInnerHTML={{ __html: c.textHtml }}
              />
            </div>
          ))}
        </div>
      )}

      {!skipH3 && section.h3Items.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {section.h3Items.map((h, idx) => (
            <div
              key={idx}
              className="bg-[#1A1A1A] border border-[#282828] p-6 hover:border-[#F04E23]/60 transition-colors"
            >
              <h3
                className="font-display text-lg font-bold uppercase text-white mb-2"
                dangerouslySetInnerHTML={{ __html: h.title }}
              />
              <div
                className="text-sm text-[#A8A8A8] leading-relaxed sheet-rich-text"
                dangerouslySetInnerHTML={{ __html: h.contentHtml }}
              />
            </div>
          ))}
        </div>
      )}

      {!skipList && section.listItems.length > 0 && (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {section.listItems.map((li, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 bg-[#1A1A1A] border border-[#262626] p-4 text-sm text-gray-300 sheet-rich-text"
            >
              <span className="w-6 h-6 bg-[#F04E23] text-white font-display text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {section.isOrderedList ? idx + 1 : "✓"}
              </span>
              <div dangerouslySetInnerHTML={{ __html: li }} />
            </li>
          ))}
        </ul>
      )}

      {!skipTrailing && section.trailingParagraphs.length > 0 && (
        <div className="mt-6 space-y-4">
          {section.trailingParagraphs
            .filter((p) => !isPurePhoneButtonParagraph(p))
            .map((p, idx) => (
              <p
                key={idx}
                className="text-sm sm:text-base text-[#B0B0B0] leading-relaxed sheet-rich-text"
                dangerouslySetInnerHTML={{ __html: p }}
              />
            ))}
        </div>
      )}
    </>
  );
}

export default function DesignTemplatePage({ page }: { page: PageData }) {
  const [activeBentoIdx, setActiveBentoIdx] = useState(0);
  const [activeTabIdx, setActiveTabIdx] = useState(0);

  const allSections = page.parsed.sections;
  // Check if the final section is a CTA / Schedule section
  const hasFinalCta = allSections.length > 1;
  const contentSections = hasFinalCta ? allSections.slice(0, -1) : allSections;
  const finalCtaSection = hasFinalCta ? allSections[allSections.length - 1] : null;

  const imgs = page.secondaryImages;

  return (
    <div className="bg-[#111111] text-white min-h-screen">
      {/* =====================================================================
          1. HERO SECTION (Template Top Split + 3-Col Bottom Strip)
      ===================================================================== */}
      <section className="relative pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-[#222222] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Eyebrow, H1, Lead Paragraphs, Phone CTA Button */}
            <Reveal className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-[#F04E23] text-xs font-bold uppercase tracking-[0.2em]">
                <span className="w-2 h-2 rounded-full bg-[#F04E23]" />
                <span>{page.pageTitle}</span>
              </div>

              <h1
                className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase leading-[1.06] tracking-tight text-white"
                dangerouslySetInnerHTML={{ __html: page.parsed.h1 }}
              />

              <div className="space-y-4 max-w-2xl">
                {page.parsed.heroParagraphs
                  .filter((p) => !isPurePhoneButtonParagraph(p))
                  .map((p, idx) => (
                    <p
                      key={idx}
                      className="text-sm sm:text-base text-[#A8A8A8] leading-relaxed sheet-rich-text"
                      dangerouslySetInnerHTML={{ __html: p }}
                    />
                  ))}
              </div>

              {/* Single Phone CTA Button Only */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="btn-pulse inline-flex items-center gap-3 px-7 py-4 bg-[#F04E23] hover:bg-[#FF6238] text-white text-xs font-bold uppercase tracking-[0.16em] transition-all duration-200 shadow-lg shadow-[#F04E23]/25"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Now: {BUSINESS_INFO.phone}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </Reveal>

            {/* Right Column: Hero Square/Portrait WebP Image */}
            <Reveal delayMs={150} className="lg:col-span-5">
              <div className="relative aspect-[4/4] sm:aspect-[5/4] lg:aspect-[4/4.2] w-full overflow-hidden bg-[#1A1A1A] border border-[#2A2A2A] group">
                <img
                  src={page.heroImage}
                  alt={page.pageTitle}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/60 via-transparent to-transparent" />
              </div>
            </Reveal>
          </div>

          {/* Bottom 3-Column Strip from Template ([Dark Card with Orange Circle Arrow | Square Image | Dark Card]) */}
          <Reveal delayMs={250} className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
            {/* Left Card */}
            <div className="lg:col-span-5 bg-[#181818] border border-[#262626] p-6 sm:p-8 flex items-center justify-between gap-6">
              <div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-white tracking-wide">
                  {BUSINESS_INFO.phone}
                </div>
                <p className="text-xs text-[#A8A8A8] mt-2 leading-relaxed">
                  {BUSINESS_INFO.address}
                </p>
              </div>
              <a
                href={BUSINESS_INFO.phoneHref}
                aria-label={`Call ${BUSINESS_INFO.phone}`}
                className="w-12 h-12 rounded-full bg-[#F04E23] hover:bg-[#FF6238] text-white flex items-center justify-center shrink-0 transition-transform hover:scale-110 shadow-lg shadow-[#F04E23]/30"
              >
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>

            {/* Middle Square Image */}
            <div className="lg:col-span-2 hidden lg:block overflow-hidden border border-[#262626] bg-[#1A1A1A]">
              <img
                src={imgs[0]}
                alt={page.pageTitle}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>

            {/* Right Card */}
            <div className="lg:col-span-5 bg-[#181818] border border-[#262626] p-6 sm:p-8 flex flex-col justify-between">
              <p className="text-xs text-[#A8A8A8] leading-relaxed">
                {page.metaDescription}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] font-bold uppercase tracking-wider">
                <Link
                  href={page.links.internal1.href}
                  className="text-white hover:text-[#F04E23] inline-flex items-center gap-1 transition-colors"
                >
                  <span>{page.links.internal1.anchor}</span>
                  <ArrowRight className="w-3 h-3 text-[#F04E23]" />
                </Link>
                <Link
                  href={page.links.internal2.href}
                  className="text-gray-400 hover:text-[#F04E23] inline-flex items-center gap-1 transition-colors"
                >
                  <span>{page.links.internal2.anchor}</span>
                  <ArrowRight className="w-3 h-3 text-[#F04E23]" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================================
          2. DYNAMIC TEMPLATE SECTIONS (Strictly Rendering Sheet Sections)
      ===================================================================== */}
      {contentSections.map((section, sIdx) => {
        const sectionImg1 = imgs[(sIdx * 2 + 1) % imgs.length];
        const sectionImg2 = imgs[(sIdx * 2 + 2) % imgs.length];
        const isFaq = /question|faq/i.test(section.title);

        /* -------------------------------------------------------------------
           FAQ / NUMBERED SPOTLIGHT BENTO ("01 / 02 / 03" Section in Template)
        ------------------------------------------------------------------- */
        if (isFaq && section.h3Items.length > 0) {
          return (
            <section
              key={sIdx}
              className="py-16 lg:py-24 border-b border-[#202020] bg-[#111111]"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Reveal className="text-center max-w-3xl mx-auto mb-12">
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F04E23] block mb-2">
                    {page.pageTitle}
                  </span>
                  <h2
                    className="font-display text-3xl sm:text-4xl font-bold uppercase text-white"
                    dangerouslySetInnerHTML={{ __html: section.title }}
                  />
                  {section.leadParagraphs.map((lp, idx) => (
                    <p
                      key={idx}
                      className="mt-3 text-sm text-[#A8A8A8] sheet-rich-text"
                      dangerouslySetInnerHTML={{ __html: lp }}
                    />
                  ))}
                </Reveal>

                {/* Numbered Bento Spotlight Layout (01 / 02 / 03...) */}
                <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                  {section.h3Items.map((item, idx) => {
                    const isExpanded = activeBentoIdx === idx;
                    const itemImg = imgs[(sIdx + idx + 2) % imgs.length];
                    const numStr = String(idx + 1).padStart(2, "0");

                    return (
                      <div
                        key={idx}
                        onClick={() => setActiveBentoIdx(idx)}
                        className={`cursor-pointer bg-[#181818] border transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between ${
                          isExpanded
                            ? "lg:col-span-6 border-[#F04E23]/60 shadow-xl"
                            : "lg:col-span-3 border-[#262626] hover:border-[#3A3A3A]"
                        }`}
                      >
                        <div
                          className={`grid gap-6 items-center h-full ${
                            isExpanded ? "grid-cols-1 md:grid-cols-12" : "grid-cols-1"
                          }`}
                        >
                          <div className={isExpanded ? "md:col-span-7 space-y-4" : "space-y-3"}>
                            <span className="font-display text-2xl font-bold text-[#F04E23] block">
                              {numStr}
                            </span>
                            <h3
                              className="font-display text-xl font-bold uppercase text-white leading-snug"
                              dangerouslySetInnerHTML={{ __html: item.title }}
                            />
                            <div
                              className="text-xs sm:text-sm text-[#A8A8A8] leading-relaxed sheet-rich-text"
                              dangerouslySetInnerHTML={{ __html: item.contentHtml }}
                            />
                            {isExpanded && (
                              <div className="pt-3">
                                <a
                                  href={BUSINESS_INFO.phoneHref}
                                  onClick={(e) => e.stopPropagation()}
                                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#F04E23] hover:bg-[#FF6238] text-white text-xs font-bold uppercase tracking-wider transition-colors"
                                >
                                  <Phone className="w-3.5 h-3.5" />
                                  <span>Call {BUSINESS_INFO.phone}</span>
                                </a>
                              </div>
                            )}
                          </div>

                          <div
                            className={
                              isExpanded
                                ? "md:col-span-5 aspect-square overflow-hidden bg-[#111111] border border-[#282828]"
                                : "aspect-[16/10] overflow-hidden bg-[#111111] border border-[#282828] mt-4"
                            }
                          >
                            <img
                              src={itemImg}
                              alt={item.title}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                              loading="lazy"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </Reveal>

                <ExtraSectionContent
                  section={section}
                  skipH3
                />
              </div>
            </section>
          );
        }

        /* -------------------------------------------------------------------
           PATTERN 1: WIDE CINEMATIC BANNER + COLUMNS BELOW (sIdx === 0)
           Matches "POWERING INDUSTRIES" in Template
        ------------------------------------------------------------------- */
        if (sIdx === 0) {
          return (
            <section
              key={sIdx}
              className="py-16 lg:py-24 border-b border-[#202020] bg-[#141414]"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Reveal className="text-center max-w-3xl mx-auto mb-10">
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F04E23] block mb-2">
                    {BUSINESS_INFO.name}
                  </span>
                  <h2
                    className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-white"
                    dangerouslySetInnerHTML={{ __html: section.title }}
                  />
                  {section.leadParagraphs.map((lp, idx) => (
                    <p
                      key={idx}
                      className="mt-4 text-sm sm:text-base text-[#A8A8A8] leading-relaxed sheet-rich-text"
                      dangerouslySetInnerHTML={{ __html: lp }}
                    />
                  ))}
                </Reveal>

                {/* Wide Cinematic Image Banner */}
                <Reveal delayMs={100} className="mb-12">
                  <div className="w-full aspect-[16/8] sm:aspect-[21/8] overflow-hidden border border-[#2A2A2A] bg-[#1A1A1A]">
                    <img
                      src={sectionImg1}
                      alt={section.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                </Reveal>

                {/* Cards / Columns Strip Underneath Wide Image */}
                {section.cards.length > 0 && (
                  <Reveal
                    delayMs={180}
                    className={`grid grid-cols-1 ${
                      section.cards.length === 4
                        ? "md:grid-cols-2 lg:grid-cols-4"
                        : section.cards.length === 2
                        ? "md:grid-cols-2"
                        : "md:grid-cols-3"
                    } gap-6`}
                  >
                    {section.cards.map((c, idx) => (
                      <div
                        key={idx}
                        className="bg-[#1A1A1A] border border-[#282828] p-6 sm:p-8 hover:border-[#F04E23] transition-all group"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h3
                            className="font-display text-xl sm:text-2xl font-bold uppercase text-white group-hover:text-[#F04E23] transition-colors"
                            dangerouslySetInnerHTML={{ __html: c.title }}
                          />
                          <span className="text-[#F04E23] font-display text-lg font-bold">
                            0{idx + 1}+
                          </span>
                        </div>
                        <div
                          className="text-sm text-[#A8A8A8] leading-relaxed sheet-rich-text"
                          dangerouslySetInnerHTML={{ __html: c.textHtml }}
                        />
                      </div>
                    ))}
                  </Reveal>
                )}

                <ExtraSectionContent section={section} skipCards />
              </div>
            </section>
          );
        }

        /* -------------------------------------------------------------------
           PATTERN 2: ASYMMETRIC HEADER + ORANGE-BADGE CARDS
           Matches "ADVANCED MINING SOLUTIONS" in Template
        ------------------------------------------------------------------- */
        if (
          sIdx === 1 ||
          (!section.isOrderedList && section.listItems.length > 0 && sIdx % 2 === 1)
        ) {
          const items =
            section.cards.length > 0
              ? section.cards.map((c) => `<strong>${c.title}</strong> — ${c.textHtml}`)
              : section.listItems.length > 0
              ? section.listItems
              : section.h3Items.map((h) => `<strong>${h.title}</strong><br/>${h.contentHtml}`);

          const firstItem = items[0];
          const restItems = items.slice(1);

          return (
            <section
              key={sIdx}
              className="py-16 lg:py-24 border-b border-[#202020] bg-[#111111]"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Top Left: Heading & Intro (8 cols) */}
                  <div className="lg:col-span-7 space-y-4">
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F04E23] block">
                      {page.pageTitle}
                    </span>
                    <h2
                      className="font-display text-3xl sm:text-4xl font-bold uppercase text-white"
                      dangerouslySetInnerHTML={{ __html: section.title }}
                    />
                    {section.leadParagraphs.map((lp, idx) => (
                      <p
                        key={idx}
                        className="text-sm sm:text-base text-[#A8A8A8] leading-relaxed sheet-rich-text"
                        dangerouslySetInnerHTML={{ __html: lp }}
                      />
                    ))}
                  </div>

                  {/* Top Right: First Orange-Badge Card (5 cols) */}
                  {firstItem && (
                    <div className="lg:col-span-5 bg-[#1A1A1A] border border-[#282828] p-6 sm:p-7 hover:border-[#F04E23]/60 transition-all">
                      <div className="flex items-start gap-4">
                        <span className="w-10 h-10 bg-[#F04E23] text-white flex items-center justify-center shrink-0">
                          <Flame className="w-5 h-5" />
                        </span>
                        <div
                          className="text-sm text-[#B8B8B8] leading-relaxed sheet-rich-text"
                          dangerouslySetInnerHTML={{ __html: firstItem }}
                        />
                      </div>
                    </div>
                  )}
                </Reveal>

                {/* Bottom Row: 3-Column Grid of Orange-Badge Cards */}
                {restItems.length > 0 && (
                  <Reveal
                    delayMs={150}
                    className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6"
                  >
                    {restItems.map((itemHtml, idx) => {
                      const IconComp = BADGE_ICONS[(idx + 1) % BADGE_ICONS.length];
                      return (
                        <div
                          key={idx}
                          className="bg-[#1A1A1A] border border-[#282828] p-6 sm:p-7 hover:border-[#F04E23]/60 transition-all flex items-start gap-4"
                        >
                          <span className="w-10 h-10 bg-[#F04E23] text-white flex items-center justify-center shrink-0">
                            <IconComp className="w-5 h-5" />
                          </span>
                          <div
                            className="text-sm text-[#B8B8B8] leading-relaxed sheet-rich-text"
                            dangerouslySetInnerHTML={{ __html: itemHtml }}
                          />
                        </div>
                      );
                    })}
                  </Reveal>
                )}

                <ExtraSectionContent
                  section={section}
                  skipCards={section.cards.length > 0}
                  skipList={section.cards.length === 0 && section.listItems.length > 0}
                  skipH3={
                    section.cards.length === 0 &&
                    section.listItems.length === 0 &&
                    section.h3Items.length > 0
                  }
                />
              </div>
            </section>
          );
        }

        /* -------------------------------------------------------------------
           PATTERN 3: SPLIT ACCORDION/BARS LEFT + STACKED IMAGES RIGHT
           Matches "PROTECTING PEOPLE AND THE PLANET" in Template
        ------------------------------------------------------------------- */
        if (section.isOrderedList || (section.listItems.length > 0 && sIdx % 2 === 0)) {
          return (
            <section
              key={sIdx}
              className="py-16 lg:py-24 border-b border-[#202020] bg-[#141414]"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                  {/* Left Column: Heading, Intro, Stacked Dark Bars */}
                  <Reveal className="lg:col-span-7 space-y-5">
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F04E23] block">
                      {BUSINESS_INFO.name}
                    </span>
                    <h2
                      className="font-display text-3xl sm:text-4xl font-bold uppercase text-white"
                      dangerouslySetInnerHTML={{ __html: section.title }}
                    />
                    {section.leadParagraphs.map((lp, idx) => (
                      <p
                        key={idx}
                        className="text-sm sm:text-base text-[#A8A8A8] leading-relaxed sheet-rich-text"
                        dangerouslySetInnerHTML={{ __html: lp }}
                      />
                    ))}

                    <div className="space-y-3 pt-2">
                      {section.listItems.map((li, idx) => (
                        <div
                          key={idx}
                          className="bg-[#1C1C1C] border border-[#2B2B2B] hover:border-[#F04E23]/60 px-5 py-4 flex items-center justify-between gap-4 transition-colors"
                        >
                          <div className="flex items-start gap-4">
                            <span className="font-display text-sm font-bold text-[#F04E23] mt-0.5">
                              0{idx + 1}
                            </span>
                            <div
                              className="text-sm text-gray-200 leading-relaxed sheet-rich-text"
                              dangerouslySetInnerHTML={{ __html: li }}
                            />
                          </div>
                          <ChevronRight className="w-4 h-4 text-[#F04E23] shrink-0" />
                        </div>
                      ))}
                    </div>

                    <ExtraSectionContent section={section} skipList />
                  </Reveal>

                  {/* Right Column: Two Stacked Horizontal WebP Images */}
                  <Reveal delayMs={150} className="lg:col-span-5 space-y-5">
                    <div className="aspect-[16/10] w-full overflow-hidden border border-[#2A2A2A] bg-[#1A1A1A]">
                      <img
                        src={sectionImg1}
                        alt={section.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="aspect-[16/10] w-full overflow-hidden border border-[#2A2A2A] bg-[#1A1A1A]">
                      <img
                        src={sectionImg2}
                        alt={section.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  </Reveal>
                </div>
              </div>
            </section>
          );
        }

        /* -------------------------------------------------------------------
           PATTERN 4: VERTICAL CARDS WITH TEXT TOP + IMAGE BOTTOM
           Matches "SOLUTIONS FOR YOUR INDUSTRY" 4-Col Grid in Template
        ------------------------------------------------------------------- */
        if (section.h3Items.length > 0 || section.cards.length > 0) {
          const cardItems =
            section.h3Items.length > 0
              ? section.h3Items.map((h) => ({ title: h.title, html: h.contentHtml }))
              : section.cards.map((c) => ({ title: c.title, html: c.textHtml }));

          return (
            <section
              key={sIdx}
              className="py-16 lg:py-24 border-b border-[#202020] bg-[#111111]"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Reveal className="text-center max-w-3xl mx-auto mb-12">
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F04E23] block mb-2">
                    {page.pageTitle}
                  </span>
                  <h2
                    className="font-display text-3xl sm:text-4xl font-bold uppercase text-white"
                    dangerouslySetInnerHTML={{ __html: section.title }}
                  />
                  {section.leadParagraphs.map((lp, idx) => (
                    <p
                      key={idx}
                      className="mt-3 text-sm sm:text-base text-[#A8A8A8] leading-relaxed sheet-rich-text"
                      dangerouslySetInnerHTML={{ __html: lp }}
                    />
                  ))}
                </Reveal>

                <Reveal
                  delayMs={120}
                  className={`grid grid-cols-1 sm:grid-cols-2 ${
                    cardItems.length >= 4
                      ? "lg:grid-cols-4"
                      : cardItems.length === 3
                      ? "lg:grid-cols-3"
                      : "lg:grid-cols-2"
                  } gap-6`}
                >
                  {cardItems.map((item, idx) => {
                    const cardImg = imgs[(sIdx + idx + 1) % imgs.length];
                    return (
                      <div
                        key={idx}
                        className="bg-[#1A1A1A] border border-[#282828] p-5 flex flex-col justify-between hover:border-[#F04E23]/60 transition-all group"
                      >
                        <div className="mb-5">
                          <h3
                            className="font-display text-lg font-bold uppercase text-white mb-2 group-hover:text-[#F04E23] transition-colors"
                            dangerouslySetInnerHTML={{ __html: item.title }}
                          />
                          <div
                            className="text-xs sm:text-sm text-[#A8A8A8] leading-relaxed sheet-rich-text"
                            dangerouslySetInnerHTML={{ __html: item.html }}
                          />
                        </div>
                        <div className="aspect-square w-full overflow-hidden bg-[#111111] border border-[#262626]">
                          <img
                            src={cardImg}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    );
                  })}
                </Reveal>

                <ExtraSectionContent
                  section={section}
                  skipH3={section.h3Items.length > 0}
                  skipCards={section.h3Items.length === 0 && section.cards.length > 0}
                />
              </div>
            </section>
          );
        }

        /* -------------------------------------------------------------------
           PATTERN 5: MASTER-DETAIL SHOWCASE BOX
           Matches "SOLUTIONS FOR YOUR INDUSTRY" Split Interactive Box in Template
        ------------------------------------------------------------------- */
        const sidebarLinks =
          page.pageType === "Location Page"
            ? SERVICE_PAGES.slice(0, 4)
            : LOCATION_PAGES.slice(0, 4);

        return (
          <section
            key={sIdx}
            className="py-16 lg:py-24 border-b border-[#202020] bg-[#141414]"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Reveal className="text-center max-w-3xl mx-auto mb-10">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F04E23] block mb-2">
                  {BUSINESS_INFO.name}
                </span>
                <h2
                  className="font-display text-3xl sm:text-4xl font-bold uppercase text-white"
                  dangerouslySetInnerHTML={{ __html: section.title }}
                />
              </Reveal>

              <Reveal
                delayMs={120}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
              >
                {/* Left Column: Selectable / Linked Directory List (4 cols) */}
                <div className="lg:col-span-4 flex flex-col justify-between bg-[#181818] border border-[#262626] divide-y divide-[#242424]">
                  {sidebarLinks.map((lnk, idx) => (
                    <Link
                      key={lnk.urlSlug}
                      href={lnk.urlSlug}
                      onMouseEnter={() => setActiveTabIdx(idx)}
                      className={`p-5 flex items-center justify-between gap-3 transition-colors ${
                        activeTabIdx === idx
                          ? "bg-[#202020] border-l-2 border-l-[#F04E23]"
                          : "hover:bg-[#1E1E1E]"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-[#F04E23] shrink-0 mt-0.5" />
                        <div>
                          <div className="font-display text-sm font-bold uppercase text-white">
                            {lnk.pageTitle}
                          </div>
                          <div className="text-[11px] text-[#A8A8A8] line-clamp-1 mt-0.5">
                            {lnk.seoTitle}
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 shrink-0" />
                    </Link>
                  ))}
                </div>

                {/* Right Column: Main Feature Content Panel (8 cols) */}
                <div className="lg:col-span-8 bg-[#181818] border border-[#262626] p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <h3
                      className="font-display text-xl sm:text-2xl font-bold uppercase text-white"
                      dangerouslySetInnerHTML={{ __html: section.title }}
                    />
                    {section.leadParagraphs.map((lp, idx) => (
                      <p
                        key={idx}
                        className="text-sm sm:text-base text-[#B0B0B0] leading-relaxed sheet-rich-text"
                        dangerouslySetInnerHTML={{ __html: lp }}
                      />
                    ))}
                  </div>

                  <div className="aspect-[16/7] w-full overflow-hidden border border-[#282828] bg-[#111111]">
                    <img
                      src={sectionImg1}
                      alt={section.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>

                  <ExtraSectionContent section={section} />

                  <div className="pt-1">
                    <a
                      href={BUSINESS_INFO.phoneHref}
                      className="inline-flex items-center gap-2.5 px-5 py-2.5 border border-white/30 hover:border-[#F04E23] hover:bg-[#F04E23] text-white text-xs font-bold uppercase tracking-widest transition-all"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call {BUSINESS_INFO.phone}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        );
      })}

      {/* =====================================================================
          3. FINAL CTA BANNER SECTION (Bottom of Template before Footer)
      ===================================================================== */}
      {finalCtaSection && (
        <section className="py-16 lg:py-20 bg-[#141414] border-b border-[#222222]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal className="bg-[#1A1A1A] border border-[#2A2A2A] p-8 sm:p-12 lg:p-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="max-w-2xl space-y-4">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F04E23] block">
                  {BUSINESS_INFO.name}
                </span>
                <h2
                  className="font-display text-3xl sm:text-4xl font-bold uppercase text-white leading-tight"
                  dangerouslySetInnerHTML={{ __html: finalCtaSection.title }}
                />
                {finalCtaSection.leadParagraphs
                  .filter((p) => !isPurePhoneButtonParagraph(p))
                  .map((p, idx) => (
                    <p
                      key={idx}
                      className="text-sm sm:text-base text-[#A8A8A8] leading-relaxed sheet-rich-text"
                      dangerouslySetInnerHTML={{ __html: p }}
                    />
                  ))}
                <ExtraSectionContent section={finalCtaSection} />
              </div>

              {/* Single Phone Button on CTA */}
              <div className="shrink-0">
                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="btn-pulse inline-flex items-center gap-3 px-8 py-4 bg-[#F04E23] hover:bg-[#FF6238] text-white text-xs sm:text-sm font-bold uppercase tracking-[0.16em] transition-all shadow-xl shadow-[#F04E23]/25"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {BUSINESS_INFO.phone}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      )}
    </div>
  );
}
