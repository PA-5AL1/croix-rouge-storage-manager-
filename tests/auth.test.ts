
import { registerUser } from "../src/application/registerUser";
import { HashPassword } from "../src/domain/user/hashPassword";
import { Users } from "../src/domain/user/users";
import { BCryptHash } from "../src/infrastructure/bCryptHash";
import { DEFAULT_ADMIN_EMAIL } from "../src/infrastructure/constant";
import { InMemoryUserRepository } from "../src/infrastructure/inMemoryUserRepository";

const users : Users = InMemoryUserRepository;
const hashService: HashPassword = BCryptHash;

describe('User register', () => {
    const register = registerUser(users, hashService);
    const newUser : RegisterUserDto = {
        email: "nguyen.ifzas@gmail.com",
        password: "password",
      }
    beforeAll(async() => {
       
        register(newUser);
    });

    it('Should hash the new user password', async () => {
        const registeredUser = await users.find(newUser.email);
 
        expect(registeredUser?.password).not.toEqual(newUser.password);
    });

    it('Should match new user plain and hashed password', async () => {
        const registeredUser = await users.find(newUser.email);

        const comparePassword = await hashService.compare(newUser.password, registeredUser.password ?? "");

        expect(comparePassword).toBe(true);
    });

    it('Should register the user', async () => {
        const user = await users.find(registeredUser.email);
        expect(user?.email).toEqual(registeredUser.email);
    });

    it('Should notify admin upon new user registration', async () => {
        // TODO: Mock email sender
        // `Sending email to ${DEFAULT_ADMIN_EMAIL}`
    });
    it('Should throw an error while trying to register twice', async () => {
        await expect(authenticationService.register(newUser.email, newUser.password))
        .rejects
        .toThrow(`User ${newUser.email} already exists`);
    });
});


describe('User login', () => {
    let user: User;

    beforeAll(async() => {
        const hashPassword = await encryptPassword.hash('password');
        user = User.new("nguyen.ifzas@gmail.com", hashPassword);
        users.save(user);
    });

    it('Should login the user and send an access_token', async () => {
        let accessToken: string = await authenticationService.login(user.email, 'password');
        expect(accessToken).toBe(`access_token-${user.email}`);
    });

    it('Should throw an error if the user do not exist', async () => {
        await expect(authenticationService.login('user.email', user.password))
        .rejects
        .toThrow(`User not found.`);
    });

    it('Should throw an error if the user password was wrong', async () => {
        await expect(authenticationService.login(user.email, 'user.password'))
        .rejects
        .toThrow(`Invalid password.`);
    });
});

