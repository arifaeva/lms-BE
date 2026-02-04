import { Elysia, t } from "elysia";
import { authService } from "../config/inversify.config";

export const authRouter = new Elysia({ prefix: "/auth" })
  .post(
    "/register",
    async ({ body }) => {
      await authService.register(body.name, body.email, body.password);
      return { message: "User registered successfully" };
    },
    {
      body: t.Object({
        name: t.String(),
        email: t.String({ format: "email" }),
        password: t.String(),
      }),
    },
  )

  .post(
    "/login",
    async ({ body, cookie: { session_id }, set }) => {
      const { email, password } = body;
      const session = await authService.login(email, password);

      if (!session) {
        set.status = 401;
        return { message: "Invalid email or password" };
      }

      session_id.set({
        value: session.sessionId,
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
      });

      return {
        userId: session.userId,
        sessionId: session.sessionId,
        expiration: session.expiration,
      };
    },
    {
      body: t.Object({
        email: t.String(),
        password: t.String(),
      }),
    },
  )

  .post("/logout", async ({ cookie: { session_id } }) => {
    session_id.remove();

    return { message: "Logged out" };
  });
