export interface Podcast {
  id: number;
  trackId: number;
  trackName: string;
  artistName: string | null;
  collectionName: string | null;
  trackViewUrl: string | null;
  artworkUrl100: string | null;
  artworkUrl600: string | null;
  feedUrl: string | null;
  country: string | null;
  primaryGenreName: string | null;
  trackCount: number | null;
  createdAt: Date;
  updatedAt: Date;
}
