import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsStrongPassword, MinLength } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({
        minLength: 5,
        description: 'Full name of the user (minimum 5 characters).',
    })
    @IsNotEmpty()
    @MinLength(5)
    name: string;

    @ApiProperty({
        description: 'Valid email address of the user.',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Strong password (must include upper/lowercase, number, and symbol).',
    })
    @IsNotEmpty()
    @IsStrongPassword()
    password: string;
}
