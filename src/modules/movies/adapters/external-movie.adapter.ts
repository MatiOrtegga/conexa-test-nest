import { Injectable } from "@nestjs/common";
import { MovieResponseDto } from "../dto/movieExternal.dto";
import { Movie } from "../entities/movie.entity";

@Injectable()
export class ExternalMovieAdapter {

    parseToEntity(externalData: MovieResponseDto): Movie[] {
        const movies: Movie[] = externalData.result.map(item => {
            const movie = new Movie();
            movie.externalId = item._id;
            movie.source = "SWAPI";
            movie.title = item.properties.title;
            movie.description = item.properties.opening_crawl;
            movie.director = item.properties.director;
            movie.producer = item.properties.producer;
            movie.releaseDate = new Date(item.properties.release_date);
            movie.metadata = {
                starships: item.properties.starships,
                vehicles: item.properties.vehicles,
                planets: item.properties.planets,
                opening_crawl: item.properties.opening_crawl,
                characters: item.properties.characters,
                species: item.properties.species
            }
            return movie;
        });
        return movies;
    }

}