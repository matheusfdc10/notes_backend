import { IsNotEmpty, IsString, IsEmail, MinLength } from "class-validator"

export class SignInBody {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;
}