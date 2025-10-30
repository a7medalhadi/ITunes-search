import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class SearchQueryDto {
  @ApiProperty({
    description: 'Search term for finding podcasts in iTunes API',
    example: 'فنجان',
    minLength: 2,
    maxLength: 100,
    type: String,
  })
  @IsString()
  @IsNotEmpty({ message: 'Search term is required' })
  @MinLength(2, { message: 'Search term must be at least 2 characters long' })
  @MaxLength(100, { message: 'Search term must not exceed 100 characters' })
  @Transform(({ value }: { value: string }) => value.trim())
  term: string;
}
