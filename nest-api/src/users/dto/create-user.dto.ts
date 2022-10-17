import { PartialType } from "@nestjs/mapped-types";
import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { LoginDto } from "./login.dto";

export class CreateUserDto extends PartialType(LoginDto) {
    @IsString()
    @MinLength(6)
    @MaxLength(15)
    username: string;

    @IsString()
    @IsOptional()
    img?: string;
}
