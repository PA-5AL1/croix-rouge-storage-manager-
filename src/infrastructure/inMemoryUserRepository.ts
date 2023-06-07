import { User } from "../domain/user/user";
import { Users } from "../domain/user/users";

let users: Map<string, User> = new Map<string, User>();

export const InMemoryUserRepository: Users = {
    async find(email: string): Promise<User | undefined> {
        return users.get(email);
    },

    async save(user: User): Promise<void> {
        users.set(user.email, user)
    }
};