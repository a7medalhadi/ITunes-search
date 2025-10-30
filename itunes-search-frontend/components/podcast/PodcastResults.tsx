import { Grid, Carousel, LayoutToggle } from "@/components/ui";
import { PodcastCard } from "./PodcastCard";
import type { Podcast } from "@/lib/types/Podcast";
import { useLayoutToggle } from "@/lib/hooks/useLayoutToggle";

type PodcastResultsProps = {
  podcasts: Podcast[];
}

export const PodcastResults = ({ podcasts }: PodcastResultsProps) => {
  const { layout, setLayout } = useLayoutToggle();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-lg text-muted-foreground">
          تم العثور على{" "}
          <span className="font-semibold text-foreground">
            {podcasts.length}
          </span>{" "}
          نتيجة
        </p>

        <LayoutToggle layout={layout} onLayoutChange={setLayout} />
      </div>

      {layout === "grid" ? (
        <Grid
          items={podcasts}
          renderItem={(podcast) => (
            <PodcastCard key={podcast.id} podcast={podcast} />
          )}
        />
      ) : (
        <Carousel
          items={podcasts}
          renderItem={(podcast) => (
            <PodcastCard key={podcast.id} podcast={podcast} />
          )}
        />
      )}
    </div>
  );
}