import { Module } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Movie])],
    providers: [MoviesService],
    controllers: [MoviesController],
})
export class MoviesModule { }
