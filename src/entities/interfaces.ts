import { User } from "../generated/prisma/client";

export interface IUserRepository {
  findAllUsers(): Promise<User[] | null>;
  findUserById(id: string): Promise<User | null>;
  findUserByEmail(email: string): Promise<User | null>;
  createUser(email: string, password: string): Promise<User | null>;
}
