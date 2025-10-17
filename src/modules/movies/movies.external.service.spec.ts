import { Test, TestingModule } from '@nestjs/testing';
import { MoviesExternalService } from './movies.external.service';

describe('MoviesExternalService', () => {
  let service: MoviesExternalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesExternalService],
    }).compile();

    service = module.get<MoviesExternalService>(MoviesExternalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
