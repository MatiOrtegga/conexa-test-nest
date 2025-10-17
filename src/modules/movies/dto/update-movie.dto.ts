import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsOptional, MinLength } from "class-validator";

export class UpdateMovieDto {
    @ApiPropertyOptional()
    @IsOptional()
    externalId?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @MinLength(2)
    title?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @MinLength(2)
    source?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @MinLength(2)
    director?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @MinLength(2)
    producer?: string;

    @ApiPropertyOptional({ type: String, format: 'date' })
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    releaseDate?: Date;

    @ApiPropertyOptional()
    @IsOptional()
    @MinLength(10)
    description?: string;

    @ApiPropertyOptional({ type: Object })
    @IsOptional()
    metadata?: Record<string, any>;
}