export default interface CryptPassword {
    hash(password: string): Promise<string>;
    compare(password: string, encryptedPassword: string): Promise<boolean>;
}