import User from "./user";

export default interface Users {
    save(user: User): Promise<User>;
    find(email: string): Promise<User | undefined>;
}