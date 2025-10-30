"use client";

import React, { useRef } from "react";
import ChevronLeft from "@/public/icons/chevron-left.svg";
import ChevronRight from "@/public/icons/chevron-right.svg";
import { Button } from "./Button";

type CarouselProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  cardWidth?: string;
};

export const Carousel = <T,>({
  items,
  renderItem,
  cardWidth = "w-80",
}: CarouselProps<T>) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return;

    const firstCard = carouselRef.current.querySelector("[data-carousel-card]");
    if (firstCard) {
      const cardWidth = firstCard.getBoundingClientRect().width;
      const gap = 24; // px
      const scrollAmount = cardWidth + gap;

      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative" role="region" aria-label="Carousel">
      <Button
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10
                   bg-white border border-gray-200 rounded-full p-2 shadow
                   disabled:opacity-50 text-gray-700"
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>

      <Button
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10
                   bg-white border border-gray-200 rounded-full p-2 shadow
                   disabled:opacity-50 text-gray-700"
        aria-label="Scroll right"
      >
        <ChevronRight className="w-5 h-5" />
      </Button>

      <div
        ref={carouselRef}
        className="flex gap-6 overflow-x-auto scroll-smooth px-12"
      >
        {items.map((item, index) => (
          <div
            key={index}
            className={`flex-none ${cardWidth}`}
            data-carousel-card
          >
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    </div>
  );
};
