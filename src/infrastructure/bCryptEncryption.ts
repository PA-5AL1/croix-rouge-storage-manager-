import { HashPassword } from "../domain/user/hashPassword";

var bcrypt = require('bcryptjs');

const saltRounds: number = 10;

export const BCryptEncryption: HashPassword = {
    async hash(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(saltRounds);
        return bcrypt.hash(password, salt);
    },
    compare(password: string, encryptedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, encryptedPassword); 
    }
    
}