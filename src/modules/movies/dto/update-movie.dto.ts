import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsOptional, MinLength } from "class-validator";

export class UpdateMovieDto {
    @ApiPropertyOptional({ description: 'External identifier of the movie (e.g., IMDB or SWAPI ID).' })
    @IsOptional()
    externalId?: string;

    @ApiPropertyOptional({ description: 'Updated title of the movie (minimum 2 characters).' })
    @IsOptional()
    @MinLength(2)
    title?: string;

    @ApiPropertyOptional({ description: 'Updated source or platform from which the movie data originates.' })
    @IsOptional()
    @MinLength(2)
    source?: string;

    @ApiPropertyOptional({ description: 'Updated name of the movie director (minimum 2 characters).' })
    @IsOptional()
    @MinLength(2)
    director?: string;

    @ApiPropertyOptional({ description: 'Updated name of the movie producer (minimum 2 characters).' })
    @IsOptional()
    @MinLength(2)
    producer?: string;

    @ApiPropertyOptional({ description: 'Updated official release date of the movie.', type: String, format: 'date' })
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    releaseDate?: Date;

    @ApiPropertyOptional({ description: 'Updated brief description or synopsis of the movie (minimum 10 characters).' })
    @IsOptional()
    @MinLength(10)
    description?: string;

    @ApiPropertyOptional({ description: 'Updated additional metadata or key-value information related to the movie.', type: Object })
    @IsOptional()
    metadata?: Record<string, any>;
}
