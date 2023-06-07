import { DEFAULT_ADMIN_EMAIL } from "../infrastructure/constant";
import CryptPassword from "./hashPassword";
import User from "./user";

export const register = async (encryptPassword: CryptPassword, email: string, password: string) : Promise<User> => {
    const hashPassword = await encryptPassword.hash(password);
    const newUser = User.new(email, hashPassword);

    notify(DEFAULT_ADMIN_EMAIL);

    return newUser;
}

const notify = (to: string) => {
    console.log(`Sending email to ${to}`);
}