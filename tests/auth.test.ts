import Users from "../src/domain/Users";
import Authentication from "../src/domain/auth";
import CryptPassword from "../src/domain/hashPassword";
import User from "../src/domain/user";
import BCryptEncryption from "../src/infrastructure/bCryptEncryption";
import { DEFAULT_ADMIN_EMAIL } from "../src/infrastructure/constant";
import InMemoryUserRepository from "../src/infrastructure/inMemoryUserRepository";

const encryptPassword: CryptPassword = new BCryptEncryption();
const userRepository: Users = new InMemoryUserRepository();
const authenticationService: Authentication = new Authentication(encryptPassword, userRepository);

let registeredUser: User;
const newUser = User.new("nguyen.ifzas@gmail.com", "password");

describe('User should be able to register', () => {
    beforeAll(async() => {
        registeredUser = await authenticationService.register(newUser.email, newUser.password);
    });

   
    it('User password should be hashed', async () => {
        const hashPassword = await encryptPassword.hash("password");
        expect(newUser.password).not.toEqual(hashPassword);
    });

    it('User password and hashed password should be the same', async () => {
        const comparePassword = await encryptPassword.compare("password", registeredUser.password);
        expect(comparePassword).toBe(true);
    });

    it('User should be registered', async () => {
        expect(registeredUser.email).toEqual("nguyen.ifzas@gmail.com");
    });

    it('Admin should be notified of a new registration', async () => {
        // TODO: Mock email sender
        // `Sending email to ${DEFAULT_ADMIN_EMAIL}`
    });

});

describe('User should not be able to register twice', () => {

    beforeAll(async() => {
        registeredUser = await authenticationService.register(newUser.email, newUser.password);
    });

    it('Should throw an error while trying to register twice', async () => {
        await expect(authenticationService.register(newUser.email, newUser.password))
        .rejects
        .toThrow(`User ${newUser.email} already exists`);
    });

    it('Admin should be notified of a new registration', async () => {
        // TODO: Mock email sender
        // `Sending email to ${DEFAULT_ADMIN_EMAIL}`
    });

});