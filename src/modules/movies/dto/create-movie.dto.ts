import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsOptional, MinLength } from "class-validator";

export class CreateMovieDto {
    @ApiPropertyOptional({ description: 'External identifier of the movie (e.g., IMDB or SWAPI ID).' })
    @IsOptional()
    externalId?: string;

    @ApiProperty({ description: 'Title of the movie (minimum 10 characters).' })
    @IsNotEmpty()
    @MinLength(10)
    title: string;

    @ApiProperty({ description: 'Source or platform from which the movie data originates.' })
    @IsOptional()
    source?: string;

    @ApiProperty({ description: 'Name of the movie director (minimum 10 characters).' })
    @IsNotEmpty()
    @MinLength(10)
    director: string;

    @ApiProperty({ description: 'Name of the movie producer (minimum 10 characters).' })
    @IsNotEmpty()
    @MinLength(10)
    producer: string;

    @ApiProperty({ description: 'Official release date of the movie.' })
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    releaseDate: Date;

    @ApiProperty({ description: 'Brief description or synopsis of the movie (minimum 10 characters).' })
    @IsNotEmpty()
    @MinLength(10)
    description: string;

    @ApiProperty({ description: 'Additional metadata or key-value information related to the movie.' })
    @IsOptional()
    metadata?: Record<string, any> | null;
}
