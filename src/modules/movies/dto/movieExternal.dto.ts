import { ApiProperty } from '@nestjs/swagger';

export class MoviePropertiesDto {
    @ApiProperty({ type: [String] })
    starships: string[];

    @ApiProperty({ type: [String] })
    vehicles: string[];

    @ApiProperty({ type: [String] })
    planets: string[];

    @ApiProperty()
    producer: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    episode_id: number;

    @ApiProperty()
    director: string;

    @ApiProperty()
    release_date: string;

    @ApiProperty()
    opening_crawl: string;

    @ApiProperty({ type: [String] })
    characters: string[];

    @ApiProperty({ type: [String] })
    species: string[];

    @ApiProperty()
    url: string;
}

export class MovieResultDto {
    @ApiProperty()
    _id: string;

    @ApiProperty()
    description: string;

    @ApiProperty({ type: MoviePropertiesDto })
    properties: MoviePropertiesDto;
}

export class MovieResponseDto {
    @ApiProperty()
    message: string;

    @ApiProperty({ type: MovieResultDto })
    result: MovieResultDto[];
}
