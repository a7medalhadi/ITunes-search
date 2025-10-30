import MusicIcon from "@/public/icons/music.svg";
import SearchIcon from "@/public/icons/search.svg";
import PodcastIcon from "@/public/icons/podcast.svg";

type ErrorStateProps = {
  error: Error | null;
}

export const ErrorState = ({ error }: ErrorStateProps) => (
  <div className="text-center py-16 space-y-4">
    <div className="inline-flex w-16 h-16 rounded-full bg-destructive/10 items-center justify-center">
      <MusicIcon className="w-8 h-8 text-destructive" />
    </div>
    <div>
      <p className="text-lg font-medium text-destructive">
        حدث خطأ أثناء البحث
      </p>
      {error && <p className="text-muted-foreground mt-2">{error.message}</p>}
      <p className="text-muted-foreground mt-2">يرجى المحاولة مرة أخرى</p>
    </div>
  </div>
);

type EmptyStateProps = {
  debouncedSearch: string;
}

export const EmptyState = ({ debouncedSearch }: EmptyStateProps) => (
  <div className="text-center py-24 space-y-6">
    <div className="inline-flex w-20 h-20 rounded-full bg-muted items-center justify-center">
      <SearchIcon className="w-10 h-10 text-muted-foreground" />
    </div>
    <div>
      <p className="text-xl font-medium text-foreground">
        لم يتم العثور على نتائج عن {debouncedSearch}
      </p>
      <p className="text-muted-foreground mt-2">جرب البحث بكلمات مختلفة</p>
    </div>
  </div>
);

export const InitialState = () => (
  <div className="text-center py-24 space-y-6">
    <div className="inline-flex w-20 h-20 rounded-full bg-primary/20 items-center justify-center">
      <PodcastIcon className="w-10 h-10 text-primary" />
    </div>
    <div>
      <p className="text-xl font-medium text-foreground">
        ابدأ البحث عن البودكاست المفضل لديك
      </p>
      <p className="text-muted-foreground mt-2">
        استخدم شريط البحث أعلاه للعثور على البودكاست
      </p>
    </div>
  </div>
);
