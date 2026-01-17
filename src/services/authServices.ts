import { inject, injectable } from "inversify";
import "reflect-metadata";
import { AuthRepo } from "../repositories/authRepo";
import { TYPES } from "../entities/types";

@injectable()
export class AuthServices {
  private authRepo: AuthRepo;

  constructor(@inject(TYPES.AuthRepo) authRepo: AuthRepo) {
    this.authRepo = authRepo;
  }

  async register(name: string, email: string, password: string) {
    if (!name || !email || !password) {
      throw new Error("Name, email, and password are required.");
    }

    await this.authRepo.register(name, email, password);
  }

  async login(email: string, password: string) {
    if (!email || !password) {
      throw new Error("Email and password are required.");
    }

    const session = await this.authRepo.login(email, password);

    if (!session) {
      throw new Error("Login failed");
    }

    return {
      userId: session.userId,
      sessionId: session.id,
      expiration: session.expiration,
    };
  }
}
