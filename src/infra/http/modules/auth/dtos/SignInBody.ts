import { IsNotEmpty, IsString, IsEmail, MinLength } from "class-validator"
import { IsNotEmptyCustom } from "src/infra/http/classValidator/decorators/IsNotEmptyCustom";
import { MinLengthCustom } from "src/infra/http/classValidator/decorators/MinLengthCustom";
import { IsEmailCustom } from "src/infra/http/classValidator/decorators/isEmailCustom";
import { IsStringCustom } from "src/infra/http/classValidator/decorators/isStringCustom";

export class SignInBody {
    @IsStringCustom()
    @IsEmailCustom()
    @IsNotEmptyCustom()
    email: string;

    @IsStringCustom()
    @MinLengthCustom(6)
    @IsNotEmptyCustom()
    password: string;
}