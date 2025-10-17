import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsOptional, MinLength } from "class-validator";

export class CreateMovieDto {
    @ApiPropertyOptional()
    @IsOptional()
    externalId?: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(10)
    title: string;

    @ApiProperty()
    @IsOptional()
    source?: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(10)
    director: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(10)
    producer: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    releaseDate: Date;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(10)
    description: string;

    @ApiProperty()
    @IsOptional()
    metadata?: Record<string, any> | null;
}