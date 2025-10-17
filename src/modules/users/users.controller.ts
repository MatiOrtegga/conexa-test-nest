import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ValidateUserDto } from './dto/validateUser.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post("/register")
    @HttpCode(204)
    @ApiOperation({ summary: 'Register a new user' })
    async registerUser(@Body() createUserDto: CreateUserDto) {
        await this.usersService.createUser(createUserDto);
    }

    @Post("/login")
    @HttpCode(200)
    @ApiOperation({ summary: 'login user' })
    async loginUser(@Body() validateUserDto: ValidateUserDto) {
        const response = await this.usersService.validateUser(validateUserDto);
        return response;
    }
}
