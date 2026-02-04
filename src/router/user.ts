import { Elysia, t } from "elysia";
import { authService, userService } from "../config/inversify.config";

export const userRouter = new Elysia({ prefix: "/users" })
  .derive(async ({ cookie: { session_id }, set }) => {
    const sessionId = session_id?.value as string;

    if (!sessionId) {
      set.status = 401;
      throw new Error("Unauthorized");
    }

    const userSession = await authService.validate(sessionId);

    if (!userSession) {
      set.status = 401;
      throw new Error("Invalid session");
    }

    return { userSession };
  })

  .get("/me", ({ userSession }) => {
    return {
      id: userSession.id,
      name: userSession.name,
      email: userSession.email,
      role: userSession.role,
    };
  })

  .get("/", async () => {
    const users = await userService.getAllUsers();
    return { data: users };
  })

  .get(
    "/:id",
    async ({ params }) => {
      const user = await userService.getUserById(params.id);
      return { data: user };
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    },
  )

  .get(
    "/email/:email",
    async ({ params }) => {
      const user = await userService.getUserByEmail(params.email);
      return { data: user };
    },
    {
      params: t.Object({
        email: t.String(),
      }),
    },
  );
