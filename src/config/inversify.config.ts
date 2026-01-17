import { Container } from "inversify";

import { UserServices } from "../services/userServices";
import { AuthServices } from "../services/authServices";

import { UserRepo } from "../repositories/userRepo";
import { AuthRepo } from "../repositories/authRepo";
import { TYPES } from "../entities/types";

const container = new Container();

container.bind<UserRepo>(TYPES.AuthRepo).to(UserRepo);
container.bind<AuthRepo>(TYPES.UserRepo).to(AuthRepo);

container.bind<UserServices>(UserServices).toSelf();
container.bind<AuthServices>(AuthServices).toSelf();

export const userService = container.get<UserServices>(UserServices);
export const authService = container.get<AuthServices>(AuthServices);
