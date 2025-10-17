import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { ApiOperation } from '@nestjs/swagger';
import { ValidateUserDto } from './dto/validateUser.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Public()
    @Post("/register")
    @HttpCode(204)
    @ApiOperation({ summary: 'Register a new user' })
    async registerUser(@Body() createUserDto: CreateUserDto) {
        await this.usersService.createUser(createUserDto);
    }
    
    @Public()
    @Post("/login")
    @HttpCode(200)
    @ApiOperation({ summary: 'login user' })
    async loginUser(@Body() validateUserDto: ValidateUserDto) {
        const response = await this.usersService.validateUser(validateUserDto);
        return response;
    }
}
