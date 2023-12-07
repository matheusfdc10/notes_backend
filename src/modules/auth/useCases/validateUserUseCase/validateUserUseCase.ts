import { Injectable, UnauthorizedException } from "@nestjs/common"
import { compare } from "bcrypt";
import { UserRepository } from "src/modules/user/repositories/UserRepository";
import { AuthValuesIncorrectException } from "../../exceptions/AuthValuesIncorrectException";

interface ValidadeUserRequest {
    email: string;
    password: string;
}

@Injectable()
export class ValidateUserUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute({ email, password }: ValidadeUserRequest) {
        const user = await this.userRepository.findByEmail(email);

        if (!user) throw new AuthValuesIncorrectException()

        const IsPasswordMatched = await compare(password, user.password)

        if (!IsPasswordMatched) throw new AuthValuesIncorrectException()

        return user;
    }
}