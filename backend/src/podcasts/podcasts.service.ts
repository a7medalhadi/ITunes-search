import {
  Injectable,
  Logger,
  InternalServerErrorException,
  BadRequestException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, In } from "typeorm";
import axios, { AxiosError } from "axios";
import { Podcast } from "./entities/podcast.entity";
import {
  ITunesSearchResponse,
  ITunesPodcast,
} from "./interfaces/itunes-response.interface";

@Injectable()
export class PodcastsService {
  private readonly logger = new Logger(PodcastsService.name);
  private readonly ITUNES_API_URL = process.env.ITUNES_API!;
  private readonly AXIOS_TIMEOUT = 10000; // 10 seconds
  private readonly MAX_RESULTS = 50;

  constructor(
    @InjectRepository(Podcast)
    private podcastRepository: Repository<Podcast>
  ) {}

  /**
   * Search for podcasts in iTunes API and store them in the database
   * @param searchTerm The search term to find podcasts
   * @returns An array of podcasts
   */
  async searchAndStorePodcasts(searchTerm: string): Promise<Podcast[]> {
    try {
      const iTunesPodcasts = await this.fetchFromITunesAPI(searchTerm);

      if (!iTunesPodcasts || iTunesPodcasts.length === 0) {
        return [];
      }

      const trackIds = iTunesPodcasts.map((podcast) => podcast.trackId);

      const podcastsToUpsert = iTunesPodcasts.map((item) =>
        this.mapITunesPodcastToEntity(item)
      );

      // Using upsert for bulk insert/update operation - much more efficient than reguler save
      await this.podcastRepository.upsert(podcastsToUpsert, ["trackId"]);

      const storedPodcasts = await this.podcastRepository.find({
        where: { trackId: In(trackIds) },
        order: { createdAt: "DESC" },
      });

      return storedPodcasts;
    } catch (error) {
      this.logger.error(
        `Error searching and storing podcasts: ${error instanceof Error ? error.message : "Unknown"}`
      );
      throw error;
    }
  }

  /**
   * Fetch podcasts from iTunes API with proper error handling and timeout
   * @param searchTerm The search term to find podcasts
   * @returns An array of podcasts
   */
  private async fetchFromITunesAPI(
    searchTerm: string
  ): Promise<ITunesPodcast[]> {
    try {
      const response = await axios.get<ITunesSearchResponse>(
        this.ITUNES_API_URL,
        {
          params: {
            term: searchTerm,
            media: "podcast",
            entity: "podcast",
            limit: this.MAX_RESULTS,
          },
          timeout: this.AXIOS_TIMEOUT,
          validateStatus: (status) => status === 200,
        }
      );

      if (!response.data || !Array.isArray(response.data.results)) {
        throw new InternalServerErrorException(
          "Invalid response from iTunes API"
        );
      }

      return response.data.results;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;

        if (axiosError.code === "ECONNABORTED") {
          throw new InternalServerErrorException(
            "iTunes API request timeout. Please try again."
          );
        }

        if (axiosError.response?.status === 429) {
          throw new BadRequestException(
            "Too many requests. Please try again later."
          );
        }

        if (axiosError.response?.status) {
          throw new InternalServerErrorException(
            "Failed to fetch podcasts from iTunes API"
          );
        }

        if (axiosError.request) {
          throw new InternalServerErrorException(
            "No response from iTunes API. Please check your internet connection."
          );
        }
      }

      // Re-throw the error if it's already an internal server error or bad request exception
      if (
        error instanceof BadRequestException ||
        error instanceof InternalServerErrorException
      ) {
        throw error;
      }

      // Unknown error
      throw new InternalServerErrorException(
        "An unexpected error occurred while fetching podcasts"
      );
    }
  }

  /**
   * Map iTunes podcast data to Podcast entity
   * @param item The iTunes podcast data
   * @returns The Podcast entity
   */
  private mapITunesPodcastToEntity(item: ITunesPodcast): Partial<Podcast> {
    return {
      trackId: item.trackId,
      trackName: item.trackName || item.collectionName,
      artistName: item.artistName,
      collectionName: item.collectionName,
      trackViewUrl: item.trackViewUrl || item.collectionViewUrl,
      artworkUrl100: item.artworkUrl100,
      artworkUrl600: item.artworkUrl600,
      feedUrl: item.feedUrl,
      country: item.country,
      primaryGenreName: item.primaryGenreName,
      trackCount: item.trackCount,
    };
  }
}
