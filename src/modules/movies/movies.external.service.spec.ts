import { Test, TestingModule } from '@nestjs/testing';
import { MoviesExternalService } from './movies.external.service';
import { HttpService } from '@nestjs/axios';
import { ExternalMovieAdapter } from './adapters/external-movie.adapter';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('MoviesExternalService', () => {
  let service: MoviesExternalService;
  let httpService: jest.Mocked<HttpService>;
  let movieAdapter: jest.Mocked<ExternalMovieAdapter>;
  let movieRepository: jest.Mocked<Repository<Movie>>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesExternalService,
        {
          provide: HttpService,
          useValue: {
            axiosRef: { get: jest.fn() },
          },
        },
        {
          provide: ExternalMovieAdapter,
          useValue: {
            parseToEntity: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Movie),
          useValue: {
            findOne: jest.fn(),
            find: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            merge: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(MoviesExternalService);
    httpService = module.get(HttpService) as jest.Mocked<HttpService>;
    movieAdapter = module.get(ExternalMovieAdapter);
    movieRepository = module.get(getRepositoryToken(Movie));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(httpService).toBeDefined();
    expect(movieAdapter).toBeDefined();
    expect(movieRepository).toBeDefined();
  });

  it('should fetch movies from SWAPI and parse them', async () => {
    const apiResponse = {
      data: {
        result: [
          { properties: { title: 'A New Hope' } },
          { properties: { title: 'The Empire Strikes Back' } },
        ],
      },
    };

    const parsedMovies: Movie[] = [
      { title: 'A New Hope' } as Movie,
      { title: 'The Empire Strikes Back' } as Movie,
    ];

    const axiosMock = { get: jest.fn() };
    (httpService as any).axiosRef = axiosMock;
    axiosMock.get.mockResolvedValue(apiResponse);
    movieAdapter.parseToEntity.mockReturnValue(parsedMovies);

    const result = await service.getSwapiMovies();

    expect(httpService.axiosRef.get).toHaveBeenCalledWith('https://www.swapi.tech/api/films');
    expect(movieAdapter.parseToEntity).toHaveBeenCalledWith(apiResponse.data);
    expect(result).toEqual(parsedMovies);
  });

  it('should insert new movies when they do not exist', async () => {
    const parsedMovies: Movie[] = [
      { externalId: 'tt0076759', title: 'A New Hope' } as Movie,
      { externalId: 'tt0080684', title: 'The Empire Strikes Back' } as Movie,
    ];

    movieRepository.findOne.mockResolvedValue(null);
    (movieRepository.save as any).mockResolvedValue(parsedMovies);

    await service.syncSwapiMovies(parsedMovies);

    expect(movieRepository.save).toHaveBeenCalledTimes(parsedMovies.length);
    expect(movieRepository.merge).not.toHaveBeenCalled();

    expect(movieRepository.save).toHaveBeenCalledWith(expect.objectContaining({ title: 'A New Hope' }));
    expect(movieRepository.save).toHaveBeenCalledWith(expect.objectContaining({ title: 'The Empire Strikes Back' }));
  });

  it('should update movies that already exist', async () => {
    const parsedMovies: Movie[] = [
      { externalId: 'tt0076759', title: 'A New Hope (Remastered)' } as Movie,
    ];

    const existingMovie = { id: 1, externalId: 'tt0076759', title: 'Old Title' } as Movie;

    movieRepository.findOne.mockResolvedValue(existingMovie);
    movieRepository.merge.mockReturnValue({ ...existingMovie, ...parsedMovies[0] });
    movieRepository.save.mockResolvedValue({ ...existingMovie, ...parsedMovies[0] });

    await service.syncSwapiMovies(parsedMovies);

    expect(movieRepository.findOne).toHaveBeenCalledWith({
      where: { externalId: parsedMovies[0].externalId },
    });

    expect(movieRepository.merge).toHaveBeenCalledWith(existingMovie, parsedMovies[0]);

    expect(movieRepository.save).toHaveBeenCalledWith({
      ...existingMovie,
      ...parsedMovies[0],
    });
  });


});
