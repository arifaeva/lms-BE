import { Elysia } from "elysia";
import { authRouter } from "./router/auth";
import { userRouter } from "./router/user";

const app = new Elysia()

  .group("api/v1", (app) => app.use(authRouter).use(userRouter))
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
