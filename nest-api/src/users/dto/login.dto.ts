import { IsEmail, IsString, MinLength, MaxLength, IsOptional } from "class-validator";

export class LoginDto{
    @IsString()
    @IsOptional()
    username?: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(15)
    password: string;
}