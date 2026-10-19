"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Phone, ChevronDown, Menu, X, Flame } from "lucide-react";
import { BUSINESS_INFO, SERVICE_PAGES, LOCATION_PAGES, BLOG_POSTS } from "@/data/siteContent";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-[#111111]/95 backdrop-blur-md border-b border-[#242424]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <span className="w-9 h-9 rounded-full bg-[#F04E23] flex items-center justify-center text-white shadow-lg shadow-[#F04E23]/20 group-hover:scale-105 transition-transform">
            <Flame className="w-5 h-5" />
          </span>
          <div className="flex flex-col">
            <span className="font-display text-xl font-bold tracking-wider uppercase text-white leading-none">
              ASHFORD
            </span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#A8A8A8] mt-0.5">
              Chimney Sweep Midlothian
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link
            href="/"
            className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-300 hover:text-[#F04E23] transition-colors"
          >
            HOME
          </Link>

          {/* Services Dropdown */}
          <div className="relative group">
            <button
              type="button"
              className="flex items-center gap-1.5 text-xs font-semibold tracking-[0.15em] uppercase text-gray-300 group-hover:text-[#F04E23] transition-colors py-6"
            >
              SERVICES <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
            </button>
            <div className="absolute left-0 top-full w-72 bg-[#181818] border border-[#2A2A2A] shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 py-2 z-50">
              {SERVICE_PAGES.map((s) => (
                <Link
                  key={s.urlSlug}
                  href={s.urlSlug}
                  className="block px-4 py-2.5 text-xs text-gray-300 hover:bg-[#222222] hover:text-[#F04E23] transition-colors border-b border-[#222222] last:border-none"
                >
                  {s.pageTitle}
                </Link>
              ))}
            </div>
          </div>

          {/* Locations Dropdown */}
          <div className="relative group">
            <button
              type="button"
              className="flex items-center gap-1.5 text-xs font-semibold tracking-[0.15em] uppercase text-gray-300 group-hover:text-[#F04E23] transition-colors py-6"
            >
              LOCATIONS <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
            </button>
            <div className="absolute left-0 top-full w-72 bg-[#181818] border border-[#2A2A2A] shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 py-2 z-50 max-h-[70vh] overflow-y-auto">
              {LOCATION_PAGES.map((loc) => (
                <Link
                  key={loc.urlSlug}
                  href={loc.urlSlug}
                  className="block px-4 py-2.5 text-xs text-gray-300 hover:bg-[#222222] hover:text-[#F04E23] transition-colors border-b border-[#222222] last:border-none"
                >
                  {loc.pageTitle}
                </Link>
              ))}
            </div>
          </div>

          {/* Blogs Link + Dropdown */}
          <div className="relative group">
            <Link
              href="/blog/"
              className="flex items-center gap-1.5 text-xs font-semibold tracking-[0.15em] uppercase text-gray-300 group-hover:text-[#F04E23] transition-colors py-6"
            >
              BLOG <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
            </Link>
            <div className="absolute right-0 top-full w-80 bg-[#181818] border border-[#2A2A2A] shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 py-2 z-50 max-h-[70vh] overflow-y-auto">
              <Link
                href="/blog/"
                className="block px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#F04E23] hover:bg-[#222222] border-b border-[#2A2A2A]"
              >
                All Blog Articles →
              </Link>
              {BLOG_POSTS.map((b) => (
                <Link
                  key={b.urlSlug}
                  href={b.urlSlug}
                  className="block px-4 py-2.5 text-xs text-gray-300 hover:bg-[#222222] hover:text-[#F04E23] transition-colors border-b border-[#222222] last:border-none"
                >
                  {b.pageTitle}
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/contact/"
            className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-300 hover:text-[#F04E23] transition-colors"
          >
            CONTACT
          </Link>
        </nav>

        {/* Right Phone CTA Only */}
        <div className="hidden lg:flex items-center">
          <a
            href={BUSINESS_INFO.phoneHref}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 border border-white/30 hover:border-[#F04E23] hover:bg-[#F04E23] text-white text-xs font-semibold tracking-[0.12em] uppercase transition-all duration-200"
          >
            <Phone className="w-3.5 h-3.5 text-[#F04E23] group-hover:text-white" />
            <span>{BUSINESS_INFO.phone}</span>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-3 lg:hidden">
          <a
            href={BUSINESS_INFO.phoneHref}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#F04E23] text-white text-xs font-bold uppercase tracking-wider"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call</span>
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Menu"
            className="p-2 text-gray-300 hover:text-white border border-[#2A2A2A]"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#151515] border-b border-[#2A2A2A] px-4 pt-3 pb-6 space-y-2 max-h-[82vh] overflow-y-auto">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="block py-2.5 text-sm font-bold uppercase tracking-wider text-white border-b border-[#242424]"
          >
            Home
          </Link>

          {/* Mobile Services */}
          <div className="border-b border-[#242424]">
            <button
              type="button"
              onClick={() => setMobileSection(mobileSection === "services" ? null : "services")}
              className="w-full flex items-center justify-between py-2.5 text-sm font-bold uppercase tracking-wider text-white"
            >
              <span>Services</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  mobileSection === "services" ? "rotate-180 text-[#F04E23]" : ""
                }`}
              />
            </button>
            {mobileSection === "services" && (
              <div className="pl-3 pb-3 space-y-2">
                {SERVICE_PAGES.map((s) => (
                  <Link
                    key={s.urlSlug}
                    href={s.urlSlug}
                    onClick={() => setMobileOpen(false)}
                    className="block py-1.5 text-xs text-gray-300 hover:text-[#F04E23]"
                  >
                    {s.pageTitle}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Locations */}
          <div className="border-b border-[#242424]">
            <button
              type="button"
              onClick={() => setMobileSection(mobileSection === "locations" ? null : "locations")}
              className="w-full flex items-center justify-between py-2.5 text-sm font-bold uppercase tracking-wider text-white"
            >
              <span>Locations</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  mobileSection === "locations" ? "rotate-180 text-[#F04E23]" : ""
                }`}
              />
            </button>
            {mobileSection === "locations" && (
              <div className="pl-3 pb-3 space-y-2">
                {LOCATION_PAGES.map((loc) => (
                  <Link
                    key={loc.urlSlug}
                    href={loc.urlSlug}
                    onClick={() => setMobileOpen(false)}
                    className="block py-1.5 text-xs text-gray-300 hover:text-[#F04E23]"
                  >
                    {loc.pageTitle}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Blog */}
          <div className="border-b border-[#242424]">
            <button
              type="button"
              onClick={() => setMobileSection(mobileSection === "blog" ? null : "blog")}
              className="w-full flex items-center justify-between py-2.5 text-sm font-bold uppercase tracking-wider text-white"
            >
              <span>Blog</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  mobileSection === "blog" ? "rotate-180 text-[#F04E23]" : ""
                }`}
              />
            </button>
            {mobileSection === "blog" && (
              <div className="pl-3 pb-3 space-y-2">
                <Link
                  href="/blog/"
                  onClick={() => setMobileOpen(false)}
                  className="block py-1.5 text-xs font-bold text-[#F04E23]"
                >
                  All Blog Posts →
                </Link>
                {BLOG_POSTS.map((b) => (
                  <Link
                    key={b.urlSlug}
                    href={b.urlSlug}
                    onClick={() => setMobileOpen(false)}
                    className="block py-1.5 text-xs text-gray-300 hover:text-[#F04E23]"
                  >
                    {b.pageTitle}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/contact/"
            onClick={() => setMobileOpen(false)}
            className="block py-2.5 text-sm font-bold uppercase tracking-wider text-white border-b border-[#242424]"
          >
            Contact
          </Link>

          <div className="pt-3">
            <a
              href={BUSINESS_INFO.phoneHref}
              className="w-full inline-flex items-center justify-center gap-2 py-3 bg-[#F04E23] text-white text-xs font-bold uppercase tracking-widest"
            >
              <Phone className="w-4 h-4" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
