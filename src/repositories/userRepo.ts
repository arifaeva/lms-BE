import { injectable } from "inversify";
import "reflect-metadata";
import { IUserRepository } from "../entities/interfaces";
import { prisma } from "../utils/prisma";
import { $Enums } from "../generated/prisma/client";

@injectable()
export class UserRepo implements IUserRepository {
  async findAllUsers() {
    return await prisma.user.findMany();
  }

  async findUserByEmail(email: string) {
    return await prisma.user.findFirst({ where: { email } });
  }

  async findUserById(id: string) {
    return await prisma.user.findFirst({ where: { id } });
  }

  async createUser(
    name: string,
    email: string,
    password: string,
    role: $Enums.ClientRole = "USER"
  ) {
    return await prisma.user.create({
      data: { name: name, email: email, password: password, role },
    });
  }

  async createStudent(email: string) {
    return prisma.user.update({ where: { email }, data: { role: "STUDENT" } });
  }
}
