import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { MoviesService } from './movies.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('movies')
@ApiBearerAuth('access-token')
export class MoviesController {

    constructor(private readonly moviesService: MoviesService) { }

    @Public()
    @Get()
    @HttpCode(200)
    @ApiOperation({ summary: 'Get all movies' })
    async getAllMovies() {
        return this.moviesService.findAll();
    }

    @Roles(['user'])
    @Get(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Get movie by id' })
    async getMovieById(@Param('id') id: string) {
        return this.moviesService.findOne(+id);
    }

    @Roles(['admin'])
    @Post()
    @HttpCode(201)
    @ApiOperation({ summary: 'Create a new movie' })
    async createMovie(@Body() movieData: CreateMovieDto) {
        return await this.moviesService.create(movieData);
    }

    @Roles(['admin'])
    @Put(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'update a existing movie' })
    async updateMovie(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
        return await this.moviesService.update(+id, updateMovieDto);
    }

    @Roles(['admin'])
    @HttpCode(204)
    @ApiOperation({ summary: 'delete a existing movie' })
    @Delete(':id')
    async deleteMovieById(@Param('id') id: string) {
        await this.moviesService.remove(+id);
    }
}
