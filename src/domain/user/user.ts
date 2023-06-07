import { Roles } from "./roles";

export type User = {
    email: string;
    password: string;
    role: Roles;
    accountActivated: boolean;
}