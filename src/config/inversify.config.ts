import { Container } from "inversify";
import { TYPES } from "../entities/types";

import { UserServices } from "../services/userServices";
import { AuthServices } from "../services/authServices";

import { UserRepo } from "../repositories/userRepo";
import { AuthRepo } from "../repositories/authRepo";

const container = new Container();

container.bind<UserRepo>(TYPES.UserRepo).to(UserRepo);
container.bind<AuthRepo>(TYPES.AuthRepo).to(AuthRepo);

container.bind<UserServices>(UserServices).toSelf();
container.bind<AuthServices>(AuthServices).toSelf();

export const userService = container.get<UserServices>(UserServices);
export const authService = container.get<AuthServices>(AuthServices);
