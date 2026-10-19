import type { Metadata } from "next";
import { Phone, MapPin, ArrowRight } from "lucide-react";
import { BUSINESS_INFO, HOMEPAGE_DATA } from "@/data/siteContent";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: `Contact | ${BUSINESS_INFO.name}`,
  description: HOMEPAGE_DATA.metaDescription,
};

export default function ContactPage() {
  const ctaSection =
    HOMEPAGE_DATA.parsed.sections[HOMEPAGE_DATA.parsed.sections.length - 1];

  return (
    <div className="bg-[#111111] text-white min-h-screen py-14 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Split: Contact Details + Hero Image */}
        <Reveal className="bg-[#181818] border border-[#282828] p-8 sm:p-12 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-[#F04E23] text-xs font-bold uppercase tracking-[0.2em]">
              <span className="w-2 h-2 rounded-full bg-[#F04E23]" />
              <span>{BUSINESS_INFO.name}</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl font-bold uppercase text-white leading-tight">
              {ctaSection.title}
            </h1>

            <p className="text-sm sm:text-base text-[#A8A8A8] leading-relaxed">
              {ctaSection.leadParagraphs[0]}
            </p>

            {/* Address & Phone Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-[#121212] border border-[#262626] p-6 space-y-3">
                <div className="w-10 h-10 bg-[#F04E23] text-white flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="font-display text-sm font-bold uppercase tracking-wider text-gray-400">
                  Address
                </div>
                <p className="text-sm sm:text-base text-white font-medium leading-relaxed">
                  {BUSINESS_INFO.address}
                </p>
              </div>

              <div className="bg-[#121212] border border-[#262626] p-6 space-y-3">
                <div className="w-10 h-10 bg-[#F04E23] text-white flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="font-display text-sm font-bold uppercase tracking-wider text-gray-400">
                  Phone
                </div>
                <div>
                  <a
                    href={BUSINESS_INFO.phoneHref}
                    className="font-display text-2xl font-bold text-white hover:text-[#F04E23] transition-colors"
                  >
                    {BUSINESS_INFO.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Phone CTA Button */}
            <div className="pt-2">
              <a
                href={BUSINESS_INFO.phoneHref}
                className="btn-pulse inline-flex items-center gap-3 px-8 py-4 bg-[#F04E23] hover:bg-[#FF6238] text-white text-xs sm:text-sm font-bold uppercase tracking-[0.16em] transition-all shadow-lg shadow-[#F04E23]/25"
              >
                <Phone className="w-4 h-4" />
                <span>Call {BUSINESS_INFO.phone}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 aspect-[4/3] lg:aspect-square overflow-hidden border border-[#2A2A2A] bg-[#111111]">
            <img
              src={HOMEPAGE_DATA.heroImage}
              alt={BUSINESS_INFO.name}
              className="w-full h-full object-cover"
            />
          </div>
        </Reveal>

        {/* Full-Width Visible Google Map on Contact Page */}
        <Reveal delayMs={150} className="bg-[#181818] border border-[#282828] p-4 sm:p-6">
          <div className="w-full overflow-hidden border border-[#2A2A2A] bg-[#111111]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4027.3887379777166!2d-96.9973167!3d32.48198539999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ab6264394cb84b7%3A0xf83a233feac0a974!2sAshford%20Chimney%20Sweep%20Midlothian!5e1!3m2!1sen!2sph!4v1792410103504!5m2!1sen!2sph"
              width="600"
              height="450"
              style={{ border: 0, width: "100%", height: "450px", display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title={BUSINESS_INFO.name}
            />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
