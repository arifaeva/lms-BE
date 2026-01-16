import { inject, injectable } from "inversify";
import "reflect-metadata";
import { UserRepo } from "../repositories/userRepo";
import { TYPES } from "../entities/types";

@injectable()
export class UserServices {
  private userRepo: UserRepo;

  constructor(@inject(TYPES.UserRepo) userRepo: UserRepo) {
    this.userRepo = userRepo;
  }

  async getAllUsers() {
    const users = await this.userRepo.findAllUsers();
    return users;
  }

  async getUserByEmail(email: string) {
    if (!email) {
      throw new Error("Invalid user email");
    }
    const user = await this.userRepo.findUserByEmail(email);
    return user;
  }

  async getUserById(id: string) {
    if (!id) {
      throw new Error("Invalid user id");
    }
    const user = await this.userRepo.findUserById(id);
    return user;
  }

  async createUser(name: string, email: string, password: string) {
    const newUser = await this.userRepo.createUser(name, email, password);
    return newUser;
  }

  async createStudent(email: string) {
    if (!email) {
      throw new Error("Invalid user email");
    }
    const newStudent = await this.userRepo.createStudent(email);
    return newStudent;
  }
}
