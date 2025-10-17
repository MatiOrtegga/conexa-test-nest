import { Test, TestingModule } from '@nestjs/testing';
import { MoviesExternalService } from './movies.external.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { ExternalMovieAdapter } from './adapters/external-movie.adapter';

describe('MoviesExternalService', () => {
  let service: MoviesExternalService;
  let movieRepository: jest.Mocked<Repository<Movie>>;
  let httpService: jest.Mocked<HttpService>;
  let externalMovieAdapter: jest.Mocked<ExternalMovieAdapter>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesExternalService,
        {
          provide: getRepositoryToken(Movie),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: ExternalMovieAdapter,
          useValue: {
            adapt: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MoviesExternalService>(MoviesExternalService);
    movieRepository = module.get(getRepositoryToken(Movie));
    httpService = module.get(HttpService);
    externalMovieAdapter = module.get(ExternalMovieAdapter);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


});
