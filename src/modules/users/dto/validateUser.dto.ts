import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class ValidateUserDto {
    @ApiProperty({
        description: 'Valid email address of the user.',
    })
    @IsEmail()
    email: string

    @ApiProperty({
        description: 'Strong password (must include upper/lowercase, number, and symbol).',
    })
    @IsNotEmpty()
    password: string;
}