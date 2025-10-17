import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { MoviesService } from './movies.service';
import { ApiOperation } from '@nestjs/swagger';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { CreateMovieDto } from './dto/create-movie.dto';

@Controller('movies')
export class MoviesController {

    constructor(private readonly moviesService: MoviesService) { }

    @Public()
    @Get()
    @HttpCode(200)
    @ApiOperation({ summary: 'Get all movies' })
    async getAllMovies() {
        return this.moviesService.findAll();
    }

    @Public()
    @Get(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Get movie by id' })
    async getMovieById(@Param('id') id: string) {
        return this.moviesService.findOne(+id);
    }

    @Public()
    @Post()
    @HttpCode(201)
    @ApiOperation({ summary: 'Create a new movie' })
    async createMovie(@Body() movieData: CreateMovieDto) {
        await this.moviesService.create(movieData);
    }

    @Public()
    @Put(':id')
    @HttpCode(204)
    @ApiOperation({ summary: 'update a existing movie' })
    async updateMovie(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
        await this.moviesService.update(+id, updateMovieDto);
    }

    @Public()
    @HttpCode(204)
    @ApiOperation({ summary: 'delete a existing movie' })
    @Delete(':id')
    async deleteMovieById(@Param('id') id: string) {
        await this.moviesService.remove(+id);
    }
}
