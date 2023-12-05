import { IsString, IsNotEmpty, IsEmail, MinLength } from "class-validator";

export class CreateUserBody {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;
}