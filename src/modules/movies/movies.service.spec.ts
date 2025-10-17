import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';

describe('MoviesService', () => {
  let service: MoviesService;
  let movieRepository: jest.Mocked<Repository<Movie>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
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

    service = module.get<MoviesService>(MoviesService);
    movieRepository = module.get(getRepositoryToken(Movie));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(movieRepository).toBeDefined();
  });

  describe('find', () => {
    it('should findAllMovies successfully', async () => {
      const mockMovies: Movie[] = [
        {
          id: 1,
          title: 'Inception',
          director: 'Christopher Nolan',
          producer: 'Emma Thomas',
          description: 'A mind-bending thriller about dream invasion.',
          externalId: 'tt1375666',
          source: 'IMDB',
          metadata: { genre: 'Sci-Fi', rating: 'PG-13' },
          releaseDate: new Date('2010-07-16'),
          createdAt: new Date(),
          updatedAt: new Date(),

        },
        {
          id: 2,
          title: 'Interstellar',
          director: 'Christopher Nolan',
          producer: 'Emma Thomas',
          description: 'A team of explorers travel through a wormhole in space to ensure humanity’s survival.',
          externalId: 'tt0816692',
          source: 'IMDB',
          metadata: { genre: 'Sci-Fi', rating: 'PG-13' },
          releaseDate: new Date('2014-11-07'),
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ]

      movieRepository.find.mockResolvedValue(mockMovies);

      const result = await service.findAll();

      expect(movieRepository.find).toHaveBeenCalled();
      expect(result).toBeDefined();
      expect(result.length).toBe(2);
      expect(result).toEqual(mockMovies);

    });

    it('should return empty array if no movies found', async () => {
      movieRepository.find.mockResolvedValue([]);

      const result = await service.findAll();

      expect(movieRepository.find).toHaveBeenCalled();
      expect(result).toBeDefined();
      expect(result.length).toBe(0);
      expect(result).toEqual([]);

    });

    it('should findOne movie successfully', async () => {
      const mockMovie: Movie = {
        id: 1,
        title: 'Inception',
        director: 'Christopher Nolan',
        producer: 'Emma Thomas',
        description: 'A mind-bending thriller about dream invasion.',
        externalId: 'tt1375666',
        source: 'IMDB',
        metadata: { genre: 'Sci-Fi', rating: 'PG-13' },
        releaseDate: new Date('2010-07-16'),
        createdAt: new Date(),
        updatedAt: new Date(),

      };
      movieRepository.findOne.mockResolvedValue(mockMovie);

      const result = await service.findOne(1);
      expect(movieRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toBeDefined();
      expect(result).toEqual(mockMovie);

    })

    it('should throw an error if movie not found', async () => {
      movieRepository.findOne.mockResolvedValue(null);
      await expect(service.findOne(1)).rejects.toThrow('movie not found');
    });
  });

  describe('create', () => {
    it('should create a new movie successfully', async () => {
      const mockMovie: Movie = {
        id: 1,
        title: 'Inception',
        director: 'Christopher Nolan',
        producer: 'Emma Thomas',
        description: 'A mind-bending thriller about dream invasion.',
        externalId: 'tt1375666',
        source: 'IMDB',
        metadata: { genre: 'Sci-Fi', rating: 'PG-13' },
        releaseDate: new Date('2010-07-16'),
        createdAt: new Date(),
        updatedAt: new Date(),

      };
      movieRepository.create.mockReturnValue(mockMovie);
      movieRepository.save.mockResolvedValue(mockMovie);


      const addMovie: CreateMovieDto = {
        title: 'Inception',
        director: 'Christopher Nolan',
        producer: 'Emma Thomas',
        description: 'A mind-bending thriller about dream invasion.',
        externalId: 'tt1375666',
        source: 'IMDB',
        metadata: { genre: 'Sci-Fi', rating: 'PG-13' },
        releaseDate: new Date('2010-07-16'),
      }

      const result = await service.create(addMovie);

      expect(movieRepository.create).toHaveBeenCalledWith(addMovie);
      expect(movieRepository.save).toHaveBeenCalledWith(mockMovie);
      expect(result).toBeDefined();
      expect(result).toEqual(mockMovie);

    });

    it('should throw an error if movie already exists', async () => {
      const mockMovie: Movie = {
        id: 1,
        title: 'Inception',
        director: 'Christopher Nolan',
        producer: 'Emma Thomas',
        description: 'A mind-bending thriller about dream invasion.',
        externalId: 'tt1375666',
        source: 'IMDB',
        metadata: { genre: 'Sci-Fi', rating: 'PG-13' },
        releaseDate: new Date('2010-07-16'),
        createdAt: new Date(),
        updatedAt: new Date(),

      };
      movieRepository.findOne.mockResolvedValue(mockMovie);
      const addMovie: CreateMovieDto = {
        title: 'Inception',
        director: 'Christopher Nolan',
        producer: 'Emma Thomas',
        description: 'A mind-bending thriller about dream invasion.',
        externalId: 'tt1375666',
        source: 'IMDB',
        metadata: { genre: 'Sci-Fi', rating: 'PG-13' },
        releaseDate: new Date('2010-07-16'),
      }

      await expect(service.create(addMovie)).rejects.toThrow('Movie Already Exists');
    });
  });

  describe('update', () => {

    it('should update a movie successfully', async () => {
      const mockMovie: Movie = {
        id: 1,
        title: 'Inception',
        director: 'Christopher Nolan',
        producer: 'Emma Thomas',
        description: 'A mind-bending thriller about dream invasion.',
        externalId: 'tt1375666',
        source: 'IMDB',
        metadata: { genre: 'Sci-Fi', rating: 'PG-13' },
        releaseDate: new Date('2010-07-16'),
        createdAt: new Date(),
        updatedAt: new Date(),
      };


      movieRepository.findOne.mockResolvedValue(mockMovie);
      movieRepository.merge.mockReturnValue({
        ...mockMovie,
        description: 'An updated description',
      });
      movieRepository.save.mockResolvedValue({
        ...mockMovie,
        description: 'An updated description',
      });

      const result = await service.update(1, { description: 'An updated description' });

      expect(movieRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(movieRepository.merge).toHaveBeenCalledWith(mockMovie, { description: 'An updated description' });
      expect(movieRepository.save).toHaveBeenCalledWith({
        ...mockMovie,
        description: 'An updated description',
      });
      expect(result).toBeDefined();
      expect(result.description).toBe('An updated description');

    });
    it('should throw an error if movie to update not found', async () => {
      movieRepository.findOne.mockResolvedValue(null);

      await expect(service.update(1, { description: 'An updated description' })).rejects.toThrow('movie not found');
    })

  })

  describe('remove', () => {
    it('should remove a movie successfully', async () => {
      const mockMovie: Movie = {
        id: 1,
        title: 'Inception',
        director: 'Christopher Nolan',
        producer: 'Emma Thomas',
        description: 'A mind-bending thriller about dream invasion.',
        externalId: 'tt1375666',
        source: 'IMDB',
        metadata: { genre: 'Sci-Fi', rating: 'PG-13' },
        releaseDate: new Date('2010-07-16'),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      movieRepository.findOne.mockResolvedValue(mockMovie);
      movieRepository.remove.mockResolvedValue(mockMovie);
      await service.remove(1);

      expect(movieRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(movieRepository.remove).toHaveBeenCalledWith(mockMovie);

    })

    it('should throw an error if movie to remove not found', async () => {
      movieRepository.findOne.mockResolvedValue(null);
      await expect(service.remove(1)).rejects.toThrow('movie not found');
    })

  });

});
