import prisma from "../prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
  AsyncError,
  NotFoundError,
  ConflictError,
  AuthorizationError,
} from "../handlers/error.handler";
import redis from "../redis";

interface ISignupPayload {
  email: string;
  password?: string;
  username: string;
  fullName?: string;
  bio?: string;
  avatar?: string;
}

class AuthService {
  public async signup(payload: ISignupPayload): Promise<string> {
    if (await this.emailExists(payload.email)) {
      throw new ConflictError("Email already exists");
    }

    const hashedPassword = await this.hashPassword(payload.password!);
    delete payload.password;

    try {
      await prisma.user.create({
        data: {
          passwordHash: hashedPassword,
          ...payload,
        },
      });
    } catch (err: any) {
      throw new AsyncError(err.message, 500, err);
    }

    const emailVerifToken = this.generateJWT(0, true);
    try {
      await redis.set(emailVerifToken, payload.email, "EX", 86400); // 24 hours
    } catch (err: any) {
      throw new AsyncError(err.message, 500, err);
    }

    return emailVerifToken;
  }

  public async login(email: string, password: string): Promise<string> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const isPasswordValid = await this.comparePassword(
      password,
      user.passwordHash
    );

    if (!isPasswordValid) {
      throw new AuthorizationError("Invalid password");
    }

    const token = this.generateJWT(user.id);

    return token;
  }

  public generateJWT(id: number, random = false): string {
    let token: string;

    if (random) {
      token = jwt.sign(
        {
          iat: Math.floor(Date.now() / 1000) - 30,
        },
        process.env.RANDOM_JWT_TOKEN!
      );

      return token;
    } else {
      token = jwt.sign(
        {
          id,
          iat: Math.floor(Date.now() / 1000) - 30,
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
        },
        process.env.JWT_TOKEN!
      );
    }

    return token;
  }

  private async emailExists(email: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return !!user;
  }

  private async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }
}

export { ISignupPayload, AuthService };
