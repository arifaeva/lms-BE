import { User, LoginSession } from "../generated/prisma/client";

export interface IAuthRepository {
  register(name: string, email: string, password: string): Promise<User | null>;
  login(email: string, password: string): Promise<LoginSession | null>;
}

export interface IUserRepository {
  findAllUsers(): Promise<User[] | null>;
  findUserById(id: string): Promise<User | null>;
  findUserByEmail(email: string): Promise<User | null>;
  createUser(
    name: string,
    email: string,
    password: string
  ): Promise<User | null>;
  createStudent(email: string): Promise<User | null>;
}
