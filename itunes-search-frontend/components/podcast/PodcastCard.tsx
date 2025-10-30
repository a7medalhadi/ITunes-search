import Image from "next/image";
import { Podcast } from "@/lib/types/Podcast";

type PodcastCardProps = {
  podcast: Podcast;
};

export const PodcastCard = ({ podcast }: PodcastCardProps) => (
  <div
    className="
      group bg-card rounded-xl border border-border
      hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10
      transition-all duration-300 overflow-hidden
    "
  >
    <div className="aspect-square bg-muted overflow-hidden relative">
      <Image
        src={
          podcast.artworkUrl600 || podcast.artworkUrl100 || "/placeholder.svg"
        }
        alt={podcast.trackName}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-300"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>

    <div className="p-4 space-y-3">
      {podcast.collectionName && (
        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {podcast.collectionName}
        </h3>
      )}
      {podcast.artistName && (
        <p className="text-sm text-muted-foreground line-clamp-1">
          {podcast.artistName}
        </p>
      )}

      <div className="flex flex-wrap gap-2 items-center">
        {podcast.primaryGenreName && (
          <span className="text-xs font-medium bg-secondary text-secondary-foreground px-2.5 py-1 rounded-full">
            {podcast.primaryGenreName}
          </span>
        )}
        {podcast.trackCount && (
          <span className="text-xs text-muted-foreground">
            {podcast.trackCount} حلقة
          </span>
        )}
      </div>
    </div>
  </div>
);
