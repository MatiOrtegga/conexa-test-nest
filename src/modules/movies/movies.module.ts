import { Module } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { MoviesExternalService } from './movies.external.service';
import { HttpModule } from '@nestjs/axios';
import { ExternalMovieAdapter } from './adapters/external-movie.adapter';

@Module({
    imports: [
        TypeOrmModule.forFeature([Movie]),
        HttpModule
    ],
    providers: [MoviesService, MoviesExternalService, ExternalMovieAdapter],
    controllers: [MoviesController],
})
export class MoviesModule { }
