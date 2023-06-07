
import { HashPassword } from "../domain/user/hashPassword";
import { User } from "../domain/user/user";
import { Users } from "../domain/user/users";
import { DEFAULT_ADMIN_EMAIL } from "../infrastructure/constant";

export const registerUser = (userRepo: Users, hashService: HashPassword) => {
    return async (dto: RegisterUserDto) => {
        const hashedPassword = await hashService.hash(dto.password);
        
        const user: User = {
            email: dto.email,
            password: hashedPassword,
            role: "USER",
            accountActivated: false,
        };

        await userRepo.save(user);

        notify(DEFAULT_ADMIN_EMAIL, "message");
    }
}

const notify = (to: string, message: string) => {
    console.log(`Sending email to ${to}`);
}