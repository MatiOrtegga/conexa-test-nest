import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { HashPassword, ComparePassword } from 'src/utils/bcrypt.utils';
import { IncorrectPassword, InvalidEmail, UserAlreadyExists } from './errors/user.error';
import { JwtService } from '@nestjs/jwt';
import { PayloadResponseDto } from './dto/payloadResponse.dto';
import { ValidateUserDto } from './dto/validateUser.dto';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) { }

    async createUser(user: CreateUserDto): Promise<string> {
        const existingUser = await this.usersRepository.findOne({ where: { email: user.email } });

        if (existingUser) {
            throw new UserAlreadyExists();
        }

        user.password = await HashPassword(user.password);

        const newUser = this.usersRepository.create({
            name: user.name,
            email: user.email,
            passwordHash: user.password,
            roleId: 1
        });

        await this.usersRepository.save(newUser);

        return "User created successfully";
    }

    async validateUser(user: ValidateUserDto): Promise<PayloadResponseDto> {
        const existingUser = await this.usersRepository.findOne({ where: { email: user.email } });

        if (!existingUser) {
            throw new InvalidEmail();
        }

        const validatePassword = await ComparePassword(user.password, existingUser.passwordHash);
        if (!validatePassword) {
            throw new IncorrectPassword();
        }

        const payload = { sub: existingUser.id, email: existingUser.email, role: existingUser.role.name };
        const token = await this.jwtService.signAsync(payload);
        return {
            user: {
                email: existingUser.email,
                name: existingUser.name,
                role: existingUser.role.name
            },
            tokens: {
                accessToken: token,
                expiresIn: 3600
            }
        }

    }
}
