import { DEFAULT_ADMIN_EMAIL } from "../infrastructure/constant";
import Users from "./Users";
import CryptPassword from "./hashPassword";
import User from "./user";

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

    private notify = (to: string) => {
        console.log(`Sending email to ${to}`);
    }
  
}