import { User } from "./user";

export type Users = {
    save(user: User): Promise<void>;
    find(email: string): Promise<User | undefined>;
}