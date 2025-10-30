import PodcastIcon from "@/public/icons/podcast.svg";
import { Input } from "@/components/ui";
import SearchIcon from "@/public/icons/search.svg";
import LoaderIcon from "@/public/icons/loader.svg";

type PodcastHeaderProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  isSearching: boolean;
}

export const PodcastHeader = ({
  searchTerm,
  onSearchChange,
  isSearching,
}: PodcastHeaderProps) => (
  <header className="sticky top-0 z-10 border-b border-border bg-card/50 backdrop-blur-sm">
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg">
            <PodcastIcon className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">بحث البودكاست</h1>
        </div>
        <div className="flex-1 relative">
          <Input
            type="text"
            placeholder="ابحث عن بودكاست..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-14 text-lg pr-14 bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-ring"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
            {isSearching ? (
              <LoaderIcon className="h-5 w-5 text-primary animate-spin" />
            ) : (
              <SearchIcon className="h-5 w-5 text-primary" />
            )}
          </div>
        </div>
      </div>
    </div>
  </header>
);
