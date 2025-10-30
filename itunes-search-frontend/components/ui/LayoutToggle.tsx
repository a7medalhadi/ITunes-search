"use client";

import GridIcon from "@/public/icons/grid.svg";
import CarouselIcon from "@/public/icons/carousel.svg";
import { Button } from "@/components/ui/Button";
import { PodcastLayout } from "@/lib/hooks/useLayoutToggle";

export type LayoutToggleProps = {
  layout: PodcastLayout;
  onLayoutChange: (layout: PodcastLayout) => void;
};

export const LayoutToggle = ({ layout, onLayoutChange }: LayoutToggleProps) => {
  return (
    <div className="flex items-center gap-1 p-1 bg-muted rounded-lg w-fit">
      <Button
        onClick={() => onLayoutChange("grid")}
        className={`
          flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors
          ${
            layout === "grid"
              ? "bg-background text-foreground "
              : "bg-background/50 text-foreground/50 "
          }
        `}
        aria-label="Show as grid"
      >
        <GridIcon className="w-4 h-4" />
        <span className="hidden sm:inline">شبكة</span>
      </Button>

      <Button
        onClick={() => onLayoutChange("carousel")}
        className={`
          flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors
          ${
            layout === "carousel"
              ? "bg-background text-foreground "
              : "bg-background/50 text-foreground/50 "
          }
        `}
        aria-label="Show as carousel"
      >
        <CarouselIcon className="w-4 h-4" />
        <span className="hidden sm:inline">عرض شرائح</span>
      </Button>
    </div>
  );
};
