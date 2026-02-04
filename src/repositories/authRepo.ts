import { inject, injectable } from "inversify";
import "reflect-metadata";
import { IAuthRepository } from "../entities/interfaces";
import { TYPES } from "../entities/types";
import { UserRepo } from "./userRepo";
import bcrypt from "bcryptjs";
import { prisma } from "../utils/prisma";

@injectable()
export class AuthRepo implements IAuthRepository {
  constructor(@inject(TYPES.UserRepo) private userRepo: UserRepo) {}

  async register(name: string, email: string, password: string) {
    const existingUser = await this.userRepo.findUserByEmail(email);
    if (existingUser)
      throw new Error("A user with the same email has been registered");

    const hashedPassword = await bcrypt.hash(password, 12);

    await this.userRepo.createUser(name, email, hashedPassword);
  }

  async login(email: string, password: string) {
    const existingUser = await this.userRepo.findUserByEmail(email);
    if (!existingUser) throw new Error("Invalid credentials");

    const valid = await bcrypt.compare(password, existingUser.password);
    if (!valid) throw new Error("Invalid credentials");

    await prisma.loginSession.deleteMany({
      where: { userId: existingUser.id },
    });

    const expiration = new Date();
    expiration.setDate(expiration.getDate() + 7);

    return prisma.loginSession.create({
      data: {
        userId: existingUser.id,
        expiration,
      },
    });
  }

  async validateSession(sessionId: string) {
    const session = await prisma.loginSession.findUnique({
      where: { id: sessionId },
      include: { user: true },
    });

    if (!session) return null;

    if (session.expiration < new Date()) {
      await prisma.loginSession.delete({
        where: { id: sessionId },
      });

      return null;
    }

    return session.user;
  }
}
