import { DEFAULT_ADMIN_EMAIL } from "../infrastructure/constant";
import Users from "./user/users";
import CryptPassword from "./user/hashPassword";
import User from "./user/user";

export default class Authentication {
    private encryptPassword: CryptPassword;
    private userRepository: Users;

    constructor(encryptPassword: CryptPassword, userRepository: Users){
        this.encryptPassword = encryptPassword;
        this.userRepository = userRepository;
    }

    public register = async (email: string, password: string) : Promise<User> => {
        const hashPassword = await this.encryptPassword.hash(password);
        const newUser = User.new(email, hashPassword);

        const userExist = await this.userRepository.find(email);
        if (userExist) throw new Error(`User ${email} already exists`);
        
        await this.userRepository.save(newUser);
    
        this.notify(DEFAULT_ADMIN_EMAIL);
    
        return newUser;
    }

    public login = async (email: string, password: string) : Promise<string> => {
        const userExist = await this.userRepository.find(email);
        if (!userExist) throw new Error('User not found.');
        const checkPassword = await this.encryptPassword.compare(password, userExist.password);
        if (!checkPassword) throw new Error('Invalid password.');

        return `access_token-${email}`;
    }

    private notify = (to: string) => {
        console.log(`Sending email to ${to}`);
    }
  
}