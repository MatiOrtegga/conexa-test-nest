import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post("/register")
    @HttpCode(204)
    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({ status: 204, description: 'User registered successfully' })
    async registerUser(@Body() createUserDto: CreateUserDto) {
        return `User registered successfully ${createUserDto}`;
    }

    @Post("/login")
    @HttpCode(200)
    @ApiOperation({ summary: 'login user' })
    @ApiResponse({ status: 204, description: 'User logged in successfully' })
    async loginUser() {
        return "User logged in successfully";
    }
}
