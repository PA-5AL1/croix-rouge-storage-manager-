import CryptPassword from "../domain/hashPassword";
import bcrypt = require("bcrypt");
export default class BCryptEncryption implements CryptPassword {
    private saltRounds: number = 10;
    async hash(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(this.saltRounds);
        return bcrypt.hash(password, salt);
    }
    compare(password: string, encryptedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, encryptedPassword); 
    }
    
}