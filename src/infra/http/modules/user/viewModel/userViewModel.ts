import { User } from "src/modules/user/entities/User";

export class UseerViewModel {
    static toHttp(user: User) {
        const {
            id,
            name,
            email,
            createdAt
        } = user;

        return {
            id,
            name,
            email,
            createdAt
        }
    }
}