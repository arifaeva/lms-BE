import { Elysia } from "elysia";
import { authRouter } from "./router/auth";
import { userRouter } from "./router/user";
import { cors } from "@elysiajs/cors";

const app = new Elysia()
  .use(cors())
  .get("/", () => "Hello this is LMS backend API")
  .group("api/v1", (app) => app.use(authRouter).use(userRouter))
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
