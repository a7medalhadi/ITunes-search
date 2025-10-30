import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class PodcastResponseDto {
  @ApiProperty({ example: 1, description: 'Database ID of the podcast' })
  @Expose()
  id: number;

  @ApiProperty({ example: 1573382503, description: 'iTunes Track ID' })
  @Expose()
  trackId: number;

  @ApiProperty({ example: 'فنجان', description: 'Podcast name' })
  @Expose()
  trackName: string;

  @ApiProperty({ example: 'ثمانية', description: 'Artist/Author name', required: false })
  @Expose()
  artistName: string | null;

  @ApiProperty({ example: 'فنجان', description: 'Collection name', required: false })
  @Expose()
  collectionName: string | null;

  @ApiProperty({
    example: 'https://podcast.com/id1573382503',
    description: 'iTunes URL for the podcast',
    required: false,
  })
  @Expose()
  trackViewUrl: string | null;

  @ApiProperty({
    example: 'https://image.png',
    description: 'Artwork URL (100x100)',
    required: false,
  })
  @Expose()
  artworkUrl100: string | null;

  @ApiProperty({
    example: 'https://image.png',
    description: 'Artwork URL (600x600)',
    required: false,
  })
  @Expose()
  artworkUrl600: string | null;

  @ApiProperty({
    example: 'https://feed.rss',
    description: 'RSS feed URL',
    required: false,
  })
  @Expose()
  feedUrl: string | null;

  @ApiProperty({ example: 'SAU', description: 'Country code', required: false })
  @Expose()
  country: string | null;

  @ApiProperty({
    example: 'Society & Culture',
    description: 'Primary genre name',
    required: false,
  })
  @Expose()
  primaryGenreName: string | null;

  @ApiProperty({ example: 100, description: 'Number of episodes', required: false })
  @Expose()
  trackCount: number | null;

  @ApiProperty({
    example: '2025-01-15T10:30:00.000Z',
    description: 'Date when podcast was added to database',
  })
  @Expose()
  createdAt: Date;

  @ApiProperty({
    example: '2025-01-15T10:30:00.000Z',
    description: 'Date when podcast was last updated',
  })
  @Expose()
  updatedAt: Date;
}
