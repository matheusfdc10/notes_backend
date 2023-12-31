import { compare } from "bcrypt";
import { UserRepositoryInMemory } from "../../repositories/UserRepositoryInMemory";
import { CreateUserUseCase } from "./createUserUseCase";
import { makeUser } from "../../factories/userFactory";
import { UserWithSameEmailException } from "../../exceptions/UserWithSameEmailException";

let createUserUseCase: CreateUserUseCase
let userRepositoryInMemory: UserRepositoryInMemory

describe('Create User', () => {
    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory()
        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory)
    })

    it("Should be able to create user", async () => {
        expect(userRepositoryInMemory.users).toEqual([]);

        const user = await createUserUseCase.execute({
            email: "email@gmail.com",
            name: "Matheus",
            password: "123123"
        })

        expect(userRepositoryInMemory.users).toEqual([user])
    })

    it("Should be able to create user with password encrypted", async () => {
        const userPasswordWithoutEncryption = "123123"

        const user = await createUserUseCase.execute({
            email: "email@gmail.com",
            name: "Matheus",
            password: userPasswordWithoutEncryption
        })

        const userHasPasswordEncrypted = await compare(
            userPasswordWithoutEncryption, 
            user.password
        )

        expect(userHasPasswordEncrypted).toBeTruthy()
    })

    it("Should be able to throw error when create user with already exist email", async () => {
        const user = makeUser({})

        userRepositoryInMemory.users = [user]

        expect(async () => await createUserUseCase.execute({
            email: user.email,
            name: "Matheus",
            password: "123123"
        })).rejects.toThrowError(UserWithSameEmailException)
    })
});