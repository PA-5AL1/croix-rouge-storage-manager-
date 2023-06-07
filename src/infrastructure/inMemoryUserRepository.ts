import Users from "../domain/user/users";
import User from "../domain/user/user";

export default class InMemoryUserRepository implements Users {
    private users: Map<string, User> = new Map<string, User>();

    save(user: User): Promise<User> {
        this.users.set(user.email, user);
        return new Promise<User>((resolve, reject) => {
            setTimeout( () => {
                resolve(user);
            }, 500);
        });
    }
    find(email: string): Promise<User | undefined> {
        return new Promise<User | undefined>((resolve, reject) => {
            setTimeout( () => {
                resolve(this.users.get(email));
            }, 500);
        });
    }
    
}