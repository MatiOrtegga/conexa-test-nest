import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { MovieAlreadyExists, MovieNotFound } from './errors/movie.error';

@Injectable()
export class MoviesService {
    private readonly logger = new Logger(MoviesService.name);
    constructor(
        @InjectRepository(Movie) private moviesRepository: Repository<Movie>,
    ) { }

    async findAll(): Promise<Movie[]> {
        const movies = await this.moviesRepository.find();
        if (movies.length === 0) {
            this.logger.warn('No movies found');
        } else {
            this.logger.log(`Retrieved ${movies.length} movies`);
        }
        return movies;
    }
    async findOne(id: number): Promise<Movie> {
        const movie = await this.moviesRepository.findOne({ where: { id } });

        if (!movie) {
            this.logger.error(`Movie with ID ${id} not found`);
            throw new MovieNotFound();
        }
        this.logger.log(`Movie with ID ${id} retrieved successfully`);
        return movie;
    }

    async create(movieData: Partial<Movie>): Promise<Movie> {
        try {
            const movieExists = await this.moviesRepository.findOne({ where: { title: movieData.title } });

            if (movieExists) {
                this.logger.error(`Movie with ID ${movieData.id} already exists`);
                throw new MovieAlreadyExists();
            }

            const movie = this.moviesRepository.create(movieData);
            this.logger.log(`Movie with ID ${movie.id} created successfully`);
            return this.moviesRepository.save(movie);
        }
        catch (error) {
            this.logger.error(`Failed to create movie: ${error.message}`);
            throw error;
        }
    }

    async update(id: number, movieData: Partial<Movie>): Promise<Movie> {
        try {
            const movie = await this.findOne(id);
            const updatedMovie = this.moviesRepository.merge(movie, movieData);
            this.logger.log(`Movie with ID ${id} updated successfully`);
            return this.moviesRepository.save(updatedMovie);
        }
        catch (error) {
            this.logger.error(`Failed to update movie with ID ${id}: ${error.message}`);
            throw error;
        }
    }

    async remove(id: number): Promise<void> {
        try {
            const movie = await this.findOne(id);
            await this.moviesRepository.remove(movie);
            this.logger.log(`Movie with ID ${id} deleted successfully`);
        }
        catch (error) {
            this.logger.error(`Failed to delete movie with ID ${id}: ${error.message}`);
            throw error;
        }
    }

}
