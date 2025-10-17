import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { MovieResponseDto } from './dto/movieExternal.dto';
import { ExternalMovieAdapter } from './adapters/external-movie.adapter';
import { Movie } from './entities/movie.entity';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MoviesExternalService {
    private readonly logger = new Logger(MoviesExternalService.name);

    constructor(
        @InjectRepository(Movie) private moviesRepository: Repository<Movie>,
        private readonly httpService: HttpService,
        private readonly movieAdapter: ExternalMovieAdapter,
    ) { }

    async getSwapiMovies(): Promise<Movie[]> {
        const { data } = await this.httpService.axiosRef.get<MovieResponseDto>(`https://www.swapi.tech/api/films`);
        const movies = this.movieAdapter.parseToEntity(data);
        return movies;
    }

    async syncSwapiMovies(movies: Movie[]): Promise<void> {
        await Promise.all(
            movies.map(async (movie) => {
                const existing = await this.moviesRepository.findOne({
                    where: { externalId: movie.externalId },
                });
                if (existing) {
                    const merged = this.moviesRepository.merge(existing, movie);
                    await this.moviesRepository.save(merged);
                    this.logger.debug(`Updated movie ${movie.title} from SWAPI`);
                } else {
                    await this.moviesRepository.save(movie);
                    this.logger.debug(`Inserted movie ${movie.title} from SWAPI`);
                }
            }),
        );
    }

    @Cron('45 * * * * *')
    async handleCron() {
        try {
            this.logger.debug('SWAPI sync task started...');
            const movies = await this.getSwapiMovies();
            this.logger.debug(`Fetched ${movies.length} movies from SWAPI`);
            await this.syncSwapiMovies(movies);
            this.logger.debug('SWAPI sync task completed successfully');
        } catch (error) {
            this.logger.error(`SWAPI sync failed: ${error.message}`, error.stack);
        }
    }
}
