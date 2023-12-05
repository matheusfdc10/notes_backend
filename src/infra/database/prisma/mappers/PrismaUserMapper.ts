import { User as UserRaw } from "@prisma/client";
import { User } from "src/modules/user/entities/User";

export class PrismaUserMapper {
    static toPrisma(user: User): UserRaw {
        const {
            id,
            name,
            email,
            password,
            createdAt,
        } = user;

        return {
            id,
            name,
            email,
            password,
            createdAt
        }
    }

    static toDomain({ id, createdAt, email, name, password }: UserRaw): User {
        return new User(
          {
            createdAt,
            email,
            name,
            password,
          },
          id,
        );
      }
}