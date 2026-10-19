import React from "react";
import Link from "next/link";
import { Phone, MapPin, Flame } from "lucide-react";
import { BUSINESS_INFO, SERVICE_PAGES, LOCATION_PAGES, BLOG_POSTS } from "@/data/siteContent";

export default function Footer() {
  return (
    <footer className="bg-[#0D0D0D] border-t border-[#222222] text-gray-400">
      {/* Visible Google Map Section in Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10 border-b border-[#202020]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-[#F04E23] flex items-center justify-center text-white">
                <Flame className="w-4 h-4" />
              </span>
              <span className="font-display text-2xl font-bold uppercase tracking-wider text-white">
                {BUSINESS_INFO.name}
              </span>
            </div>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#F04E23] shrink-0 mt-1" />
                <span>{BUSINESS_INFO.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#F04E23] shrink-0" />
                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="text-white font-semibold hover:text-[#F04E23] transition-colors"
                >
                  {BUSINESS_INFO.phone}
                </a>
              </div>
            </div>
            <div className="pt-2">
              <a
                href={BUSINESS_INFO.phoneHref}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#F04E23] hover:bg-[#FF6238] text-white text-xs font-bold uppercase tracking-[0.14em] transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Call {BUSINESS_INFO.phone}</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="w-full overflow-hidden border border-[#2A2A2A] bg-[#161616] shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4027.3887379777166!2d-96.9973167!3d32.48198539999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ab6264394cb84b7%3A0xf83a233feac0a974!2sAshford%20Chimney%20Sweep%20Midlothian!5e1!3m2!1sen!2sph!4v1792410103504!5m2!1sen!2sph"
                width="600"
                height="450"
                style={{ border: 0, width: "100%", height: "340px", display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title={BUSINESS_INFO.name}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Links Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Services Column */}
        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-[0.15em] text-white mb-4">
            Services
          </h3>
          <ul className="space-y-2 text-xs">
            {SERVICE_PAGES.map((s) => (
              <li key={s.urlSlug}>
                <Link
                  href={s.urlSlug}
                  className="text-gray-400 hover:text-[#F04E23] transition-colors"
                >
                  {s.pageTitle}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Locations Column */}
        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-[0.15em] text-white mb-4">
            Locations
          </h3>
          <ul className="space-y-2 text-xs">
            {LOCATION_PAGES.map((loc) => (
              <li key={loc.urlSlug}>
                <Link
                  href={loc.urlSlug}
                  className="text-gray-400 hover:text-[#F04E23] transition-colors"
                >
                  {loc.pageTitle}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Blog Column */}
        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-[0.15em] text-white mb-4">
            Blog
          </h3>
          <ul className="space-y-2 text-xs">
            {BLOG_POSTS.map((b) => (
              <li key={b.urlSlug}>
                <Link
                  href={b.urlSlug}
                  className="text-gray-400 hover:text-[#F04E23] transition-colors"
                >
                  {b.pageTitle}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-[#1E1E1E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] uppercase tracking-widest text-gray-500">
          <p>© {new Date().getFullYear()} {BUSINESS_INFO.name}.</p>
          <p>{BUSINESS_INFO.address}</p>
        </div>
      </div>
    </footer>
  );
}
