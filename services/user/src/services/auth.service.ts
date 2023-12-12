import prisma from "../prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

interface ISignupPayload {
    email: string;
    password: string;
    username: string;
    fullName?: string; 
    bio?: string;
    avatar?: string;
}

class AuthService {
    public async signup(payload: ISignupPayload): Promise<void> {
        if (await this.emailExists(payload.email)) {
            throw new Error("Email already exists");
        }

        const hashedPassword = await this.hashPassword(payload.password);

        await prisma.user.create({
            data: {
                passwordHash: hashedPassword,
                ...payload
            }
        });

        return;
    }

    public async login(email: string, password: string): Promise<string> {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!user) {
            throw new Error("User not found");
        }
        
        const isPasswordValid = this.comparePassword(password, user.passwordHash);

        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }

        const token = this.generateJWT(user.id);

        return token;
    } 

    private generateJWT(id: number): string {
        const token = jwt.sign({
            id,
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
        }, process.env.JWT_TOKEN!);

        return token;
    }

    private async emailExists(email: string): Promise<boolean> {
        const user = await prisma.user.findUnique({
            where: {
                email
            } 
        });

        return !!user;
    }

    private async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }

    
    private async hashPassword(password: string): Promise<string> {
        const saltRounds = 10; 
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    }
}

export {
    ISignupPayload, 
    AuthService
};