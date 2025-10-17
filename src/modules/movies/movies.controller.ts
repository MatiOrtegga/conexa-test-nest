import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {

    constructor(private readonly moviesService: MoviesService) { }

    @Get()
    async GetAllMovies() {
        return "movies";
    }

    @Get(':id')
    async GetMovieById(@Param('id') id: string) {
        return `movie by id ${id}`;
    }

    @Post()
    async CreateMovie() {
        return "create movie";
    }

    @Put()
    async UpdateMovie() {
        return "update movie";
    }

    @Delete(':id')
    async DeleteMovieById(@Param('id') id: string) {
        return `delete movie by id ${id}`;
    }
}
