import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserUseCase } from "src/modules/user/useCases/createUserUseCase/createUserUseCase";
import { CreateUserBody } from "./dtos/createUserBody";
import { UseerViewModel } from "./viewModel/userViewModel";
import { Public } from "../auth/decorators/isPublic";

@Controller('users')
export class UserController{
    constructor(private createUserUseCase: CreateUserUseCase) {}
    
    @Post()
    @Public()
    async createPost(@Body() body: CreateUserBody){
        const { name, email, password } = body;

        const user = await this.createUserUseCase.execute({
           name,
           email,
           password
        })

        return UseerViewModel.toHttp(user);
    }
}