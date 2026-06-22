"use client";

import { MarqueeTrack } from "@/components/ui/MarqueeTrack";
import { marqueeItems } from "@/lib/data";

function StarIcon() {
  return (
    <svg
      className="w-[14px] h-[14px] lg:w-[23px] lg:h-[23px]"
      viewBox="0 0 20 20"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 1L12.39 7.26L19 7.27L13.78 11.14L15.73 17.5L10 13.77L4.27 17.5L6.22 11.14L1 7.27L7.61 7.26L10 1Z" />
    </svg>
  );
}

function StripeItem({ text }: { text: string }) {
  return (
    <span className="flex items-center gap-4 mx-8 whitespace-nowrap">
      <StarIcon />
      <span className="font-bold text-[17px] lg:text-[32px]">{text}</span>
    </span>
  );
}

export default function MarqueeSection() {
  return (
    <section
      className="relative overflow-visible bg-transparent h-[180px] lg:h-[300px] flex items-center justify-center -mt-[45px] lg:-mt-[50px] z-30"
      aria-label="Skills ticker"
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* STRIPE 2 — Lime background, scrolls RIGHT (Behind) */}
        <div className="absolute w-[120vw] bg-[#c8f135] text-black py-3 lg:py-5 overflow-hidden rotate-[8deg] lg:rotate-[4.5deg] z-10 shadow-lg">
          <MarqueeTrack speed={30} direction="right">
            {marqueeItems.map((text) => (
              <StripeItem key={`l-${text}`} text={text} />
            ))}
          </MarqueeTrack>
        </div>

        {/* STRIPE 1 — White background, scrolls LEFT (In front) */}
        <div className="absolute w-[120vw] bg-white text-black py-3 lg:py-5 overflow-hidden -rotate-[8deg] lg:-rotate-[4.5deg] z-20 shadow-xl">
          <MarqueeTrack speed={30} direction="left">
            {marqueeItems.map((text) => (
              <StripeItem key={`w-${text}`} text={text} />
            ))}
          </MarqueeTrack>
        </div>
      </div>
    </section>
  );
}
