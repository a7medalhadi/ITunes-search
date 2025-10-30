export interface ITunesSearchResponse {
  resultCount: number;
  results: ITunesPodcast[];
}

export interface ITunesPodcast {
  trackId: number;
  trackName?: string;
  collectionName?: string;
  artistName?: string;
  trackViewUrl?: string;
  collectionViewUrl?: string;
  artworkUrl100?: string;
  artworkUrl600?: string;
  feedUrl?: string;
  country?: string;
  primaryGenreName?: string;
  trackCount?: number;
}
