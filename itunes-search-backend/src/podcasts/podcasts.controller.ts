import { Controller, Get, Query } from '@nestjs/common';
import { PodcastsService } from './podcasts.service';
import { SearchQueryDto, PodcastResponseDto } from './dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiExtraModels,
} from '@nestjs/swagger';

@ApiTags('podcasts')
@ApiExtraModels(PodcastResponseDto)
@Controller('podcasts')
export class PodcastsController {
  constructor(private readonly podcastsService: PodcastsService) {}

  /**
   * Search podcasts from iTunes API and store them in database
   * @param query The search query
   * @returns An array of podcasts
   */
  @Get('search')
  @ApiOperation({
    summary: 'Search podcasts from iTunes API',
    description:
      'Searches for podcasts using the iTunes Search API based on a search term, ' +
      'stores the results in the database, and returns all stored podcasts matching the search. ',
  })
  @ApiQuery({
    name: 'term',
    description: 'Search term to find podcasts (supports English and Arabic)',
    example: 'فنجان',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved and stored podcasts',
    type: PodcastResponseDto,
    isArray: true,
  })
  @ApiBadRequestResponse({
    description: 'Invalid search term or validation error',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error or iTunes API failure',
  })
  async searchPodcasts(
    @Query() query: SearchQueryDto,
  ): Promise<PodcastResponseDto[]> {
    const podcasts = await this.podcastsService.searchAndStorePodcasts(
      query.term,
    );

    return podcasts;
  }
}
