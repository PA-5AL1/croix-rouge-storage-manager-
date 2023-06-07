import { Roles } from "./roles";

export default class User {
    public readonly email: string;
    public readonly password: string;
    public readonly role: string;
    public readonly accountActivated: boolean;

    private constructor(email: string, password: string, role: Roles, accountActivated: boolean) {
        this.email = email;
        this.password = password;
        this.role = role;
        this.accountActivated = accountActivated;
    }

    public static new(email: string, password: string) : User {
        return new User(email, password, 'USER', false);
    }

    public static of(email: string, password: string, role: Roles, accountActivated: boolean) : User {
        return new User(email, password, role, accountActivated);
    }
}