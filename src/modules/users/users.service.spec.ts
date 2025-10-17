import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { HashPassword } from 'src/utils/bcrypt.utils';
import { CreateUserDto } from './dto/createUser.dto';

describe('UsersService', () => {
  let service: UsersService;
  let usersRepository: jest.Mocked<Repository<User>>;
  let jwtService: JwtService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        }
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    usersRepository = module.get(getRepositoryToken(User));
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(usersRepository).toBeDefined();
    expect(jwtService).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a new user successfully', async () => {

      const hashed = await HashPassword('SecurePassword123');
      const mockUser: User = {
        id: 1,
        name: 'Test User',
        email: 'Test123@Email.com',
        passwordHash: hashed,
        createdAt: new Date(),
        roleId: 1,
        role: { id: 1, name: 'User', createdAt: new Date(), users: [] },
      };
      usersRepository.create.mockReturnValue(mockUser);
      usersRepository.save.mockResolvedValue(mockUser);

      let addUser = usersRepository.create(mockUser);
      let saveUser = await usersRepository.save(addUser);

      expect(addUser).toBeDefined();
      expect(saveUser).toBeDefined();
      expect(saveUser).toEqual(addUser);

      expect(usersRepository.create).toHaveBeenCalledTimes(1);
      expect(usersRepository.create).toHaveBeenCalledWith(expect.objectContaining({
        name: 'Test User',
        email: 'Test123@Email.com',
      }));

      expect(usersRepository.save).toHaveBeenCalledTimes(1);
      expect(usersRepository.save).toHaveBeenCalledWith(addUser);

      expect(saveUser).toHaveProperty('id');
      expect(saveUser).toHaveProperty('email', 'Test123@Email.com');
      expect(saveUser).toHaveProperty('name', 'Test User');
      expect(saveUser).toHaveProperty('role.name', 'User');
      expect(saveUser.createdAt).toBeInstanceOf(Date);

      expect(saveUser.passwordHash).not.toBe('SecurePassword123');

    });

    it('should throw UserAlreadyExists if user exists', async () => {
      const mockUser: CreateUserDto = {
        name: 'Test User',
        email: 'Test123@Email.com',
        password: 'SecurePassword123',
      };

      usersRepository.findOne
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce({
          id: 1,
          name: 'Test User',
          email: 'Test123@Email.com',
          passwordHash: "hasedPassword",
          createdAt: new Date(),
          roleId: 1,
          role: { id: 1, name: 'User', createdAt: new Date(), users: [] },
        });

      await service.createUser(mockUser);

      await expect(service.createUser(mockUser)).rejects.toThrow('User already exists.');
    });

  });

  describe('validateUser', () => {
    it('should validate a user and return payload + token', async () => {
      const hashed = await HashPassword('SecurePassword123');
      const mockUser: User = {
        id: 1,
        name: 'Test User',
        email: 'Test123@Email.com',
        passwordHash: hashed,
        createdAt: new Date(),
        roleId: 1,
        role: { id: 1, name: 'User', createdAt: new Date(), users: [] },
      };

      usersRepository.findOne.mockResolvedValueOnce(mockUser);
      (jwtService.signAsync as jest.Mock).mockResolvedValueOnce('mocked-jwt-token');
      const result = await service.validateUser({ email: 'Test123@Email.com', password: 'SecurePassword123' });

      expect(result).toBeDefined();
      expect(result).toHaveProperty('user');
      expect(result).toHaveProperty('tokens');
      expect(result.user).toEqual(expect.objectContaining({
        email: 'Test123@Email.com',
        name: 'Test User',
        role: 'User',
      }));

      expect(result.tokens).toEqual(expect.objectContaining({
        accessToken: 'mocked-jwt-token',
        expiresIn: 3600,
      }));

    });
    it('should throw IncorrectEmail if user not found', async () => {
      usersRepository.findOne.mockResolvedValueOnce(null);
      await expect(service.validateUser({ email: 'Test1234@Email.com', password: 'SecurePassword123' })).rejects.toThrow('Incorrect Email provided.');

    });

    it('should throw IncorrectPassword if password does not match', async () => {
      const hashed = await HashPassword('SecurePassword123');
      const mockUser: User = {
        id: 1,
        name: 'Test User',
        email: 'Test123@Email.com',
        passwordHash: hashed,
        createdAt: new Date(),
        roleId: 1,
        role: { id: 1, name: 'User', createdAt: new Date(), users: [] },
      };
      usersRepository.findOne.mockResolvedValueOnce(mockUser);

      await expect(service.validateUser({ email: 'Test123@Email.com', password: 'WrongPassword' })).rejects.toThrow('Incorrect credentials provided.');
    });
  });

});
