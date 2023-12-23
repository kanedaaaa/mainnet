import { AsyncError, NotFoundError } from "../handlers/error.handler";
import redis from "./../redis";
import prisma from "../prisma";
import jwt from "jsonwebtoken";

class VerificationService {
  public async verifyEmail(token: string) {
    try {
      const email = await redis.get(token);

      if (!email) {
        throw "Wrong Token";
      }

      await prisma.user.update({
        where: {
          email: email,
        },

        data: {
          emailVerified: true,
        },
      });
    } catch (err: any) {
      throw new AsyncError(err.message, 500, err);
    }
  }

  public async resendEmailVerfication(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!email) {
      throw new NotFoundError("User Not Found");
    }

    const token = this.generateJWT(0, true);

    try {
      await redis.set(token, email, "EX", 86400); // 24 hours
    } catch (err: any) {
      throw new AsyncError(err.message, 500, err);
    }
    return token;
  }

  // DUB MUST REMOVE
  private generateJWT(id: number, random = false): string {
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
}

export default VerificationService
